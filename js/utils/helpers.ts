let clone = (arg) => {
  'use strict'
  if (Array.isArray(arg)) return [...arg]
  if (typeof arg === 'object') return { ...arg }

  return arg
}

export const generateGUID = () => {
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

const mergeArrays = (array1, array2) => {
  var i
  for (i = 0; i < Math.min(array1.length, array2.length); i++) {
    array1[i] = array2[i]
  }

  for (i = array1.length; i < array2.length; i++) {
    array1.push(array2[i])
  }
}

Array.prototype.sum = function () {
  var counter = 0
  for (var i = 0; i < this.length; i++) {
    counter += parseInt(this[i])
  }
  return counter
}

Array.prototype.normalize = function (sumValue, minValue) {
  var diff = this.sum() - sumValue,
    i = 0
  minValue = minValue || 1

  if (!sumValue || sumValue < this.length) {
    throw 'Error: argument must be much than array length'
    return
  }

  while (diff != 0) {
    if (diff < 0) {
      this[i] += 1
      diff++
    }
    if (diff > 0) {
      if (this[i] <= 1) {
        i = (i + 1) % this.length
        continue
      }
      this[i] -= 1
      diff--
    }

    i = (i + 1) % this.length
  }
  return this
}

export const normalizeArray = (array, sumValue, minValue) => {
  //TODO: Fix duplicate Array.prototype.normalize
  var diff = array.sum() - sumValue,
    i = 0,
    resultArray = [...array]

  minValue = minValue || 1

  if (resultArray.length * minValue > sumValue) {
    return false
  }

  for (i = 0; i < resultArray.length - 1; i++) {
    if (resultArray[i] < minValue) {
      resultArray[i] = minValue
      diff += resultArray[i] - minValue + 1
    }
  }

  while (diff != 0) {
    if (diff < 0) {
      resultArray[i] += 1
      diff++
    }
    if (diff > 0) {
      if (resultArray[i] <= minValue) {
        i = (i + 1) % resultArray.length
        continue
      }
      resultArray[i] -= 1
      diff -= 1
    }
    i = (i + 1) % resultArray.length
  }
  return resultArray
}

// New helpers
export const distributeChangeInArray = (array, value) => {
  if (value === 0) return array

  if (value > 0) {
    const edgeIndex = Math.abs(value % array.length)
    const diff = (value - edgeIndex) / array.length

    return array.map((n, index) => n + (index < edgeIndex ? diff + 1 : diff))
  }

  if (value < 0) {
    const edgeIndex = Math.abs(value % array.length)
    const diff = (value + edgeIndex) / array.length

    return array.map((n, index) => n + (index < edgeIndex ? diff - 1 : diff))
  }
}

export const decreaseArrayByValueFromRight = (array, minValue, valueChange) =>
  array.reduceRight(
    ([valueChange, result], n) => {
      if (valueChange === 0) {
        return [valueChange, [n, ...result]]
      }

      if (n <= minValue) {
        return [valueChange, [n, ...result]]
      }

      if (n - valueChange >= minValue) {
        return [0, [n - valueChange, ...result]]
      }

      const diff = n - minValue

      return [valueChange - diff, [n - diff, ...result]]
    },
    [valueChange, []],
  )[1]

export const decreaseArrayByValueFromLeft = (array, minValue, valueChange) =>
  array.reduce(
    ([valueChange, result], n) => {
      if (valueChange === 0) {
        return [valueChange, [...result, n]]
      }

      if (n <= minValue) {
        return [valueChange, [...result, n]]
      }

      if (n - valueChange >= minValue) {
        return [0, [...result, n - valueChange]]
      }

      const diff = n - minValue

      return [valueChange - diff, [...result, n - diff]]
    },
    [valueChange, []],
  )[1]
