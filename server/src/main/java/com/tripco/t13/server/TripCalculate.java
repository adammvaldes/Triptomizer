package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.json.JSONArray;
import org.json.JSONObject;
import spark.Request;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

public class TripCalculate {

    private Trip trip;

    public TripCalculate(Request request){

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        //Converting to a Java class
        Gson gson = new Gson();

        trip = gson.fromJson(requestBody, Trip.class);

        //Calculate and fill trip distances
        trip.getTripDistances();
        setMap();

    }

    public void setMap(){
        BufferedReader read;
        try {
            read = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/CObackground.svg")));
        }
        catch(Exception e){
            return;
        }

        String temp = "";
        String answer = "";
        try {
            while((temp = read.readLine()) != null){
                answer += "'";
                answer += temp;
                answer += "'";
            }
        }
        catch(Exception e){
            return;
        }
        trip.map = answer;
        //System.out.println(map);
    }

    public String getTripJson () {
        Gson gson = new Gson();
        return gson.toJson(trip);
    }

}