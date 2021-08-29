import EventMachine from './EventMachine'
import WidgetContainer from './WidgetContainer'
import Widget from './Widget'
import { normalizeArray } from './utils/helpers'

const widgetContainer = new WidgetContainer()

class GridSystem extends EventMachine {
  cellTemplate = ({ name }) => `<div class='ui-widget-header'>${name}</div>`

  wClassSelector = '.widget' //Widget container class
  rClassSelector = '.row' //Row class selector
  cClassSelector = '.cell' //Cell container class
  wCl = 'widget'
  rCl = 'row'
  cCl = 'cell'

  wMinWidth = 2 //Number of column
  $container

  getElementByPos(x, y, selector) {
    const element = Array.from(this.$container[0].querySelectorAll(selector)).find((el) => {
      const { top, bottom, left, right } = el.getBoundingClientRect()

      if (y > top && y <= bottom && x > left && x <= right) {
        return true
      }
    })

    return element ? $(element) : null
  }

  getWidgetHolder = ({ id }) => $(`[widgetid='${id}']`)
  getWidgetCell = (widget) => this.getWidgetHolder(widget).parent()

  getLayout = () =>
    this.$container
      .clone()
      .find(this.wClassSelector)
      .each(function () {
        $(this).removeClass('active').html('')
      })
      .end()
      .html()

  constructor() {
    super()

    var COLUMN_WIDTH = 70,
      SELECT_GRID = /\s*grid_(\d{1,2})\s*/gim,
      this_ = this,
      extend = null,
      resizeLeft,
      resizeRight,
      highlightEl_

    const highlightObj = (e) => {
      if (e.ctrlKey || e.metaKey) {
        //TODO: bind to window keydown
        extend = getWidgetRelatedPosition(e.pageX, e.pageY)
        $(document.body).addClass('extend-cell')
      } else {
        $(document.body).removeClass('extend-cell')
        extend = getRelatedPosition(e.pageX, e.pageY)
      }

      var extendFrom = $(extend.row || this_.$container)

      highlightEl_.html(getHelperHTML(extend)).css({
        height: extendFrom.height(),
        width: extendFrom.width(),
        left: extendFrom.offset().left,
        top: extendFrom.offset().top,
      })
    }

    const getWidget = (x, y) => this.getElementByPos(x, y, this.wClassSelector)
    const getCell = (x, y) => this.getElementByPos(x, y, this.cClassSelector)

    /**
     * @param x
     * @param y
     *
     * @return {Object} Object with specify cursor position related to editable area
     *                  * row: - Selected row
     *                  * element: - Active element, what response for widget manipulation;
     *                  * direction: - There are two directions "left" and "top", and if combined it with other two
     *                                 params we can get clear cursor position.
     *
     */
    const getRelatedPosition = (x, y) => {
      const horizontalHighlightAreaSize = 25 // 25%
      const row = this.getElementByPos(x, y, this.rClassSelector)

      if (!row) return { row, direction: 'top', element: null }

      const { top, height } = row[0].getBoundingClientRect()
      const relativeY = ((y - top) * 100) / height

      if (relativeY < horizontalHighlightAreaSize || relativeY > 100 - horizontalHighlightAreaSize)
        return { row, direction: 'top', element: relativeY > 100 - horizontalHighlightAreaSize ? null : row }

      let cells = Array.from<HTMLElement>(row[0].querySelectorAll(this_.cClassSelector))
      let separators = cells.length
        ? [
            cells[0].getBoundingClientRect().left,
            ...cells.flatMap((cell) => {
              const { left, width } = cell.getBoundingClientRect()
              return [
                left + (width * horizontalHighlightAreaSize) / 100,
                left + (width * (100 - horizontalHighlightAreaSize)) / 100,
              ]
            }),
            cells[cells.length - 1].getBoundingClientRect().right,
          ]
        : []

      for (let i = 0; i < separators.length; i += 2) {
        if (separators[i] < x && x < separators[i + 1]) return { row, direction: 'left', element: cells[i / 2] || null }

        if (separators[i + 1] < x && x < separators[i + 2])
          return { row, direction: 'center', element: cells[i / 2] || null }
      }

      return { row, direction: 'top', element: null }
    }

    const getWidgetRelatedPosition = (x, y) => {
      //check only vertical position
      var cell = getCell(x, y),
        widgets = cell.find(this_.wClassSelector),
        widget,
        j,
        i,
        direction,
        horizontalSeparators = []

      if (!cell) {
        return { element: null, row: null, cell: null, direction: null }
      }

      if (widgets.length) {
        widget = $(widgets[0])

        horizontalSeparators.push(cell.offset().top)
        for (j = 0; j < widgets.length; j += 1) {
          widget = $(widgets[j])
          horizontalSeparators.push(widget.offset().top + (widget.height() * 25) / 100)
          horizontalSeparators.push(widget.offset().top + (widget.height() * (100 - 25)) / 100)
        }
        horizontalSeparators.push(widget.offset().top + widget.height())
      }

      widget = null
      direction = null
      for (i = 0; i < horizontalSeparators.length; i += 2) {
        if (horizontalSeparators[i] < y && y < horizontalSeparators[i + 1]) {
          direction = 'top'
          widget = widgets[i / 2]
          break
        }
      }
      return {
        element: widget,
        row: cell.parent(),
        cell: cell,
        direction: direction,
      }
    }

    const getHelperHTML = (extendObj) => {
      const { direction, element, row } = extendObj
      let helper = $("<div class='helper'></div>")
      let el$ = $(element)

      if (direction === 'left') {
        return helper.css({
          left: element ? el$.offset().left - row.offset().left : row.width(),
          height: '100%',
        })
      }

      if (direction === 'center') {
        return helper.css({
          width: (el$.width() * 80) / 100,
          top: el$.offset().top - row.offset().top + (el$.height() * 25) / 100,
          left: el$.offset().left - row.offset().left + (el$.width() * 10) / 100,
          height: (el$.height() * 50) / 100,
        })
      }

      if (direction === 'top') {
        if (element) {
          return helper.css({
            width: el$.width() || '100%',
            top: el$.offset().top - $(extendObj.row).offset().top,
            left: el$.offset().left - $(extendObj.row).offset().left,
          })
        }

        if (extendObj.cell) {
          el$ = $(extendObj.cell).find(this_.wClassSelector).last()

          return helper.css({
            width: el$.width() || '100%',
            top: el$.offset().top - $(extendObj.cell).parent().offset().top + el$.height(),
            left: el$.offset().left - $(extendObj.cell).parent().offset().left,
          })
        }

        if (extend.row) {
          return helper.css({ width: '100%', bottom: 0 })
        }

        let row = this_.$container.find('.row').last()

        return helper.css({ width: '100%', top: row[0] ? row.offset().top + row.height() : 0 })
      }

      return helper
    }

    const getLayoutArray = (row, from, to) => {
      var layout = [],
        i,
        cells = row.find(this.cClassSelector)

      for (i = from || 0; i < (to || cells.length); i += 1) {
        cells[i].className.replace(SELECT_GRID, function () {
          layout.push(parseInt(arguments[1]))
        })
      }
      return layout
    }

    const setLayout = (row, layout, from) => {
      var cells = row.find(this_.cClassSelector),
        i
      for (i = 0; i < layout.length; i += 1) {
        cells[i + (from || 0)].className = cells[i].className.replace(SELECT_GRID, ' grid_' + layout[i] + ' ')
      }
    }

    const getExtendedCell = (extend) => {
      var cell = $('<div></div>').addClass(this_.cCl),
        row = $("<div class='row container_12'></div>"),
        cells,
        cellWidth,
        layout

      if (extend.direction === 'left') {
        cells = extend.row.find(this_.cClassSelector)
        cellWidth = Math.ceil(12 / (cells.length + 1))

        layout = getLayoutArray(extend.row)
        layout.normalize(12 - cellWidth)
        setLayout(extend.row, layout)

        cell.addClass('grid_' + cellWidth)

        if (extend.element) {
          cell.insertBefore(extend.element)
        } else {
          cell.insertAfter(cells.last())
        } // insert in the end of row
      } else if (extend.direction === 'top') {
        if (extend.cell) {
          return extend.cell
        } else {
          cell.addClass('grid_12')
          cell.appendTo(row)

          if (extend.row && extend.element) {
            row.insertBefore(extend.row) // Insert before row
          } else if (extend.row) {
            row.insertAfter(extend.row) // Insert after row
          } else {
            row.appendTo(this_.$container) // If still no any row elements
          }
        }
      }
      return cell
    }

    const dropElement_ = (event, ui) => {
      var widgetRootConfig = ui.draggable.data('widgetRootConfig'),
        widget = ui.draggable.data('widget')

      if (widgetRootConfig) {
        this_.addWidget(widgetRootConfig, getExtendedCell(extend))
      } else if (widget && extend.direction === 'center') {
        //replace
        alert('Replace still not implemented')
      } else if (widget && extend.direction !== 'center') {
        //relocate
        this_.relocateWidget(widget, getExtendedCell(extend))
      }

      event.stopPropagation()
      this_.$container.unbind('mousemove', highlightObj)
      highlightEl_.css({ display: 'none' })
    }

    //Resize functions;
    const resize = (startEvent, side) => {
      let layoutBefore = this.getLayout()
      let prevWidth = 0
      let startColumn

      const resizeAction = (currentEvent) => {
        let deltaColumn =
          side === 'left'
            ? Math.round((currentEvent.clientX - startEvent.clientX) / COLUMN_WIDTH)
            : -Math.round((currentEvent.clientX - startEvent.clientX) / COLUMN_WIDTH)

        if (prevWidth === Math.abs(deltaColumn)) return

        let from = side === 'left' ? 0 : this.resizableCell.index() + 1
        let to =
          side === 'left' ? this.resizableCell.index() : this.resizableCell.parent().find(this.cClassSelector).length

        let currentCellWidth = startColumn - deltaColumn
        if (currentCellWidth >= this.wMinWidth) {
          let layout

          layout = getLayoutArray(this.resizableCell.parent(), from, to)
          layout = normalizeArray(layout, layout.sum() - (prevWidth - deltaColumn), this.wMinWidth)

          if (layout) {
            this.resizableCell[0].className = this.resizableCell[0].className.replace(
              SELECT_GRID,
              ' grid_' + currentCellWidth + ' ',
            )
            setLayout(this.resizableCell.parent(), layout, from)
            prevWidth = deltaColumn
          }
        }
      }

      const stopResizeAction = () => {
        $(document.body).unbind('mousemove', resizeAction)
        $(document.body).unbind('mouseup', stopResizeAction)
        this.$container.removeClass('resize')

        if (this.getLayout() !== layoutBefore) {
          this.trigger('layoutChange')
        }
      }

      SELECT_GRID.test(this.resizableCell[0].className)
      startColumn = RegExp.$1

      $(document.body).bind('mousemove', resizeAction)
      $(document.body).bind('mouseup', stopResizeAction)
      this.$container.addClass('resize')
    }

    this.resizableCell = null

    resizeLeft = $("<div class='resize-left'></div>").bind('mousedown', (e) => resize(e, 'left'))
    resizeRight = $("<div class='resize-right'></div>").bind('mousedown', (e) => resize(e, 'right'))

    this.setResizable = function (wCell) {
      this.resizableCell = wCell

      let cellWidth = wCell.parent().find(this_.cClassSelector).length
      if (wCell.index() !== 0) {
        this.resizableCell.append(resizeLeft)
      }
      if (wCell.index() !== cellWidth - 1) {
        this.resizableCell.append(resizeRight)
      }
    }

    this.unSetResizable = function (wCell) {
      $(document.body).append(resizeLeft, resizeRight)
      this.resizableCell = null
    }

    this.relocateWidget = function (widget, newCell) {
      let oldCell = this_.getWidgetCell(widget)
      let layout
      let oldRow = this.getWidgetCell(widget).parent()

      widgetContainer.unSelectWidget(widget)

      newCell.append(this_.getWidgetHolder(widget))

      if (!oldCell.find(this_.wClassSelector)[0]) {
        oldCell.remove()
      } // Cell is empty;
      if (!oldRow.find(this_.cClassSelector)[0]) {
        // Row is empty;
        oldRow.remove()
      } else {
        layout = getLayoutArray(oldRow)
        layout.normalize(12)
        setLayout(oldRow, layout)
      }

      widgetContainer.selectWidget(widget)
      this_.trigger('layoutChange')
    }

    this.removeWidget = (widget) => {
      let row = this.getWidgetCell(widget).parent()
      let cell = this.getWidgetCell(widget)

      widgetContainer.unSelectWidget(widget)
      this.getWidgetHolder(widget).remove()

      if (!cell[0].childNodes.length) {
        cell.remove()
      }

      if (row[0].childNodes.length) {
        setLayout(row, getLayoutArray(row).normalize(12))
      } else {
        row.remove()
      }

      this.trigger('layoutChange')
    }

    this.addWidget = (widgetRootConfig, cell) => {
      let newWidget = new Widget(widgetRootConfig)
      let widgetHolder = $('<div></div>').addClass(this_.wCl).attr('widgetID', newWidget.id)

      if (extend.cell && extend.element) {
        widgetHolder.insertBefore(extend.element)
      } else {
        widgetHolder.appendTo(cell)
      }

      widgetContainer.addWidget(newWidget)
      widgetContainer.selectWidget(newWidget)

      this_.trigger('layoutChange')
    }

    function init_() {
      highlightEl_ = $("<div class='extend-element container_12'></div>")
        .appendTo(document.body)
        .bind('mousemove', highlightObj)
        .droppable({ drop: dropElement_ })

      // Init main containers
      this_.$container = $('#mainCanvas') //TODO: Remove hardcode {Mykhailo}
      this_.$container
        .droppable({
          over: () => {
            highlightEl_.css({ display: 'block' })
            this_.$container.bind('mousemove', highlightObj)
          },
          out: () => highlightEl_.css({ display: 'none' }),
          drop: dropElement_ /*drop_,*/,
          activeClass: 'hovered',
          deactivate: function (event, ui) {
            $(this).undelegate(this_.cClassSelector, 'mouseenter')
            $(this).undelegate(this_.cClassSelector, 'mouseleave')
          },
        })
        .delegate(this_.wClassSelector, 'mousedown', function () {
          widgetContainer.selectWidget($(this).data('widget'))
        })
        .delegate(this_.wClassSelector, 'dblclick', function () {
          widgetContainer.editWidget($(this).data('widget'))
        })

      widgetContainer.bind('selectWidget', (widget) => {
        var widgetCell = this_.getWidgetCell(widget)
        this_.setResizable(widgetCell)
      })

      widgetContainer.bind('unSelectWidget', (widget) => {
        var widgetCell = this_.getWidgetCell(widget)
        this_.unSetResizable(widgetCell)
      })

      document.addEventListener('keydown', (event) => {
        if ((event.key === 'Backspace' || event.key === 'Delete') && widgetContainer.activeWidget.mode !== 'edit') {
          widgetContainer.removeWidget(widgetContainer.activeWidget)
          event.preventDefault()
        }
        if (event.key === 'Enter' && widgetContainer.activeWidget.mode !== 'edit') {
          widgetContainer.editWidget(widgetContainer.activeWidget)
        }
      })
    }
    init_()
  }
}

export default GridSystem
