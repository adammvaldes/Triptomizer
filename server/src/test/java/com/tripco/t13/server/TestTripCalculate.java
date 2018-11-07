package com.tripco.t13.server;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
         String jsonStr = "{\n" +
                 "\t\"type\": \"trip\",\n" +
                 "\t\"version\": 4,\n" +
                 "\t\"title\": \"World Beer Tour\",\n" +
                 " \"options\":{\"units\":\"miles\",\"optimization\":\"short\"},\t\"places\": [\n" +
                 "    {\"country\": \"Albania\", \"id\": \"pt\", \"name\": \"Bräuhaus\", \"latitude\": 41.32396, \"longitude\": 19.81658}\n" +
                 "    ,{\"country\": \"Algeria\", \"id\":\"shoulton\", \"name\": \"Brasserie Star d'Algerie\", \"latitude\": 36.668984, \"longitude\": 4.849482}\n" +
                 "    ,{\"country\": \"Andorra\", \"id\": \"anthos\", \"name\": \"Cervesa Alpha\", \"latitude\": 42.569283, \"longitude\": 1.489231}\n" +
                 "    ,{\"country\": \"Angola\", \"id\":\"ehharris\", \"name\": \"Pela Cuca (BGI)\", \"latitude\": -8.83682, \"longitude\": 13.23432}\n" +
                 "    ,{\"country\": \"Antigua and Barbuda\", \"id\":\"aceriver\", \"name\": \"2SIX8 Craft Brewery\", \"latitude\": 17.02301944, \"longitude\": 61.76833333}\n" +
                 "    ,{\"country\": \"Argentina\", \"id\": \"alexenth\", \"name\": \"The Sexton Beer Company\", \"latitude\": -34.6151, \"longitude\": -58.3731}\n" +
                 "     ,{\"country\": \"Armenia\", \"id\": \"jmpumuro\", \"name\": \"Dargett Craft Beer\", \"latitude\": 40.183666, \"longitude\": 44.508327}\n" +
                 "    ,{\"country\": \"Australia\", \"id\":\"leejr\", \"name\": \"Nail Brewing Australia\", \"latitude\": -31.904894, \"longitude\": 115.930847}\t\n" +
                 "    ,{\"country\": \"Austria\", \"id\":\"jeskea\", \"name\": \"Muttermilch Vienna Brewery\", \"latitude\": 48.1155, \"longitude\": 16.2130}\n" +
                 "    ,{\"country\": \"Azerbaijan\", \"id\":\"alxbly\", \"name\": \"Baltika-Baku (Xirdalan)\", \"latitude\": 40.2628, \"longitude\": 49.4513}\n" +
                 "    ,{\"country\": \"Barbados\", \"id\": \"erpalmer\", \"name\": \"Banks Beer Brewery Tour\", \"latitude\": 13.0816, \"longitude\": 59.5377}\t\t\n" +
                 "    ,{\"country\": \"Belgium\", \"id\": \"davematt\", \"name\": \"Delirium Café\", \"latitude\": 50.848412, \"longitude\": 4.353992}\n" +
                 "    ,{\"country\": \"Bolivia\", \"id\": \"kdeming\", \"name\": \"Sureña\", \"latitude\": -19.039575, \"longitude\": -65.267666}\n" +
                 "    ,{\"country\": \"Brazil\", \"id\": \"reiteraj\", \"name\": \"Eisenbahn\", \"latitude\": 26.89194444, \"longitude\": 49.12916667}\n" +
                 "    ,{\"country\": \"Bulgaria\", \"id\": \"agenchev\", \"name\": \"Zlatna Varna\", \"latitude\": 43.2001, \"longitude\": 29.7129}\n" +
                 "    ,{\"country\": \"Cambodia\", \"id\": \"dwells\", \"name\": \"Kingdom Breweries\", \"latitude\": 11.5952, \"longitude\": 104.9182}\n" +
                 "    ,{\"country\": \"Canada\", \"id\": \"psghotge\", \"name\": \"Big Rock Brewery\", \"latitude\": 50.984444, \"longitude\": -113.954722}\n" +
                 "    ,{\"country\": \"Chile\", \"id\": \"mjshen\", \"name\": \"Chester Beer\", \"latitude\": -41.29166667, \"longitude\": -72.98416667}\t\t\n" +
                 "    ,{\"country\": \"China\", \"id\": \"jtaugust\", \"name\": \"Great Leap Brewing\", \"latitude\": 39.939718, \"longitude\": 116.435978}\n" +
                 "    ,{\"country\": \"Colombia\", \"id\": \"dmcruz\", \"name\": \"Bogota Beer Company\", \"latitude\": 4.694089, \"longitude\": -74.086128}\n" +
                 "    ,{\"country\": \"Commonwealth of The Bahamas\", \"id\": \"jsiler\", \"name\": \"The Bahamian Brewery\", \"latitude\": 26.5239, \"longitude\": -78.7377}\n" +
                 "    ,{\"country\": \"Costa Rica\", \"id\": \"jksctwkr\", \"name\": \"Fuego Brew Company\", \"latitude\": 9.25416667, \"longitude\":  83.86500000}\n" +
                 "    ,{\"country\": \"Croatia\", \"id\": \"vnnguyen\", \"name\": \"Carlsberg Croatia Brewery\", \"latitude\": 46.187900, \"longitude\": 16.841077}\n" +
                 "    ,{\"country\": \"Czech Republic\", \"id\":\"rmil\", \"name\": \"U Fleků\", \"latitude\": 50.0788, \"longitude\": 14.4172}\n" +
                 "    ,{\"country\": \"Denmark\", \"id\": \"lwillman\", \"name\": \"BRUS\", \"latitude\": 55.692178, \"longitude\": 12.556123}\n" +
                 "    ,{\"country\": \"Dominican Republic\", \"id\": \"zacmarqu\", \"name\": \"Republica Brewing\", \"latitude\": 28.233, \"longitude\": 53.867}\n" +
                 "    ,{\"country\": \"Ecuador\", \"id\": \"chrismha\", \"name\": \"Bandido Brewing\", \"latitude\": -0.221273, \"longitude\": -78.5073496}\n" +
                 "    ,{\"country\": \"Egypt\", \"id\": \"aarreola\", \"name\": \"Al Ahram Beverages Company\", \"latitude\": 30.2004, \"longitude\": 31.4402}\n" +
                 "    ,{\"country\": \"El Salvador\", \"id\": \"jhgrins\", \"name\": \"Cadejo Brewing Company\", \"latitude\": 13.4137, \"longitude\": 89.1410}\n" +
                 "    ,{\"country\": \"Estonia\", \"id\": \"amrictor\", \"name\": \"Tanker Brewery\", \"latitude\": 59.284744, \"longitude\": 24.983978}\n" +
                 "    ,{\"country\": \"Ethiopia\", \"id\": \"aykalo\", \"name\": \"St. George Brewery\", \"latitude\": 9.010702, \"longitude\": 38.74235}\n" +
                 "    ,{\"country\": \"Finland\", \"id\": \"kyleh1\", \"name\": \"Nordic Brewery\", \"latitude\": 61.414299, \"longitude\": 23.749984}\t\t\n" +
                 "    ,{\"country\": \"France\", \"id\":\"cdobiash\", \"name\": \"BAPBAP\", \"latitude\": 48.856890, \"longitude\": 2.350850}\n" +
                 "    ,{\"country\": \"Iceland\", \"id\": \"wjntx\", \"name\": \"Einstök Ölgerð\", \"latitude\": 65.6899, \"longitude\": 18.0952}\n" +
                 "    ,{\"country\": \"Germany\", \"id\":\"dreed101\", \"name\": \"Bitburger Brewery Group GmbH\", \"latitude\": 49.97444444, \"longitude\": 6.52166667}\n" +
                 "    ,{\"country\": \"Ghana\", \"id\":\"ebeaney\", \"name\": \"Accra Brewery Limited\", \"latitude\": 5.553178 , \"longitude\": -0.216400}\n" +
                 "    ,{\"country\": \"Greenland\", \"id\": \"jacobjoh\", \"name\": \"Godthåb Bryghus\", \"latitude\": 64.174992, \"longitude\": -51.739162}\n" +
                 "    ,{\"country\": \"Guatemala\", \"id\":\"jmiller0\", \"name\": \"Antigua Brewing Company\", \"latitude\": 14.5583 , \"longitude\": 90.7347}\n" +
                 "    ,{\"country\": \"Hungary\", \"id\":\"benhill\", \"name\": \"Etyeki Sörmanufaktúra\", \"latitude\": 47.4572 , \"longitude\": 18.7219}\n" +
                 "    ,{\"country\": \"Honduras\", \"id\": \"kle\", \"name\": \"D&D Brewery, Lodge, and Restaurant\", \"latitude\": 14.94740, \"longitude\": 88.043050}\n" +
                 "    ,{\"country\": \"India\", \"id\": \"mccafmic\", \"name\": \"Asia Pacific Breweries\", \"latitude\": 22.6433, \"longitude\": 77.4356}\n" +
                 "    ,{\"country\": \"Ireland\", \"id\": \"swestra\", \"name\": \"Wicklow Wolf Brewery\", \"latitude\": 53.2050, \"longitude\": 6.1067}\n" +
                 "    ,{\"country\": \"Israel\", \"id\": \"trentb\", \"name\": \"Dancing Camel\", \"latitude\": 32.067056, \"longitude\": 34.786569}\n" +
                 "    ,{\"country\": \"Italy\", \"id\": \"bennettn\", \"name\": \"Hilltop Brewery\", \"latitude\": 42.225015, \"longitude\": 12.196316}\n" +
                 "    ,{\"country\": \"Jamaica\", \"id\": \"burtonbj\", \"name\": \"Red Stripe\", \"latitude\": 18.005345, \"longitude\": -76.833949}\n" +
                 "    ,{\"country\": \"Japan\", \"id\": \"tjkinsey\", \"name\": \"Sapporo Breweries\", \"latitude\": 42.864378, \"longitude\": 141.602743}\n" +
                 "    ,{\"country\": \"Kazakhstan\", \"id\": \"rixta\", \"name\": \"Line Brew\", \"latitude\": 51.1636, \"longitude\":  71.4160}\n" +
                 "    ,{\"country\": \"Korea\", \"id\": \"milowang\", \"name\": \"Korea Craft Brewery\", \"latitude\": 36.8875, \"longitude\": 127.6825}\n" +
                 "    ,{\"country\": \"Laos\", \"id\": \"sabrinaw\", \"name\": \"Lao Brewery Company\", \"latitude\": 17.87, \"longitude\": 102.66}\n" +
                 "    ,{\"country\": \"Liechtenstein\", \"id\": \"jpkeahey\", \"name\": \"Liechtensteiner Brauhaus\", \"latitude\": 47.168889, \"longitude\": 9.503889}\n" +
                 "    ,{\"country\": \"luxembourg\", \"id\": \"dbtrink\", \"name\": \"Bofferding\", \"latitude\": 49.567028, \"longitude\": 5.911889}\t\n" +
                 "    ,{\"country\": \"Madagascar\", \"id\": \"zachvh\", \"name\": \"Star Brewing\", \"latitude\": -19.8635, \"longitude\": 47.0200}\n" +
                 "    ,{\"country\": \"Mexico\", \"id\": \"rpor\", \"name\": \"Los Muertos Brewing\", \"latitude\": 26.00882287, \"longitude\": -101.89200618}\n" +
                 "    ,{\"country\": \"Mozambique\", \"id\": \"vstepanuga\", \"name\": \"Fabrica De Cerveja Da Biera\", \"latitude\": -19.768251, \"longitude\": 34.862383}\n" +
                 "    ,{\"country\": \"Myanmar\", \"id\": \"jdenesha\", \"name\": \"Myanmar Brewery\", \"latitude\": 17.01252, \"longitude\": 96.1424} \n" +
                 "    ,{\"country\": \"Namibia\", \"id\":\"nrockwoo\", \"name\": \"Namibian Breweries Limited\", \"latitude\": -22.521249, \"longitude\": 17.077941}\n" +
                 "    ,{\"country\": \"Nepal\", \"id\":\"npotter3\", \"name\": \"United Breweries Nepal\", \"latitude\": 27.4109, \"longitude\": 85.0295}\n" +
                 "    ,{\"country\": \"Netherlands\", \"id\":\"dmelniko\", \"name\": \"Heineken Brewery\", \"latitude\": 52.3550006, \"longitude\": 4.8441889}\t\t\n" +
                 "    ,{\"country\": \"New Zealand\", \"id\": \"adolan5\", \"name\": \"Speights Brewery\", \"latitude\": -45.8767392, \"longitude\": 170.5001788}\n" +
                 "    ,{\"country\": \"Nigeria\", \"id\": \"nvoss\", \"name\": \"Champion Brewery Plc\", \"latitude\": 5.004538, \"longitude\": 7.920139}\n" +
                 "    ,{\"country\": \"North Korea\", \"id\": \"liuzhezz\", \"name\": \"Taedonggang Beer Brewery\", \"latitude\": 38.994620, \"longitude\": 125.806970}\n" +
                 "    ,{\"country\": \"Norway\", \"id\": \"ajtate\", \"name\": \"Ægir Microbrewery\", \"latitude\": 60.863750, \"longitude\": 7.116952}\n" +
                 "    ,{\"country\": \"Pakistan\", \"id\": \"owndav\", \"name\": \"Murree Brewery\", \"latitude\": 33.881900, \"longitude\": 73.3719}\n" +
                 "    ,{\"country\": \"Panama\", \"id\": \"avrezzon\", \"name\": \"Animal Brew\", \"latitude\": 8.9881, \"longitude\": 79.6242}\t\n" +
                 "    ,{\"country\": \"Phillipines\", \"id\": \"cacaleb\", \"name\": \"Great Islands Craft Brewery\", \"latitude\": 14.619722, \"longitude\": 121.033611}\n" +
                 "    ,{\"country\": \"Portugal\", \"id\": \"amalmqui\", \"name\": \"Dois Corvos Cervejeira\", \"latitude\": 38.738024, \"longitude\": 9.105479}\n" +
                 "    ,{\"country\": \"Peru\", \"id\": \"ilaw\", \"name\": \"Barranco Beer Company\", \"latitude\": -12.148641, \"longitude\": -77.020980}\n" +
                 "    ,{\"country\": \"Romania\", \"id\": \"kzryan\", \"name\": \"Hophead Brewing\", \"latitude\": 46.7523871, \"longitude\": 23.5636997}\n" +
                 "    ,{\"country\": \"Russia\", \"id\": \"katbrown\", \"name\": \"Pyatyy Okean\", \"latitude\": -55.8055, \"longitude\": 49.189333}\n" +
                 "    ,{\"country\": \"Scotland\", \"id\": \"fbworm\", \"name\": \"Loch Lomond Brewery\", \"latitude\": 55.994636, \"longitude\": 4.576577}\n" +
                 "    ,{\"country\": \"Serbia\", \"id\": \"nkaliher\", \"name\": \"Dogma Brewery & Tap Room\", \"latitude\": 44.4742, \"longitude\": 20.2645}\n" +
                 "    ,{\"country\": \"Singapore\", \"id\": \"pinab\", \"name\": \"LeVeL33\", \"latitude\": 1.2802, \"longitude\": 103.8542}\n" +
                 "    ,{\"country\": \"South Korea\", \"id\": \"adammv\", \"name\": \"Amazing Brewing Company\", \"latitude\": 37.542823, \"longitude\": 127.049547}\n" +
                 "    ,{\"country\": \"Spain\", \"id\": \"adbriles\", \"name\": \"Edge Brewing\", \"latitude\": 41.3942, \"longitude\": 2.1931}\n" +
                 "    ,{\"country\": \"Sri Lanka\", \"id\": \"bgratias\", \"name\": \"Lion Brewery\", \"latitude\": 6.941500, \"longitude\": 79.98068}\n" +
                 "    ,{\"country\": \"Suriname\", \"id\": \"tysch\", \"name\": \"Surinaamse Brouwerij\", \"latitude\": 5.8032062, \"longitude\": -55.1816326}\n" +
                 "    ,{\"country\": \"Sweden\", \"id\": \"sionf\", \"name\": \"Oceanbryggeriet\", \"latitude\": 57.649020, \"longitude\": 11.994238}\n" +
                 "    ,{\"country\": \"Switzerland\", \"id\":\"nigan\", \"name\": \"WhiteFrontier Brewery\", \"latitude\": 46.101171 , \"longitude\": 7.085187}\n" +
                 "    ,{\"country\": \"Taiwan\", \"id\": \"jeschen\", \"name\":\" Zhang Men Brewing\", \"latitude\": 25.0328, \"longitude\": 121.5294}\n" +
                 "    ,{\"country\": \"Tanzania\", \"id\": \"ndunn\", \"name\": \"Tanzania Breweries Limited\", \"latitude\": -6.806349, \"longitude\": 39.273325}\n" +
                 "    ,{\"country\": \"Thailand\", \"id\": \"JennieLiu\", \"name\": \"Thai Asia Pacific Brewery\", \"latitude\": 14.0904, \"longitude\": 100.308}\n" +
                 "    ,{\"country\": \"Togo\", \"id\": \"darmijo\", \"name\": \"Brasserie BB Lomé\", \"latitude\": 6.210221, \"longitude\":  1.207637}\n" +
                 "    ,{\"country\": \"Turkey\", \"id\": \"dudeax\", \"name\": \"Torch Brewery\", \"latitude\": 41.058340, \"longitude\": 28.979876}\n" +
                 "    ,{\"country\": \"United Arab Emirates\", \"id\": \"swagata\", \"name\": \"Aujan Industries Co.\", \"latitude\": 24.977127, \"longitude\": 55.165107}\n" +
                 "    ,{\"country\": \"United States\", \"id\": \"cskor\", \"name\": \"Odell Brewing Company\", \"latitude\": 40.5894674, \"longitude\": -105.0631819}\t\t\n" +
                 "    ,{\"country\": \"Uruguay\", \"id\": \"djump\", \"name\": \"El Camino Brewing Co\", \"latitude\": -34.791323, \"longitude\": -55.932436}\n" +
                 "    ,{\"country\": \"Venezuela\", \"id\": \"ahsh\", \"name\": \"Cerveceria Polar\", \"latitude\": 10.119123, \"longitude\": -64.639946}\n" +
                 "    ,{\"country\": \"Vietnam\", \"id\": \"alaswell\", \"name\": \"Homie Brewhouse\", \"latitude\": 21.044602, \"longitude\": -105.798991}\n" +
                 "    ,{\"country\": \"Zambia\", \"id\": \"tsdansby\", \"name\": \"National Breweries Plc Ndola\", \"latitude\": -13.0170, \"longitude\": 28.6475}\t\t\n" +
                 "    ,{\"country\": \"Zimbabwe\", \"id\": \"susannak\", \"name\": \"Delta Beverages\", \"latitude\": -20.189394, \"longitude\":  8.555527}\n" +
                 "    ]\n" +
                 "}";
         String jsonCountySeats = "{\n" +
                 "  \"type\": \"trip\",\n" +
                 "  \"title\": \"Colorado County Seats\",\n" +
                 "  \"version\": 4,\n" +
                 "  \"options\": {\n" +
                 "    \"units\":\"miles\",\n" +
                 "    \"optimization\": \"shorter\"\n" +
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
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("mm:ss:ms");
        LocalDateTime now = LocalDateTime.now();

        long time = System.nanoTime();
        System.out.println("Time before optimization: " + java.time.LocalTime.now());
        if (tripCalculate.trip.options.optimization != null && (tripCalculate.trip.options.optimization.equals("short") || tripCalculate.trip.options.optimization.equals("shorter"))) {
            tripCalculate.shortOptimization();
        }
        time = System.nanoTime();
        System.out.println("Time after optimization: " + java.time.LocalTime.now());
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
    public void testWorldVectors() {
        double mapW = 1024.0, mapH = 512.0, mapLat = 180.0, mapLon = 360.0,
                pixPerLat = mapH / mapLat, pixPerLon = mapW / mapLon;

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
                "    { \"id\": 1, \"county\": \"Adams County\", \"name\": \"Brighton\", \"latitude\": 80, \"longitude\": -170 },\n" +
                "    { \"id\": 2, \"county\": \"Denver County\", \"name\": \"Denver\", \"latitude\": 60, \"longitude\": -150 }\n" +
                "  ]\n" +
                "}\n";

        trip = gson.fromJson(jsonStr, Trip.class);
        tripCalculate = new TripCalculate(trip);

        String actualDrawVectorOutput = tripCalculate.drawVectorWorld(tripCalculate.trip);


        String expectedDrawVectorOutput = "<line x1=\"" + 10 * pixPerLon +
                "\" y1=\"" + 10 * pixPerLat+
                "\" x2=\"" + 30 * pixPerLon+
                "\" y2=\"" + 30 * pixPerLat +
                "\" style=\"stroke:rgb(255,0,0);stroke-width:2\" />";

        expectedDrawVectorOutput += "<line x1=\"" + 30 *pixPerLon+
                "\" y1=\"" + 30 * pixPerLat +
                "\" x2=\"" + 10 * pixPerLon +
                "\" y2=\"" + 10 * pixPerLat+
                "\" style=\"stroke:rgb(255,0,0);stroke-width:2\" />";

        assertEquals(expectedDrawVectorOutput, actualDrawVectorOutput);
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

        String actualDrawVectorOutput = tripCalculate.drawVectorCO(tripCalculate.trip);

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

        actualDrawVectorOutput = tripCalculate.drawVectorCO(tripCalculate.trip);
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

        String mapVectors = tripCalculate.drawVectorWorld(tripCalculate.trip);

        BufferedReader read;
        try {
            read = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/world_map.svg")));
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

        System.out.println(expectedSetMapResult);
        tripCalculate.setMap("/world_map.svg");
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
