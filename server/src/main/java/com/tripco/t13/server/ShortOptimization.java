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
        int[] tempPointerPlaces = new int[places.size() + 1];
        tempPointerPlaces[counter] = pointerPlaces[currentOrigin];
        counter++;

        visitedPlaces[pointerPlaces[currentOrigin]] = true;

        while (!allPlacesVisited) {
            currentOrigin = calculateDistances(currentOrigin, visitedPlaces, distancesLibrary, pointerPlaces);
            visitedPlaces[currentOrigin] = true;
            tempPointerPlaces[counter] = currentOrigin;
            counter++;

            for (boolean visitedPlace : visitedPlaces) {

                if (!visitedPlace) {
                    allPlacesVisited = false;
                    break;
                }

                allPlacesVisited = true;
            }
        }

        tempPointerPlaces[places.size()] = tempPointerPlaces[0];
        return tempPointerPlaces;
    }

    /*This method calculates the shortest distance between the starting origin, and all the other places
    this method has been given.
    */
    static Integer calculateDistances(int origin, boolean[] visitedPlaces, int[][] distancesLibrary, int[] pPlaces) {
        int shortestDistance = Integer.MAX_VALUE;
        Integer closestPlace = null;

        if (origin == 68) {
            System.out.println();
        }
        for (int place = 0; place < visitedPlaces.length; place++) {

            if (pPlaces[place] != pPlaces[origin] && !visitedPlaces[pPlaces[place]]) {

                int tempDistance = distancesLibrary[pPlaces[origin]][pPlaces[place]];

                if (tempDistance < shortestDistance) {
                    shortestDistance = tempDistance;
                    closestPlace = pPlaces[place];
                }
            }
        }
        if (closestPlace == null) {
            System.out.println();
        }
        return closestPlace;
    }
}
