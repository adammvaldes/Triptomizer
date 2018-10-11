package com.tripco.t13.server;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;

/*
  This class contains tests for the Search class.
 */
@RunWith(JUnit4.class)
public class testSearch {
    Search search;

    @Before
    public void initialize(){
        search = new Search();
        search.version = 3;
        search.type = "search";
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

    @Test
    public void testApplyLimit(){
        search.limit = 75;
        String answer = search.applyLimit(search.limit, "stuff");

        assertEquals("stuff limit 75;", answer);

        search.limit = 0;
        answer = search.applyLimit(search.limit, "Dave");

        assertEquals("Dave;", answer);
    }

    @Test
    public void testApplyLimitDefault(){
        String answer = search.applyLimit(search.limit, "spaghetti");

        assertEquals("spaghetti;",answer);

        search.limit = -55;
        answer = search.applyLimit(search.limit, "boulder");

        assertEquals("boulder;", answer);
    }

}
