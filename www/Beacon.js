function Beacon(beaconObject) {
  beaconObject = beaconObject || {};
  this.uuid = beaconObject.uuid || '';
  this.major = Number(beaconObject.major) || 0;
  this.minor = Number(beaconObject.minor) || 0;
  this.rssi  = Number(beaconObject.rssi || 0);
  this.txPower  = Number(beaconObject.txPower || 0);
}

Beacon.prototype = Object.create(Object.prototype, {
  equals: {
    enumerable: false, writable: false, configurable: false,
    value: function equals(beacon) {
      if (beacon === null || typeof beacon === 'undefined') return false;
      if (beacon === this) return true;
      return beacon.uuid == beaconObject.uuid && beacon.major == beaconObject.major && beacon.minor == beaconObject.minor;
    }
  },
  toJSON: {
    enumerable: false, writable: false, configurable: false,
    value: function toJSON() {
      return JSON.stringify(this);
    }
  },
  toString: {
    enumerable: false, writable: false, configurable: false,
    value: function toString() {
      return 'Beacon(' + [ this.uuid, this.major, this.minor ].join(', ') + ')';
    }
  }
});

module.exports = Beacon;