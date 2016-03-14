package fr.milky.cordova.smartbeacon;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;
import java.util.List;

import eu.smartbeacon.sdk.core.SBBeacon;

/**
 * Created by matthieu on 14/03/2016.
 */
public class Jsonifier {
    static Object fromSBBeacon(SBBeacon beacon) throws JSONException {
        if (beacon == null) return JSONObject.NULL;
        JSONObject object = new JSONObject();
        object.put("uuid", beacon.getProximityUuid());
        object.put("major", beacon.getMajor());
        object.put("minor", beacon.getMinor());
        object.put("rssi", beacon.getRssi());
        object.put("txPower", beacon.getTxPower());
        return object;
    }

    static JSONArray fromSBBeaconList(List<SBBeacon> list) {
        Iterator<SBBeacon> it = list.iterator();
        JSONArray out = new JSONArray();
        while (it.hasNext()) {
            try {
                out.put(Jsonifier.fromSBBeacon(it.next()));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return out;
    }
}
