-- MySQL dump 10.16  Distrib 10.2.17-MariaDB, for Linux (x86_64)
--
-- Host: faure    Database: cs314
-- ------------------------------------------------------
-- Server version	10.2.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region` (
  `index` int(11) NOT NULL,
  `id` varchar(100) NOT NULL,
  `local_code` varchar(10) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `continent` varchar(10) DEFAULT NULL,
  `iso_country` varchar(10) DEFAULT NULL,
  `wikipedia_link` varchar(1000) DEFAULT NULL,
  `keywords` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `regions_name_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--
-- WHERE:  iso_country='us'

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (306076,'US-AK','AK','Alaska','NA','US','http://en.wikipedia.org/wiki/Alaska',NULL),(306077,'US-AL','AL','Alabama','NA','US','http://en.wikipedia.org/wiki/Alabama',NULL),(306078,'US-AR','AR','Arkansas','NA','US','http://en.wikipedia.org/wiki/Arkansas',NULL),(306079,'US-AZ','AZ','Arizona','NA','US','http://en.wikipedia.org/wiki/Arizona',NULL),(306080,'US-CA','CA','California','NA','US','http://en.wikipedia.org/wiki/California',NULL),(306081,'US-CO','CO','Colorado','NA','US','http://en.wikipedia.org/wiki/Colorado',NULL),(306082,'US-CT','CT','Connecticut','NA','US','http://en.wikipedia.org/wiki/Connecticut',NULL),(306083,'US-DC','DC','District of Columbia','NA','US','http://en.wikipedia.org/wiki/District_of_Columbia',NULL),(306084,'US-DE','DE','Delaware','NA','US','http://en.wikipedia.org/wiki/Delaware',NULL),(306085,'US-FL','FL','Florida','NA','US','http://en.wikipedia.org/wiki/Florida',NULL),(306086,'US-GA','GA','Georgia','NA','US','http://en.wikipedia.org/wiki/Georgia',NULL),(306087,'US-HI','HI','Hawaii','NA','US','http://en.wikipedia.org/wiki/Hawaii',NULL),(306088,'US-IA','IA','Iowa','NA','US','http://en.wikipedia.org/wiki/Iowa',NULL),(306089,'US-ID','ID','Idaho','NA','US','http://en.wikipedia.org/wiki/Idaho',NULL),(306090,'US-IL','IL','Illinois','NA','US','http://en.wikipedia.org/wiki/Illinois',NULL),(306091,'US-IN','IN','Indiana','NA','US','http://en.wikipedia.org/wiki/Indiana',NULL),(306092,'US-KS','KS','Kansas','NA','US','http://en.wikipedia.org/wiki/Kansas',NULL),(306093,'US-KY','KY','Kentucky','NA','US','http://en.wikipedia.org/wiki/Kentucky',NULL),(306094,'US-LA','LA','Louisiana','NA','US','http://en.wikipedia.org/wiki/Louisiana',NULL),(306095,'US-MA','MA','Massachusetts','NA','US','http://en.wikipedia.org/wiki/Massachusetts',NULL),(306096,'US-MD','MD','Maryland','NA','US','http://en.wikipedia.org/wiki/Maryland',NULL),(306097,'US-ME','ME','Maine','NA','US','http://en.wikipedia.org/wiki/Maine',NULL),(306098,'US-MI','MI','Michigan','NA','US','http://en.wikipedia.org/wiki/Michigan',NULL),(306099,'US-MN','MN','Minnesota','NA','US','http://en.wikipedia.org/wiki/Minnesota',NULL),(306100,'US-MO','MO','Missouri','NA','US','http://en.wikipedia.org/wiki/Missouri',NULL),(306101,'US-MS','MS','Mississippi','NA','US','http://en.wikipedia.org/wiki/Mississippi',NULL),(306102,'US-MT','MT','Montana','NA','US','http://en.wikipedia.org/wiki/Montana',NULL),(306103,'US-NC','NC','North Carolina','NA','US','http://en.wikipedia.org/wiki/North_Carolina',NULL),(306104,'US-ND','ND','North Dakota','NA','US','http://en.wikipedia.org/wiki/North_Dakota',NULL),(306105,'US-NE','NE','Nebraska','NA','US','http://en.wikipedia.org/wiki/Nebraska',NULL),(306106,'US-NH','NH','New Hampshire','NA','US','http://en.wikipedia.org/wiki/New_Hampshire',NULL),(306107,'US-NJ','NJ','New Jersey','NA','US','http://en.wikipedia.org/wiki/New_Jersey',NULL),(306108,'US-NM','NM','New Mexico','NA','US','http://en.wikipedia.org/wiki/New_Mexico',NULL),(306109,'US-NV','NV','Nevada','NA','US','http://en.wikipedia.org/wiki/Nevada',NULL),(306110,'US-NY','NY','New York','NA','US','http://en.wikipedia.org/wiki/New_York',NULL),(306111,'US-OH','OH','Ohio','NA','US','http://en.wikipedia.org/wiki/Ohio',NULL),(306112,'US-OK','OK','Oklahoma','NA','US','http://en.wikipedia.org/wiki/Oklahoma',NULL),(306113,'US-OR','OR','Oregon','NA','US','http://en.wikipedia.org/wiki/Oregon',NULL),(306114,'US-PA','PA','Pennsylvania','NA','US','http://en.wikipedia.org/wiki/Pennsylvania',NULL),(306115,'US-RI','RI','Rhode Island','NA','US','http://en.wikipedia.org/wiki/Rhode_Island',NULL),(306116,'US-SC','SC','South Carolina','NA','US','http://en.wikipedia.org/wiki/South_Carolina',NULL),(306117,'US-SD','SD','South Dakota','NA','US','http://en.wikipedia.org/wiki/South_Dakota',NULL),(306118,'US-TN','TN','Tennessee','NA','US','http://en.wikipedia.org/wiki/Tennessee',NULL),(306119,'US-TX','TX','Texas','NA','US','http://en.wikipedia.org/wiki/Texas',NULL),(306120,'US-U-A','U-A','(unassigned)','NA','US',NULL,NULL),(306121,'US-UT','UT','Utah','NA','US','http://en.wikipedia.org/wiki/Utah',NULL),(306122,'US-VA','VA','Virginia','NA','US','http://en.wikipedia.org/wiki/Virginia',NULL),(306123,'US-VT','VT','Vermont','NA','US','http://en.wikipedia.org/wiki/Vermont',NULL),(306124,'US-WA','WA','Washington','NA','US','http://en.wikipedia.org/wiki/Washington',NULL),(306125,'US-WI','WI','Wisconsin','NA','US','http://en.wikipedia.org/wiki/Wisconsin',NULL),(306126,'US-WV','WV','West Virginia','NA','US','http://en.wikipedia.org/wiki/West_Virginia',NULL),(306127,'US-WY','WY','Wyoming','NA','US','http://en.wikipedia.org/wiki/Wyoming',NULL);
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-01 19:33:47
