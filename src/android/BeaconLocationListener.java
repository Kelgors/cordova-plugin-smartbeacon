package fr.milky.cordova.smartbeacon;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import eu.smartbeacon.sdk.core.SBBeacon;
import eu.smartbeacon.sdk.core.SBLocationManagerListener;

/**
 * Created by matthieu on 14/03/2016.
 */
public class BeaconLocationListener implements SBLocationManagerListener {

    private ArrayList<SBBeacon> beacons = new ArrayList<SBBeacon>();

    public ArrayList<SBBeacon> getDetectedBeacons() {
        return beacons;
    }

    public void clear() {
        beacons.clear();
    }

    @Override
    public void onEnteredBeacons(List<SBBeacon> list) {
        Iterator<SBBeacon> it = list.iterator();
        while (it.hasNext()) {
            SBBeacon beacon = it.next();
            int index = beacons.indexOf(beacon);
            if (index > -1) beacons.set(index, beacon);
            else beacons.add(beacon);
        }
    }

    @Override
    public void onExitedBeacons(List<SBBeacon> list) {
        beacons.removeAll(list);
    }

    @Override
    public void onDiscoveredBeacons(List<SBBeacon> list) {
        Iterator<SBBeacon> it = list.iterator();
        while (it.hasNext()) {
            SBBeacon beacon = it.next();
            int index = beacons.indexOf(beacon);
            if (index > -1) beacons.set(index, beacon);
            else beacons.add(beacon);
        }
    }

    @Override
    public void onUpdatedProximity(SBBeacon sbBeacon, SBBeacon.Proximity proximity, SBBeacon.Proximity proximity1) {
        int index = beacons.indexOf(sbBeacon);
        if (index != -1) {
            beacons.set(index, sbBeacon);
        }
    }
}
