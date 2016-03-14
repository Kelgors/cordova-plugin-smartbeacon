package fr.milky.cordova.smartbeacon;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import eu.smartbeacon.sdk.core.SBLocationManager;

/**
 * Created by matthieu on 14/03/2016.
 */
public class BeaconManager extends CordovaPlugin {

    private SBLocationManager _manager;
    private BeaconLocationListener _listener;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        _manager = SBLocationManager.getInstance(webView.getContext());
        _manager.addEntireSBRegion();
        _listener = new BeaconLocationListener();
        _manager.addBeaconLocationListener(_listener);
    }

    @Override
    public void onDestroy() {
        if (_manager != null && _listener != null) {
            _manager.removeBeaconLocationListener(_listener);
        }
        _manager = null;
        _listener = null;
        super.onDestroy();
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            if ("startMonitoring".equals(action)) {
                _listener.clear();
                _manager.startMonitoringAllBeaconRegions();
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
                return true;
            } else if ("stopMonitoring".equals(action)) {
                _manager.stopMonitoringAllBeaconRegions();
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
                return true;
            } else if ("getDetectedBeacons".equals(action)) {
                commandGetDetectedBeacons(callbackContext);
                return true;
            }
        } catch (Exception err) {
            JSONObject object = new JSONObject();
            object.put("type", "error");
            object.put("name", err.getClass().getName());
            object.put("message", err.getMessage());
            object.put("action", action);
            object.put("args", args);
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, object));
            return true;
        }
        return false;
    }

    public void commandGetDetectedBeacons(CallbackContext callbackContext) {
        JSONArray arrayOfBeacons = Jsonifier.fromSBBeaconList(_listener.getDetectedBeacons());
        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, arrayOfBeacons));
    }
}
