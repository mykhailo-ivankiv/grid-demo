class ToolBox {
  itemTemplate = ({ thumb, name }) => `<div class='tools-item'><div><img src='${thumb}'>${name}</div></div>` //${name}

  categories = []
  $container
  //

  constructor(container, settings, identifier) {
    this.$container = container

    const add = (widgetConfigs) => this.categories.push(widgetConfigs)

    settings.map((_, i) => add(settings[i]))

    this.categories.map((category) =>
      $(this.itemTemplate(category))
        .data(identifier, category)
        .draggable({ cursorAt: { top: -5, left: -5 }, helper: 'clone' })
        .appendTo(this.$container),
    )

    return $(container)
  }
}

export default ToolBox
