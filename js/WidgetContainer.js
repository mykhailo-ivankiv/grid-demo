import EventMachine from './EventMachine.js'

class WidgetContainer extends EventMachine {
  addWidget = (widget) => {
    widget.activateMode('behaviour').done(() => this.trigger('addWidget', [widget]))
    this.widgets[widget.id] = widget
  }

  constructor() {
    if (typeof WidgetContainer.instance === 'object') {
      return WidgetContainer.instance
    }

    super()
    WidgetContainer.instance = this

    this.widgets = {}
    this.activeWidget = undefined

    this.removeWidget = (widget) => {
      delete this.widgets[widget.id]
      if (this.activeWidget === widget) {
        this.activeWidget = undefined
      }
      if (this.getWidgetsCount() > 0) {
        this.selectWidget(getWidgetByIndex(0))
      }

      this.trigger('removeWidget', [widget])
    }

    this.selectWidget = (widget) => {
      if (this.activeWidget && this.activeWidget !== widget) this.unSelectWidget(this.activeWidget)

      this.activeWidget = widget
      this.trigger('selectWidget', [widget])
    }

    this.unSelectWidget = (widget) => {
      if (widget.mode === 'edit') this.saveWidget(widget)

      this.trigger('unSelectWidget', [widget])
    }

    this.editWidget = (widget) => {
      if (widget.mode === 'edit') return

      widget.activateMode('edit').done(() => this.trigger('editWidget', [widget]))
    }

    this.saveWidget = (widget) => {
      widget.trigger('change')
      widget.activateMode('behaviour').done(() => this.trigger('saveWidget', [widget]))
    }

    this.changeWidget = function (widget, rootConfig) {
      if (widget.name === rootConfig.name) return

      widget.changeCategory(rootConfig, { ...widget.settings }).done(() => {
        widget.trigger('change')
        this.trigger('changeWidget', [widget])
      })
    }

    this.getWidgetsCount = () => {
      let counter = 0

      for (let key in this.widgets) {
        if (this.widgets.hasOwnProperty(key)) {
          counter += 1
        }
      }
      return counter
    }

    const getWidgetByIndex = (index) => {
      let counter = 0
      let key

      for (key in this.widgets) {
        if (this.widgets.hasOwnProperty(key)) {
          if (counter === index) {
            return this.widgets[key]
          }
          counter += 1
        }
      }

      return this.widgets[key]
    }
  }
}

export default WidgetContainer
