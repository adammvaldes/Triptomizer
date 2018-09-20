package com.tripco.t13.server;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestTrip {
    Trip trip;

    // Setup to be done before every test in TestPlan
    @Before
    public void initialize() {
        trip = new Trip();
        trip.options = new Options();
        trip.options.units = "miles";
        trip.title = "Shopping Loop";
        ArrayList<Location> initialLocations = new ArrayList<Location>();
        Location l1 = new Location();
        Location l2 = new Location();
        Location l3 = new Location();
        l1.id = "dnvr";
        l1.name = "Denver";
        l1.latitude = (float)39.7392;
        l1.longitude = (float)-104.9903;
        l2.id = "bldr";
        l2.name = "Boulder";
        l2.latitude = (float)40.01499;
        l2.longitude = (float)-105.27055;
        l3.id = "foco";
        l3.name = "Fort Collins";
        l3.latitude = (float)40.585258;
        l3.longitude = (float)-105.084419;
        Collections.addAll(initialLocations, l1, l2, l3);
        trip.places = initialLocations;
    }

    @Test
    public void testTrue() {
        // assertTrue checks if a statement is true
        assertTrue(true == true);
    }

    @Test
    public void testOptions1(){
        trip.options.units = "miles";
        trip.getTripDistances();
        assertEquals(3959, trip.options.unitRadius, 0.001);
        ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
        Collections.addAll(expectedDistances, 24, 41, 59);
        assertEquals(expectedDistances, trip.distances);
    }

    @Test
    public void testOptions2() {
        trip.options.units = "kilometers";
        trip.getTripDistances();
        assertEquals(6371, trip.options.unitRadius, 0.001);
        ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
        Collections.addAll(expectedDistances, 39, 65, 94);
        assertEquals(expectedDistances, trip.distances);
    }

    @Test
    public void testOptions3() {
        trip.options.units = "nautical miles";
        trip.getTripDistances();
        assertEquals(3440, trip.options.unitRadius, 0.001);
        ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
        Collections.addAll(expectedDistances, 21, 35, 51);
        assertEquals(expectedDistances, trip.distances);
    }

    @Test
    public void testOptions4() {
        trip.options.units = "user defined";
        trip.options.unitName = "accurate miles";
        trip.options.unitRadius = (float)3958.7613;
        trip.getTripDistances();
        assertEquals(3958.7613, trip.options.unitRadius, 0.001);
        ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
        Collections.addAll(expectedDistances, 24, 41, 59);
        assertEquals(expectedDistances, trip.distances);
    }

    @Test
    public void testOptions5() {
        trip.options.units = "user defined";
        trip.options.unitName = "bananas";
        trip.options.unitRadius = (float)35828571;
        trip.getTripDistances();
        assertEquals(35828571, trip.options.unitRadius, 1);
        ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
        Collections.addAll(expectedDistances, 218700, 367485, 530969);
        assertEquals(expectedDistances, trip.distances);
    }
}
