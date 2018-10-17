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

            for (Location location : this.trip.places) {
                System.out.print(location.name + " --> ");
            }
            if (trip.options.optimization.equals("short")) {
                shortOptimization();
            } else {
                System.out.println("Not doing optimization.");
            }

            System.out.println("After sort: \n\n\n\n");
            for (Location location : this.trip.places) {
                System.out.print(location.name + " --> ");
            }

            //Calculate and fill trip distances
            //trip.getTripDistances();
            setMap();

        } catch (Exception e) {
            isCorrectFormat = false;
        }
    }

    public TripCalculate(Trip trip) {
        this.trip = trip;
        //System.out.println("Before sort: \n\n\n\n");
//        for (Location location : this.trip.places) {
//            //System.out.print(location.name + " --> ");
//        }
//        if (trip.options.optimization.equals("short")) {
//            shortOptimization();
//        }
//
//        //System.out.println("After sort: \n\n\n\n");
//        for (Location location : this.trip.places) {
//            //System.out.print(location.name + " --> ");
//        }
//        //Calculate and fill trip distances
//        this.trip.getTripDistances();
//        setMap();
    }

    void shortOptimization() {
        Trip tempTrip = new Trip();
        int shortestCumulativeDistance = 0;
//        ArrayList<Integer> distancesOfTrip = getLegDistances(trip.places, (int)trip.options.unitRadius);
        trip.distances = trip.getTripDistances();
        for (int distance : trip.distances) {
            shortestCumulativeDistance += distance;
        }

        System.out.println("Unoptimized cumulative distance is: " + shortestCumulativeDistance);
        ArrayList<Location> retainOriginalPlaces = new ArrayList<>();
        retainOriginalPlaces.addAll(trip.places);

        for (Location place : retainOriginalPlaces) {
            System.out.println("Testing: " + place.name);
            //Trip tempTrip = trip;
            trip.places = ShortOptimization.travelingSalesman(place, trip.places, "miles");
            trip.distances = trip.getTripDistances();
            int tempCumulativeDistance = 0;
            for (int distance : trip.distances) {
                tempCumulativeDistance += distance;
            }
            System.out.println("Optimized cumulative distance for: " + place.name + " is: " + tempCumulativeDistance);
            //Revert back to previous order of places if the current order has a bigger cumulative distance.
            System.out.print("Is the current trip(" + tempCumulativeDistance + ") shorter than " + shortestCumulativeDistance + "? ");
            if (tempCumulativeDistance <= shortestCumulativeDistance) {
                System.out.println("Yes");
                shortestCumulativeDistance = tempCumulativeDistance;
                tempTrip = new Trip(trip);
            } else {
                System.out.println("No");
            }
        }

        //System.out.println("Newly optimized trip: ");
//        for (Location location : trip.places) {
//            System.out.print(location.name + " --> ");
//        }
        trip = tempTrip;
        //trip.places = shortOptimization.travelingSalesman(trip.places, trip.places.get(0), trip.options.units);

    }

    public static ArrayList<Integer> getLegDistances(ArrayList<Location> places, int unitRadius){
        ArrayList<Integer> distances = new ArrayList<Integer>();

        for(int i = 0; i < places.size() - 1; i++) {
            distances.add(Distance.getDistanceNum(places.get(i).latitude, places.get(i).longitude, places.get(i+1).latitude, places.get(i+1).longitude, unitRadius));
        }
        distances.add(Distance.getDistanceNum(places.get(places.size()-1).latitude, places.get(places.size()-1).longitude, places.get(0).latitude, places.get(0).longitude, unitRadius));

        return distances;
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
        //check if format of request if correct: type:"trip", version 1 or 2
        if(     Objects.equals(trip.type, "trip")&&
                (trip.version==3)&&
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