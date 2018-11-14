package com.tripco.t13.server;

import java.util.ArrayList;
import java.util.Collections;

public class ShortOptimization {

    //Performs shortest trip calculation based on what place of origin has been received.
    static int[] travelingSalesman(int currentOrigin, ArrayList<Location> places, int[][] distancesLibrary, int[] pointerPlaces) {
        boolean[] visitedPlaces = new boolean[places.size()];
        boolean allPlacesVisited = false;

        Location[] placesArr = new Location[places.size() + 1];
        placesArr = places.toArray(placesArr);

        int counter = 0;
        pointerPlaces[counter] = currentOrigin;
        counter++;

        visitedPlaces[currentOrigin] = true;

        while (!allPlacesVisited) {
            currentOrigin = calculateDistances(currentOrigin, visitedPlaces, distancesLibrary);
            visitedPlaces[currentOrigin] = true;
            pointerPlaces[counter] = currentOrigin;
            counter++;

            for (boolean visitedPlace : visitedPlaces) {

                if (!visitedPlace) {
                    allPlacesVisited = false;
                    break;
                }

                allPlacesVisited = true;
            }
        }


        return pointerPlaces;
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
