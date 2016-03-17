(function () {
  'use strict';
  const Beacon = cordova.require('fr.milky.cordova.smartbeacon.Beacon');
  const Constructor = BeaconList;
  const _super = Array.prototype;

  function BeaconList(array) {
    if (array.__isBeaconList__) return array;
    if (this && this instanceof BeaconList) throw new Error('With this class, you souldnt use the `new` operator (Array inheritance in ES5 does not work)');
    if (array && !Array.isArray(array)) throw new TypeError('Argument must be an array or nothing');
    array = array || [];
    // array will be an other instance now
    const beaconList = array.map(function (beacon) {
      if (!(beacon instanceof Beacon)) return new Beacon(beacon);
      return beacon;
    });
    const propertyNames = Object.getOwnPropertyNames(BeaconList.prototype);
    for (let index = 0; index < propertyNames.length; index++) {
      const key = propertyNames[index];
      if (!BeaconList.prototype.hasOwnProperty(key)) continue;
      Object.defineProperty(beaconList, key, {
        enumerable: false,
        value: BeaconList.prototype[key]
      });
    }
    Object.defineProperty(beaconList, '__isBeaconList__', {
      enumerable: false, writable: false, configurable: false,
      value: true
    });
    return beaconList;
  }

  BeaconList.prototype = Object.create(Object.prototype, {
    add: {
      enumerable: false, writable: false, configurable: false,
      value: function add(beacon) {
        if (!(beacon instanceof Beacon)) beacon = new Beacon(beacon);
        return this.push(beacon);
      }
    },
    remove: {
      enumerable: false, writable: false, configurable: false,
      value: function remove(beacon) {
        return this.splice(this.indexOf(beacon), 1)[0];
      }
    },
    sort: {
      enumerable: false, writable: false, configurable: false,
      value: function sort(iteratee) {
        return Constructor.create(_super.sort.apply(this, arguments));
      }
    },
    concat: {
      enumerable: false, writable: false, configurable: false,
      value: function concat(iterable) {
        return Constructor.create(_super.concat.apply(this, arguments));
      }
    },
    splice: {
      enumerable: false, writable: false, configurable: false,
      value: function splice(startIndex, length, iterable) {
        return Constructor.create(_super.splice.apply(this, arguments));
      }
    },
    map: {
      enumerable: false, writable: false, configurable: false,
      value: function map(iteratee, context) {
        return Constructor.create(_super.map.apply(this, arguments));
      }
    },
    filter: {
      enumerable: false, writable: false, configurable: false,
      value: function filter(iteratee, context) {
        return Constructor.create(_super.filter.apply(this, arguments));
      }
    },
    reject: {
      enumerable: false, writable: false, configurable: false,
      value: function reject(array) {
        const list = Constructor.create(array);
        return this.filter(function filterRejectIteratee(beacon) {
          return !list.includes(beacon);
        });
      }
    },
    indexOf: {
      enumerable: false, writable: false, configurable: false,
      value: function indexOf(beacon) {
        for (let index = 0; index < this.length; index++) {
          if (this[index].equals(beacon)) return index;
        }
        return -1;
      }
    },
    includes: {
      enumerable: false, writable: false, configurable: false,
      value: function includes(beacon) {
        return this.indexOf(beacon) > -1;
      }
    },
    toBeaconList: {
      enumerable: false, writable: false, configurable: false,
      value: function toBeaconList() {
        return Constructor(this.toArray());
      }
    },
    toArray: {
      enumerable: false, writable: false, configurable: false,
      value: function toArray() {
        return this.slice();
      }
    }
  });

  BeaconList.create = function create(array) {
    return Constructor(array);
  };

  module.exports = BeaconList;
})();