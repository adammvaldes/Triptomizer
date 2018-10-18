package com.tripco.t13.server;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import static org.junit.Assert.*;

/*
  This class contains tests for the Search class.
 */
@RunWith(JUnit4.class)
public class testSearch {
    Search search;
    String myDriver;
    String myUrl;
    String user;
    String pass;

    @Before
    public void initialize(){
        search = new Search();
        search.version = 3;
        search.type = "search";
        search.match = "";

        myDriver = "com.mysql.jdbc.Driver";
        myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
        user="cs314-db";
        pass="eiK5liet1uej";
    }

    @Test
    public void testCreateSearch(){
        search.match = "den";
        String answer = search.createSearch(search.match);

        assertEquals("select id,name,municipality,type,latitude,longitude from airports where " +
                "name like '%den%' or id like '%den%' or " +
                "municipality like '%den%' or type like '%den%' or " +
                "latitude like '%den%' or latitude like '%den%'",answer);
    }

    @Ignore
    @Test
    public void testApplyLimit(){
        search.limit = 75;
        String answer = search.applyLimit(search.limit, "stuff");

        assertEquals("stuff limit 75;", answer);

        search.limit = 0;
        answer = search.applyLimit(search.limit, "Dave");

        assertEquals("Dave limit 30;", answer);
    }

    @Ignore
    @Test
    public void testApplyLimitDefault(){
        String answer = search.applyLimit(search.limit, "spaghetti");

        assertEquals("spaghetti;",answer);

        search.limit = -55;
        answer = search.applyLimit(search.limit, "boulder");

        assertEquals("boulder;", answer);
    }

    @Test
    public void testUpdatePlaces(){

        String searchQuery = "select id,name,municipality,type,latitude,longitude from airports where " +
                "name like '%International%' or id like '%International%' or " +
                "municipality like '%International%' or type like '%International%' or " +
                "latitude like '%International%' or latitude like '%International%'";
        try { //Send a search to the database, then process the results
            Class.forName(myDriver);
            try (Connection conn = DriverManager.getConnection(myUrl, user, pass);
                 Statement stQuery = conn.createStatement();
                 ResultSet rsQuery = stQuery.executeQuery(searchQuery)
            ) {
                search.updatePlaces(search.places, rsQuery);
                Location L = search.places.get(0);
                assertEquals(L.id, "01CO");
                assertEquals(L.name, "St Vincent General Hospital Heliport");
                assertEquals(L.latitude, 39.2453);
                assertEquals(L.longitude, -106.246);
                assertEquals(L.municipality, "Leadville");
                assertEquals(L.type, "heliport");
            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }

    }

    @Test
    public void testValidateSearchRequestFormat(){

        boolean check = search.validateSearchRequestFormat(search);

        assertFalse(check);

        search.match = "den";
        check = search.validateSearchRequestFormat(search);

        assertTrue(check);
    }

}
