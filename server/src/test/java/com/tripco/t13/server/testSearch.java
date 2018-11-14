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
import java.util.ArrayList;

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

        assertEquals("select world_airports.id, world_airports.type, " +
                "world_airports.latitude, world_airports.longitude, " +
                "world_airports.name, world_airports.municipality, region.name, country.name, continents.name from continents " +
                "inner join country on continents.id = country.continent " +
                "inner join region on country.id = region.iso_country " +
                "inner join world_airports on region.id = world_airports.iso_region " +
                "where (country.name like '%den%' " +
                "or region.name like '%den%' " +
                "or world_airports.name like '%den%' " +
                "or world_airports.municipality like '%den%' " +
                "or continents.name like '%den%' " +
                "or world_airports.latitude like '%den%' " +
                "or world_airports.longitude like '%den%' " +
                "or world_airports.id like '%den%' " +
                "or world_airports.type like '%den%')",answer);
    }

    @Test
    public void testAllTypeFilterSearch(){
        search.match = "den";
        Filter filter = new Filter();
        filter.name = "type";
        filter.values = new ArrayList<>();
        filter.values.add("balloon_port");
        filter.values.add("heliport");
        filter.values.add("airport");
        filter.values.add("seaplane base");
        search.filters = new ArrayList<>();
        search.filters.add(filter);

        String answer = search.createSearch(search.match);

        assertEquals("select world_airports.id, world_airports.type, " +
                "world_airports.latitude, world_airports.longitude, " +
                "world_airports.name, world_airports.municipality, region.name, country.name, continents.name from continents " +
                "inner join country on continents.id = country.continent " +
                "inner join region on country.id = region.iso_country " +
                "inner join world_airports on region.id = world_airports.iso_region " +
                "where (country.name like '%den%' " +
                "or region.name like '%den%' " +
                "or world_airports.name like '%den%' " +
                "or world_airports.municipality like '%den%' " +
                "or continents.name like '%den%' " +
                "or world_airports.latitude like '%den%' " +
                "or world_airports.longitude like '%den%' " +
                "or world_airports.id like '%den%' " +
                "or world_airports.type like '%den%') " +
                "and world_airports.type in ('balloon_port', 'heliport', 'airport', 'seaplane base')",answer);
    }

    @Test
    public void testOneTypeFilterSearch(){
        search.match = "den";
        Filter filter = new Filter();
        filter.name = "type";
        filter.values = new ArrayList<>();
        filter.values.add("balloon_port");
        search.filters = new ArrayList<>();
        search.filters.add(filter);

        String answer = search.createSearch(search.match);

        assertEquals("select world_airports.id, world_airports.type, " +
                "world_airports.latitude, world_airports.longitude, " +
                "world_airports.name, world_airports.municipality, region.name, country.name, continents.name from continents " +
                "inner join country on continents.id = country.continent " +
                "inner join region on country.id = region.iso_country " +
                "inner join world_airports on region.id = world_airports.iso_region " +
                "where (country.name like '%den%' " +
                "or region.name like '%den%' " +
                "or world_airports.name like '%den%' " +
                "or world_airports.municipality like '%den%' " +
                "or continents.name like '%den%' " +
                "or world_airports.latitude like '%den%' " +
                "or world_airports.longitude like '%den%' " +
                "or world_airports.id like '%den%' " +
                "or world_airports.type like '%den%') " +
                "and world_airports.type in ('balloon_port')",answer);
    }

    @Test
    public void testCreateFound(){
        search.match = "stuff";
        String answer = search.createFound();

        assertEquals("select count(*) from continents " +
                "inner join country on continents.id = country.continent " +
                "inner join region on country.id = region.iso_country " +
                "inner join world_airports on region.id = world_airports.iso_region " +
                "where (country.name like '%stuff%' " +
                "or region.name like '%stuff%' " +
                "or world_airports.name like '%stuff%' " +
                "or world_airports.municipality like '%stuff%' " +
                "or continents.name like '%stuff%' " +
                "or world_airports.latitude like '%stuff%' " +
                "or world_airports.longitude like '%stuff%' " +
                "or world_airports.id like '%stuff%' " +
                "or world_airports.type like '%stuff%')",answer);
    }

    @Test
    public void testAddSQL(){
        String match = "select stuff from things ";
        String Qmatch = "denver";

        String answer = search.addSQL(match, Qmatch);

        assertEquals("select stuff from things " +
                "inner join country on continents.id = country.continent " +
                "inner join region on country.id = region.iso_country " +
                "inner join world_airports on region.id = world_airports.iso_region " +
                "where (country.name like denver " +
                "or region.name like denver " +
                "or world_airports.name like denver " +
                "or world_airports.municipality like denver " +
                "or continents.name like denver " +
                "or world_airports.latitude like denver " +
                "or world_airports.longitude like denver " +
                "or world_airports.id like denver " +
                "or world_airports.type like denver)", answer);
    }

    @Test
    public void testApplyFilter(){
        //Test null
        String match = "denver";
        String answer = search.applyFilter(match);

        assertEquals("denver", answer);
        //Test non-null
        Filter filter = new Filter();
        filter.name = "type";
        filter.values = new ArrayList<>();
        filter.values.add("balloon_port");
        filter.values.add("heliport");
        search.filters = new ArrayList<>();
        search.filters.add(filter);

        answer = search.applyFilter(match);

        assertEquals("denver and world_airports.type in (" +
                "'balloon_port', 'heliport')",answer);
    }

    @Test
    public void testApplyLimit(){
        search.limit = 75;
        String answer = search.applyLimit(search.limit, "stuff", search);

        assertEquals("stuff order by world_airports.id limit 75;", answer);

        search.limit = 0;
        answer = search.applyLimit(search.limit, "Dave", search);

        assertEquals("Dave order by world_airports.id limit 30;", answer);
    }

    @Test
    public void testApplyLimitDefault(){
        String answer = search.applyLimit(search.limit, "spaghetti", search);

        assertEquals("spaghetti order by world_airports.id limit 30;",answer);

        search.limit = -55;
        answer = search.applyLimit(search.limit, "boulder", search);

        assertEquals("boulder order by world_airports.id limit 30;", answer);
    }

    @Test
    public void testUpdatePlaces(){
        search.places = new ArrayList<>();

        String searchQuery = "select world_airports.name, world_airports.id, " +
                "world_airports.municipality, world_airports.type, " +
                "world_airports.latitude, world_airports.longitude, region.name, country.name, continents.name from continents " +
                "inner join country on continents.id = country.continent " +
                "inner join region on country.id = region.iso_country " +
                "inner join world_airports on region.id = world_airports.iso_region " +
                "where (country.name like '%denver%' " +
                "or region.name like '%denver%' " +
                "or world_airports.name like '%denver%' " +
                "or world_airports.municipality like '%denver%' " +
                "or continents.name like '%denver%' " +
                "or world_airports.latitude like '%denver%' " +
                "or world_airports.longitude like '%denver%' " +
                "or world_airports.id like '%denver%' " +
                "or world_airports.type like '%denver%')";

        try { //Send a search to the database, then process the results
            Class.forName(myDriver);
            try (Connection conn = DriverManager.getConnection(myUrl, user, pass);
                 Statement stQuery = conn.createStatement();
                 ResultSet rsQuery = stQuery.executeQuery(searchQuery)
            ) {
                search.updatePlaces(search.places, rsQuery);
                Location L = search.places.get(0);
                assertEquals(L.id, "0CD4");
                assertEquals(L.name, "Kauffman Heliport");
                assertEquals(L.latitude, 40.1463012695,0.0);
                assertEquals(L.longitude, -104.887001038,0.0);
                assertEquals(L.municipality, "Denver");
                assertEquals(L.type, "heliport");
                assertEquals(L.region, "Colorado");
                assertEquals(L.country, "United States");
                assertEquals(L.continent, "North America");
            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }

    }

    @Test
    public void testUpdateFound(){
        String searchQuery = "select count(*) from world_airports where name like '%Denver%' limit 10;";

        try { //Send a search to the database, then process the results
            Class.forName(myDriver);
            try (Connection conn = DriverManager.getConnection(myUrl, user, pass);
                 Statement stQuery = conn.createStatement();
                 ResultSet rsQuery = stQuery.executeQuery(searchQuery)
            ) {
                search.updateFound(rsQuery);
                int answer = search.found;
                assertEquals(answer, 7);
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
