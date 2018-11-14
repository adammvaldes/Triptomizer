package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t13.planner.Place;
import spark.Request;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

public class TripCalculate {

    public Trip trip;
    private boolean isCorrectFormat; //verify correct format of POST request

    public TripCalculate(Request request) {
        isCorrectFormat = false;

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());
        //Converting to a Java class
        Gson gson = new Gson();
        try {
            trip = gson.fromJson(requestBody, Trip.class);
            isCorrectFormat = validateTripRequestFormat(trip);

            String optimization = trip.options.optimization;
            if (trip.options.optimization != null && (optimization.equals("short") || optimization.equals("shorter"))) {
                shortOptimization();
            } else {
                trip.places.add(trip.places.get(0));
                trip.getTripDistances();
            }
            setMap("/world_map.svg");

        } catch (Exception e) {
            isCorrectFormat = false;
        }
    }

    public TripCalculate(Trip trip) {
        this.trip = trip;
        isCorrectFormat = false;
        isCorrectFormat = validateTripRequestFormat(trip);
    }

    void shortOptimization() {
        int[] tempPointerPlaces = null;
        int shortestCumulativeDistance = 0;
        trip.distances = trip.getTripDistances();

        for (int distance : trip.distances) {
            shortestCumulativeDistance += distance;
        }

        ArrayList<Location> retainOriginalPlaces = new ArrayList<>(trip.places.size());
        retainOriginalPlaces.addAll(trip.places);
        // the  + 1 is responsible for containing the round trip element.
        int[] pointerPlaces = new int[retainOriginalPlaces.size() + 1];

        //Initially we have pointers all in the same order as the places array.
        for (int i = 0; i < retainOriginalPlaces.size(); i++) {
            pointerPlaces[i] = i;
        }

        double radius = trip.options.getRadius();
        int[][] distanceLibrary = new int[retainOriginalPlaces.size() + 1][retainOriginalPlaces.size() + 1];
        for (int i = 0; i < retainOriginalPlaces.size(); i++) {
            for (int k = 0; k < retainOriginalPlaces.size(); k++) {
                distanceLibrary[i][k] = Distance.getDistanceNum(retainOriginalPlaces, i, k, radius);
            }
            distanceLibrary[i][retainOriginalPlaces.size()] = Distance.getDistanceNum(retainOriginalPlaces, i, 0,
                    radius); //Round trip calculation.
        }
        distanceLibrary[retainOriginalPlaces.size()] = distanceLibrary[0]; //Round trip calculation

        //Loop through all locations in original places array, performing shortest trip algorithm to see which place
        //is shortest.
        for (int place = 0; place < retainOriginalPlaces.size(); place++) {
            ShortOptimization.travelingSalesman(place, retainOriginalPlaces, distanceLibrary, pointerPlaces);
            int tempCumulativeDistance = 0;


            if (trip.options.optimization.equals("shorter")) {
                twoOpt(retainOriginalPlaces, distanceLibrary, pointerPlaces);
            }

            for(int i = 0; i < retainOriginalPlaces.size() - 1; i++) {
                tempCumulativeDistance += Distance.getDistanceNum(retainOriginalPlaces, pointerPlaces[i],
                        pointerPlaces[i+1], radius);
            }
            tempCumulativeDistance += Distance.getDistanceNum(retainOriginalPlaces,
                    pointerPlaces[retainOriginalPlaces.size() - 1], pointerPlaces[0], radius); //Round Trip

            if (tempCumulativeDistance < shortestCumulativeDistance) {
                shortestCumulativeDistance = tempCumulativeDistance;
                tempPointerPlaces = new int[retainOriginalPlaces.size() + 1];
                for (int i = 0; i < retainOriginalPlaces.size() + 1; i++) {
                    tempPointerPlaces[i] = pointerPlaces[i];
                }
            }
        }
        if (tempPointerPlaces != null) {
            for (int i = 0; i < retainOriginalPlaces.size(); i++) {
                trip.places.set(i, trip.places.get(tempPointerPlaces[i]));
            }
            trip.places.add(trip.places.get(0)); //Make it a round trip.
        }
    }

    public void twoOpt(ArrayList<Location> places, int[][] distanceLibrary, int[] pPlaces) {
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

}