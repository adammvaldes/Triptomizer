package com.tripco.t13.server;

import com.google.gson.Gson;

import java.util.Arrays;
import java.util.List;

public class Config {

  private short version = 4;
  private String type = "config";

  private List<String> units = Arrays.asList("miles","kilometers","nautical miles","user defined");
  private List<OptimizationConfig> optimization;

  static String getConfig() {
    Config conf = new Config();
    OptimizationConfig option1 = new OptimizationConfig();
    OptimizationConfig option2 = new OptimizationConfig();
    OptimizationConfig option3 = new OptimizationConfig();

    option1.label = "none";
    option1.description = "The trip is not optimized.";

    option2.label = "short";
    option2.description = "Nearest neighbor.";

    option3.label = "shorter";
    option3.description = "2-opt.";

    conf.optimization = Arrays.asList(option1, option2, option3);

    Gson gson = new Gson();

    return gson.toJson(conf);
  }

}
