package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
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


        //distance.origin.getLatitude();
        //Perform the Calculation
        distance.getDistanceNum(2,2,2,2); //Added 2 in place of paramaters

    }

    public String getDistanceJson () {
        Gson gson = new Gson();
        return gson.toJson(distance);
    }

}