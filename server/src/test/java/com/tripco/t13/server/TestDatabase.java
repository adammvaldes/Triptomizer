package com.tripco.t13.server;

import org.junit.Before;
import org.junit.Test;
import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;

@RunWith(JUnit4.class)
public class TestDatabase {
    PerformSearch pSearch;

    @Before
    public void initialize(){
    }

    @Test
    public void testHeliport(){
        String match = "denver";
        int limit = 30;
        pSearch = new PerformSearch(match, limit);
        pSearch.sendSearch();
        String gson = pSearch.getSearchJson();
        assertEquals("{\"type\":\"search\",\"version\":4,\"match\":\"denver\",\"limit\":3,\"places\":[{\"id\":\"0CD4\",\"name\":\"Kauffman Heliport\",\"latitude\":40.1463012695,\"longitude\":-104.887001038,\"municipality\":\"Denver\",\"type\":\"heliport\",\"region\":\"Colorado\",\"country\":\"United States\",\"continent\":\"North America\"}," +
                "{\"id\":\"11CO\",\"name\":\"Channel 7 Heliport\",\"latitude\":39.72529983520508,\"longitude\":-104.98400115966797,\"municipality\":\"Denver\",\"type\":\"heliport\",\"region\":\"Colorado\",\"country\":\"United States\",\"continent\":\"North America\"}," +
                "{\"id\":\"1TA5\",\"name\":\"Two Leggs Airport\",\"latitude\":32.94179916381836,\"longitude\":-103.0,\"municipality\":\"Denver City\",\"type\":\"small_airport\",\"region\":\"Texas\",\"country\":\"United States\",\"continent\":\"North America\"}],\"found\":30}", gson);
    }

    @Test
    public void testVoid(){
        String match = "";
        int limit = 9;
        pSearch = new PerformSearch(match, limit);
        pSearch.sendSearch();
        String gson = pSearch.getSearchJson();
        assertEquals("{}", gson);
    }

}
