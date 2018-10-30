package com.tripco.t13.server;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;

@RunWith(JUnit4.class)
public class TestOptions {
    Options options;

    @Before
    public void initialize(){
        options = new Options();
        options.unitName = "";
        options.units = "";
        options.unitRadius = 0.0;
    }

    @Test
    public void testMilesOptions(){
        options.units = "miles";
        double radius = options.getRadius();
        assertEquals(3959, radius, 0.0);
        //assertEquals("miles", options.unitName);
    }

    @Test
    public void testKilometersOptions(){
        options.units = "kilometers";
        assertEquals(6371, options.getRadius(), 0.0);
        //assertEquals("kilometers", options.unitName);
    }

    @Test
    public void testNauticalMilesOptions(){
        options.units = "nautical miles";
        assertEquals(3440, options.getRadius(), 0.0);
        //assertEquals("nautical miles", options.unitName);
    }

    @Test
    public void testNullOptions(){
        options.units = "";
        assertEquals(3959, options.getRadius(), 0.0);
        assertEquals("miles", options.units);
    }

    @Test
    public void testUserDefinedOptions(){
        options.units = "user defined";
        assertEquals(0.0, options.getRadius(), 0.0);
        assertEquals("", options.unitName);
    }

    @Test
    public void testInvalidOptions(){
        options.units = "stuffity";
        assertEquals(3959, options.getRadius(), 0.0);
        //assertEquals("miles", options.unitName);
        assertEquals("miles", options.units);
    }
}
