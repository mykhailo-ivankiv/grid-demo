import WidgetContainer from "./WidgetContainer.js";
import GridSystem from "./GridSystem.js";
import ToolBox from "./ToolBox.js";

var widgetContainer = new WidgetContainer();
window.gridSystem = new GridSystem();

//Init system binding;
widgetContainer
  .bind("removeWidget", gridSystem.removeWidget)
  .bind("changeWidget", function (widget) {
    gridSystem.getWidgetHolder(widget).html(widget.html);
  })
  .bind("addWidget", function (widget) {
    gridSystem.getWidgetHolder(widget).html(widget.html);

    gridSystem
      .getWidgetHolder(widget)
      .addClass("widget")
      .data("widget", widget)
      .draggable({
        cursorAt: { top: -35, left: -35 },
        helper: function () {
          return $.tmpl(gridSystem.cellTemplate, widget.name);
        },
      });
  })
  .bind("saveWidget", function (widget) {
    gridSystem.getWidgetHolder(widget).html(widget.html);
  })
  .bind("editWidget", function (widget) {
    gridSystem.getWidgetHolder(widget).html(widget.html);
  })
  .bind("selectWidget", function (widget) {
    gridSystem.getWidgetHolder(widget).addClass("active");
  })
  .bind("unselectWidget", function (widget) {
    gridSystem.getWidgetHolder(widget).removeClass("active");
  });

//Init widgets list
loadInitData("data/widgets.json").success(function (data) {
  new ToolBox($("#widgets"), data, "widgetRootConfig");
});

//TODO: Move that i other place. Do not use global variables (and functions to) if that do not necessary. {Khrystya}
window.ondrop = preventEventDefaultBehaviour;
window.ondragover = preventEventDefaultBehaviour;
window.ondragend = preventEventDefaultBehaviour;

function preventEventDefaultBehaviour(event) {
  //      event.preventDefault();
  //      event.stopPropagation();
}

/**
 * Load init settings such as widgets.json or theme.json
 * @param url {String} path to settings
 */
function loadInitData(url) {
  return $.ajax({ url: url, dataType: "json" }).error(function (e) {
    console.error("Cannot load source for widgets settings", e);
  });
}
