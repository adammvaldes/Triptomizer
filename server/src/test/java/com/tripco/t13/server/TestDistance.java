package com.tripco.t13.server;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Distance class.
 */
@RunWith(JUnit4.class)
public class TestDistance {
    Distance distance;

    // Setup to be done before every test in TestTrip
    @Before
    public void initialize(){
        distance = new Distance();
        distance.origin = new Location();
        distance.destination = new Location();
        distance.origin.latitude = 40.5853;
        distance.origin.longitude = -105.0844;
        distance.destination.latitude = -33.8688;
        distance.destination.longitude = 151.2093;
        distance.origin.name = "Fort Collins, Colorado, USA";
        distance.destination.name = "Sydney, New South Wales, Australia";
    }

    @Test
    public void testTrue() {
        // assertTrue checks if a statement is true
        assertTrue(true == true);
    }

    @Test
    public void testMiles(){
        distance.units = "miles";
        //distance.getRadius(distance.units);
        long testDistance = Distance.getDistanceNum(distance.origin.latitude, distance.origin.longitude, distance.destination.latitude, distance.destination.longitude, distance.getRadius(distance.units));
        assertEquals(8347, testDistance);
    }

    @Test
    public void testKilometers(){
        distance.units = "kilometers";
        //distance.getRadius(distance.units);
        long testDistance = Distance.getDistanceNum(distance.origin.latitude, distance.origin.longitude, distance.destination.latitude, distance.destination.longitude, distance.getRadius(distance.units));
        assertEquals(13432, testDistance);
    }

    @Test
    public void testNauticalMiles(){
        distance.units = "nautical miles";
        //distance.getRadius(distance.units);
        long testDistance = Distance.getDistanceNum(distance.origin.latitude, distance.origin.longitude, distance.destination.latitude, distance.destination.longitude, distance.getRadius(distance.units));
        assertEquals(7252, testDistance);
    }

    @Test
    public void testUserDefined1(){
        distance.units = "user defined";
        distance.unitName = "meters";
        distance.unitRadius = 6371000.0;
        //distance.getRadius(distance.units);
        long testDistance = Distance.getDistanceNum(distance.origin.latitude, distance.origin.longitude, distance.destination.latitude, distance.destination.longitude, distance.getRadius(distance.units));
        assertEquals(13431841, testDistance);
    }

    @Test
    public void testUserDefined2(){
        distance.units = "user defined";
        distance.unitName = "feet";
        distance.unitRadius = 20903520.0;
        //distance.getRadius(distance.units);
        long testDistance = Distance.getDistanceNum(distance.origin.latitude, distance.origin.longitude, distance.destination.latitude, distance.destination.longitude, distance.getRadius(distance.units));
        assertEquals(44070438, testDistance);
    }

    @Test
    public void testGetRadius(){
        String units = "miles";
        double answer = distance.getRadius(units);
        assertEquals(3959, answer, 0.0);

        units = "kilometers";
        answer = distance.getRadius(units);
        assertEquals(6371, answer, 0.0);

        units = "nautical miles";
        answer = distance.getRadius(units);
        assertEquals(3440, answer, 0.0);

        units = "user defined";
        distance.unitRadius = 1234.0;
        answer = distance.getRadius(units);
        assertEquals(1234, answer, 0.0);
    }

}
