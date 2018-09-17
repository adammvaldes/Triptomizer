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
    //public Location[] places;
    ArrayList<Location> places;
    //TODO: ADD OPTIONS
    //ArrayList<String> options;
    String options;
    //String[] options;
    //int[] distances;
    ArrayList<Integer> distances;
    //TODO: ADD MAP
    String map;
    //radius temporarily hardcoded to miles
    int radius = 3959;
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
        float theta1 = (float)Math.toRadians(originLatitude);
        float theta2 = (float)Math.toRadians(originLongitude);
        float lambda1 = (float)Math.toRadians(destinationLatitude);
        float lambda2 = (float)Math.toRadians(destinationLongitude);

        //implement Vincenty formulae of d = r * arctan definition.
        return (int)Math.round(radius * Math.atan2((Math.sqrt(Math.pow(Math.cos(theta2) * Math.sin(lambda2 - lambda1), 2) +
                Math.pow((Math.cos(theta1) * Math.sin(theta2) - Math.sin(theta1) * Math.cos(theta2) *
                        Math.cos(lambda2 - lambda1)), 2))), (Math.sin(theta1) * Math.sin(theta2) +
                Math.cos(theta1) * Math.cos(theta2) * Math.cos(lambda2 - lambda1))));
    }

    //fills distances array with distance between each Location in places array and fills final space in distances array with round trip distance
    public ArrayList<Integer> getTripDistances(){
        for(int i = 0; i < places.size() - 1; i++) {
            distances.add(getDistanceNum(places.get(i).latitude, places.get(i).longitude, places.get(i+1).latitude, places.get(i+1).longitude, radius));
        }
        distances.add(getDistanceNum(places.get(places.size()-1).latitude, places.get(places.size()-1).longitude, places.get(0).latitude, places.get(0).longitude, radius));
        /*distances = new int[places.length];
        for(int i = 0; i < places.length - 1; i++){
            //TODO: add support for radii
            distances[i] = getDistanceNum(places[i].latitude, places[i].longitude, places[i+1].latitude, places[i+1].longitude, radius);
        }
        //TODO: add support for radii
        distances[places.length] = getDistanceNum(places[places.length].latitude, places[places.length].longitude, places[0].latitude, places[0].longitude, radius);*/
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
