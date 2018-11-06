package com.tripco.t13.server;

import java.util.ArrayList;
import java.util.Collections;

public class ShortOptimization {

    //Performs shortest trip calculation based on what place of origin has been received.
    static ArrayList<Location> travelingSalesman(int currentOrigin, ArrayList<Location> places, int[][] distancesLibrary) {
        boolean[] visitedPlaces = new boolean[places.size()];
        boolean allPlacesVisited = false;

        ArrayList<Location> sortedPlaces = new ArrayList<>(places.size() + 1);
        Location[] placesArr = new Location[places.size() + 1];
        placesArr = places.toArray(placesArr);

        sortedPlaces.add(placesArr[currentOrigin]);
        visitedPlaces[currentOrigin] = true;

        while (!allPlacesVisited) {
            currentOrigin = calculateDistances(currentOrigin, visitedPlaces, distancesLibrary);
            visitedPlaces[currentOrigin] = true;
            sortedPlaces.add(placesArr[currentOrigin]);

            for (boolean visitedPlace : visitedPlaces) {

                if (!visitedPlace) {
                    allPlacesVisited = false;
                    break;
                }

                allPlacesVisited = true;
            }
        }

        sortedPlaces.add(sortedPlaces.get(0)); //Make it a round trip.
        return sortedPlaces;
    }

    /*This method calculates the shortest distance between the starting origin, and all the other places
    this method has been given.
    */
    static Integer calculateDistances(int origin, boolean[] visitedPlaces, int[][] distancesLibrary) {
        int shortestDistance = Integer.MAX_VALUE;
        Integer closestPlace = null;

        for (int place = 0; place < visitedPlaces.length; place++) {

            if (place != origin && !visitedPlaces[place]) {

                int tempDistance = distancesLibrary[origin][place];

                if (tempDistance < shortestDistance) {
                    shortestDistance = tempDistance;
                    closestPlace = place;
                }
            }
        }

        return closestPlace;
    }
}
