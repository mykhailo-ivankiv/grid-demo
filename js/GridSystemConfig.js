/**
 * Config file for {@link EditableArea}
 * @author Mykhailo Ivankiv [neformal.lviv@gmail.com]
 */

define(function () {
  "use strict";
  return {

    cellTemplate : "<div class='ui-widget-header'>${name}</div>",
//    themeDescriptor:
    wClassSelector    : ".widget", //Widget container class
    rClassSelector : ".row",    //Row class selector
    cClassSelector : ".cell",   //Cell container class
    wCl : "widget",
    rCl : "row",
    cCl : "cell",

    wMinWidth: 2 //Number of column
  };
});