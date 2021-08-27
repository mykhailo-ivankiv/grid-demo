define (function(){
  var ToolBox = function (container, settings, identifier){
    /**
     * Toolbox instance
     */
    var this_ = this;

    /**
     * Toolbox deffered object
     */
    var dfd = $.Deferred();

    /**
     * Tools hash
     */
    var categories_ = {};

    /**
     * Toolbox container. It's a DOM node which holds Toolbox.
     */
    this.$container = $(container);

    /**
     * Adds a tool to the Toolbox
     *
     * @param {Object} widgetConfigs Tool settings
     */
    this.add = function(widgetConfigs){
      var category = widgetConfigs.category || widgetConfigs.name;

      categories_[category] = categories_[category] || [];
      categories_[category].push (widgetConfigs);
      return categories_[category];
    };

    /**
     * Remove tool from the Toolbox
     *
     * @param {Object} widgetConfigs Tool settings
     */
    this.remove = function(widgetConfigs){ //TODO: Implement that.
    };

    /**
     * Draws tool
     *
     * Currently we have Themes tool and Categories tool.
     * Categories tool specifies widget type and Theme tool specify look&feel of Page
     *
     * @param {Object} category Tool settings
     */
    this.draw = function(category){
      if (category.length > 1){
        var rootCategory = category[0];
        var rootCategoryHTML = $.tmpl(this_.itemTemplate, rootCategory)
                                .data(identifier, rootCategory)
                                .draggable({cursorAt: { top: -5, left: -5}, helper: "clone"})
                                .append($.tmpl(this_.itemArrow));
        rootCategoryHTML.bind("click",openCategory_)
                        .appendTo(this_.$container);

        var categoriesHTML = $.tmpl(this_.subItemsTemplate)
                              .appendTo(rootCategoryHTML);

        for (var i = 0; i < category.length; i++){
           $.tmpl(this_.itemTemplate, category[i])
                       .data(identifier, category[i])
                       .draggable({cursorAt: { top: -5, left: -5}, helper: "clone"})
                       .bind("click dragstop",function(event){
                          event.stopPropagation();
                          rootCategoryHTML.data(identifier, $(this).data(identifier))
                                          .removeClass("open")
                                          .find("div:first")
                                          .replaceWith($(this).find("div:first").clone());
                       })
                       .appendTo(categoriesHTML);
        }
      } else{
        return $.tmpl(this_.itemTemplate, category[0])
                .data(identifier, category[0])
                .draggable({cursorAt: { top: -5, left: -5}, helper: "clone"});
      }
    };

    /**
     * Opens tool if it has subitems
     *
     * Currently only Categories tool has subitems
     *
     * @param {Event} event Even object
     */
    var openCategory_ = function(event){
      event.stopPropagation();
      $(this).addClass("open");
      $(document.body).bind("click", closeCategory);
    };

    /**
     * Closes tool if it was opened to show subitems
     *
     * Currently only Categories tool has subitems
     */
    var closeCategory = function(){
      this_.$container.find(".tools-item").removeClass("open");
      $(document.body).unbind("click", closeCategory);
    };

    /**
     * Initialization
     */
    var init_ = function(){
      for (var i =0; i< settings.length; i++ ){ this_.add(settings[i]); }
      for (var category in categories_){
        this_.$container.append(this_.draw(categories_[category])); }
    };

    init_();

    dfd.resolve(this_.$container);
    return dfd;
  };

  /**
   * Toolbox configs
   */
  ToolBox.prototype = {
    itemTemplate : "<div class='tools-item'><div><img src='${thumb}'>${name}</div></div>", //${name}
    subItemsTemplate: "<div class='tools-subitems'></div>",
    itemArrow: "<em class='tools-arrow'></em>"
  }

  return ToolBox;
})