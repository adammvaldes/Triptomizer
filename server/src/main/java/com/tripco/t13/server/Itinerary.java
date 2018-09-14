package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import jdk.nashorn.internal.parser.JSONParser;
import spark.Request;

public class Itinerary {
    int version;
    String type;
    String title;
    public Location[] places;
    //TODO: ADD OPTIONS
    int[] distances;
    //TODO: ADD MAP
    String map;
    String units;

    /*public Location origin;
    public Location destination;
    String units;
    int distance;*/

    /*public Itinerary(){
        return this;
    }*/

    public int getDistanceNum(float originLatitude, float originLongitude, float destinationLatitude, float destinationLongitude, int radius) {

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
    }lambda2

    //fills distances array with distance between each Location in places array and fills final space in distances array with round trip distance
    public int[] getTripDistances(){
        distances = new int[places.length];
        for(int i = 0; i < places.length - 1; i++){
            //TODO: add support for radii
            distances[i] = getDistanceNum(places[i].latitude, places[i].longitude, places[i+1].latitude, places[i+1].longitude, 1)
        }
        //TODO: add support for radii
        distances[places.length] = getDistanceNum(places[places.length].latitude, places[places.length].longitude, places[0].latitude, places[0].longitude, 1)
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
