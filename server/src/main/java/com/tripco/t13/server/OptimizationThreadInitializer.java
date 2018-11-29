package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import spark.Request;

import java.util.ArrayList;
import java.util.Objects;

public class OptimizationThreadInitializer {
    Trip trip = null;
    boolean isCorrectFormat;

    OptimizationThreadInitializer(Request request) {
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());
        //Converting to a Java class
        Gson gson = new Gson();
        try {
            trip = gson.fromJson(requestBody, Trip.class);
            isCorrectFormat = validateTripRequestFormat(trip);

            String optimization = trip.options.optimization;
            if (optimization != null && (optimization.equals("short") || optimization.equals("shorter"))) {
                // TODO Implement Thread Functionality Here
            } else {
                //if(trip.places.get(0) != trip.places.get(trip.places.size()-1))
                trip.places.add(trip.places.get(0)); //Make it a round trip.
                trip.getTripDistances();
                trip.places.remove(trip.places.size()-1);
            }
        } catch (Exception e) {
            isCorrectFormat = false;
        }
    }

    public boolean validateTripRequestFormat(Trip trip) {
        //check if format of request if correct: type:"trip", version 1 or 2 or 3 or 4
        if (
                Objects.equals(trip.type, "trip") &&
                        (trip.version <= 5) &&
                        trip.places != null && trip.options != null) {
            return true;
        }

        return false;
    }
}
