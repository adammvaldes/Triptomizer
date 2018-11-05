package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.json.JSONArray;
import org.json.JSONObject;
import spark.Request;
import java.util.*;

public class Calculate {

    private Distance distance;
    private boolean isCorrectFormat; //verify correct format of POST request

    public Calculate(Request request){
        isCorrectFormat=false;

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        //Converting to a Java class
        Gson gson = new Gson();

        try{
            distance = gson.fromJson(requestBody, Distance.class);
            isCorrectFormat = validateDistanceRequestFormat(distance);
            double radius = distance.getRadius(distance.units);
            //Perform the Calculation
            distance.distance = Distance.getDistanceNum(distance.origin.latitude,distance.origin.longitude,distance.destination.latitude,distance.destination.longitude, radius); //Added 2 in place of paramaters

        }
        catch(Exception e){
            isCorrectFormat=false;
        }




    }

    public String getDistanceJson () {
        Gson gson = new Gson();
        if(isCorrectFormat){
            return gson.toJson(distance);
        }
        else{
            return "{}"; //return {} if incorrect request format
        }

    }

    public boolean validateDistanceRequestFormat(Distance distance){
            //check if format of request if correct: type:"distance", version 1 or 2, accepted units
            if(     Objects.equals(distance.type, "distance")&&
                    (distance.version<=4)&&
                    (Objects.equals(distance.units, "miles")||Objects.equals(distance.units, "kilometers")||
                    Objects.equals(distance.units, "nautical miles")||
                    Objects.equals(distance.units, "user defined"))&&
                    distance.origin!=null&&distance.destination!=null&&distance.units!=null){

                return true;
            }

        return false;
    }

}