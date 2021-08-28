const EventMachine = function () {
  var events = {},
    eventsOne = {}

  this.bind = function (ev, fn) {
    ev = ev.toLocaleLowerCase()
    ev = ev.indexOf('on') !== 0 ? 'on' + ev : ev
    events[ev] ? events[ev].push(fn) : (events[ev] = [fn])
    return this
  }

  this.one = function (ev, fn) {
    //TODO: rewrite to unbind;
    ev = ev.toLocaleLowerCase()
    ev = ev.indexOf('on') !== 0 ? 'on' + ev : ev
    eventsOne[ev] ? eventsOne[ev].push(fn) : (eventsOne[ev] = []).push(fn)
    return this
  }

  this.trigger = function (ev, arg) {
    var i
    ev = ev.toLocaleLowerCase()
    ev = ev.indexOf('on') !== 0 ? 'on' + ev : ev
    for (i = 0; events[ev] && i < events[ev].length; i += 1) {
      events[ev][i].apply(this, arg)
    }
    for (i = 0; eventsOne[ev] && i < eventsOne[ev].length; i += 1) {
      eventsOne[ev][i].apply(this, arg)
    }
    delete eventsOne[ev]

    return this
  }

  this.unbind = function (ev, fn) {
    var i
    ev = ev.toLocaleLowerCase()
    ev = ev.indexOf('on') !== 0 ? 'on' + ev : ev
    if (events[ev]) {
      for (i = 0; i < events[ev].length; i += 1) {
        if (events[ev][i].toString() === fn.toString()) {
          events[ev].splice(i, 1)
          break
        }
      }
    }

    if (eventsOne[ev]) {
      for (i = 0; i < eventsOne[ev].length; i += 1) {
        if (eventsOne[ev][i].toString() === fn.toString()) {
          eventsOne[ev].splice(i, 1)
          break
        }
      }
    }
    return this
  }
}

export default EventMachine
