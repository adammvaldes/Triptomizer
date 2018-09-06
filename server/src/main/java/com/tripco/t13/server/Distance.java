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

    public int getDistanceNum() {
        return 10;
    }

    public String getDistanceObject(Distance dist) {
        Gson gson = new Gson();
        return gson.toJson(dist);
    }

}
