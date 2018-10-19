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
    private static String myDriver = "com.mysql.jdbc.Driver";
    private static String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
    private static String user="cs314-db";
    private static String pass="eiK5liet1uej";
    // fill in SQL queries to count the number of records and to retrieve the data
    private static String count = "select count(*) from airports;";
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
            isCorrectFormat = searchObject.validateSearchRequestFormat(searchObject);
            String temp = searchObject.createSearch(searchObject.match);
            temp = searchObject.applyLimit(searchObject.limit, temp, searchObject);
            search = temp;
        } catch (Exception e) {
            isCorrectFormat = false;
        }
    }
    public PerformSearch(String request, int limit){

        try {
            searchObject = new Search();
            searchObject.match = request;
            searchObject.limit = limit;
            searchObject.type = "search";
            searchObject.version = 3;
            isCorrectFormat = searchObject.validateSearchRequestFormat(searchObject);
            String temp = searchObject.createSearch(searchObject.match);
            temp = searchObject.applyLimit(searchObject.limit, temp, searchObject);
            search = temp;
        } catch (Exception e) {
            isCorrectFormat = false;
        }
    }

    public String getSearchJson() {
        Gson gson = new Gson();
        if(isCorrectFormat){
            return gson.toJson(searchObject);
        }
        else{
            return "{}"; //return {} if incorrect request format
        }

    }

    public void sendSearch(){
        setCredentials();
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

    public void setCredentials(){
        // Here are some environment variables. The first one is set by default in
        // Travis, and the other we set ourselves (see the other guide)
        String isTravis = System.getenv("TRAVIS");
        String isDevelopment = System.getenv("CS314_ENV");

        // If we're running on Travis, use the proper url + credentials
        if(isTravis != null && isTravis.equals("true")) {
            myUrl = "jdbc:mysql://127.0.0.1/cs314";
            user = "travis";
            pass = null;
        }

        // else, use our credentials; also account for if we have our own dev
        // environment variable (see the other guide) for connecting through an SSH
        // tunnel
        else if(isDevelopment != null && isDevelopment.equals("development")) {
            myUrl = "jdbc:mysql://127.0.0.1:3306/cs314";
            user = "cs314-db";
            pass = "eiK5liet1uej";
        }

        // Else, we must be running against the production database directly
        else {
            myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
            user = "cs314-db";
            pass = "eiK5liet1uej";
        }
    }
}
