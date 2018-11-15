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

    ArrayList<Location> places = new ArrayList<>();
    Options options;
    Location place1 = new Location();
    Location place2 = new Location();
    Location place3 = new Location();
    Location place4 = new Location();
    int[][] distanceLibrary = null;
    int[] pointerPlaces = null;
    @Before
    public void initialize() {
        options = new Options();
        options.units = "Kilometers";

        place1.id = "test1";
        place1.name = "Origin";
        place1.latitude = 40.5853;
        place1.longitude = -105.0844;

        place2.id = "tst2";
        place2.name = "longAwayFromOrigin";
        place2.latitude = 36.9932;
        place2.longitude = -102.0420;

        place3.id = "tst3";
        place3.name = "midPointOnMap";
        place3.latitude = 37.5;
        place3.longitude = -103.5;

        place4.id = "tst4";
        place4.name = "closeToOrigin";
        place4.latitude = 40;
        place4.longitude = -104.8;

        places.add(place1);
        places.add(place2);
        places.add(place3);
        places.add(place4);

        distanceLibrary = new int[places.size()][places.size()];
        for (int i = 0; i < places.size(); i++) {
            for (int k = 0; k < places.size(); k++) {
                distanceLibrary[i][k] = Distance.getDistanceNum(places, i, k, options.getRadius());
            }
        }
        pointerPlaces = new int[places.size() + 1];
        for (int i = 0; i < pointerPlaces.length - 1; i++) {
            pointerPlaces[i] = i;
        }
        pointerPlaces[pointerPlaces.length - 1] = pointerPlaces[0];
    }

    @Test
    public void dummyTest() {
        assert(true == true);
        assertEquals(4,4);
    }

    @Test
    public void testTravelingSalesman() {
        pointerPlaces = ShortOptimization.travelingSalesman(places.indexOf(place1), places, distanceLibrary, pointerPlaces);

        assertEquals("Origin", places.get(pointerPlaces[0]).name);
        assertEquals("closeToOrigin", places.get(pointerPlaces[1]).name);
        assertEquals("midPointOnMap", places.get(pointerPlaces[2]).name);
        assertEquals("longAwayFromOrigin", places.get(pointerPlaces[3]).name);

        for (int i = 0; i < pointerPlaces.length - 1; i++) {
            pointerPlaces[i] = i;
        }
        pointerPlaces[pointerPlaces.length - 1] = pointerPlaces[0];
        pointerPlaces = ShortOptimization.travelingSalesman(places.indexOf(place3), places, distanceLibrary, pointerPlaces);
        assertEquals("midPointOnMap", places.get(pointerPlaces[0]).name);
        assertEquals("longAwayFromOrigin", places.get(pointerPlaces[1]).name);
        assertEquals("closeToOrigin", places.get(pointerPlaces[2]).name);
        assertEquals("Origin", places.get(pointerPlaces[3]).name);
    }

    @Test
    public void testCalculateDistances() {
        ArrayList<Location> places = new ArrayList<>();
        Location origin = place1; //Fort Collins

        Location denver = new Location();
        denver.id = "dnv";
        denver.name = "Denver";
        denver.latitude = 39.7392;
        denver.longitude = -104.9903;

        Location coSprings = new Location();
        coSprings.id = "cspr";
        coSprings.name = "Colorado Springs";
        coSprings.latitude = 38.8339;
        coSprings.longitude = -104.8214;

        places.add(origin);
        places.add(denver);
        places.add(coSprings);

        distanceLibrary = new int[places.size()][places.size()];
        for (int i = 0; i < places.size(); i++) {
            for (int k = 0; k < places.size(); k++) {
                distanceLibrary[i][k] = Distance.getDistanceNum(places, i, k, options.getRadius());
            }
        }

        boolean[] visitedPlaces = new boolean[places.size()];
        for (int i = 0; i < pointerPlaces.length - 1; i++) {
            pointerPlaces[i] = i;
        }
        pointerPlaces[pointerPlaces.length - 1] = pointerPlaces[0];

        int shortestLocation = ShortOptimization.calculateDistances(places.indexOf(origin), visitedPlaces, distanceLibrary, pointerPlaces);

        assertEquals("Denver", places.get(shortestLocation).name); //Foco is closer to Denver than coSprings

        Location castleRock = new Location();
        castleRock.id = "cstlrk";
        castleRock.name = "Castle Rock";
        castleRock.latitude = 39.3722;
        castleRock.longitude = -104.8561;

        places = new ArrayList<>();
        places.add(origin);
        places.add(castleRock);
        places.add(denver);
        places.add(coSprings);
        visitedPlaces = new boolean[places.size()];
        distanceLibrary = new int[places.size()][places.size()];
        for (int i = 0; i < places.size(); i++) {
            for (int k = 0; k < places.size(); k++) {
                distanceLibrary[i][k] = Distance.getDistanceNum(places, i, k, options.getRadius());
            }
        }

        for (int i = 0; i < pointerPlaces.length - 1; i++) {
            pointerPlaces[i] = i;
        }
        pointerPlaces[pointerPlaces.length - 1] = pointerPlaces[0];
        shortestLocation = ShortOptimization.calculateDistances(places.indexOf(castleRock), visitedPlaces, distanceLibrary, pointerPlaces);

        assertEquals("Denver", places.get(shortestLocation).name);

        for (int i = 0; i < pointerPlaces.length - 1; i++) {
            pointerPlaces[i] = i;
        }
        pointerPlaces[pointerPlaces.length - 1] = pointerPlaces[0];

        shortestLocation = ShortOptimization.calculateDistances(places.indexOf(coSprings), visitedPlaces, distanceLibrary, pointerPlaces);

        assertEquals("Castle Rock", places.get(shortestLocation).name);
    }

}
