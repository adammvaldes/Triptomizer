package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import jdk.nashorn.internal.parser.JSONParser;
import spark.Request;

public class Distance {
    String type;
    int version;
    Location origin;
    Location destination;
    String units;
    int distance;

    public int getDistanceNum(float theta1, float lambda1, float theta2, float lambda2, int radius) {

        //convert all degree definitions to radians.
        theta1 = (float)Math.toRadians(theta1);
        theta2 = (float)Math.toRadians(theta2);
        lambda1 = (float)Math.toRadians(lambda1);
        lambda2 = (float)Math.toRadians(lambda2);

        //implement Vincenty formulae of d = r * arctan definition.
        return (int)Math.round(radius * Math.atan2((Math.sqrt(Math.pow(Math.cos(theta2) * Math.sin(lambda2 - lambda1), 2) +
                        Math.pow((Math.cos(theta1) * Math.sin(theta2) - Math.sin(theta1) * Math.cos(theta2) *
                Math.cos(lambda2 - lambda1)), 2))), (Math.sin(theta1) * Math.sin(theta2) +
                Math.cos(theta1) * Math.cos(theta2) * Math.cos(lambda2 - lambda1))));
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
