package com.tripco.t13.server;

import com.tripco.t13.server.Distance;
import com.tripco.t13.server.Location;

import java.util.ArrayList;
import java.util.concurrent.Callable;

public class ThreadedDistanceLibrary implements Callable<Long[][]> {
    long threadID = 0;
    int threadNum = 0;
    ArrayList<Location> places;
    double radius = 0;

    ThreadedDistanceLibrary(int threadNum, long threadID, ArrayList<Location> places, double radius) {
        this.threadNum = threadNum;
        this.threadID = threadID;
        this.places = places;
        this.radius = radius;
    }

    public Long[][] calculateDistanceLibrary(long start, long end) {
        Long[][] distanceLibrary = new Long[places.size() + 1][places.size() + 1];
        for (int i = (int)start; i < end; i++) {
            for (int k = 0; k < places.size(); k++) {
                distanceLibrary[i][k] = Distance.getDistanceNum(places, i, k, radius);
            }
            distanceLibrary[i][places.size()] = distanceLibrary[i][0]; //Round calculation.
        }

        return distanceLibrary;
    }

    @Override
    public Long[][] call() throws Exception {
        long start = ((places.size() / threadNum) * threadID) + Math.min(places.size() % threadNum, threadID);
        long end = start + (places.size() / threadNum) + ((places.size() % threadNum - 1 >= threadID) ? 1 : 0);
        return calculateDistanceLibrary(start, end);
    }
}
