package com.tripco.t13.server;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

@RunWith(JUnit4.class)

public class TestShortAlgorithm {
    ShortOptimization shortOptimization;
    ArrayList<Location> places = new ArrayList<>();
    String units;
    Location place1 = new Location();
    Location place2 = new Location();
    Location place3 = new Location();
    Location place4 = new Location();

    @Before
    public void initialize() {
        units = "kilometers";

        place1.id = "test1";
        place1.name = "Origin";
        place1.latitude = (float)40.5853;
        place1.longitude = (float)-105.0844;

        place2.id = "tst2";
        place2.name = "longAwayFromOrigin";
        place2.latitude = (float)36.9932;
        place2.longitude = (float)-102.0420;

        place3.id = "tst3";
        place3.name = "midPointOnMap";
        place3.latitude = (float)37.5;
        place3.longitude = (float)-103.5;

        place4.id = "tst4";
        place4.name = "closeToOrigin";
        place4.latitude = (float)40;
        place4.longitude = (float)-104.8;

        places.add(place1);
        places.add(place2);
        places.add(place3);
        places.add(place4);

        shortOptimization = new ShortOptimization(units, places);
    }

    @Test
    public void dummyTest() {
        assert(true == true);
        assertEquals(4,4);
    }

    @Test
    public void testTravelingSalesman() {
        ArrayList<Location> sortedPlaces = new ArrayList<>();
        sortedPlaces = shortOptimization.travelingSalesman(places, place1, units);

        assertEquals("Origin", sortedPlaces.get(0).name);
        assertEquals("closeToOrigin", sortedPlaces.get(1).name);
        assertEquals("midPointOnMap", sortedPlaces.get(2).name);
        assertEquals("longAwayFromOrigin", sortedPlaces.get(3).name);

        sortedPlaces = shortOptimization.travelingSalesman(places, place3, units);
        assertEquals("midPointOnMap", sortedPlaces.get(0).name);
        assertEquals("longAwayFromOrigin", sortedPlaces.get(1).name);
        assertEquals("closeToOrigin", sortedPlaces.get(2).name);
        assertEquals("Origin", sortedPlaces.get(3).name);
    }

    @Test
    public void testCalculateDistances() {
        ArrayList<Location> places = new ArrayList<>();
        Location origin = place1; //Fort Collins

        Location denver = new Location();
        denver.id = "dnv";
        denver.name = "Denver";
        denver.latitude = (float)39.7392;
        denver.longitude = (float)-104.9903;

        Location coSprings = new Location();
        coSprings.id = "cspr";
        coSprings.name = "Colorado Springs";
        coSprings.latitude = (float)38.8339;
        coSprings.longitude = (float) -104.8214;

        places.add(origin);
        places.add(denver);
        places.add(coSprings);

        boolean[] visitedPlaces = new boolean[places.size()];
        Location shortestLocation = shortOptimization.calculateDistances(origin, places, units, visitedPlaces);

        assertEquals("Denver", shortestLocation.name); //Foco is closer to Denver than coSprings

        Location castleRock = new Location();
        castleRock.id = "cstlrk";
        castleRock.name = "Castle Rock";
        castleRock.latitude = (float)39.3722;
        castleRock.longitude = (float)-104.8561;

        places = new ArrayList<>();
        places.add(origin);
        places.add(castleRock);
        places.add(denver);
        places.add(coSprings);
        visitedPlaces = new boolean[places.size()];

        shortestLocation = shortOptimization.calculateDistances(castleRock, places, units, visitedPlaces);

        assertEquals("Denver", shortestLocation.name);

        shortestLocation = shortOptimization.calculateDistances(coSprings, places, units, visitedPlaces);

        assertEquals("Castle Rock", shortestLocation.name);
    }

}
