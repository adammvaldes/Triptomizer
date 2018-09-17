package com.tripco.t13.server;

public class Options {

    //public String user;
    public String units;
    public int radius;

    public Options(){
        units = "miles";
        radius = 3959;
    }

    public String toString(){
        return units + radius;
    }


}
