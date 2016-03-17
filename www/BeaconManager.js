(function () {
  'use strict';
  const execute = cordova.require('cordova/exec');
  const Beacon = cordova.require('fr.milky.cordova.smartbeacon.Beacon');

  function setMonitoringTo(value) {
    Object.defineProperty(this, 'isMonitoring', {
      writable: false, configurable: true,
      value: value
    });
  }

  function BeaconManager() {}

  BeaconManager.prototype = Object.create(Object.prototype, {
    startMonitoring: {
      writable: false, configurable: false, enumerable: false,
      value: function startMonitoring() {
        const _setMonitoringTo = setMonitoringTo.bind(this);
        return new Promise(function (resolve, reject) {
          function onStartMonitoringResolve(d) {
            _setMonitoringTo(true);
            resolve(d);
          }
          function onStartMonitoringReject(d) {
            _setMonitoringTo(false);
            reject(d);
          }
          execute(onStartMonitoringResolve, onStartMonitoringReject, "BeaconManager", "startMonitoring", []);
        });
      }
    },
    stopMonitoring: {
      writable: false, configurable: false, enumerable: false,
      value: function stopMonitoring() {
        const _setMonitoringTo = setMonitoringTo.bind(this);
        return new Promise(function (resolve, reject) {
          function onStopMonitoringResolve(d) {
            _setMonitoringTo(false);
            resolve(d);
          }
          function onStopMonitoringReject(d) {
            _setMonitoringTo(false);
            reject(d);
          }
          execute(onStopMonitoringResolve, onStopMonitoringReject, "BeaconManager", "stopMonitoring", []);
        });
      }
    },
    getDetectedBeacons: {
      writable: false, configurable: false, enumerable: false,
      value: function getDetectedBeacons() {
        return new Promise(function (resolve, reject) {
          function onSuccess(beacons) {
            resolve(BeaconList(beacons));
          }
          execute(onSuccess, reject, "BeaconManager", "getDetectedBeacons", []);
        });
      }
    }
  });
  module.exports = BeaconManager;
})();
