editMode([], function () {
  var this_ = this;
  $(this_.html).parent().draggable("option", "disabled", true);

// getting all attributes with attr()
  (function ($) {
    var _old = $.fn.attr;
    $.fn.attr = function () {
      var a, aLength, attributes, map;
      if (this[0] && arguments.length === 0) {
        map = {};
        attributes = this[0].attributes;
        aLength = attributes.length;
        for (a = 0; a < aLength; a++) {
          map[attributes[a].name.toLowerCase()] = attributes[a].value;
        }
        return map;
      } else {
        return _old.apply(this, arguments);
      }
    }
  }(jQuery));


//TRANSFORM PART
  $('label').each(function (index, val) {
    $(this).replaceWith("<span>" + $(val).html() + "</span>");
  });
  $('select').each(function (index, val) {
    $(val).children().each(function (i, elem) {
      var transformedElement = $("<span/>",$(elem).attr()).html($(elem).html());
      $(elem).replaceWith(transformedElement);
    });
    $(val).replaceWith("<div class='select'>" + $(val).html() + "</div>");
  });
//END:TRANSFORM PART


//  $(this.html).children().sortable()
//                         .disableSelection();

  this_.bind("beforeModeChanged", function (modeName) {
    if (modeName == "edit") {
      this_.getSettings().done(function (settings) {
        //TRANSFORM PART
        $('div.select').each(function (index, val) {
          $(val).children().each(function (i, elem) {
            var transformedElement = $("<option/>",$(elem).attr()).html($(elem).html());
            $(elem).replaceWith(transformedElement);
          });
          $(val).replaceWith("<select>" + $(val).html() + "</select>");
        });
        $('span').each(function (index, val) {
          $(val).replaceWith("<label>" + $(val).html() + "</label>");
        });
        //END:TRANSFORM PART

        $(this_.html).find(".selected").removeClass("selected");
        settings.content.value = $(this_.html).html();
        this_.setSettings(settings);
        this_.trigger("change");
      });
    }
  });

  $(this_.html).find("span").click(function (e) {
    $(this_.html).find(".selected").removeClass("selected");
    $(e.target).addClass("selected");
  });
});