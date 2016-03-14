var execute = cordova.require('cordova/exec');
var Beacon = cordova.require('fr.milky.cordova.smartbeacon.Beacon');

function BeaconManager() {}

BeaconManager.prototype = Object.create(Object.prototype, {
  startMonitoring: {
    writable: false, configurable: false, enumerable: false,
    value: function startMonitoring() {
      return new Promise(function (resolve, reject) {
        execute(resolve, reject, "BeaconManager", "startMonitoring", []);
      });
    }
  },
  stopMonitoring: {
    writable: false, configurable: false, enumerable: false,
    value: function stopMonitoring() {
      return new Promise(function (resolve, reject) {
        execute(resolve, reject, "BeaconManager", "stopMonitoring", []);
      });
    }
  },
  getDetectedBeacons: {
    writable: false, configurable: false, enumerable: false,
    value: function getDetectedBeacons() {
      return new Promise(function (resolve, reject) {
        function onSuccess(beacons) {
          resolve(beacons.map(function (item) { return new Beacon(item); }));
        }
        execute(onSuccess, reject, "BeaconManager", "getDetectedBeacons", []);
      });
    }
  }
});
module.exports = BeaconManager;
