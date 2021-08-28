class EventMachine {
  events = {}
  eventsOne = {}

  bind(ev, fn) {
    ev = ev.toLocaleLowerCase()
    ev = ev.indexOf('on') !== 0 ? 'on' + ev : ev
    this.events[ev] ? this.events[ev].push(fn) : (this.events[ev] = [fn])
    return this
  }

  unbind(ev, fn) {
    var i
    ev = ev.toLocaleLowerCase()
    ev = ev.indexOf('on') !== 0 ? 'on' + ev : ev
    if (this.events[ev]) {
      for (i = 0; i < this.events[ev].length; i += 1) {
        if (this.events[ev][i].toString() === fn.toString()) {
          this.events[ev].splice(i, 1)
          break
        }
      }
    }

    if (this.eventsOne[ev]) {
      for (i = 0; i < this.eventsOne[ev].length; i += 1) {
        if (this.eventsOne[ev][i].toString() === fn.toString()) {
          this.eventsOne[ev].splice(i, 1)
          break
        }
      }
    }
    return this
  }

  one(ev, fn) {
    //TODO: rewrite to unbind;
    ev = ev.toLocaleLowerCase()
    ev = ev.indexOf('on') !== 0 ? 'on' + ev : ev
    this.eventsOne[ev] ? this.eventsOne[ev].push(fn) : (this.eventsOne[ev] = []).push(fn)
    return this
  }

  trigger(ev, arg) {
    ev = ev.toLocaleLowerCase()
    ev = ev.indexOf('on') !== 0 ? 'on' + ev : ev
    for (let i = 0; this.events[ev] && i < this.events[ev].length; i += 1) {
      this.events[ev][i].apply(this, arg)
    }
    for (let i = 0; this.eventsOne[ev] && i < this.eventsOne[ev].length; i += 1) {
      this.eventsOne[ev][i].apply(this, arg)
    }
    delete this.eventsOne[ev]

    return this
  }
}

export default EventMachine
