package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.json.JSONArray;
import org.json.JSONObject;
import spark.Request;
import java.util.*;

public class Calculate {

    private Distance distance;

    public Calculate(Request request){

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        //Converting to a Java class
        Gson gson = new Gson();
        distance = gson.fromJson(requestBody, Distance.class);

        int radius = distance.getRadius(distance.units);
        //Perform the Calculation
        distance.distance = distance.getDistanceNum(distance.origin.latitude,distance.origin.longitude,distance.destination.latitude,distance.destination.longitude, radius); //Added 2 in place of paramaters

    }

    public String getDistanceJson () {
        Gson gson = new Gson();
        return gson.toJson(distance);
    }

}