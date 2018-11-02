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

            setMap();

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
        Trip tempTrip = new Trip();
        int shortestCumulativeDistance = 0;
        trip.distances = trip.getTripDistances();

        for (int distance : trip.distances) {
            shortestCumulativeDistance += distance;
        }

        ArrayList<Location> retainOriginalPlaces = new ArrayList<>(trip.places.size());
        retainOriginalPlaces.addAll(trip.places);

        //Loop through all locations in original places array, performing shortest trip algorithm to see which place
        //is shortest.
        for (Location place : retainOriginalPlaces) {
            trip.places = ShortOptimization.travelingSalesman(place, retainOriginalPlaces, trip.options);
            int tempCumulativeDistance = 0;

            if (trip.options.optimization.equals("shorter")) {
                twoOpt(retainOriginalPlaces);
            }

            trip.distances = trip.getTripDistances();
            for (int distance : trip.distances) {
                tempCumulativeDistance += distance;
            }

            if (tempCumulativeDistance < shortestCumulativeDistance) {
                shortestCumulativeDistance = tempCumulativeDistance;
                tempTrip = new Trip(trip);
            }
        }
        trip = tempTrip;
    }

    public void twoOpt(ArrayList<Location> retainOriginalPlaces) {
        boolean improvement = true;
        while (improvement) {
            improvement = false;
            if (retainOriginalPlaces.size() > 4) {
                for (int i = 0; i <= retainOriginalPlaces.size() - 3; i++) {
                    for (int k = i + 2; k <= retainOriginalPlaces.size() - 1; k++) {
                        double radius = trip.options.getRadius();
                        double delta = -(Distance.getDistanceNum(trip.places, i, i+1, radius))
                                -(Distance.getDistanceNum(trip.places, k, k+1, radius))
                                +(Distance.getDistanceNum(trip.places, i, k, radius))
                                +(Distance.getDistanceNum(trip.places, i+1, k+1, radius));

                        if (delta < 0) {
                            trip.places = twoOptReverse(trip.places, i+1, k);
                            improvement = true;
                        }
                    }
                }
            }
        }
    }

    public ArrayList<Location> twoOptReverse(ArrayList<Location> route, int i1, int k) {
        while (i1 < k) {
            Location temp = route.get(i1);
            route.set(i1, route.get(k));
            route.set(k, temp);
            i1++; k--;
        }

        return route;
    }

    public void setMap(){
        BufferedReader read;
        try {
            read = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/CObackground.svg")));
        }
        catch(Exception e){
            return;
        }

        String temp = "";
        String answer = "";
        try {
            while((temp = read.readLine()) != null){
                if (temp.equals("</svg>")) {
                    answer += drawVector(trip);
                }
                answer += temp;
            }
            trip.map = answer;
        }
        catch(Exception e){
            return;
        }
    }

    public String drawVector(Trip trip) {
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
                (trip.version==4)&&
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