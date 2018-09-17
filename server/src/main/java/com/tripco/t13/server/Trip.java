package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import jdk.nashorn.internal.parser.JSONParser;
import spark.Request;
import java.util.ArrayList;

public class Trip {
    int version;
    String type;
    String title;
    ArrayList<Location> places;
    //TODO: Add support for user defined options (units and radius)
    ArrayList<Object> options;
    ArrayList<Integer> distances;
    //TODO: ADD MAP
    String map;
    //radius temporarily hardcoded to miles
    int radius = 3959;
    String units;

    /*public int getDistanceNum(float originLatitude, float originLongitude, float destinationLatitude, float destinationLongitude, int radius) {

        //convert all degree definitions to radians.
        float theta1 = (float)Math.toRadians(originLatitude);
        float theta2 = (float)Math.toRadians(originLongitude);
        float lambda1 = (float)Math.toRadians(destinationLatitude);
        float lambda2 = (float)Math.toRadians(destinationLongitude);

        //implement Vincenty formulae of d = r * arctan definition.
        return (int)Math.round(radius * Math.atan2((Math.sqrt(Math.pow(Math.cos(theta2) * Math.sin(lambda2 - lambda1), 2) +
                Math.pow((Math.cos(theta1) * Math.sin(theta2) - Math.sin(theta1) * Math.cos(theta2) *
                        Math.cos(lambda2 - lambda1)), 2))), (Math.sin(theta1) * Math.sin(theta2) +
                Math.cos(theta1) * Math.cos(theta2) * Math.cos(lambda2 - lambda1))));
    }*/

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

    //fills distances array with distance between each Location in places array and fills final space in distances array with round trip distance
    public ArrayList<Integer> getTripDistances(){
        System.out.println(options.toString());
        for(int i = 0; i < places.size() - 1; i++) {
            distances.add(getDistanceNum(places.get(i).latitude, places.get(i).longitude, places.get(i+1).latitude, places.get(i+1).longitude, radius));
        }
        distances.add(getDistanceNum(places.get(places.size()-1).latitude, places.get(places.size()-1).longitude, places.get(0).latitude, places.get(0).longitude, radius));
        return distances;
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
