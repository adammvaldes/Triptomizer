package com.tripco.t13.server;

import java.util.ArrayList;

public class ShortOptimization {

//    private String units;
//    private ArrayList<Location> places;

//        this.units = units;
//        this.places = places;

    static ArrayList<Location> travelingSalesman(Location currentOrigin, ArrayList<Location> places, String units) {
        boolean[] visitedPlaces = new boolean[places.size()];
        boolean allPlacesVisited = false;
        ArrayList<Location> sortedPlaces = new ArrayList<>();

        sortedPlaces.add(currentOrigin);
        visitedPlaces[places.indexOf(currentOrigin)] = true;
        while (!allPlacesVisited) {
            currentOrigin = calculateDistances(currentOrigin, visitedPlaces, places, units);
            visitedPlaces[places.indexOf(currentOrigin)] = true;
            sortedPlaces.add(currentOrigin);
            for (boolean visitedPlace : visitedPlaces) {
                if (!visitedPlace) {
                    allPlacesVisited = false;
                    break;
                }

                allPlacesVisited = true;
            }
        }

        //sortedPlaces.add(origin); //add origin to complete the trip
        return sortedPlaces;
    }

    /*This method calculates the shortest distance between the starting origin, and all the other places
    this method has been given.
    */
    public static Location calculateDistances(Location origin, boolean[] visitedPlaces, ArrayList<Location> places, String units) {
        Distance distance = new Distance();

        int shortestDistance = Integer.MAX_VALUE;
        Location closestPlace = null;

        for (int place = 0; place < places.size(); place++) {
            if (!places.get(place).equals(origin) && !visitedPlaces[place]) {
                int tempDistance = Distance.getDistanceNum(origin.latitude, origin.longitude, places.get(place).latitude,
                        places.get(place).longitude, distance.getRadius(units));
                if (tempDistance <= shortestDistance) {
                    shortestDistance = tempDistance;
                    closestPlace = places.get(place);
                }
            }
        }
        return closestPlace;
    }
}
