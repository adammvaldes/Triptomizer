package com.tripco.t13.server;

public class Options {

    //public String user;
    public String units = null;
    public String unitName = null;
    public Double unitRadius = null;
    public String optimization = null;
    public String map = null;

    public double getRadius(){
        switch (units) {
            case "user defined":
                return unitRadius;
            case "miles":
                return 3959.0;
            case "kilometers":
                return 6371.0;
            case "nautical miles":
                return 3440.0;
            default:
                this.units = "miles";
                return 3959.0; //undefined so return default miles
        }
    }
    public String toString(){
        return units+unitName + unitRadius;
    }
}
