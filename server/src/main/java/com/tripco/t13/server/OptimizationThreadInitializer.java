package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import spark.Request;

import java.util.*;
import java.util.concurrent.*;

public class OptimizationThreadInitializer {
    Trip trip = null;
    boolean isCorrectFormat;

     OptimizationThreadInitializer(Trip trip) {
        this.trip = trip;
        isCorrectFormat = false;
        isCorrectFormat = validateTripRequestFormat(trip);
        String optimization = trip.options.optimization;
        if (optimization != null && (optimization.equals("short") || optimization.equals("shorter"))) {
            Set<Callable<int []>> threads = new HashSet<>();
            for (int i = 0; i < trip.places.size(); i++) {
                threads.add(new TripCalculate(i, trip));
            }

            int cores = Runtime.getRuntime().availableProcessors();
            ExecutorService executorService = Executors.newFixedThreadPool(cores);
            List<Future<int[]>> results;
            try {
                results = executorService.invokeAll(threads);

                executorService.shutdown();

                int shortestDistance = Integer.MAX_VALUE;
                int[] shortestTrip = new int[trip.places.size()];

                for (Future<int[]> places : results) {
                    int tempShortestDistance = places.get()[places.get().length - 1];
                    if (tempShortestDistance < shortestDistance) {
                        shortestDistance = tempShortestDistance;
                        shortestTrip = places.get();
                    }
                }

                ArrayList<Location> retainOriginalPlaces = new ArrayList<>(trip.places.size());
                retainOriginalPlaces.addAll(trip.places);

                for (int i = 0; i < trip.places.size(); i++) {
                    trip.places.set(i, retainOriginalPlaces.get(shortestTrip[i]));
                }

                trip.places.add(trip.places.get(0)); //Make it a round trip.
                trip.getTripDistances();
                trip.places.remove(trip.places.size() - 1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            //if(trip.places.get(0) != trip.places.get(trip.places.size()-1))
            trip.places.add(trip.places.get(0)); //Make it a round trip.
            trip.getTripDistances();
            trip.places.remove(trip.places.size()-1);
        }
    }

    OptimizationThreadInitializer(Request request) {
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());
        //Converting to a Java class
        Gson gson = new Gson();
        try {
            trip = gson.fromJson(requestBody, Trip.class);
            isCorrectFormat = validateTripRequestFormat(trip);

            String optimization = trip.options.optimization;
            if (optimization != null && (optimization.equals("short") || optimization.equals("shorter"))) {
                Set<Callable<int []>> threads = new HashSet<>();
                for (int i = 0; i < trip.places.size(); i++) {
                    threads.add(new TripCalculate(i, trip));
                }

                int cores = Runtime.getRuntime().availableProcessors();
                ExecutorService executorService = Executors.newFixedThreadPool(cores);
                List<Future<int[]>> results = executorService.invokeAll(threads);
                executorService.shutdown();

                int shortestDistance = Integer.MAX_VALUE;
                int[] shortestTrip = new int[trip.places.size()];

                for (Future<int[]> places : results) {
                    int tempShortestDistance = places.get()[places.get().length-1];
                    if(tempShortestDistance < shortestDistance) {
                        shortestDistance = tempShortestDistance;
                        shortestTrip = places.get();
                    }
                }

                ArrayList<Location> retainOriginalPlaces = new ArrayList<>(trip.places.size());
                retainOriginalPlaces.addAll(trip.places);

                for (int i = 0; i < trip.places.size(); i++) {
                    trip.places.set(i, retainOriginalPlaces.get(shortestTrip[i]));
                }

                trip.places.add(trip.places.get(0)); //Make it a round trip.
                trip.getTripDistances();
                trip.places.remove(trip.places.size()-1);
            } else {
                //if(trip.places.get(0) != trip.places.get(trip.places.size()-1))
                trip.places.add(trip.places.get(0)); //Make it a round trip.
                trip.getTripDistances();
                trip.places.remove(trip.places.size()-1);
            }
        } catch (Exception e) {
            isCorrectFormat = false;
        }
    }

    public boolean validateTripRequestFormat(Trip trip) {
        //check if format of request if correct: type:"trip", version 1 or 2 or 3 or 4
        if (
                Objects.equals(trip.type, "trip") &&
                        (trip.version <= 5) &&
                        trip.places != null && trip.options != null) {
            return true;
        }

        return false;
    }

    public String getTripJson () {
        Gson gson = new Gson();
        if(isCorrectFormat){
            return gson.toJson(trip);
        }
        else{
            return "{}"; //return {} if incorrect request format
        }
    }

}
