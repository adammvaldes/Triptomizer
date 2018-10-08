package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import java.util.*;
import spark.Request;

public class PerformSearch {

    private Search search;
    private boolean isCorrectFormat; //verify correct format of POST request

    //Class to complete the search request
    public PerformSearch(Request request){
        isCorrectFormat=false;

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        //Converting to a Java class
        Gson gson = new Gson();
        try {
            search = gson.fromJson(requestBody, Search.class);
            isCorrectFormat = validateSearchRequestFormat(search);



        } catch (Exception e) {

            isCorrectFormat = false;
        }
    }

    public boolean validateSearchRequestFormat(Search search) {
        //check if format of request if correct: type:"search" and version 3
        if(     Objects.equals(search.type, "search") &&
                (search.version==3)
        ){
            return true;
        }

        return false;
    }
    public String getSearchJson () {
        Gson gson = new Gson();
        if(isCorrectFormat){
            return gson.toJson(search);
        }
        else{
            return "{}"; //return {} if incorrect request format
        }

    }
}
