/**
 * Define behavior widget manipulation;
 */
define(["EventMachine", "Widget"],
  function (EventMachine,  Widget) {
    "use strict";
    var WidgetContainer = function () {

      if (typeof WidgetContainer.instance === "object") {
        return WidgetContainer.instance;
      }

      EventMachine.apply(this);
      WidgetContainer.instance = this;

      /**
       * Widget container instance
       */
      var this_ = this;
      /**
       * Widgets hash
       */
      this.widgets = {};

      /**
       * Active widget
       */
      this.activeWidget = undefined;

      /**
       * Creates new widget from specified settings and after that adds it to view
       *
       * @param {Object} rootConfig Settings for widget
       */
      this.createWidget = function (rootConfig, settings) {
        var widget = new Widget(rootConfig);
        if (settings) { widget.mergeSettings = settings; }

        this_.addWidget(widget);
        return widget;
      };

      /**
       * Adds widget to view
       *
       * @param {Object} widget Widget which will be added to the view
       */
      this.addWidget = function (widget) {
        widget.activateMode("behaviour").done(function (html) {
//        this_.selectWidget(widget);
          this_.trigger("addWidget", [widget]);
        });
        this_.widgets[widget.id] = widget;
      };

      /**
       * Removes widget from view
       *
       * @param {Object} widget Widget which will be removed from the view
       */
      this.removeWidget = function (widget) {
        delete this_.widgets[widget.id];
        if (this_.activeWidget === widget) {this_.activeWidget = undefined; }
        if (this_.getWidgetsCount() > 0) {this_.selectWidget(getWidgetByIndex(0)); }

        this_.trigger("removeWidget", [widget]);
      };

      /**
       * Selects widget
       *
       * @param {Object} widget Selected widget
       */
      this.selectWidget = function (widget) {
        if (this_.activeWidget && this_.activeWidget !== widget) {
          this.unSelectWidget(this_.activeWidget);
        }

        this_.activeWidget = widget;
        this_.trigger("selectWidget", [widget]);
      };

      this.unSelectWidget = function (widget) {
        if (widget.mode === "edit") { this_.saveWidget(widget); }
        this_.trigger("unSelectWidget", [widget]);
      };

      /**
       * Moves widget to Edit mode
       *
       * @param {Object} widget Widget which must be switched to Edit mode
       */
      this.editWidget = function (widget) {
        if (widget.mode === "edit") {return; }

        widget.activateMode("edit").done(function (html) {
          this_.trigger("editWidget", [widget]); // trigger edit event
        });
      };

      /**
       * Moves widget to Behaviour mode and saves all changes
       *
       * @param {Object} widget Widget which must be switched to Behaviour mode
       */
      this.saveWidget = function (widget) {
        widget.trigger("change");
        widget.activateMode("behaviour").done(function (html) {
          this_.trigger("saveWidget", [widget]);
        });
      };

      /**
       * Changes widget type
       *
       * @param {Object} widget Widget on which change is made
       * @param {Object} rootConfig New settings that must be applied to widget
       */
      this.changeWidget = function (widget, rootConfig) {
        if (widget.name === rootConfig.name) {return; }

        var mergeSettings = $.extend(true, {}, widget.settings); // merge old settings with new one
        widget.changeCategory(rootConfig, mergeSettings).done(function (html) {
          widget.trigger("change");
          this_.trigger("changeWidget", [widget]);
        });
      };

      /**
       * Saves widget settings
       *
       * @param {Object} widget Active widget
       * @param {Object} settings Settings that will be applied to widget
       */
      this.saveWidgetSettings = function (widget, settings) {
        widget.settings = settings;
      };

      /**
       * Calculates widgets count
       */
      this.getWidgetsCount = function () {
        var counter = 0,
          key;
        for (key in this_.widgets) {
          if (this_.widgets.hasOwnProperty(key)) {
            counter += 1;
          }
        }
        return counter;
      };

      /**
       * Finds widget by its GUID
       *
       * @param {Integer} guid Unique GUID for widget
       */
      this.getWidgetById = function (guid) {
        return this_.widgets[guid];
      };

      /**
       * Finds widget by its position in widgets array
       *
       * @param {Integer} index Widget position
       */
      function getWidgetByIndex(index) {
        var counter = 0,
          key;
        for (key in this_.widgets) {
          if (this_.widgets.hasOwnProperty(key)) {
            if (counter === index) {return this_.widgets[key]; }
            counter += 1;
          }
        }

        return this_.widgets[key];
      }

      function init_() {}

      init_();
    };

    WidgetContainer.prototype = {};

    return WidgetContainer;
  });
