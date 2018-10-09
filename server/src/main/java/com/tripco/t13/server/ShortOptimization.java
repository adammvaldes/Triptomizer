package com.tripco.t13.server;

import com.tripco.t13.planner.Place;

import java.awt.*;
import java.util.ArrayList;
import java.util.Collections;

public class ShortOptimization {

    private String units;
    private ArrayList<Location> places;

    ShortOptimization(String units, ArrayList<Location> places) {
        this.units = units;
        this.places = places;
    }

    ArrayList<Location> travelingSalesman(ArrayList<Location> places, String units) {
        boolean[] visitedPlaces = new boolean[places.size()];
        boolean allPlacesVisited = false;
        ArrayList<Location> sortedPlaces = new ArrayList<>();

        Location origin = places.get(0);
        sortedPlaces.add(origin);
        visitedPlaces[0] = true;
        while (!allPlacesVisited) {
            Location currentPlace = calculateDistances(origin, places, units);
            visitedPlaces[places.indexOf(currentPlace)] = true;
            sortedPlaces.add(currentPlace);

            for (boolean visitedPlace : visitedPlaces) {
                if (!visitedPlace) {
                    allPlacesVisited = false;
                    break;
                }

                allPlacesVisited = true;
                sortedPlaces.add(origin); //add origin place to round up the trip.
            }
        }

        return sortedPlaces;
    }

    private Location calculateDistances(Location origin, ArrayList<Location> places, String units) {
        Distance distance = new Distance();

        int shortestDistance = Integer.MAX_VALUE;
        Location closestPlace = null;

        for (int place = 0; place < places.size(); place++) {
            if (!places.get(place).equals(origin)) {
                if (Distance.getDistanceNum(origin.latitude, origin.longitude, places.get(place).latitude,places.get(place).longitude, distance.getRadius(units)) <= shortestDistance) {
                    shortestDistance = Distance.getDistanceNum(origin.latitude, origin.longitude,
                    places.get(place).latitude,places.get(place).longitude, distance.getRadius(units));
                    closestPlace = places.get(place);
                }
            }
        }

        return closestPlace;
    }
}
