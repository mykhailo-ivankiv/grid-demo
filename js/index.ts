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
        helper: () => $(gridSystem.cellTemplate({ name: widget.name })),
      })
  })
  .bind('saveWidget', (widget) => gridSystem.getWidgetHolder(widget).html(widget.html))
  .bind('editWidget', (widget) => gridSystem.getWidgetHolder(widget).html(widget.html))
  .bind('selectWidget', (widget) => gridSystem.getWidgetHolder(widget).addClass('active'))
  .bind('unselectWidget', (widget) => gridSystem.getWidgetHolder(widget).removeClass('active'))

try {
  new ToolBox(
    document.querySelector(`#widgets`),
    [
      { name: 'text', thumb: 'images/icons/ico_txt.png', src: () => import('./widgets/text/index.js') },
      { name: 'video', thumb: 'images/icons/ico_video.png', src: () => import('./widgets/video/index.js') },
      { name: 'form', thumb: 'images/icons/ico_form.png', src: () => import('./widgets/form/index.js') },
      { name: 'The Unseen Column', thumb: '', src: () => import('./widgets/table1/index.js') },
      { name: 'Flip scroll', thumb: '', src: () => import('./widgets/table2/index.js') },
      { name: 'No more tables', thumb: '', src: () => import('./widgets/table3/index.js') },
    ],
    'widgetRootConfig',
  )
} catch (e) {
  console.error('Cannot load source for widgets settings', e)
}
