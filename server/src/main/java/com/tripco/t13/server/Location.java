package com.tripco.t13.server;

public class Location {

    public float latitude;
    public float longitude;
    public String name;


    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }
    public void setLongitude(float longitude){
        this.longitude = longitude;
    }
    public void setName(String name){
        this.name = name;
    }

    public Location(){

    }

    public float getLatitude(){ return latitude; }
    public float getLongitude(){ return longitude; }
}
