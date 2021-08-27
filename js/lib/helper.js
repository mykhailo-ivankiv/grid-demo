function clone(arg) {
  "use strict";
  if (arg instanceof Array) {
    return arg.concat();
  } else if (typeof (arg) === "object") {
    return $.extend(true, {}, arg);
  } else if (typeof (arg) === "string") { return String(arg); }
}

function isPrimitive(value) {
  "use strict";
  var type = typeof (value);
  if (type === "string"  ||
      type === "number"  ||
      type === "boolean" ||
      type === "undefined"
      ) { return true; }
  return false;
}

/**
 * Return object part what contained key with value or false.
 * @param key
 * @param value
 *
 * usage :
 *
 * objSearch ({
 *  zero: [1,2,3],
 *  first: {a:1, b:2},
 *  second: {
 *    deep:{tets1:1}
 *    }},
 *    "tets1", 1)
 */
function objSearch(object, key, value) {
  "use strict";
  if (object !== undefined) {
    if (object[key] && object[key] === value) {
      return object;
    } else if (!isPrimitive(object)) {

      for (var tmp in object){
        var searchResult = objSearch(object[tmp], key, value);
        if (searchResult){ return searchResult;}
      }
    }
  }
  else console.error ("Object is undefined");
  return false;
}

function compareObjects (base, comparable){
  var globalPath = [];
  function dive (base, comparable, path, parentKey){
    var key;
    if (JSON.stringify(base) !== JSON.stringify(comparable) ){
      if (parentKey) { path.push(parentKey);}
      if (isPrimitive(base) || isPrimitive(comparable)) { globalPath.push (path); }
      else {
        for ( key in base ) { dive (base[key], comparable[key], clone(path), key);}
        for ( key in comparable){
          if (!base.hasOwnProperty(key)){ dive (base[key], comparable[key], clone(path), key);}
        }
      }
    }
  };

  dive (base, comparable, []);
  return globalPath;
};

function generateGUID() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function removeElementFromArray(arr, val){
  for(var i=0; i<arr.length; i++) {
      if(arr[i] == val) {
          arr.splice(i, 1);
          return arr;
      }
  }
  return arr;
}

function arrayToObject(array){
  var obj = {};
  for (var i = 0; i < array.length; i++){
    obj[i] = array[i];
  }
  return obj;
}

function concatArrays(array1, array2, omitDuplicates){
  var result = array1.concat(array2);
  omitDuplicates = omitDuplicates || false;

  if (omitDuplicates){
    for (var i = result.length-1; i >= 0; i--){
      var s = result[i];
      var firstIndex = result.indexOf(s);
      var nextIndex = result.indexOf(s,firstIndex+1);

      while (nextIndex != -1) {
          result.splice(nextIndex,1);
          nextIndex = result.indexOf(s,firstIndex+1);
      }
    }
  }

  return result;
}

function mergeArrays(array1, array2){
  var i;
  for (i = 0; i < Math.min(array1.length, array2.length); i++){
    array1[i] = array2[i];
  }

  for (i = array1.length; i < array2.length; i++){
    array1.push(array2[i]);
  }
}

function getObjectLength(obj){
  var counter = 0;
  for(var key in obj) {
    counter++;
  }
  return counter;
}

Array.prototype.sum = function(){
  var counter = 0;
  for (var i = 0 ; i< this.length; i++){
    counter+= parseInt(this[i]);
  }
  return counter;
}

Array.prototype.normalize = function (sumValue, minValue){
  var diff = this.sum() - sumValue,
    i = 0;
  minValue = minValue || 1;

  if (!sumValue || sumValue < this.length ) {
    throw "Error: argument must be much than array length";
    return;
  }

  while ( diff != 0) {
    if (diff < 0) {
      this[i] +=  1;
      diff++;
    }
    if (diff > 0) {
      if (this[i] <= 1) {
        i = (i + 1) % (this.length);
        continue;
      }
      this[i] -=  1;
      diff--;
    }

    i = (i + 1) % (this.length);
  }
  return this;
}

function normalizeArray (array, sumValue, minValue) {   //TODO: Fix duplicate Array.prototype.normalize
  var diff = array.sum() - sumValue,
    i = 0,
    resultArray = clone(array);

  minValue = minValue || 1;

  if ((resultArray.length * minValue) > sumValue) { return false; }

  for (i = 0; i < resultArray.length - 1 ;i++) {
    if (resultArray[i] < minValue) {
      resultArray[i] = minValue;
      diff += resultArray[i] - minValue + 1;
    }
  };

  while ( diff != 0) {
    if (diff < 0) {
      resultArray[i] +=  1;
      diff++;
    }
    if (diff > 0) {
      if (resultArray[i] <= minValue) {
        i = (i + 1) % (resultArray.length);
        continue;
      }
      resultArray[i] -=  1;
      diff -= 1;
    }
    i = (i + 1) % (resultArray.length);
  }
  return resultArray;
}