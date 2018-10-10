package com.tripco.t13.server;

import com.google.gson.Gson;

import java.util.Arrays;
import java.util.List;

public class Config {

  private short version = 3;
  private String type = "config";

  private List<String> units = Arrays.asList("miles","kilometers","nautical miles","user defined");
  private List<OptimizationConfig> optimization;

  static String getConfig() {
    Config conf = new Config();
    OptimizationConfig option1 = new OptimizationConfig();
    OptimizationConfig option2 = new OptimizationConfig();

    option1.label = "none";
    option1.description = "The trip is not optimized.";

    option2.label = "short";
    option2.description = "Nearest neighbor.";

    conf.optimization = Arrays.asList(option1, option2);

    Gson gson = new Gson();


    return gson.toJson(conf);
  }

}
