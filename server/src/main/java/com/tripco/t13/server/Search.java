package com.tripco.t13.server;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

public class Search {

    String type;
    int version;
    String match;
    int limit;
    ArrayList<Location> places ;

    public String createSearch(String match){
        //Creating the search string for the database
        String search = "select id,name,municipality,type,latitude,longitude from airports where ";

        String temp = "name like '%" + match + "%' or id like '%" + match + "%' or ";
        search += temp;

        temp = "municipality like '%" + match + "%' or type like '%" + match + "%' or ";
        search += temp;

        temp = "latitude like '%" + match + "%' or latitude like '%" + match + "%'";
        search += temp;

        return search;
    }

    public String applyLimit(int limit, String match){
        //Applying the limit of the search, if provided by the user
        if(limit > 0){
            match += " limit " + Integer.toString(limit) + ";";
        }
        else{
            match += " limit 30;";
        }
        return match;
    }

    public void updatePlaces(ArrayList<Location> places, ResultSet query) throws SQLException {
        //Processing the data returned from the database into the places ArrayList
        while(query.next()){
            Location placeSearch = new Location();
            placeSearch.name = query.getString("name");
            placeSearch.id = query.getString("id");
            placeSearch.municipality = query.getString("municipality");
            placeSearch.type = query.getString("type");
            placeSearch.latitude = Float.parseFloat(query.getString("latitude"));
            placeSearch.longitude = Float.parseFloat(query.getString("longitude"));
            places.add(placeSearch);
        }
    }

    public boolean validateSearchRequestFormat(Search searchObject) {
        //check if format of request if correct: type:"search" and version 3
        if( searchObject.match.length() != 0) {
            if( searchObject.places == null){
                searchObject.places = new ArrayList<Location>();
            }
            return true;
        }

        return false;
    }

}