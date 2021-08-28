import EventMachine from './EventMachine'
import { generateGUID } from './utils/helpers'

class Widget extends EventMachine {
  modeSrc = { edit: '/js/editMode.js', behaviour: '/js/behaviour.js' }
  modeTemplate = { edit: '/editTemplate.template', behaviour: '/template.template' }
  settingsSrc = '/settings.json'

  /**
   * Gets configs base on specified URL and config type
   *
   * @param {String} url URL to load configs
   * @param {String} type Configs type
   */
  fetchResource(url, type) {
    return this.urlData_[url]
      ? Promise.resolve(this.urlData_[url])
      : fetch(url)
          .then((response) => (type === 'json' ? response.json() : response.text()))
          .then((data) => {
            this.urlData_[url] = data
            return data
          })
  }

  /**
   * Activates mode either Behaviour or Edit
   * Activation means redrawing element and applying to it specified mode
   *
   * Mode will apply className to HTML: Edit mode - "edit" and Behaviour mode - "behaviour"
   * We can use this className to apply specific styles to element, so it can differs from mode to mode
   *
   * @param {Function} modeFun activation mode function
   */
  activateMode = (mode) => {
    this.trigger('beforeModeChanged', [this.mode, mode])
    return Promise.all([
      this.fetchResource(this.src + this.modeTemplate[mode], 'text'),
      this.fetchResource(`${this.src}${this.settingsSrc}`, 'json').then((settings) => {
        if (!this.settings) {
          this.settings = settings
        }
        return this.settings
      }),
    ])
      .then(([template, settings]) => $.tmpl(template, settings))
      .then((html) => {
        this.html = html

        this.trigger('modeChanged', [this.mode, mode]) // trigger mode change event (fromMode -> toMode)
        this.mode = mode // set active mode
        return html
      })
  }

  urlData_ = {}

  constructor(rootConfig, id) {
    super()

    this.id = id || generateGUID()
    this.html = null

    this.rootConfig = rootConfig
    for (var tmp in rootConfig) {
      this[tmp] = rootConfig[tmp]
    }
  }
}

export default Widget
