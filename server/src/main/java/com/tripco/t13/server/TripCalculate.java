package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t13.planner.Place;
import spark.Request;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;
import java.util.concurrent.Callable;

public class TripCalculate implements Callable<int []> {

    public Trip trip;
    private boolean isCorrectFormat; //verify correct format of POST request
    int shortestCumulativeDistance = 0;
    long[][] distanceLibrary;
    Integer place = null;
    int[] chunk;
    int[] pointerPlaces;
    int[] tempPointerPlaces;


    public TripCalculate(int[] chunk, Trip trip, int shortestCumulativeDistance, long[][] distanceLibrary) {
        this.trip = new Trip(trip);
        this.place = place;
        this.shortestCumulativeDistance = shortestCumulativeDistance;
        this.distanceLibrary = distanceLibrary;
        this.chunk = chunk;
    }

    public TripCalculate(Trip trip) {
        this.trip = trip;
        isCorrectFormat = false;
        isCorrectFormat = validateTripRequestFormat(trip);
    }

    int [] shortOptimization(int[] chunk) {

        // the  + 1 is responsible for containing the round trip element.
        pointerPlaces = new int[trip.places.size() + 1];
        tempPointerPlaces = new int[trip.places.size() + 1];
        //Initially we have pointers all in the same order as the places array.
        for (int i = 0; i < trip.places.size(); i++) {
            pointerPlaces[i] = i;
            tempPointerPlaces[i] = i;
        }

        long lStartTime = System.nanoTime();

        for(int place = chunk[0]; place <= chunk[1]; place++){
            pointerPlaces = ShortOptimization.travelingSalesman(place, trip.places, distanceLibrary);

            int tempCumulativeDistance = 0;

            if (trip.options.optimization.equals("shorter")) {
                twoOpt(trip.places, distanceLibrary, pointerPlaces);
            }

            for(int i = 0; i < trip.places.size(); i++) {
                tempCumulativeDistance += distanceLibrary[pointerPlaces[i]][pointerPlaces[i+1]];
            }

            tempCumulativeDistance += distanceLibrary[pointerPlaces[trip.places.size()]][pointerPlaces[0]]; //Round Trip

            if (tempCumulativeDistance < shortestCumulativeDistance) {
                shortestCumulativeDistance = tempCumulativeDistance;
                tempPointerPlaces = pointerPlaces;
            }
        }
        System.out.println("Elapsed time for inside in milliseconds: " + (System.nanoTime() - lStartTime) / 1000000 + " from chunk [" + chunk[0] + "][" + chunk[1] + "]");
        tempPointerPlaces[pointerPlaces.length - 1] = shortestCumulativeDistance;
        return tempPointerPlaces;
    }

    public void twoOpt(ArrayList<Location> places, long[][] distanceLibrary, int[] pPlaces) {
        boolean improvement = true;
        while (improvement) {
            improvement = false;
            if (places.size() > 4) {
                for (int i = 0; i <= places.size() - 3; i++) {
                    for (int k = i + 2; k <= places.size() - 1; k++) {
                        double delta = -(distanceLibrary[pPlaces[i]][pPlaces[i+1]])
                                       -(distanceLibrary[pPlaces[k]][pPlaces[k+1]])
                                       +(distanceLibrary[pPlaces[i]][pPlaces[k]])
                                       +(distanceLibrary[pPlaces[i+1]][pPlaces[k+1]]);
                        if (delta < 0) {
                            twoOptReverse(pPlaces, i+1, k);
                            improvement = true;
                        }
                    }
                }
            }
        }
    }

    public int[] twoOptReverse(int[] pPlaces, int i1, int k) {
        while (i1 < k) {
            //Reverse locations in location array
            int temp = pPlaces[i1];
            pPlaces[i1] = pPlaces[k];
            pPlaces[k] = temp;

            i1++; k--;
        }
        return pPlaces;
    }

    public void setMap(String filepath){
        BufferedReader read;
        try {
            read = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream(filepath)));
        }
        catch(Exception e){
            return;
        }

        String temp = "";
        String answer = "";
        try {
            while((temp = read.readLine()) != null){
                if (temp.equals("</svg>")) {
                    answer += drawVectorWorld(trip);
                }
                answer += temp;
            }
            trip.map = answer;
        }
        catch(Exception e){
            return;
        }
    }

    public String drawVectorWorld(Trip trip) {
        String vectors = "";
        double mapW = 1024.0, mapH = 512.0, mapLat = 180.0, mapLon = 360.0,
                pixPerLat = mapH / mapLat, pixPerLon = mapW / mapLon;

        for (int i = 0; i < trip.places.size(); i++) {

            double place1Lon = trip.places.get(i).longitude, place1Lat = trip.places.get(i).latitude;

            //if we ran out of places to go, we round the trip up from last place to origin...
            if ((i + 1) == trip.places.size()) {
                double originLon = trip.places.get(0).longitude, originLat = trip.places.get(0).latitude;
                vectors += "<line x1=\"" + (-(-(mapLon/2) - place1Lon) * pixPerLon) +
                        "\" y1=\"" + (((mapLat/2) - place1Lat) * pixPerLat) +
                        "\" x2=\"" + (-(-(mapLon/2) - originLon) * pixPerLon) +
                        "\" y2=\"" + (((mapLat/2) - originLat) * pixPerLat) +
                        "\" style=\"stroke:rgb(255,0,0);stroke-width:2\" />";
                break; //break to not get index out of bounds exception
            } else { //else get data for the second place just like the first.
                double place2Lon = trip.places.get(i + 1).longitude, place2Lat = trip.places.get(i + 1).latitude;
                //draw vector from place 1 to place 2...
                vectors += "<line x1=\"" + (-(-(mapLon/2) - place1Lon) * pixPerLon) +
                        "\" y1=\"" + (((mapLat/2) - place1Lat) * pixPerLat) +
                        "\" x2=\"" + (-(-(mapLon/2) - place2Lon) * pixPerLon) +
                        "\" y2=\"" + (((mapLat/2) - place2Lat) * pixPerLat) +
                        "\" style=\"stroke:rgb(255,0,0);stroke-width:2\" />";
            }
        }
        //Hardcode test
        return vectors;
    }

    public String drawVectorCO(Trip trip) {
        //TODO
        String vectors = "";
        double mapW = 1066.6073, mapH = 783.0824, mapLat = 41.0007, mapLon = -109.0500, buffer = 36, lonRatio = 30.595
                , latRatio = 23.0069, pixPerLat = 177.4202, pixPerLon = 142.02183;

        for (int i = 0; i < trip.places.size(); i++) {

            double trip1Lon = trip.places.get(i).longitude, trip1Lat = trip.places.get(i).latitude;

            //if we ran out of places to go, we round the trip up from last place to origin...
            if ((i + 1) == trip.places.size()) {
                vectors += "<line x1=\"" + ((trip1Lon - mapLon) * pixPerLon + buffer) +
                        "\" y1=\"" + ((trip1Lat - mapLat) * -pixPerLat + buffer) +
                        "\" x2=\"" + ((trip.places.get(0).longitude - mapLon) * pixPerLon + buffer) +
                        "\" y2=\"" + ((trip.places.get(0).latitude - mapLat) * -pixPerLat + buffer) +
                        "\" style=\"stroke:rgb(255,0,0);stroke-width:2\" />";
                break; //break to not get index out of bounds exception
            } else { //else get data for the second place just like the first.
                double trip2Lon = trip.places.get(i + 1).longitude, trip2Lat = trip.places.get(i + 1).latitude;
                //draw vector from place 1 to place 2...
                vectors += "<line x1=\"" + ((trip1Lon - mapLon) * pixPerLon + buffer) +
                        "\" y1=\"" + ((trip1Lat - mapLat) * -pixPerLat + buffer) +
                        "\" x2=\"" + ((trip2Lon - mapLon) * pixPerLon + buffer) +
                        "\" y2=\"" + ((trip2Lat - mapLat) * -pixPerLat + buffer) +
                        "\" style=\"stroke:rgb(255,0,0);stroke-width:2\" />";
            }
        }
        return vectors;
    }

    public boolean validateTripRequestFormat(Trip trip) {
        //check if format of request if correct: type:"trip", version 1 or 2 or 3 or 4
        if(     Objects.equals(trip.type, "trip")&&
                (trip.version<=4)&&
                trip.places!=null&&trip.options!=null){
            return true;
        }

        return false;
    }

    public String getTripJson () {
        Gson gson = new Gson();
        if(isCorrectFormat){
            return gson.toJson(trip);
        }
        else{
            return "{}"; //return {} if incorrect request format
        }
    }


    @Override
    public int[] call() throws Exception {
        return shortOptimization(chunk);
    }
}