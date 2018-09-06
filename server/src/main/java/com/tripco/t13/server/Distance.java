package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import jdk.nashorn.internal.parser.JSONParser;
import spark.Request;

public class Distance {
    String type;
    int version;
    Object origin;
    Object destination;
    String units;
    int distance;
    Gson gson = new Gson();

    public Distance(Request request) {

        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        Distance distance = gson.fromJson(requestBody, Distance.class);

        distance.getDistanceNum();
    }


    public int getDistanceNum() {
        return 10;
    }

    public String getDistanceObject() {
        return gson.toJson(distance);
    }

}
