import EventMachine from './EventMachine.js'
import { generateGUID } from './utils/helpers.js'

window.behaviour = (modules, fn) => {
  fn.modules = modules
  window.behaviourData = fn
}

window.editMode = (modules, fn) => {
  fn.modules = modules
  window.behaviourData = fn
}

var Widget = function (rootConfig, id) {
  EventMachine.apply(this)

  /**
   * Define widget instance
   */
  var this_ = this

  /**
   * URLs hash
   */
  var urlData_ = {}

  /**
   * Widget unique ID
   */
  this.id = id || generateGUID()

  /**
   * Widget init settings
   */
  this.initObj = rootConfig //TODO: Use "rootConfig" properties, not "initObj". Now it little bit difficult to remowe this properties, but in future do not forget to do this. {Mykhailo}

  /**
   * Widget root settings
   */
  this.rootConfig = rootConfig

  /**
   * Widget HTML
   */
  this.html = null

  /**
   * Settings that must be merged with original widget settings. They are set when widget changes its category.
   */
  this.mergeSettings = undefined

  /**
   * Gets configs base on specified URL and config type
   *
   * @param {String} url URL to load configs
   * @param {String} type Configs type
   */
  function getter_(url, type) {
    var dfd = $.Deferred()
    if (urlData_[url]) {
      dfd.resolve(urlData_[url])
    } else {
      fetch(url)
        .then((response) => {
          if (type === 'json') return response.json()
          return response.text()
        })
        .then((data) => {
          urlData_[url] = data
          dfd.resolve(data)
        })
        .catch(() => {
          console.log(arguments)
          dfd.reject(arguments)
        })
    }
    return dfd
  }

  /**
   * Resolves Deffered object with specified data
   *
   * @param {Object} data Config data
   */
  function setter_(data) {
    var dfd = $.Deferred()
    dfd.resolve(data)
    return dfd
  }

  /**
   * Clones widget into the new object
   */
  this.clone = function () {
    //TODO: check uses
    var newObj = function () {
      var this_ = this
    }
    newObj.prototype = this_
    newObj = new newObj()
    return newObj
  }

  /**
   * Gets widget settings. Uses for this widget property "settingsSrc"
   */
  this.getSettings = function () {
    return getter_(this_.src + this.settingsSrc, 'json').pipe(function (settings) {
      if (!this_.settings) {
        this_.settings = settings
      } //TODO: For what it?
      return this_.settings
    })
  }

  /**
   * Sets widget settings
   *
   * @param {Object}  obj Settings which must be applied to widget
   */
  this.setSettings = function (obj) {
    return setter_(obj).pipe(function (data) {
      this_.settings = data
      this_.trigger('change')
    })
  }

  /**
   * Gets generated HTML for specific widget
   *
   * @return {String} widget's HTML
   */
  this.getHTML = function () {
    console.log(this_.mode)
    return this_.activateMode('behaviour') //TODO: Fix it (do not swich too ather mode) {Mykhailo, Khrystya}
  }

  /**
   * Sets HTML to specific widget
   *
   * @param {String} data HTML data which must be applied to widget
   */
  this.setHTML = function (data) {
    return setter_(data).pipe(function (data) {
      this_.html = data
      return this_.html
    })
  }

  /**
   * Previews widget mode specified by "mode" parameter and settings
   *
   * @param {String} mode Mode name
   * @param {Object} settings Widget settings that must be applied in preview mode
   */
  this.previewMode = function (mode, settings) {
    return $.when(getModeTemplate_(mode), getModeBehaviour_(mode)).pipe(function (template, modeFun) {
      settings = settings || this_.settings
      var html = $.tmpl(template, settings)
      this_.html = html
      execMode_(modeFun, modeFun.modules)
      this_.mode = mode // set active mode
      return html
    })
  }

  /**
   * Loads specified mode
   *
   * @param {String} mode Mode name
   */
  var loadMode_ = function (mode) {
    return $.when(getModeHTML_(mode), getModeBehaviour_(mode))
  }

  var getModeHTML_ = function (mode) {
    return $.when(getModeTemplate_(mode), this_.getSettings()).pipe(function (template, settings) {
      var html = $.tmpl(template, settings)
      return html
    })
  }

  /**
   * Loads specified mode tempalte
   *
   * @param {String} mode Mode name
   */
  var getModeTemplate_ = function (mode) {
    return getter_(this_.src + this_.modeTemplate[mode], 'text')
  }

  var getModeBehaviour_ = function (mode) {
    var dfd = $.Deferred()
    getModeScript_(mode).done(function (modeFun) {
      getModeModules_(modeFun.modules).done(function (modules) {
        modeFun.modules = modules
        dfd.resolve(modeFun)
      })
    })
    return dfd
  }

  /**
   * Loads specified mode script
   *
   * Script is responsible for mode behaviour. It means that widget can behave in a different way according to active mode
   *
   * @param {String} mode Mode name
   */
  const getModeScript_ = (mode) => {
    var dfd = $.Deferred()
    var behaviour = function () {}

    $.ajax(this_.src + this_.modeSrc[mode], { dataType: 'script', cache: true })
      .success(function () {
        behaviour = window.behaviourData
        window.behaviourData = undefined
        dfd.resolve(behaviour)
      })
      .error(function () {
        dfd.resolve(behaviour)
      })

    return dfd
  }

  /**
   * Loads modules required by widget.
   *
   * Widget can use special modules. They are mentioned at the very top of widget script.
   *
   * @param {String} modulesSrc Modules home folder
   */
  var getModeModules_ = function (modulesSrc) {
    var dfd = $.Deferred()
    if (modulesSrc) {
      modulesSrc.forEach(function (moduleSrc, index) {
        modulesSrc[index] = 'widgetModules/' + moduleSrc
      })
    }
    require(modulesSrc, function () {
      dfd.resolve([].slice.call(arguments, 0, arguments.length))
    })
    return dfd
  }

  /**
   * Executes mode script
   *
   * Script is responsible for mode behaviour. It means that widget can behave in a different way according to active mode
   *
   * @param {Function} modeFun Mode behaviour function
   * @param {Array} modules Modules required by mode script
   */
  var execMode_ = function (modeFun, modules) {
    modeFun.apply(this_, modules)
  }

  /**
   * Activates mode either Behaviour or Edit
   * Activation means redrawing element and applying to it specified mode
   *
   * Mode will apply className to HTML: Edit mode - "edit" and Behaviour mode - "behaviour"
   * We can use this className to apply specific styles to element, so it can differs from mode to mode
   *
   * @param {Function} modeFun activation mode function
   * @return {Deferred}
   */
  this.activateMode = function (mode) {
    this_.trigger('beforeModeChanged', [this_.mode, mode])
    return loadMode_(mode).done(function (html, modeFun) {
      this_.html = html
      execMode_(modeFun, modeFun.modules)
      this_.trigger('modeChanged', [this_.mode, mode]) // trigger mode change event (fromMode -> toMode)
      this_.mode = mode // set active mode
      return html
    })
  }

  this.changeCategory = function (rootConfig, settings) {
    this_.rootConfig = rootConfig
    for (var tmp in rootConfig) {
      this_[tmp] = rootConfig[tmp]
    }

    this_.settings = undefined

    return this_.getSettings().pipe(function (newSettings) {
      mergeSettings_(settings, newSettings)
      this_.settings = newSettings
      return this_.activateMode('behaviour')
    })
  }

  /**
   * Merges widget settings when widget changes its category
   *
   * @param {Object} oldSettings widget old settings
   * @param {Object} newSettings widget current settings
   */
  function mergeSettings_(oldSettings, newSettings) {
    var item
    for (item in oldSettings) {
      if (oldSettings[item].private) continue
      if (newSettings[item] != undefined) {
        if (newSettings[item].value instanceof Array) {
          mergeArrays(newSettings[item].value, oldSettings[item].value)
        } else $.extend(newSettings[item], oldSettings[item], true)
      }
    }
  }

  /**
   * Initialization.
   * Applies settings passed during object creation
   */
  function init_() {
    this_.rootConfig = rootConfig
    for (var tmp in rootConfig) {
      this_[tmp] = rootConfig[tmp]
    } //TODO: Refactor;
  }

  init_()
}

Widget.prototype = {
  modeSrc: {
    edit: '/js/editMode.js',
    behaviour: '/js/behaviour.js',
  },
  modeTemplate: {
    edit: '/editTemplate.html',
    behaviour: '/template.html',
  },
  settingsSrc: '/settings.json',
}

export default Widget
