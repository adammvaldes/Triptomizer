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
        int limit = 3;
        pSearch = new PerformSearch(match, limit);
        pSearch.sendSearch();
        String gson = pSearch.getSearchJson();
        assertEquals("{\"type\":\"search\",\"version\":3,\"match\":\"denver\",\"limit\":3,\"places\":[{\"id\":\"0CD4\",\"name\":\"Kauffman Heliport\",\"latitude\":40.1463012695,\"longitude\":-104.887001038,\"municipality\":\"Denver\",\"type\":\"heliport\"},{\"id\":\"11CO\",\"name\":\"Channel 7 Heliport\",\"latitude\":39.72529983520508,\"longitude\":-104.98400115966797,\"municipality\":\"Denver\",\"type\":\"heliport\"},{\"id\":\"2CO4\",\"name\":\"Presbyterian/St Luke\\u0027s Medical Center Heliport\",\"latitude\":39.7494010925293,\"longitude\":-104.96900177001953,\"municipality\":\"Denver\",\"type\":\"heliport\"}]}", gson);
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
