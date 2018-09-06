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

    public double getDistanceNum(double theta1, double lambda1, double theta2, double lambda2) {
        theta1 = Math.toRadians(theta1);
        theta2 = Math.toRadians(theta2);
        lambda1 = Math.toRadians(lambda1);
        lambda2 = Math.toRadians(lambda2);
        return Math.atan2((Math.sqrt(Math.pow(Math.cos(theta2) * Math.sin(lambda2 - lambda1), 2) + (Math.cos(theta1) *
                Math.sin(theta2) - Math.sin(theta1) * Math.cos(theta2) * Math.pow(Math.cos(lambda2 - lambda1), 2)))),
                (Math.sin(theta1) * Math.sin(theta2) + Math.cos(theta1) * Math.cos(theta2) * Math.cos(lambda2 - lambda1)));
    }

    public String getDistanceObject(Distance dist) {
        Gson gson = new Gson();
        return gson.toJson(dist);
    }

    public int getRadius(String units) {

        int radius = 0;
        if(units.equals("miles"))
            radius = 3959;
        if(units.equals("kilometers"))
            radius = 6371;
        if(units.equals("nautical miles"))
            radius = 3440;
        return radius;
    }
}
