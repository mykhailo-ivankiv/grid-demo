import WidgetContainer from './WidgetContainer'
import GridSystem from './GridSystem'
import ToolBox from './ToolBox'

const widgetContainer = new WidgetContainer()
const gridSystem = new GridSystem()

//Init system binding;
widgetContainer
  .bind('removeWidget', gridSystem.removeWidget)
  .bind('changeWidget', (widget) => gridSystem.getWidgetHolder(widget).html(widget.html))
  .bind('addWidget', (widget) => {
    gridSystem.getWidgetHolder(widget).html(widget.html)

    gridSystem
      .getWidgetHolder(widget)
      .addClass('widget')
      .data('widget', widget)
      .draggable({
        cursorAt: { top: -35, left: -35 },
        helper: () => $.tmpl(gridSystem.cellTemplate, widget.name),
      })
  })
  .bind('saveWidget', (widget) => gridSystem.getWidgetHolder(widget).html(widget.html))
  .bind('editWidget', (widget) => gridSystem.getWidgetHolder(widget).html(widget.html))
  .bind('selectWidget', (widget) => gridSystem.getWidgetHolder(widget).addClass('active'))
  .bind('unselectWidget', (widget) => gridSystem.getWidgetHolder(widget).removeClass('active'))

try {
  //Init widgets list
  const data = await (await fetch('data/widgets.json')).json()
  new ToolBox($('#widgets'), data, 'widgetRootConfig')
} catch (e) {
  console.error('Cannot load source for widgets settings', e)
}
