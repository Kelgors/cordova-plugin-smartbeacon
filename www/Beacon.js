function Beacon(beaconObject) {
  beaconObject = beaconObject || {};
  this.uuid = beaconObject.uuid || '';
  this.major = beaconObject.major || 0;
  this.minor = beaconObject.minor || 0;
}


module.exports.Beacon = Beacon;