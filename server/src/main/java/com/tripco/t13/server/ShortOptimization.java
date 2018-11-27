package com.tripco.t13.server;

import java.util.ArrayList;

public class ShortOptimization {

    //Performs shortest trip calculation based on what place of origin has been received.
    static int[] travelingSalesman(int currentOrigin, ArrayList<Location> places, int[][] distancesLibrary) {
        boolean[] visitedPlaces = new boolean[places.size()];
        boolean allPlacesVisited = false;

        int counter = 0;
        int[] tempPointerPlaces = new int[places.size() + 1];
        tempPointerPlaces[counter] = currentOrigin;
        visitedPlaces[currentOrigin] = true;
        counter++;

        while (!allPlacesVisited) {
            currentOrigin = calculateDistances(currentOrigin, visitedPlaces, distancesLibrary);
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
        tempPointerPlaces[places.size()] = tempPointerPlaces[0];        //Make the trip round.
        return tempPointerPlaces;
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