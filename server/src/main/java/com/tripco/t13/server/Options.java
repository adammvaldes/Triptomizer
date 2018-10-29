package com.tripco.t13.server;

public class Options {

    //public String user;
    public String units = null;
    public String unitName = null;
    public Double unitRadius = null;
    public String optimization = null;


    public void setOptions(){
        if(units.equals("user defined")){
            return;
        }
        if (units.equals("miles")){
            unitRadius = 3959.0;
            unitName = "miles";
            return;
        }
        if (units.equals("kilometers")){
            unitRadius = 6371.0;
            unitName = "kilometers";
            return;
        }
        if (units.equals("nautical miles")){
            unitRadius = 3440.0;
            unitName = "nautical miles";
            return;
        }
        units = "miles";
        unitName = units;
        unitRadius = 3959.0;
    }


    public String toString(){
        return units+unitName + unitRadius;
    }


}
