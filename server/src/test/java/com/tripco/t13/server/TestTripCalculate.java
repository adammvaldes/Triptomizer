package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

@RunWith(JUnit4.class)
public class TestTripCalculate {
    Gson gson = new Gson();
    Trip trip;
    TripCalculate tripCalculate;
    Location l1 = new Location();
    Location l2 = new Location();
    Location l3 = new Location();

    @Before
    public void initialize() {
         String jsonStr ="{\n" +
                 "  \"type\": \"trip\",\n" +
                 "  \"title\": \"Colorado County Seats\",\n" +
                 "  \"version\": 4,\n" +
                 "  \"options\": {\n" +
                 "    \"units\":\"miles\",\n" +
                 "    \"optimization\": \"none\"\n" +
                 "  },\n" +
                 "  \"places\":\n" +
                 "  [\n" +
                 "    { \"id\": 1, \"county\": \"Adams County\", \"name\": \"Brighton\", \"latitude\": 39.87, \"longitude\": -104.33 },\n" +
                 "    { \"id\": 2, \"county\": \"Alamosa County\", \"name\": \"Alamosa\", \"latitude\": 37.57, \"longitude\": -105.79 },\n" +
                 "    { \"id\": 3, \"county\": \"Arapahoe County\", \"name\": \"Littleton\", \"latitude\": 39.64, \"longitude\": -104.33 },\n" +
                 "    { \"id\": 4, \"county\": \"Archuleta County\", \"name\": \"Pagosa Springs\", \"latitude\": 37.2, \"longitude\": -107.05 },\n" +
                 "    { \"id\": 5, \"county\": \"Baca County\", \"name\": \"Springfield\", \"latitude\": 37.3, \"longitude\": -102.54 },\n" +
                 "    { \"id\": 6, \"county\": \"Bent County\", \"name\": \"Las Animas\", \"latitude\": 37.93, \"longitude\": -103.08 },\n" +
                 "    { \"id\": 7, \"county\": \"Boulder County\", \"name\": \"Boulder\", \"latitude\": 40.09, \"longitude\": -105.4 },\n" +
                 "    { \"id\": 8, \"county\": \"County of Broomfield\", \"name\": \"Broomfield\", \"latitude\": 39.95, \"longitude\": -105.05 },\n" +
                 "    { \"id\": 9, \"county\": \"Chaffee County\", \"name\": \"Salida\", \"latitude\": 38.74, \"longitude\": -106.32 },\n" +
                 "    { \"id\": 10, \"county\": \"Cheyenne County\", \"name\": \"Cheyenne Wells\", \"latitude\": 38.84, \"longitude\": -102.6 },\n" +
                 "    { \"id\": 11, \"county\": \"Clear Creek County\", \"name\": \"Georgetown\", \"latitude\": 39.69, \"longitude\": -105.67 },\n" +
                 "    { \"id\": 12, \"county\": \"Conejos County\", \"name\": \"Conejos\", \"latitude\": 37.21, \"longitude\": -106.18 },\n" +
                 "    { \"id\": 13, \"county\": \"Costilla County\", \"name\": \"San Luis\", \"latitude\": 37.28, \"longitude\": -105.43 },\n" +
                 "    { \"id\": 14, \"county\": \"Crowley County\", \"name\": \"Ordway\", \"latitude\": 38.32, \"longitude\": -103.79 },\n" +
                 "    { \"id\": 15, \"county\": \"Custer County\", \"name\": \"Westcliffe\", \"latitude\": 38.1, \"longitude\": -105.37 },\n" +
                 "    { \"id\": 16, \"county\": \"Delta County\", \"name\": \"Delta\", \"latitude\": 38.86, \"longitude\": -107.86 },\n" +
                 "    { \"id\": 17, \"county\": \"County of Denver\", \"name\": \"Denver\", \"latitude\": 39.76, \"longitude\": -104.88 },\n" +
                 "    { \"id\": 18, \"county\": \"Dolores County\", \"name\": \"Dove Creek\", \"latitude\": 37.75, \"longitude\": -108.53 },\n" +
                 "    { \"id\": 19, \"county\": \"Douglas County\", \"name\": \"Castle Rock\", \"latitude\": 39.33, \"longitude\": -104.93 },\n" +
                 "    { \"id\": 20, \"county\": \"Eagle County\", \"name\": \"Eagle\", \"latitude\": 39.63, \"longitude\": -106.69 },\n" +
                 "    { \"id\": 21, \"county\": \"Elbert County\", \"name\": \"Kiowa\", \"latitude\": 39.31, \"longitude\": -104.12 },\n" +
                 "    { \"id\": 22, \"county\": \"El Paso County\", \"name\": \"Colorado Springs\", \"latitude\": 38.83, \"longitude\": -104.53 },\n" +
                 "    { \"id\": 23, \"county\": \"Fremont County\", \"name\": \"Canon City\", \"latitude\": 38.46, \"longitude\": -105.42 },\n" +
                 "    { \"id\": 24, \"county\": \"Garfield County\", \"name\": \"Glenwood Springs\", \"latitude\": 39.6, \"longitude\": -107.91 },\n" +
                 "    { \"id\": 25, \"county\": \"Gilpin County\", \"name\": \"Central City\", \"latitude\": 39.86, \"longitude\": -105.53 },\n" +
                 "    { \"id\": 26, \"county\": \"Grand County\", \"name\": \"Hot Sulphur Springs\", \"latitude\": 40.12, \"longitude\": -106.1 },\n" +
                 "    { \"id\": 27, \"county\": \"Gunnison County\", \"name\": \"Gunnison\", \"latitude\": 38.67, \"longitude\": -107.08 },\n" +
                 "    { \"id\": 28, \"county\": \"Hinsdale County\", \"name\": \"Lake City\", \"latitude\": 37.81, \"longitude\": -107.38 },\n" +
                 "    { \"id\": 29, \"county\": \"Huerfano County\", \"name\": \"Walsenburg\", \"latitude\": 37.69, \"longitude\": -104.96 },\n" +
                 "    { \"id\": 30, \"county\": \"Jackson County\", \"name\": \"Walden\", \"latitude\": 40.66, \"longitude\": -106.33 },\n" +
                 "    { \"id\": 31, \"county\": \"Jefferson County\", \"name\": \"Golden\", \"latitude\": 39.59, \"longitude\": -105.25 },\n" +
                 "    { \"id\": 32, \"county\": \"Kiowa County\", \"name\": \"Eads\", \"latitude\": 38.39, \"longitude\": -102.76 },\n" +
                 "    { \"id\": 33, \"county\": \"Kit Carson County\", \"name\": \"Burlington\", \"latitude\": 39.31, \"longitude\": -102.6 },\n" +
                 "    { \"id\": 34, \"county\": \"Lake County\", \"name\": \"Leadville\", \"latitude\": 39.2, \"longitude\": -106.35 },\n" +
                 "    { \"id\": 35, \"county\": \"La Plata County\", \"name\": \"Durango\", \"latitude\": 37.29, \"longitude\": -107.84 },\n" +
                 "    { \"id\": 36, \"county\": \"Larimer County\", \"name\": \"Fort Collins\", \"latitude\": 40.66, \"longitude\": -105.48 },\n" +
                 "    { \"id\": 37, \"county\": \"Las Animas County\", \"name\": \"Trinidad\", \"latitude\": 37.32, \"longitude\": -104.04 },\n" +
                 "    { \"id\": 38, \"county\": \"Lincoln County\", \"name\": \"Hugo\", \"latitude\": 38.99, \"longitude\": -103.51 },\n" +
                 "    { \"id\": 39, \"county\": \"Logan County\", \"name\": \"Sterling\", \"latitude\": 40.73, \"longitude\": -103.09 },\n" +
                 "    { \"id\": 40, \"county\": \"Mesa County\", \"name\": \"Grand Junction\", \"latitude\": 39.02, \"longitude\": -108.46 },\n" +
                 "    { \"id\": 41, \"county\": \"Mineral County\", \"name\": \"Creede\", \"latitude\": 37.65, \"longitude\": -106.93 },\n" +
                 "    { \"id\": 42, \"county\": \"Moffat County\", \"name\": \"Craig\", \"latitude\": 40.57, \"longitude\": -108.2 },\n" +
                 "    { \"id\": 43, \"county\": \"Montezuma County\", \"name\": \"Cortez\", \"latitude\": 37.34, \"longitude\": -108.6 },\n" +
                 "    { \"id\": 44, \"county\": \"Montrose County\", \"name\": \"Montrose\", \"latitude\": 38.41, \"longitude\": -108.26 },\n" +
                 "    { \"id\": 45, \"county\": \"Morgan County\", \"name\": \"Fort Morgan\", \"latitude\": 40.26, \"longitude\": -103.81 },\n" +
                 "    { \"id\": 46, \"county\": \"Otero County\", \"name\": \"La Junta\", \"latitude\": 37.88, \"longitude\": -103.72 },\n" +
                 "    { \"id\": 47, \"county\": \"Ouray County\", \"name\": \"Ouray\", \"latitude\": 38.15, \"longitude\": -107.77 },\n" +
                 "    { \"id\": 48, \"county\": \"Park County\", \"name\": \"Fairplay\", \"latitude\": 39.12, \"longitude\": -105.72 },\n" +
                 "    { \"id\": 49, \"county\": \"Phillips County\", \"name\": \"Holyoke\", \"latitude\": 40.59, \"longitude\": -102.35 },\n" +
                 "    { \"id\": 50, \"county\": \"Pitkin County\", \"name\": \"Aspen\", \"latitude\": 39.22, \"longitude\": -106.92 },\n" +
                 "    { \"id\": 51, \"county\": \"Prowers County\", \"name\": \"Lamar\", \"latitude\": 37.96, \"longitude\": -102.39 },\n" +
                 "    { \"id\": 52, \"county\": \"Pueblo County\", \"name\": \"Pueblo\", \"latitude\": 38.17, \"longitude\": -104.49 },\n" +
                 "    { \"id\": 53, \"county\": \"Rio Blanco County\", \"name\": \"Meeker\", \"latitude\": 39.97, \"longitude\": -108.2 },\n" +
                 "    { \"id\": 54, \"county\": \"Rio Grande County\", \"name\": \"Del Norte\", \"latitude\": 37.49, \"longitude\": -106.45 },\n" +
                 "    { \"id\": 55, \"county\": \"Routt County\", \"name\": \"Steamboat Springs\", \"latitude\": 40.48, \"longitude\": -106.99 },\n" +
                 "    { \"id\": 56, \"county\": \"Saguache County\", \"name\": \"Saguache\", \"latitude\": 38.03, \"longitude\": -106.25 },\n" +
                 "    { \"id\": 57, \"county\": \"San Juan County\", \"name\": \"Silverton\", \"latitude\": 37.78, \"longitude\": -107.67 },\n" +
                 "    { \"id\": 58, \"county\": \"San Miguel County\", \"name\": \"Telluride\", \"latitude\": 38.01, \"longitude\": -108.43 },\n" +
                 "    { \"id\": 59, \"county\": \"Sedgwick County\", \"name\": \"Julesburg\", \"latitude\": 40.87, \"longitude\": -102.36 },\n" +
                 "    { \"id\": 60, \"county\": \"Summit County\", \"name\": \"Breckenridge\", \"latitude\": 39.62, \"longitude\": -106.14 },\n" +
                 "    { \"id\": 61, \"county\": \"Teller County\", \"name\": \"Cripple Creek\", \"latitude\": 38.87, \"longitude\": -105.18 },\n" +
                 "    { \"id\": 62, \"county\": \"Washington County\", \"name\": \"Akron\", \"latitude\": 39.97, \"longitude\": -103.21 },\n" +
                 "    { \"id\": 63, \"county\": \"Weld County\", \"name\": \"Greeley\", \"latitude\": 40.56, \"longitude\": -104.38 },\n" +
                 "    { \"id\": 64, \"county\": \"Yuma County\", \"name\": \"Wray\", \"latitude\": 40, \"longitude\": -102.42 }\n" +
                 "  ]\n" +
                 "}\n";

        trip = gson.fromJson(jsonStr, Trip.class);
        tripCalculate = new TripCalculate(trip);
    }

    @Test
    public void testShortOptimization() {
        if (tripCalculate.trip.options.optimization != null && (tripCalculate.trip.options.optimization.equals("short") || tripCalculate.trip.options.optimization.equals("shorter"))) {
            tripCalculate.shortOptimization();
        }
        System.out.println("Newly optimized trip: ");
        int totalDist = 0;
        for (Location location : tripCalculate.trip.places) {
            System.out.print(location.name + " --> ");
        }
        System.out.println("\n\nTotal distance for trip: ");
        ArrayList<Integer> distances = tripCalculate.trip.getTripDistances();

        for (Integer distance: distances) {
            totalDist += distance;
        }
        System.out.println(totalDist);
    }

    @Test
    public void testDrawVector() {
        double mapW = 1066.6073, mapH = 783.0824, mapLat = 41.0007, mapLon = -109.0500, buffer = 36, lonRatio = 30.595
                , latRatio = 23.0069, pixPerLat = 177.4202, pixPerLon = 142.02183;

        String jsonStr ="{\n" +
                "  \"type\": \"trip\",\n" +
                "  \"title\": \"Colorado County Seats\",\n" +
                "  \"version\": 3,\n" +
                "  \"options\": {\n" +
                "    \"units\":\"miles\",\n" +
                "    \"optimization\": \"none\"\n" +
                "  },\n" +
                "  \"places\":\n" +
                "  [\n" +
                "    { \"id\": 1, \"county\": \"Adams County\", \"name\": \"Brighton\", \"latitude\": 39.87, \"longitude\": -104.33 }\n" +
                "  ]\n" +
                "}\n";

        trip = gson.fromJson(jsonStr, Trip.class);
        tripCalculate = new TripCalculate(trip);

        String actualDrawVectorOutput = tripCalculate.drawVector(tripCalculate.trip);

        double trip1Lon = tripCalculate.trip.places.get(0).longitude, trip1Lat = tripCalculate.trip.places.get(0).latitude;
        String expectedDrawVectorOutput =         "<line x1=\"" + ((trip1Lon - mapLon) * pixPerLon + buffer) +
                "\" y1=\"" + ((trip1Lat - mapLat) * -pixPerLat + buffer) +
                "\" x2=\"" + ((trip1Lon - mapLon) * pixPerLon + buffer) +
                "\" y2=\"" + ((trip1Lat - mapLat) * -pixPerLat + buffer) +
                "\" style=\"stroke:rgb(255,0,0);stroke-width:2\" />";

        assertEquals(expectedDrawVectorOutput, actualDrawVectorOutput);

        jsonStr ="{\n" +
                "  \"type\": \"trip\",\n" +
                "  \"title\": \"Colorado County Seats\",\n" +
                "  \"version\": 3,\n" +
                "  \"options\": {\n" +
                "    \"units\":\"miles\",\n" +
                "    \"optimization\": \"none\"\n" +
                "  },\n" +
                "  \"places\":\n" +
                "  [\n" +
                "    { \"id\": 1, \"county\": \"Adams County\", \"name\": \"Brighton\", \"latitude\": 39.87, \"longitude\": -104.33 },\n" +
                "    { \"id\": 34, \"county\": \"Lake County\", \"name\": \"Leadville\", \"latitude\": 39.2, \"longitude\": -106.35 }\n" +
                "  ]\n" +
                "}\n";

        trip = gson.fromJson(jsonStr, Trip.class);
        tripCalculate = new TripCalculate(trip);


        double trip2Lon = tripCalculate.trip.places.get(1).longitude, trip2Lat = tripCalculate.trip.places.get(1).latitude;

        expectedDrawVectorOutput = "<line x1=\"" + ((trip1Lon - mapLon) * pixPerLon + buffer) +
                "\" y1=\"" + ((trip1Lat - mapLat) * -pixPerLat + buffer) +
                "\" x2=\"" + ((trip2Lon - mapLon) * pixPerLon + buffer) +
                "\" y2=\"" + ((trip2Lat - mapLat) * -pixPerLat + buffer) +
                "\" style=\"stroke:rgb(255,0,0);stroke-width:2\" />";

        expectedDrawVectorOutput += "<line x1=\"" + ((trip2Lon - mapLon) * pixPerLon + buffer) +
                "\" y1=\"" + ((trip2Lat - mapLat) * -pixPerLat + buffer) +
                "\" x2=\"" + ((trip1Lon - mapLon) * pixPerLon + buffer) +
                "\" y2=\"" + ((trip1Lat - mapLat) * -pixPerLat + buffer) +
                "\" style=\"stroke:rgb(255,0,0);stroke-width:2\" />";

        actualDrawVectorOutput = tripCalculate.drawVector(tripCalculate.trip);
        assertEquals(expectedDrawVectorOutput, actualDrawVectorOutput);
    }


    @Test
    public void testSetMap() {
        String jsonStr = "{\n" +
                "  \"type\": \"trip\",\n" +
                "  \"title\": \"Colorado County Seats\",\n" +
                "  \"version\": 4,\n" +
                "  \"options\": {\n" +
                "    \"units\":\"miles\",\n" +
                "    \"optimization\": \"none\"\n" +
                "  },\n" +
                "  \"places\":\n" +
                "  [\n" +
                "    { \"id\": 1, \"county\": \"Adams County\", \"name\": \"Brighton\", \"latitude\": 39.87, \"longitude\": -104.33 },\n" +
                "    { \"id\": 34, \"county\": \"Lake County\", \"name\": \"Leadville\", \"latitude\": 39.2, \"longitude\": -106.35 }\n" +
                "  ]\n" +
                "}\n";

        trip = gson.fromJson(jsonStr, Trip.class);
        tripCalculate = new TripCalculate(trip);

        String mapVectors = tripCalculate.drawVector(tripCalculate.trip);

        BufferedReader read;
        try {
            read = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/CObackground.svg")));
        }
        catch(Exception e){
            return;
        }

        String temp = "";
        String expectedSetMapResult = "";
        try {
            while((temp = read.readLine()) != null){
                if (temp.equals("</svg>")) {
                    expectedSetMapResult += mapVectors;
                }
                expectedSetMapResult += temp;
            }
        }
        catch(Exception e){

        }


        tripCalculate.setMap();
        assertEquals(expectedSetMapResult, tripCalculate.trip.map);

    }

    @Test
    public void testValidateTripRequestFormat() {
        String jsonStr = "{\n" +
                "  \"type\": \"trip\",\n" +
                "  \"title\": \"Colorado County Seats\",\n" +
                "  \"version\": 4,\n" +
                "  \"options\": {\n" +
                "    \"units\":\"miles\",\n" +
                "    \"optimization\": \"none\"\n" +
                "  },\n" +
                "  \"places\":\n" +
                "  [\n" +
                "    { \"id\": 1, \"county\": \"Adams County\", \"name\": \"Brighton\", \"latitude\": 39.87, \"longitude\": -104.33 },\n" +
                "    { \"id\": 34, \"county\": \"Lake County\", \"name\": \"Leadville\", \"latitude\": 39.2, \"longitude\": -106.35 }\n" +
                "  ]\n" +
                "}\n";

        trip = gson.fromJson(jsonStr, Trip.class);

        tripCalculate = new TripCalculate(trip);

        assert(tripCalculate.validateTripRequestFormat(trip));

        jsonStr =  "{\n" +
                "  \"type\": \"bananas\",\n" +
                "  \"title\": \"Colorado County Seats\",\n" +
                "  \"version\": 0,\n" +
                "  \"options\": {\n" +
                "    \"units\":\"miles\",\n" +
                "    \"optimization\": \"none\"\n" +
                "  },\n" +
                "  \"places\":\n" +
                "  [\n" +
                "    { \"id\": 1, \"county\": \"Adams County\", \"name\": \"Brighton\", \"latitude\": 39.87, \"longitude\": -104.33 },\n" +
                "    { \"id\": 34, \"county\": \"Lake County\", \"name\": \"Leadville\", \"latitude\": 39.2, \"longitude\": -106.35 }\n" +
                "  ]\n" +
                "}\n";

        trip = gson.fromJson(jsonStr, Trip.class);

        tripCalculate = new TripCalculate(trip);

        assert(!tripCalculate.validateTripRequestFormat(trip));
    }

    @Test
    public void testGetTripJson() {
        String jsonStr = "{\n" +
                "  \"type\": \"trip\",\n" +
                "  \"title\": \"Colorado County Seats\",\n" +
                "  \"version\": 4,\n" +
                "  \"options\": {\n" +
                "    \"units\":\"miles\",\n" +
                "    \"optimization\": \"none\"\n" +
                "  },\n" +
                "  \"places\":\n" +
                "  [\n" +
                "    { \"id\": 1, \"county\": \"Adams County\", \"name\": \"Brighton\", \"latitude\": 39.87, \"longitude\": -104.33 },\n" +
                "    { \"id\": 34, \"county\": \"Lake County\", \"name\": \"Leadville\", \"latitude\": 39.2, \"longitude\": -106.35 }\n" +
                "  ]\n" +
                "}\n";

        trip = gson.fromJson(jsonStr, Trip.class);

        tripCalculate = new TripCalculate(trip);

        assert(!tripCalculate.getTripJson().equals("{}"));
    }
}
