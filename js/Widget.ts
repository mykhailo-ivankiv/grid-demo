import EventMachine from './EventMachine'
import { generateGUID } from './utils/helpers'

class Widget extends EventMachine {
  modeSrc = { edit: '/js/editMode.js', behaviour: '/js/behaviour.js' }
  modeTemplate = { edit: '/editTemplate.template', behaviour: '/template.template' }
  settingsSrc = '/settings.json'

  constructor(rootConfig, id) {
    super()

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
      if (urlData_[url]) {
        return Promise.resolve(urlData_[url])
      } else {
        return fetch(url)
          .then((response) => {
            if (type === 'json') return response.json()
            return response.text()
          })
          .then((data) => {
            urlData_[url] = data
            return data
          })
      }
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
    this.getHTML = () => this_.activateMode('behaviour')

    /**
     * Sets HTML to specific widget
     *
     * @param {String} data HTML data which must be applied to widget
     */
    this.setHTML = (data) => {
      return setter_(data).pipe(function (data) {
        this_.html = data
        return this_.html
      })
    }

    var getModeHTML_ = (mode) => {
      return Promise.all([
        getter_(this.src + this_.modeTemplate[mode], 'text'),
        getter_(`${this.src}${this.settingsSrc}`, 'json').then((settings) => {
          if (!this.settings) {
            this.settings = settings
          }
          return this.settings
        }),
      ]).then(([template, settings]) => $.tmpl(template, settings))
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
      return getModeHTML_(mode).then((html) => {
        this.html = html

        this_.trigger('modeChanged', [this.mode, mode]) // trigger mode change event (fromMode -> toMode)
        this.mode = mode // set active mode
        return html
      })
    }

    /**
     * Initialization.
     * Applies settings passed during object creation
     */
    function init_() {
      this_.rootConfig = rootConfig
      for (var tmp in rootConfig) {
        this_[tmp] = rootConfig[tmp]
      }
    }

    init_()
  }
}

export default Widget
