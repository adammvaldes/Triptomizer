package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.json.JSONArray;
import org.json.JSONObject;
import spark.Request;
import java.util.*;

public class TripCalculate {

    //private Distance distance;
    private Trip trip;

    public TripCalculate(Request request){

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        //Converting to a Java class
        Gson gson = new Gson();

        trip = gson.fromJson(requestBody, Trip.class);

        //distance = gson.fromJson(requestBody, Distance.class);

        //int radius = 3959;
        trip.getTripDistances();
        //int radius = itinerary.getRadius(itinerary.units);

        //itinerary.distances = itinerary.getTripDistances(distance.origin.latitude,distance.origin.longitude,distance.destination.latitude,distance.destination.longitude, radius); //Added 2 in place of paramaters

        //int radius = distance.getRadius(distance.units);
        //Perform the Calculation
        //distance.distance = distance.getDistanceNum(distance.origin.latitude,distance.origin.longitude,distance.destination.latitude,distance.destination.longitude, radius); //Added 2 in place of paramaters

    }

    /*public String getDistanceJson () {
        Gson gson = new Gson();
        return gson.toJson(distance);
    }*/

    public String getTripJson () {
        Gson gson = new Gson();
        return gson.toJson(trip);
    }

}