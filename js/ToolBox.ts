class ToolBox {
  itemTemplate = "<div class='tools-item'><div><img src='${thumb}'>${name}</div></div>" //${name}
  subItemsTemplate = "<div class='tools-subitems'></div>"
  itemArrow = "<em class='tools-arrow'></em>"

  constructor(container, settings, identifier) {
    const categories_ = {}
    this.$container = $(container)

    this.add = (widgetConfigs) => {
      var category = widgetConfigs.category || widgetConfigs.name

      categories_[category] = categories_[category] || []
      categories_[category].push(widgetConfigs)
      return categories_[category]
    }

    this.draw = (category) => {
      if (category.length > 1) {
        var rootCategory = category[0]
        var rootCategoryHTML = $.tmpl(this.itemTemplate, rootCategory)
          .data(identifier, rootCategory)
          .draggable({ cursorAt: { top: -5, left: -5 }, helper: 'clone' })
          .append($.tmpl(this.itemArrow))
        rootCategoryHTML
          .bind('click', function (event) {
            event.stopPropagation()
            $(this).addClass('open')
            $(document.body).bind('click', closeCategory)
          })
          .appendTo(this.$container)

        var categoriesHTML = $.tmpl(this.subItemsTemplate).appendTo(rootCategoryHTML)

        for (var i = 0; i < category.length; i++) {
          $.tmpl(this.itemTemplate, category[i])
            .data(identifier, category[i])
            .draggable({ cursorAt: { top: -5, left: -5 }, helper: 'clone' })
            .bind('click dragstop', function (event) {
              event.stopPropagation()
              rootCategoryHTML
                .data(identifier, $(this).data(identifier))
                .removeClass('open')
                .find('div:first')
                .replaceWith($(this).find('div:first').clone())
            })
            .appendTo(categoriesHTML)
        }
      } else {
        return $.tmpl(this.itemTemplate, category[0])
          .data(identifier, category[0])
          .draggable({ cursorAt: { top: -5, left: -5 }, helper: 'clone' })
      }
    }

    var closeCategory = function () {
      this.$container.find('.tools-item').removeClass('open')
      $(document.body).unbind('click', closeCategory)
    }

    settings.map((_, i) => this.add(settings[i]))

    Object.values(categories_).map((category) => this.$container.append(this.draw(category)))

    return this.$container
  }
}

export default ToolBox
