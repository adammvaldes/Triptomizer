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
    private boolean isCorrectFormat; //verify correct format of POST request

    public TripCalculate(Request request) {
        isCorrectFormat = false;

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        //Converting to a Java class
        Gson gson = new Gson();
        try {
            trip = gson.fromJson(requestBody, Trip.class);
            isCorrectFormat = validateTripRequestFormat(trip);

            //Calculate and fill trip distances
            trip.getTripDistances();
            setMap();

        } catch (Exception e) {

            isCorrectFormat = false;
        }
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





    public boolean validateTripRequestFormat(Trip trip) {
        //check if format of request if correct: type:"trip", version 1 or 2
        if(     Objects.equals(trip.type, "trip")&&
                (trip.version==2||trip.version==1)&&
                trip.places!=null&&trip.options!=null){

            return true;
        }

        return false;
    }


    public String getTripJson () {
        Gson gson = new Gson();
        if(isCorrectFormat){
            return gson.toJson(trip);

        }
        else{
            return "{}"; //return {} if incorrect request format
        }
    }

}