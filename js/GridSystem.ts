import EventMachine from './EventMachine'
import WidgetContainer from './WidgetContainer'
import Widget from './Widget'
import { decreaseArrayByValueFromLeft, decreaseArrayByValueFromRight, normalizeArray } from './utils/helpers'
import { attachEventListener } from './utils/customEvents'
import { splitAt, concat, sum, zipWith, pipe, slice, update, last, head } from 'ramda'

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
  container: HTMLElement
  $resizableCell: HTMLElement | null = null

  getElementByPos(x: number, y: number, selector: string) {
    const element = Array.from(this.container.querySelectorAll(selector)).find((el) => {
      const { top, bottom, left, right } = el.getBoundingClientRect()

      if (y > top && y <= bottom && x > left && x <= right) {
        return true
      }
    })

    return element ? $(element) : null
  }

  getWidgetHolder = ({ id }) => $(`[widgetid='${id}']`)
  getWidgetCell = (widget) => this.getWidgetHolder(widget).parent()

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
      let cell = getCell(x, y) //check only vertical position
      if (!cell) return { element: null, row: null, cell: null, direction: null }

      let widgets = Array.from<HTMLElement>(cell[0].querySelectorAll(this_.wClassSelector))
      let horizontalSeparators = widgets.length
        ? [
            widgets[0].getBoundingClientRect().top,
            ...widgets.flatMap((widget) => {
              const { top, height } = widget.getBoundingClientRect()
              return [top + (height * 25) / 100, top + (height * (100 - 25)) / 100]
            }),
            widgets[widgets.length - 1].getBoundingClientRect().bottom,
          ]
        : []

      for (let i = 0; i < horizontalSeparators.length; i += 2) {
        if (horizontalSeparators[i] < y && y < horizontalSeparators[i + 1])
          return { element: widgets[i / 2], row: cell.parent(), cell: cell, direction: 'top' }
      }

      return { element: null, row: cell.parent(), cell: cell, direction: null }
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

    const getLayoutArray = (row: HTMLElement) =>
      Array.from(row.querySelectorAll(this.cClassSelector)).map((el) => Number(el.className.match(/\d+/)[0]))

    const setLayout = (row, layout) =>
      zipWith(
        (cell, size) => (cell.className = cell.className.replace(SELECT_GRID, ` grid_${size}`)),
        Array.from(row.querySelectorAll(this_.cClassSelector)),
        layout,
      )

    const getExtendedCell = (extend) => {
      var cell = $('<div></div>').addClass(this_.cCl),
        row = $("<div class='row container_12'></div>"),
        cells,
        cellWidth,
        layout

      if (extend.direction === 'left') {
        cells = extend.row.find(this_.cClassSelector)
        cellWidth = Math.ceil(12 / (cells.length + 1))

        layout = getLayoutArray(extend.row[0])
        layout.normalize(12 - cellWidth)
        setLayout(extend.row[0], layout)

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
            row.appendTo(this_.container) // If still no any row elements
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

    resizeLeft = $("<div class='resize-left'></div>")
    resizeRight = $("<div class='resize-right'></div>")

    let resizableColumnIndex
    let resizableLayout

    const resize = ({ movementX }) => {
      let deltaColumn = Math.round(movementX / COLUMN_WIDTH)
      if (deltaColumn === 0) return setLayout(this.$resizableCell[0].parentNode, resizableLayout)

      const [left, right] = splitAt(resizableColumnIndex, resizableLayout)
      // | a | b <-| c|
      if (deltaColumn < 0) {
        const nextLeftSize = sum(left) + deltaColumn
        if (nextLeftSize < left.length * this.wMinWidth) return

        return setLayout(
          this.$resizableCell[0].parentNode,
          concat(
            decreaseArrayByValueFromRight(left, this.wMinWidth, Math.abs(deltaColumn)),
            update(0, head(right) - deltaColumn, right),
          ),
        )
      }

      // | a |-> b | c|
      const nextRightSize = sum(right) - deltaColumn
      if (nextRightSize < right.length * this.wMinWidth) return

      setLayout(
        this.$resizableCell[0].parentNode,
        concat(
          update(left.length - 1, last(left) + deltaColumn, left),
          decreaseArrayByValueFromLeft(right, this.wMinWidth, Math.abs(deltaColumn)),
        ),
      )
    }

    const handleResizeStart = (direction: 'left' | 'right') => () => {
      const directionIndexCorrector = direction === 'right' ? 1 : 0
      this.container.classList.add('resize')
      const resizableCell = this.$resizableCell[0]
      const cells = Array.from(resizableCell.parentNode.querySelectorAll(this.cClassSelector))

      resizableColumnIndex = cells.findIndex((el) => el === resizableCell) + directionIndexCorrector
      resizableLayout = getLayoutArray(this.$resizableCell[0].parentNode)
    }

    attachEventListener(document, 'custom:drop', () => this.container.classList.remove('resize'))

    attachEventListener(resizeLeft[0], 'custom:dragstart', handleResizeStart('left'))
    attachEventListener(resizeRight[0], 'custom:dragstart', handleResizeStart('right'))

    attachEventListener(resizeLeft[0], 'custom:drag', resize)
    attachEventListener(resizeRight[0], 'custom:drag', resize)

    this.setResizable =  (wCell) => {
      this.$resizableCell = wCell

      let cellWidth = wCell.parent().find(this_.cClassSelector).length
      if (wCell.index() !== 0) {
        this.$resizableCell.append(resizeLeft)
      }
      if (wCell.index() !== cellWidth - 1) {
        this.$resizableCell.append(resizeRight)
      }
    }

    this.unSetResizable = function (wCell) {
      $(document.body).append(resizeLeft, resizeRight)
      this.$resizableCell = null
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
        setLayout(oldRow[0], layout)
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
        setLayout(row[0], getLayoutArray(row).normalize(12))
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

    highlightEl_ = $("<div class='extend-element container_12'></div>")
      .appendTo(document.body)
      .bind('mousemove', highlightObj)
      .droppable({ drop: dropElement_ })

    // Init main containers
    this.container = document.querySelector('#mainCanvas')
    this_.$container = $(this.container) //TODO: Remove hardcode {Mykhailo}
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
}

export default GridSystem
