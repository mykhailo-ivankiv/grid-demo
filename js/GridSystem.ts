import WidgetContainer from './WidgetContainer'
import Widget from './Widget'
import { decreaseArrayByValueFromLeft, decreaseArrayByValueFromRight, normalizeArray } from './utils/helpers'
import { attachEventListener } from './utils/customEvents'
import { splitAt, concat, sum, zipWith, pipe, slice, update, last, head } from 'ramda'

const widgetContainer = new WidgetContainer()

const COLUMN_WIDTH = 70

class GridSystem {
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
    let this_ = this
    let extend = null
    let $resizeLeft
    let $resizeRight
    let $highlightEl

    const highlightObj = ({ pageX, pageY, ctrlKey, metaKey }) => {
      if (ctrlKey || metaKey) {
        document.body.classList.add('extend-cell')
      } else {
        document.body.classList.remove('extend-cell')
      }

      extend = ctrlKey || metaKey ? getWidgetRelatedPosition(pageX, pageY) : getRelatedPosition(pageX, pageY)

      const { height, width, left, top } = (extend.row?.[0] || this.$container[0]).getBoundingClientRect()

      $highlightEl.css({ height, width, left, top }).html(getHelperHTML(extend))
    }

    const getHelperHTML = ({ direction, element, row, cell }) => {
      let helper = $("<div class='helper'></div>")
      let el$ = $(element)

      if (direction === 'left')
        return helper.css({
          left: element ? el$.offset().left - row.offset().left : row.width(),
          height: '100%',
        })

      if (direction === 'center')
        return helper.css({
          width: (el$.width() * 80) / 100,
          top: el$.offset().top - row.offset().top + (el$.height() * 25) / 100,
          left: el$.offset().left - row.offset().left + (el$.width() * 10) / 100,
          height: (el$.height() * 50) / 100,
        })

      if (direction === 'top') {
        if (element) {
          return helper.css({
            width: el$.width() || '100%',
            top: el$.offset().top - $(row).offset().top,
            left: el$.offset().left - $(row).offset().left,
          })
        }

        if (cell) {
          el$ = $(cell).find(this.wClassSelector).last()

          return helper.css({
            width: el$.width() || '100%',
            top: el$.offset().top - $(cell).parent().offset().top + el$.height(),
            left: el$.offset().left - $(cell).parent().offset().left,
          })
        }

        if (row) helper.css({ width: '100%', bottom: 0 })

        let lastRow = this.$container.find('.row').last()

        return helper.css({ width: '100%', top: lastRow[0] ? lastRow.offset().top + lastRow.height() : 0 })
      }

      return helper
    }

    /**
     * @return Object with specify cursor position related to editable area
     *                  * row: - Selected row
     *                  * element: - Active element, what response for widget manipulation;
     *                  * direction: - There are two directions "left" and "top", and if combined it with other two
     *                                 params we can get clear cursor position.
     */
    const getRelatedPosition = (x, y) => {
      const horizontalHighlightAreaSize = 25 // 25%
      const row = this.getElementByPos(x, y, this.rClassSelector)

      if (!row) return { row, direction: 'top', element: null }

      const { top, height } = row[0].getBoundingClientRect()
      const relativeY = ((y - top) * 100) / height

      if (relativeY < horizontalHighlightAreaSize || relativeY > 100 - horizontalHighlightAreaSize)
        return { row, direction: 'top', element: relativeY > 100 - horizontalHighlightAreaSize ? null : row }

      let cells = Array.from<HTMLElement>(row[0].querySelectorAll(this.cClassSelector))
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
      let cell = this.getElementByPos(x, y, this.cClassSelector)
      if (!cell) return { element: null, row: null, cell: null, direction: null }

      let widgets = Array.from<HTMLElement>(cell[0].querySelectorAll(this.wClassSelector))
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

    const getLayoutArray = (row: HTMLElement) =>
      Array.from(row.querySelectorAll(this.cClassSelector)).map((el) => Number(el.className.match(/\d+/)[0]))

    const setLayout = (row, layout) =>
      zipWith(
        (cell, size) => (cell.className = cell.className.replace(/\s*grid_(\d{1,2})\s*/, ` grid_${size}`)),
        Array.from(row.querySelectorAll(this.cClassSelector)),
        layout,
      )

    const getExtendedCell = (___extend____) => {
      let cell = $('<div></div>').addClass(this.cCl)

      if (___extend____.direction === 'left') {
        let cells = ___extend____.row.find(this.cClassSelector)
        let cellWidth = Math.ceil(12 / (cells.length + 1))

        let layout = getLayoutArray(___extend____.row[0])
        layout.normalize(12 - cellWidth)
        setLayout(___extend____.row[0], layout)

        cell.addClass('grid_' + cellWidth)

        if (___extend____.element) {
          cell.insertBefore(___extend____.element)
        } else {
          cell.insertAfter(cells.last())
        } // insert in the end of row
      } else if (___extend____.direction === 'top') {
        if (___extend____.cell) {
          return ___extend____.cell
        } else {
          let row = $("<div class='row container_12'></div>")

          cell.addClass('grid_12')
          cell.appendTo(row)

          if (___extend____.row && ___extend____.element) {
            row.insertBefore(___extend____.row) // Insert before row
          } else if (___extend____.row) {
            row.insertAfter(___extend____.row) // Insert after row
          } else {
            row.appendTo(this.container) // If still no any row elements
          }
        }
      }
      return cell
    }

    const dropElement_ = (event, ui) => {
      var widgetRootConfig = ui.draggable.data('widgetRootConfig'),
        widget = ui.draggable.data('widget')

      if (widgetRootConfig) {
        this.addWidget(widgetRootConfig, getExtendedCell(extend))
      } else if (widget && extend.direction === 'center') {
        //replace
        alert('Replace still not implemented')
      } else if (widget && extend.direction !== 'center') {
        //relocate
        this.relocateWidget(widget, getExtendedCell(extend))
      }

      event.stopPropagation()
      this.$container.unbind('mousemove', highlightObj)
      $highlightEl.css({ display: 'none' })
    }

    $resizeLeft = $("<div class='resize-left'></div>")
    $resizeRight = $("<div class='resize-right'></div>")

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

    attachEventListener($resizeLeft[0], 'custom:dragstart', handleResizeStart('left'))
    attachEventListener($resizeRight[0], 'custom:dragstart', handleResizeStart('right'))

    attachEventListener($resizeLeft[0], 'custom:drag', resize)
    attachEventListener($resizeRight[0], 'custom:drag', resize)

    this.setResizable = (wCell) => {
      this.$resizableCell = wCell

      let cellWidth = wCell.parent().find(this.cClassSelector).length
      if (wCell.index() !== 0) {
        this.$resizableCell.append($resizeLeft)
      }
      if (wCell.index() !== cellWidth - 1) {
        this.$resizableCell.append($resizeRight)
      }
    }

    this.unSetResizable = function (wCell) {
      $(document.body).append($resizeLeft, $resizeRight)
      this.$resizableCell = null
    }

    this.relocateWidget = function (widget, newCell) {
      let oldCell = this.getWidgetCell(widget)
      let layout
      let oldRow = this.getWidgetCell(widget).parent()

      widgetContainer.unSelectWidget(widget)

      newCell.append(this.getWidgetHolder(widget))

      if (!oldCell.find(this.wClassSelector)[0]) {
        oldCell.remove()
      } // Cell is empty;
      if (!oldRow.find(this.cClassSelector)[0]) {
        // Row is empty;
        oldRow.remove()
      } else {
        layout = getLayoutArray(oldRow)
        layout.normalize(12)
        setLayout(oldRow[0], layout)
      }

      widgetContainer.selectWidget(widget)
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
    }

    this.addWidget = (widgetRootConfig, cell) => {
      let newWidget = new Widget(widgetRootConfig)
      let widgetHolder = $('<div></div>').addClass(this.wCl).attr('widgetID', newWidget.id)

      if (extend.cell && extend.element) {
        widgetHolder.insertBefore(extend.element)
      } else {
        widgetHolder.appendTo(cell)
      }

      widgetContainer.addWidget(newWidget)
      widgetContainer.selectWidget(newWidget)
    }

    $highlightEl = $("<div class='extend-element container_12'></div>")
      .appendTo(document.body)
      .bind('mousemove', highlightObj)


    // Init main containers
    this.container = document.querySelector('#mainCanvas')
    this.$container = $(this.container) //TODO: Remove hardcode {Mykhailo}
    this.$container
      .droppable({
        over: () => {
          $highlightEl.css({ display: 'block' })
          this.$container.bind('mousemove', highlightObj)
        },
        out: () => $highlightEl.css({ display: 'none' }),
        drop: dropElement_ /*drop_,*/,
        activeClass: 'hovered',
        deactivate: function (event, ui) {
          $(this).undelegate(this_.cClassSelector, 'mouseenter')
          $(this).undelegate(this_.cClassSelector, 'mouseleave')
        },
      })
      .delegate(this.wClassSelector, 'mousedown', function () {
        widgetContainer.selectWidget($(this).data('widget'))
      })

    widgetContainer.bind('selectWidget', (widget) => this.setResizable(this.getWidgetCell(widget)))
    widgetContainer.bind('unSelectWidget', (widget) => this.unSetResizable(this.getWidgetCell(widget)))

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        widgetContainer.removeWidget(widgetContainer.activeWidget)
        event.preventDefault()
      }
    })
  }
}

export default GridSystem
