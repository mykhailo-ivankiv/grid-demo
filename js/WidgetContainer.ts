import EventMachine from './EventMachine'

class WidgetContainer extends EventMachine {
  widgets = {}
  activeWidget = undefined

  addWidget = (widget) => {
    widget.activateMode('behaviour').then(() => this.trigger('addWidget', [widget]))
    this.widgets[widget.id] = widget
  }

  removeWidget = (widget) => {
    delete this.widgets[widget.id]
    if (this.activeWidget === widget) {
      this.activeWidget = undefined
    }
    if (this.getWidgetsCount() > 0) {
      this.selectWidget(Object.keys(this.widgets)[0])
    }

    this.trigger('removeWidget', [widget])
  }

  selectWidget = (widget) => {
    if (this.activeWidget && this.activeWidget !== widget) this.unSelectWidget(this.activeWidget)

    this.activeWidget = widget
    this.trigger('selectWidget', [widget])
  }

  unSelectWidget = (widget) => {
    if (widget.mode === 'edit') this.saveWidget(widget)

    this.trigger('unSelectWidget', [widget])
  }

  editWidget = (widget) => {
    if (widget.mode === 'edit') return

    widget.activateMode('edit').then(() => this.trigger('editWidget', [widget]))
  }

  saveWidget = (widget) => {
    widget.trigger('change')
    widget.activateMode('behaviour').then(() => this.trigger('saveWidget', [widget]))
  }

  getWidgetsCount = () => {
    let counter = 0

    for (let key in this.widgets) {
      if (this.widgets.hasOwnProperty(key)) {
        counter += 1
      }
    }
    return counter
  }

  constructor() {
    super()

    if (typeof WidgetContainer.instance === 'object') {
      return WidgetContainer.instance
    }

    WidgetContainer.instance = this
  }
}

export default WidgetContainer
