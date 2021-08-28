import EventMachine from "./EventMachine.js";
import WidgetContainer from "./WidgetContainer.js";
import GridSystemConfig from "./GridSystemConfig.js";
import Widget from "./Widget.js";

var GridSystem = function () {
  var COLUMN_WIDTH = 70,
    SELECT_GRID = /\s*grid_(\d{1,2})\s*/gim,
    this_ = this,
    extend = null,
    resizeLeft,
    resizeRight,
    widgetContainer = new WidgetContainer(), // Singleton. When you will try to create new instance you'll get this object. (TODO: Need to refactor {Khrystya})
    highlightEl_;

  EventMachine.apply(this);

  function extend_() {
    highlightEl_.css({ display: "block" });
    this_.$container.bind("mousemove", highlightObj);
  }

  function getElementByPos(x, y, selector) {
    var elements = this_.$container.find(selector),
      element,
      elementOffset,
      i;

    for (i = 0; i < elements.length; i += 1) {
      element = $(elements[i]);
      elementOffset = element.offset();
      elementOffset.width = element.width();
      elementOffset.height = element.height();

      // Check the element
      if (
        y > elementOffset.top &&
        y <= elementOffset.top + elementOffset.height &&
        x > elementOffset.left &&
        x <= elementOffset.left + elementOffset.width
      ) {
        return element;
      }
    }
    return null;
  }

  function getWidget(x, y) {
    return getElementByPos(x, y, this_.wClassSelector);
  }
  function getCell(x, y) {
    return getElementByPos(x, y, this_.cClassSelector);
  }
  function getRow(x, y) {
    return getElementByPos(x, y, this_.rClassSelector);
  }

  function getSeparators(cells, settings) {
    var separators = [],
      cell,
      j;
    // check the cells, and add separate zones
    if (cells.length) {
      cell = $(cells[0]);

      separators.push(cell.offset().left);
      for (j = 0; j < cells.length; j += 1) {
        cell = $(cells[j]);
        separators.push(cell.offset().left + (cell.width() * settings.v) / 100);
        separators.push(
          cell.offset().left + (cell.width() * (100 - settings.v)) / 100
        );
      }
      separators.push(cell.offset().left + cell.width());
    }
    return separators;
  }

  /**
   *
   * @param x
   * @param y
   *
   * @return {Object} Object with specify cursor position related to editable area
   *                  * row: - Selected row
   *                  * element: - Active element, what response for widget manipulation;
   *                  * direction: - There are two directions "left" and "top", and if combined it with other two
   *                                 params we can get clear cursor position.
   *
   */
  function getRelatedPosition(x, y, settings) {
    settings = settings || {
      cellManipulation: true,
      h: 25,
      /* horizontalRegion (%) */ v: 25 /* verticalRegion (%) */,
    };

    var row = getRow(x, y),
      extendDirection = "top", // Default - top
      extendElement = null,
      cells,
      separators,
      relativeY,
      i;

    if (row) {
      relativeY = ((y - row.offset().top) * 100) / row.height();
      if (relativeY < settings.h || relativeY > 100 - settings.h) {
        //top is default direction
        extendElement = relativeY > 100 - settings.h ? null : row;
      } else {
        cells = row.find(this_.cClassSelector);
        separators = getSeparators(cells, settings); //TODO: We can cache this value {Mykhailo}

        for (i = 0; i < separators.length; i += 2) {
          if (separators[i] < x && x < separators[i + 1]) {
            extendElement = cells[i / 2] || null;
            extendDirection = "left";
            break;
          } else if (separators[i + 1] < x && x < separators[i + 2]) {
            extendElement = cells[i / 2] || null;
            extendDirection = "center";
            break;
          }
        }
      }
    }
    return { row: row, direction: extendDirection, element: extendElement };
  }

  function getWidgetRelatedPosition(x, y) {
    //check only vertical position
    var cell = getCell(x, y),
      widgets = cell.find(this_.wClassSelector),
      widget,
      j,
      i,
      direction,
      horizontalSeparators = [];

    if (!cell) {
      return { element: null, row: null, cell: null, direction: null };
    }

    if (widgets.length) {
      widget = $(widgets[0]);

      horizontalSeparators.push(cell.offset().top);
      for (j = 0; j < widgets.length; j += 1) {
        widget = $(widgets[j]);
        horizontalSeparators.push(
          widget.offset().top + (widget.height() * 25) / 100
        );
        horizontalSeparators.push(
          widget.offset().top + (widget.height() * (100 - 25)) / 100
        );
      }
      horizontalSeparators.push(widget.offset().top + widget.height());
    }

    widget = null;
    direction = null;
    for (i = 0; i < horizontalSeparators.length; i += 2) {
      if (horizontalSeparators[i] < y && y < horizontalSeparators[i + 1]) {
        direction = "top";
        widget = widgets[i / 2];
        break;
      }
    }
    return {
      element: widget,
      row: cell.parent(),
      cell: cell,
      direction: direction,
    };
  }

  function getHelperHTML(extendObj) {
    var helper = $("<div class='helper'></div>"),
      el = $(extendObj.element),
      left,
      width,
      height,
      top,
      row,
      bottom;

    if (extendObj.direction === "left") {
      if (extendObj.element) {
        left = el.offset().left - extendObj.row.offset().left;
      } else {
        left = extendObj.row.width();
      }
      height = "100%";
    } else if (extendObj.direction === "center") {
      width = (el.width() * 80) / 100;
      height = (el.height() * 50) / 100;
      left =
        el.offset().left - extend.row.offset().left + (el.width() * 10) / 100;
      top =
        el.offset().top - extend.row.offset().top + (el.height() * 25) / 100;
    } else if (extendObj.direction === "top") {
      if (extend.element) {
        top = el.offset().top - $(extendObj.row).offset().top;
        width = el.width();
        left = el.offset().left - $(extendObj.row).offset().left;
      } else if (extendObj.cell) {
        el = $(extendObj.cell).find(this_.wClassSelector).last();
        top =
          el.offset().top -
          $(extendObj.cell).parent().offset().top +
          el.height();
        width = el.width();
        left = el.offset().left - $(extendObj.cell).parent().offset().left;
      } else if (extend.row) {
        bottom = 0;
      } else {
        row = this_.$container.find(".row").last();
        top = row[0] ? row.offset().top + row.height() : 0;
      }
      width = width || "100%";
    }

    helper.css({
      width: width,
      top: top,
      bottom: bottom,
      left: left,
      height: height,
    });
    return helper;
  }

  function highlightObj(e) {
    if (e.ctrlKey || e.metaKey) {
      //TODO: bind to window keydown
      extend = getWidgetRelatedPosition(e.pageX, e.pageY);
      $(document.body).addClass("extend-cell");
    } else {
      $(document.body).removeClass("extend-cell");
      extend = getRelatedPosition(e.pageX, e.pageY);
    }

    var extendFrom = $(extend.row || this_.$container);

    highlightEl_.html(getHelperHTML(extend)).css({
      height: extendFrom.height(),
      width: extendFrom.width(),
      left: extendFrom.offset().left,
      top: extendFrom.offset().top,
    });
  }

  function getLayoutArray(row, from, to) {
    var layout = [],
      i,
      cells = row.find(this_.cClassSelector);

    for (i = from || 0; i < (to || cells.length); i += 1) {
      cells[i].className.replace(SELECT_GRID, function () {
        layout.push(parseInt(arguments[1]));
      });
    }
    return layout;
  }

  function setLayout(row, layout, from) {
    var cells = row.find(this_.cClassSelector),
      i;
    for (i = 0; i < layout.length; i += 1) {
      cells[i + (from || 0)].className = cells[i].className.replace(
        SELECT_GRID,
        " grid_" + layout[i] + " "
      );
    }
  }

  function getExtendedCell(extend) {
    var cell = $("<div></div>").addClass(this_.cCl),
      row = $("<div class='row container_12'></div>"),
      cells,
      cellWidth,
      layout;

    if (extend.direction === "left") {
      cells = extend.row.find(this_.cClassSelector);
      cellWidth = Math.ceil(12 / (cells.length + 1));

      layout = getLayoutArray(extend.row);
      layout.normalize(12 - cellWidth);
      setLayout(extend.row, layout);

      cell.addClass("grid_" + cellWidth);

      if (extend.element) {
        cell.insertBefore(extend.element);
      } else {
        cell.insertAfter(cells.last());
      } // insert in the end of row
    } else if (extend.direction === "top") {
      if (extend.cell) {
        return extend.cell;
      } else {
        cell.addClass("grid_12");
        cell.appendTo(row);

        if (extend.row && extend.element) {
          row.insertBefore(extend.row); // Insert before row
        } else if (extend.row) {
          row.insertAfter(extend.row); // Insert after row
        } else {
          row.appendTo(this_.$container); // If still no any row elements
        }
      }
    }
    return cell;
  }

  function dropElement_(event, ui) {
    var widgetRootConfig = ui.draggable.data("widgetRootConfig"),
      widget = ui.draggable.data("widget");

    if (widgetRootConfig) {
      this_.addWidget(widgetRootConfig, getExtendedCell(extend));
    } else if (widget && extend.direction === "center") {
      //replace
      alert("Replace still not implemented");
    } else if (widget && extend.direction !== "center") {
      //relocate
      this_.relocateWidget(widget, getExtendedCell(extend));
    }

    event.stopPropagation();
    this_.$container.unbind("mousemove", highlightObj);
    highlightEl_.css({ display: "none" });
  }

  this.getWidgetHolder = function (widget) {
    return $("[widgetid=" + widget.id + "]");
  };
  this.getWidgetCell = function (widget) {
    return this_.getWidgetHolder(widget).parent();
  };

  function getWidgetRow(widget) {
    return this_.getWidgetCell(widget).parent();
  }

  //Resize functions;
  function resize(startEvent, side) {
    var layoutBefore = this_.getLayout(),
      layoutArrayBefore = getLayoutArray(this_.resizableCell.parent()),
      prevWidth,
      startColumn;

    function resizeAction(currentEvent) {
      var deltaColumn = Math.round(
          (currentEvent.clientX - startEvent.clientX) / COLUMN_WIDTH
        ),
        widgets,
        layout,
        from,
        currentCellWidth,
        to;

      if (prevWidth !== deltaColumn) {
        widgets = this_.resizableCell.parent().find(this_.cClassSelector);

        // Scope definition.
        if (side === "left") {
          //left
          from = 0;
          to = this_.resizableCell.index();
        } else if (side === "right") {
          deltaColumn *= -1; // Reverse width change;
          from = this_.resizableCell.index() + 1;
          to = widgets.length;
        }

        currentCellWidth = startColumn - deltaColumn;
        if (currentCellWidth >= this_.wMinWidth) {
          layout = getLayoutArray(this_.resizableCell.parent(), from, to);
          layout = normalizeArray(
            layout,
            layout.sum() - (prevWidth - deltaColumn),
            this_.wMinWidth
          );

          if (layout) {
            this_.resizableCell[0].className =
              this_.resizableCell[0].className.replace(
                SELECT_GRID,
                " grid_" + currentCellWidth + " "
              );
            setLayout(this_.resizableCell.parent(), layout, from);
            prevWidth = deltaColumn;
          }
        }
      }
    }

    function stopResizeAction() {
      $(document.body).unbind("mousemove", resizeAction);
      $(document.body).unbind("mouseup", stopResizeAction);
      this_.$container.removeClass("resize");

      if (this_.getLayout() !== layoutBefore) {
        this_.trigger("layoutChange");
      }
    }

    prevWidth = 0;

    SELECT_GRID.test(this_.resizableCell[0].className);
    startColumn = RegExp.$1;

    $(document.body).bind("mousemove", resizeAction);
    $(document.body).bind("mouseup", stopResizeAction);
    this_.$container.addClass("resize");
  }

  this.resizableCell = null;

  resizeLeft = $("<div class='resize-left'></div>").bind(
    "mousedown",
    function (e) {
      resize(e, "left");
    }
  );
  resizeRight = $("<div class='resize-right'></div>").bind(
    "mousedown",
    function (e) {
      resize(e, "right");
    }
  );

  this.setResizable = function (wCell) {
    this.resizableCell = wCell;
    var cellWidth = wCell.parent().find(this_.cClassSelector).length;
    if (wCell.index() !== 0) {
      this.resizableCell.append(resizeLeft);
    }
    if (wCell.index() !== cellWidth - 1) {
      this.resizableCell.append(resizeRight);
    }
  };

  this.unSetResizable = function (wCell) {
    $(document.body).append(resizeLeft, resizeRight);
    this.resizableCell = null;
  };

  this.relocateWidget = function (widget, newCell) {
    var oldCell = this_.getWidgetCell(widget),
      layout,
      oldRow = getWidgetRow(widget);

    widgetContainer.unSelectWidget(widget);

    newCell.append(this_.getWidgetHolder(widget));

    if (!oldCell.find(this_.wClassSelector)[0]) {
      oldCell.remove();
    } // Cell is empty;
    if (!oldRow.find(this_.cClassSelector)[0]) {
      // Row is empty;
      oldRow.remove();
    } else {
      layout = getLayoutArray(oldRow);
      layout.normalize(12);
      setLayout(oldRow, layout);
    }

    widgetContainer.selectWidget(widget);
    this_.trigger("layoutChange");
  };

  this.removeWidget = function (widget) {
    var row = getWidgetRow(widget),
      cell = this_.getWidgetCell(widget),
      layout;
    widgetContainer.unSelectWidget(widget);
    this_.getWidgetHolder(widget).remove();

    if (!cell[0].childNodes.length) {
      cell.remove();
    }

    if (row[0].childNodes.length) {
      layout = getLayoutArray(row).normalize(12);
      setLayout(row, layout);
    } else {
      row.remove();
    }

    this_.trigger("layoutChange");
  };

  this.insertWidget = function (widget, widgetHolder) {
    widgetHolder.html(widget.html);
  };

  this.addWidget = function (widgetRootConfig, cell) {
    var newWidget = new Widget(widgetRootConfig),
      widgetHolder = $("<div></div>")
        .addClass(this_.wCl)
        .attr("widgetID", newWidget.id);

    if (extend.cell && extend.element) {
      widgetHolder.insertBefore(extend.element);
    } else {
      widgetHolder.appendTo(cell);
    }

    widgetContainer.addWidget(newWidget);
    widgetContainer.selectWidget(newWidget);

    this_.trigger("layoutChange");
  };

  this.getLayout = function () {
    var layout = this_.$container
      .clone()
      .find(this_.wClassSelector)
      .each(function () {
        $(this).removeClass("active").html("");
      })
      .end();
    return layout.html();
  };

  function init_() {
    highlightEl_ = $("<div class='extend-element container_12'></div>")
      .appendTo(document.body)
      .bind("mousemove", highlightObj)
      .droppable({ drop: dropElement_ });

    // Init main containers
    this_.$container = $("#mainCanvas"); //TODO: Remove hardcode {Mykhailo}
    this_.$container
      .droppable({
        over: extend_,
        out: function () {
          highlightEl_.css({ display: "none" });
        },
        drop: dropElement_ /*drop_,*/,
        activeClass: "hovered",
        deactivate: function (event, ui) {
          $(this).undelegate(this_.cClassSelector, "mouseenter");
          $(this).undelegate(this_.cClassSelector, "mouseleave");
        },
      })
      .delegate(this_.wClassSelector, "mousedown", function () {
        widgetContainer.selectWidget($(this).data("widget"));
      })
      .delegate(this_.wClassSelector, "dblclick", function () {
        widgetContainer.editWidget($(this).data("widget"));
      });

    widgetContainer.bind("selectWidget", function (widget) {
      var widgetCell = this_.getWidgetCell(widget);
      this_.setResizable(widgetCell);
    });

    widgetContainer.bind("unSelectWidget", function (widget) {
      var widgetCell = this_.getWidgetCell(widget);
      this_.unSetResizable(widgetCell);
    });

    $(window).bind("keypress", function (e) {
      if (
        (e.keyCode === 46 || e.keyCode === 8) &&
        widgetContainer.activeWidget.mode !== "edit"
      ) {
        //Delete (or Backspace)
        widgetContainer.removeWidget(widgetContainer.activeWidget);
        e.preventDefault();
      }
      if (e.keyCode === 13 && widgetContainer.activeWidget.mode !== "edit") {
        //Enter
        widgetContainer.editWidget(widgetContainer.activeWidget);
      }
    });
  }
  init_();
};

GridSystem.prototype = GridSystemConfig;

export default GridSystem;
