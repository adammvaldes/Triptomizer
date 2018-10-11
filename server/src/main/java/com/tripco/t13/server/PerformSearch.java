package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.*;
import spark.Request;

public class PerformSearch {

    // db configuration information
    private final static String myDriver = "com.mysql.jdbc.Driver";
    private final static String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
    private final static String user="cs314-db";
    private final static String pass="eiK5liet1uej";
    // fill in SQL queries to count the number of records and to retrieve the data
    private final static String count = "select count(*) from airports;";
    private static String search = "";
    // Arguments contain the username and password for the database

    private Search searchObject;
    private boolean isCorrectFormat; //verify correct format of POST request

    //Class to complete the search request
    public PerformSearch(Request request) {
        isCorrectFormat = false;

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        //Converting to a Java class
        Gson gson = new Gson();
        try { //Check to see if the JSON is valid, then create the search string for the database
            searchObject = gson.fromJson(requestBody, Search.class);
            isCorrectFormat = validateSearchRequestFormat(searchObject);
            String temp = searchObject.createSearch(searchObject.match);
            temp = searchObject.applyLimit(searchObject.limit, temp);
            search = temp;
        } catch (Exception e) {
            isCorrectFormat = false;
        }
        try { //Send a search to the database, then process the results
            Class.forName(myDriver);
            try (Connection conn = DriverManager.getConnection(myUrl, user, pass);
                 Statement stQuery = conn.createStatement();
                 ResultSet rsQuery = stQuery.executeQuery(search)
            ) {
                searchObject.updatePlaces(searchObject.places, rsQuery);
            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
    }

    public boolean validateSearchRequestFormat(Search searchObject) {
        //check if format of request if correct: type:"search" and version 3
        if( searchObject.match.length() != 0) {
            return true;
        }

        return false;
    }

    public String getSearchJson () {
        Gson gson = new Gson();
        if(isCorrectFormat){
            return gson.toJson(searchObject);
        }
        else{
            return "{}"; //return {} if incorrect request format
        }

    }
}
