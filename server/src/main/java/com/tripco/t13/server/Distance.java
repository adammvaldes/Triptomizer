package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import jdk.nashorn.internal.parser.JSONParser;
import spark.Request;

import java.util.ArrayList;

public class Distance {
    String type;
    int version;
    public Location origin;
    public Location destination;
    String units;

    String unitName = null;
    Double unitRadius = null;

    Long distance = null;

    public static Long getDistanceNum(double theta1, double lambda1, double theta2, double lambda2, double radius) {

        //convert all degree definitions to radians.
        theta1 = Math.toRadians(theta1);
        theta2 = Math.toRadians(theta2);
        lambda1 = Math.toRadians(lambda1);
        lambda2 = Math.toRadians(lambda2);

        //implement Vincenty formulae of d = r * arctan definition.
        return Math.round(radius * Math.atan2((Math.sqrt(Math.pow(Math.cos(theta2) * Math.sin(lambda2 - lambda1), 2) +
                        Math.pow((Math.cos(theta1) * Math.sin(theta2) - Math.sin(theta1) * Math.cos(theta2) *
                Math.cos(lambda2 - lambda1)), 2))), (Math.sin(theta1) * Math.sin(theta2) +
                Math.cos(theta1) * Math.cos(theta2) * Math.cos(lambda2 - lambda1))));
    }

    public static Long getDistanceNum(ArrayList<Location> route, int i, int j, double radius){
        Location location1 = route.get(i);
        Location location2 = route.get(j);
        return getDistanceNum(location1.latitude, location1.longitude, location2.latitude, location2.longitude, radius);
    }

    public double getRadius(String units) {
        Options options = new Options();
        options.units = units;
        options.unitName = this.unitName;
        options.unitRadius = this.unitRadius;
        return options.getRadius();
    }
}
