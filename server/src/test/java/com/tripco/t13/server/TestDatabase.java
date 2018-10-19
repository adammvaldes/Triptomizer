package com.tripco.t13.server;

import org.junit.Before;
import org.junit.Test;
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
        String match = "heliport";
        int limit = 3;
        pSearch = new PerformSearch(match, limit);
        pSearch.sendSearch();
        String gson = pSearch.getSearchJson();
        assertEquals("{\"type\":\"search\",\"version\":3,\"match\":\"heliport\",\"limit\":3,\"places\":[{\"id\":\"01CO\",\"name\":\"St Vincent General Hospital Heliport\",\"latitude\":39.2453,\"longitude\":-106.246,\"municipality\":\"Leadville\",\"type\":\"heliport\"},{\"id\":\"0CD0\",\"name\":\"Delta County Memorial Hospital Heliport\",\"latitude\":38.7408,\"longitude\":-108.052,\"municipality\":\"Delta\",\"type\":\"heliport\"},{\"id\":\"0CD1\",\"name\":\"Colorado Plains Medical Center Heliport\",\"latitude\":40.261093,\"longitude\":-103.79634,\"municipality\":\"Fort Morgan\",\"type\":\"heliport\"}]}", gson);
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
