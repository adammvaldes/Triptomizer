package com.tripco.t13.server;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

public class Search {

    String type;
    Integer version;
    String match;
    Integer limit;
    ArrayList<Location> places;

    ArrayList<Filter> filters;
    Integer found;

    public String createSearch(String match){
        //Creating the search string for the database
        String Qmatch = "'%" + match + "%'";
        String newSearch = "select world_airports.id, world_airports.type, " +
                "world_airports.latitude, world_airports.longitude, " +
                "world_airports.name, world_airports.municipality, region.name, country.name, continents.name from continents ";
        newSearch += "inner join country on continents.id = country.continent ";
        newSearch += "inner join region on country.id = region.iso_country ";
        newSearch += "inner join world_airports on region.id = world_airports.iso_region ";
        newSearch += "where (country.name like " + Qmatch + " ";
        newSearch += "or region.name like " + Qmatch + " ";
        newSearch += "or world_airports.name like " + Qmatch + " ";
        newSearch += "or world_airports.municipality like " + Qmatch + " ";
        newSearch += "or continents.name like " + Qmatch + " ";
        newSearch += "or world_airports.latitude like " + Qmatch + " ";
        newSearch += "or world_airports.longitude like " + Qmatch + " ";
        newSearch += "or world_airports.id like " + Qmatch + " ";
        newSearch += "or world_airports.type like " + Qmatch + ")";

        newSearch = applyFilter(newSearch);

        return newSearch;
    }

    public String applyFilter(String search){
        if(filters == null || filters.size() == 0) {
            return search;
        }
        else{
            String name;
            ArrayList<String> values;
            for(Filter filter : filters){
                name = filter.name;
                values = filter.values;
                if(name.equals("type")){
                    search += " and world_airports.type in (";
                }
                int i = 0;
                while(i < values.size()) {
                        if(i < values.size()-1){
                            search += "'" + values.get(i) + "', ";
                        }
                        else{
                            search += "'" + values.get(i) + "')";
                        }
                        i++;
                }
            }
            return search;
        }
    }

    public String applyLimit(Integer limit, String match, Search searchObject){
        //Applying the limit of the search, if provided by the user

        if(searchObject.limit == null){
            limit = 0;
        }

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
            placeSearch.latitude = Double.parseDouble(query.getString("latitude"));
            placeSearch.longitude = Double.parseDouble(query.getString("longitude"));
            placeSearch.region = query.getString(7);
            placeSearch.country = query.getString(8);
            placeSearch.continent = query.getString(9);
            places.add(placeSearch);
        }
    }

    public boolean validateSearchRequestFormat(Search searchObject) {
        //check if format of request if correct: type:"search" and version 3
        if(searchObject.match.length() != 0
                && (searchObject.version == 3 || searchObject.version == 4)
                && searchObject.type.equals("search")) {
            if(searchObject.places == null){
                searchObject.places = new ArrayList<Location>();
            }
            return true;
        }

        return false;
    }

}

 /*String search = "select id,name,municipality,type,latitude,longitude from airports where ";

        String temp = "name like '%" + match + "%' or id like '%" + match + "%' or ";
        search += temp;

        temp = "municipality like '%" + match + "%' or type like '%" + match + "%' or ";
        search += temp;

        temp = "latitude like '%" + match + "%' or longitude like '%" + match + "%'";
        search += temp;*/