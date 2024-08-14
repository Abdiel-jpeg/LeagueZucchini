-- MySQL dump 10.13  Distrib 8.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: integradora
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudad` (
  `nombreCiudad` varchar(255) NOT NULL,
  `nombreRegion` varchar(255) NOT NULL,
  PRIMARY KEY (`nombreCiudad`),
  KEY `nombreRegion` (`nombreRegion`),
  CONSTRAINT `FK_RegionesCiudad` FOREIGN KEY (`nombreRegion`) REFERENCES `region` (`nombreRegion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES ('Chihuahua','Chihuahua'),('Cuauhtémoc','Chihuahua'),('Delicias','Chihuahua'),('Juárez','Chihuahua'),('Parral','Chihuahua'),('Acuña','Coahuila'),('Monclova','Coahuila'),('Piedras Negras','Coahuila'),('Saltillo','Coahuila'),('Torreón','Coahuila'),('Ecatepec','Estado de México'),('Naucalpan','Estado de México'),('Nezahualcóyotl','Estado de México'),('Tlalnepantla','Estado de México'),('Toluca','Estado de México'),('Atlixco','Puebla'),('Huauchinango','Puebla'),('Puebla','Puebla'),('San Andrés Cholula','Puebla'),('Tehuacán','Puebla'),('Ciudad Obregón','Sonora'),('Hermosillo','Sonora'),('Navojoa','Sonora'),('Nogales','Sonora'),('San Luis Río Colorado','Sonora'),('ciudad1','Test'),('Mérida','Yucatán'),('Progreso','Yucatán'),('Ticul','Yucatán'),('Tizimín','Yucatán'),('Valladolid','Yucatán'),('Fresnillo','Zacatecas'),('Guadalupe','Zacatecas'),('Jerez','Zacatecas'),('Sombrerete','Zacatecas'),('Zacatecas','Zacatecas');
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competicion`
--

DROP TABLE IF EXISTS `competicion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competicion` (
  `idCompeticion` int NOT NULL AUTO_INCREMENT,
  `nombreCompeticion` varchar(255) DEFAULT NULL,
  `descripcionCompeticion` text,
  `nombreTipoCompeticion` varchar(255) NOT NULL,
  PRIMARY KEY (`idCompeticion`),
  KEY `nombreTipoCompeticion` (`nombreTipoCompeticion`),
  CONSTRAINT `competicion_ibfk_1` FOREIGN KEY (`nombreTipoCompeticion`) REFERENCES `tipoCompeticion` (`nombreTipoCompeticion`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competicion`
--

LOCK TABLES `competicion` WRITE;
/*!40000 ALTER TABLE `competicion` DISABLE KEYS */;
INSERT INTO `competicion` VALUES (0,'Toro Nativo Aniversario 25','Toro Nativo es una competicion entre los docentes de las distintos grupos de carreras para promover la competencia, la actividad física tanto en alumnos como en docentes y la solidaridad social. En estos eventos únicamente pueden participar docentes.','Eliminación Directa'),(3,'test','test','Regular. Todos contra Todos'),(5,'test 3','descripcion','Eliminación Directa'),(6,'test casa visitante','test casa y visitante','Regular. Ida y Vuelta'),(7,'ajedrez','es un juego que ayuda en el ejercicio de las patas  ','Eliminación Directa'),(8,'alfonso','feo','Regular. Todos contra Todos');
/*!40000 ALTER TABLE `competicion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competicionCombinadaParticipantes`
--

DROP TABLE IF EXISTS `competicionCombinadaParticipantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competicionCombinadaParticipantes` (
  `idCompeticion` int NOT NULL,
  `idEquipo` int NOT NULL,
  `grupoCompeticionCombinada` tinyint(1) NOT NULL,
  KEY `idCompeticion` (`idCompeticion`),
  KEY `idEquipo` (`idEquipo`),
  CONSTRAINT `competicionCombinadaParticipantes_ibfk_1` FOREIGN KEY (`idCompeticion`) REFERENCES `competicion` (`idCompeticion`),
  CONSTRAINT `competicionCombinadaParticipantes_ibfk_2` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`idEquipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competicionCombinadaParticipantes`
--

LOCK TABLES `competicionCombinadaParticipantes` WRITE;
/*!40000 ALTER TABLE `competicionCombinadaParticipantes` DISABLE KEYS */;
INSERT INTO `competicionCombinadaParticipantes` VALUES (1,1,0),(1,2,0),(1,3,1);
/*!40000 ALTER TABLE `competicionCombinadaParticipantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competicionEliminacionDirectaParticipante`
--

DROP TABLE IF EXISTS `competicionEliminacionDirectaParticipante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competicionEliminacionDirectaParticipante` (
  `idCompeticionEliminacionDirectaParticipante` int NOT NULL,
  `idEquipo1` int DEFAULT NULL,
  `idEquipo2` int DEFAULT NULL,
  `idLinkTo` int DEFAULT NULL,
  `fase` varchar(255) DEFAULT NULL,
  `idCompeticion` int NOT NULL,
  KEY `idEquipo1` (`idEquipo1`),
  KEY `idEquipo2` (`idEquipo2`),
  KEY `idLinkTo` (`idLinkTo`),
  KEY `idCompeticion` (`idCompeticion`),
  CONSTRAINT `competicionEliminacionDirectaParticipante_ibfk_1` FOREIGN KEY (`idEquipo1`) REFERENCES `equipo` (`idEquipo`),
  CONSTRAINT `competicionEliminacionDirectaParticipante_ibfk_2` FOREIGN KEY (`idEquipo2`) REFERENCES `equipo` (`idEquipo`),
  CONSTRAINT `competicionEliminacionDirectaParticipante_ibfk_4` FOREIGN KEY (`idCompeticion`) REFERENCES `competicion` (`idCompeticion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competicionEliminacionDirectaParticipante`
--

LOCK TABLES `competicionEliminacionDirectaParticipante` WRITE;
/*!40000 ALTER TABLE `competicionEliminacionDirectaParticipante` DISABLE KEYS */;
INSERT INTO `competicionEliminacionDirectaParticipante` VALUES (0,55,44,NULL,'1',5),(1,46,44,0,'2',5),(2,44,45,1,'3',5),(3,48,46,1,'3',5),(4,47,48,3,'4',5),(5,57,55,0,'2',5),(6,55,56,5,'3',5),(7,58,57,5,'3',5),(8,58,59,7,'4',5);
/*!40000 ALTER TABLE `competicionEliminacionDirectaParticipante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competicionParticipantes`
--

DROP TABLE IF EXISTS `competicionParticipantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competicionParticipantes` (
  `idCompeticion` int NOT NULL,
  `idEquipo` int NOT NULL,
  UNIQUE KEY `idCompeticion_2` (`idCompeticion`,`idEquipo`),
  KEY `idCompeticion` (`idCompeticion`),
  KEY `idEquipo` (`idEquipo`),
  CONSTRAINT `participantesTorneo_ibfk_1` FOREIGN KEY (`idCompeticion`) REFERENCES `competicion` (`idCompeticion`),
  CONSTRAINT `participantesTorneo_ibfk_2` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`idEquipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competicionParticipantes`
--

LOCK TABLES `competicionParticipantes` WRITE;
/*!40000 ALTER TABLE `competicionParticipantes` DISABLE KEYS */;
INSERT INTO `competicionParticipantes` VALUES (0,47),(0,48),(0,55),(0,56),(0,57),(0,58),(0,59),(3,47),(3,48),(3,55),(3,56),(3,57),(3,58),(3,59),(5,44),(5,45),(5,46),(5,47),(5,48),(5,55),(5,56),(5,57),(5,58),(5,59),(6,47),(6,48),(6,55),(6,56),(6,57),(6,58),(6,59);
/*!40000 ALTER TABLE `competicionParticipantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipo`
--

DROP TABLE IF EXISTS `equipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipo` (
  `idEquipo` int NOT NULL AUTO_INCREMENT,
  `grado` int DEFAULT NULL,
  `grupo` varchar(255) DEFAULT NULL,
  `nombreGrupo` varchar(255) DEFAULT NULL,
  `nombreInstitucion` varchar(255) NOT NULL,
  PRIMARY KEY (`idEquipo`),
  KEY `nombreInstitucion` (`nombreInstitucion`),
  CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`nombreInstitucion`) REFERENCES `institucion` (`nombreInstitucion`)
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipo`
--

LOCK TABLES `equipo` WRITE;
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
INSERT INTO `equipo` VALUES (32,1,'A','Team Karroten','Escuela Delicias'),(33,2,'B','Team Kartoffeln','Escuela Delicias'),(34,3,'C','Team Gemüse','Escuela Delicias'),(35,1,'A','Field Karroten','Liceo Ecatepec'),(36,2,'B','Field Kartoffeln','Liceo Ecatepec'),(37,3,'C','Field Gemüse','Liceo Ecatepec'),(38,1,'A','League Karroten','Escuela Hermosillo'),(39,2,'B','League Kartoffeln','Escuela Hermosillo'),(40,3,'C','League Gemüse','Escuela Hermosillo'),(41,1,'A','Team Karroten','Colegio Huauchinango'),(42,2,'B','Team Kartoffeln','Colegio Huauchinango'),(43,3,'C','Team Gemüse','Colegio Huauchinango'),(44,1,'A','Field Karroten','Liceo Juárez'),(45,2,'B','Field Kartoffeln','Liceo Juárez'),(46,3,'C','Field Gemüse','Liceo Juárez'),(47,1,'TRM11','Redes Septiembre Diciembre','Universidad Tecnológica de Ciudad Juárez'),(48,2,'TRM22','Redes Enero Abril','Universidad Tecnológica de Ciudad Juárez'),(50,1,'A','Team Karroten','Liceo Mérida'),(51,2,'B','Team Kartoffeln','Liceo Mérida'),(52,3,'C','Team Gemüse','Liceo Mérida'),(54,1,'TDM15','Programacion','test'),(55,1,'TDM15','Programacion','Universidad Tecnológica de Ciudad Juárez'),(56,3,'TRM31','Redes','Universidad Tecnológica de Ciudad Juárez'),(57,3,'TDM33','Programacion Abril Agosto','Universidad Tecnológica de Ciudad Juárez'),(58,1,'TRM12','Redes Septiembre Diciembre','Universidad Tecnológica de Ciudad Juárez'),(59,1,'TDW11','Programacion Vespertino Septiembre Diciembre','Universidad Tecnológica de Ciudad Juárez'),(60,4,'5','TRM45','Colegio Acuña'),(61,6,'1','HRD61','Colegio Acuña'),(62,7,'3','MIS73','Colegio Acuña'),(63,3,'2','TRM32','Colegio Acuña'),(64,5,'4','HRD54','Colegio Acuña'),(65,8,'2','MIS82','Colegio Ciudad Obregón'),(66,4,'7','TRM47','Colegio Ciudad Obregón'),(67,2,'3','HRD23','Colegio Ciudad Obregón'),(68,7,'6','MIS76','Colegio Ciudad Obregón'),(69,1,'9','TRM19','Colegio Ciudad Obregón'),(70,3,'4','HRD34','Colegio Cuauhtémoc'),(71,2,'1','MIS21','Colegio Cuauhtémoc'),(72,6,'7','TRM67','Colegio Cuauhtémoc'),(73,5,'9','HRD59','Colegio Cuauhtémoc'),(74,8,'2','MIS82','Colegio Cuauhtémoc'),(75,7,'3','TRM73','Colegio Huauchinango'),(76,1,'6','HRD16','Colegio Huauchinango'),(77,4,'8','MIS48','Colegio Huauchinango'),(78,9,'7','TRM97','Colegio Huauchinango'),(79,2,'5','HRD25','Colegio Huauchinango'),(80,5,'2','MIS52','Colegio Nezahualcóyotl'),(81,6,'4','TRM64','Colegio Nezahualcóyotl'),(82,3,'1','HRD31','Colegio Nezahualcóyotl'),(83,8,'9','MIS89','Colegio Nezahualcóyotl'),(84,2,'7','TRM27','Colegio Nezahualcóyotl'),(85,9,'5','HRD95','Colegio Saltillo'),(86,4,'3','MIS43','Colegio Saltillo'),(87,1,'7','TRM17','Colegio Saltillo'),(88,7,'2','HRD72','Colegio Saltillo'),(89,3,'6','MIS36','Colegio Saltillo'),(90,2,'9','TRM29','Colegio San Luis Río Colorado'),(91,5,'3','HRD53','Colegio San Luis Río Colorado'),(92,8,'7','MIS87','Colegio San Luis Río Colorado'),(93,6,'1','TRM61','Colegio San Luis Río Colorado'),(94,4,'2','HRD42','Colegio San Luis Río Colorado'),(95,3,'5','MIS35','Colegio Ticul'),(96,7,'9','TRM79','Colegio Ticul'),(97,1,'4','HRD14','Colegio Ticul'),(98,6,'8','MIS68','Colegio Ticul'),(99,2,'7','TRM27','Colegio Ticul'),(100,4,'2','HRD42','Escuela Delicias'),(101,9,'5','MIS95','Escuela Delicias'),(102,3,'1','TRM31','Escuela Delicias'),(103,8,'7','HRD87','Escuela Delicias'),(104,5,'6','MIS56','Escuela Delicias'),(105,2,'9','TRM29','Escuela Hermosillo'),(106,7,'3','HRD73','Escuela Hermosillo'),(107,4,'5','MIS45','Escuela Hermosillo'),(108,1,'7','TRM17','Escuela Hermosillo'),(109,6,'2','HRD62','Escuela Hermosillo'),(110,3,'8','MIS38','Escuela Monclova'),(111,9,'6','TRM96','Escuela Monclova'),(112,5,'2','HRD52','Escuela Monclova'),(113,7,'4','MIS74','Escuela Monclova'),(114,2,'3','TRM23','Escuela Monclova'),(115,4,'9','HRD49','Escuela Puebla'),(116,8,'7','MIS87','Escuela Puebla'),(117,6,'1','TRM61','Escuela Puebla'),(118,3,'5','HRD35','Escuela Puebla'),(119,7,'2','MIS72','Escuela Puebla'),(120,2,'8','TRM28','Escuela Test Ciudad'),(121,5,'6','HRD56','Escuela Test Ciudad'),(122,9,'3','MIS93','Escuela Test Ciudad'),(123,4,'7','TRM47','Escuela Test Ciudad'),(124,1,'9','HRD19','Escuela Test Ciudad'),(125,7,'2','MIS72','Escuela Tlalnepantla'),(126,6,'5','TRM65','Escuela Tlalnepantla'),(127,3,'8','HRD38','Escuela Tlalnepantla'),(128,8,'1','MIS81','Escuela Tlalnepantla'),(129,4,'9','TRM49','Escuela Tlalnepantla'),(130,9,'7','HRD97','Escuela Torreón'),(131,2,'4','MIS24','Escuela Torreón'),(132,6,'8','TRM68','Escuela Torreón'),(133,5,'3','HRD53','Escuela Torreón'),(134,1,'6','MIS16','Escuela Torreón'),(135,8,'9','TRM89','Instituto Atlixco'),(136,3,'2','HRD32','Instituto Atlixco'),(137,7,'4','MIS74','Instituto Atlixco'),(138,6,'5','TRM65','Instituto Atlixco'),(139,2,'7','HRD27','Instituto Atlixco'),(140,5,'1','MIS51','Instituto Chihuahua'),(141,4,'9','TRM49','Instituto Chihuahua'),(142,3,'7','HRD37','Instituto Chihuahua'),(143,8,'2','MIS82','Instituto Chihuahua'),(144,6,'4','TRM64','Instituto Chihuahua'),(145,9,'3','HRD93','Instituto Naucalpan'),(146,7,'1','MIS71','Instituto Naucalpan'),(147,2,'8','TRM28','Instituto Naucalpan'),(148,5,'4','HRD54','Instituto Naucalpan'),(149,6,'9','MIS69','Instituto Naucalpan'),(150,4,'7','TRM47','Instituto Nogales'),(151,8,'3','HRD83','Instituto Nogales'),(152,5,'6','MIS56','Instituto Nogales'),(153,9,'1','TRM91','Instituto Nogales'),(154,2,'4','HRD24','Instituto Nogales'),(155,6,'5','MIS65','Instituto Parral'),(156,7,'3','TRM73','Instituto Parral'),(157,3,'9','HRD39','Instituto Parral'),(158,1,'8','MIS18','Instituto Parral'),(159,8,'2','TRM82','Instituto Parral'),(160,4,'6','HRD46','Instituto Piedras Negras'),(161,9,'3','MIS93','Instituto Piedras Negras'),(162,7,'2','TRM72','Instituto Piedras Negras'),(163,6,'8','HRD68','Instituto Piedras Negras'),(164,2,'1','MIS21','Instituto Piedras Negras'),(165,5,'7','TRM57','Instituto Progreso'),(166,8,'3','HRD83','Instituto Progreso'),(167,1,'4','MIS14','Instituto Progreso'),(168,9,'2','TRM92','Instituto Progreso'),(169,6,'5','HRD65','Instituto Progreso'),(170,3,'8','MIS38','Instituto Tehuacán'),(171,2,'6','TRM26','Instituto Tehuacán'),(172,7,'1','HRD71','Instituto Tehuacán'),(173,5,'1','KLW51','Instituto Tehuacán'),(174,9,'2','YMR92','Instituto Tehuacán'),(175,3,'7','BJP37','Instituto Tehuacán'),(176,6,'4','HRD64','Instituto Tehuacán'),(177,8,'5','TRN85','Instituto Tehuacán'),(178,4,'3','PHL43','Liceo Ecatepec'),(179,7,'1','FWT71','Liceo Ecatepec'),(180,9,'6','XNM96','Liceo Ecatepec'),(181,2,'5','JDR25','Liceo Ecatepec'),(182,5,'8','VBC58','Liceo Ecatepec'),(183,8,'4','KQW84','Liceo Juárez'),(184,3,'9','PML39','Liceo Juárez'),(185,6,'2','TRZ62','Liceo Juárez'),(186,7,'5','DJY75','Liceo Juárez'),(187,1,'8','BVR18','Liceo Juárez'),(188,9,'3','WMN93','Liceo Mérida'),(189,4,'7','HQB47','Liceo Mérida'),(190,2,'6','KPV26','Liceo Mérida'),(191,5,'1','LYR51','Liceo Mérida'),(192,7,'8','JXT78','Liceo Mérida'),(193,6,'5','DZN65','Liceo Navojoa'),(194,3,'4','TRW34','Liceo Navojoa'),(195,8,'2','MVB82','Liceo Navojoa'),(196,7,'1','PLX71','Liceo Navojoa'),(197,2,'9','JWQ29','Liceo Navojoa'),(198,5,'6','KLY56','Liceo San Andrés Cholula'),(199,1,'4','HDR14','Liceo San Andrés Cholula'),(200,7,'9','PXW79','Liceo San Andrés Cholula'),(201,3,'8','MBT38','Liceo San Andrés Cholula'),(202,4,'2','VLJ42','Liceo San Andrés Cholula'),(203,9,'7','WPH97','Liceo Toluca'),(204,6,'1','DJQ61','Liceo Toluca'),(205,4,'5','BNL45','Liceo Toluca'),(206,2,'3','TRV23','Liceo Toluca'),(207,8,'6','MKY86','Liceo Toluca');
/*!40000 ALTER TABLE `equipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evento` (
  `idEvento` int NOT NULL AUTO_INCREMENT,
  `nombreEvento` varchar(255) DEFAULT NULL,
  `faseActual` varchar(255) DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `idEquipo1` int DEFAULT NULL,
  `golesEquipo1` int DEFAULT '0',
  `tarjetasAmarillasEquipo1` int DEFAULT '0',
  `tarjetasRojasEquipo1` int DEFAULT '0',
  `golesPenalesFinalesEquipo1` int DEFAULT '0',
  `idEquipo2` int DEFAULT NULL,
  `golesEquipo2` int DEFAULT '0',
  `tarjetasAmarillasEquipo2` int DEFAULT '0',
  `tarjetasRojasEquipo2` int DEFAULT '0',
  `golesPenalesFinalesEquipo2` int DEFAULT '0',
  `cantidadTiempoExtra` int DEFAULT '0',
  `ganadorPartido` varchar(24) DEFAULT NULL,
  `esPartidoEmpatado` tinyint(1) DEFAULT '0',
  `puntosEquipo1` int DEFAULT '0',
  `puntosEquipo2` int DEFAULT '0',
  `idCompeticionEliminacionDirectaParticipante` int DEFAULT NULL,
  `idCompeticion` int NOT NULL,
  PRIMARY KEY (`idEvento`),
  KEY `idCompeticion` (`idCompeticion`),
  KEY `idEquipo1` (`idEquipo1`),
  KEY `idEquipo2` (`idEquipo2`),
  CONSTRAINT `evento_ibfk_1` FOREIGN KEY (`idCompeticion`) REFERENCES `competicion` (`idCompeticion`),
  CONSTRAINT `evento_ibfk_2` FOREIGN KEY (`idEquipo1`) REFERENCES `equipo` (`idEquipo`),
  CONSTRAINT `evento_ibfk_3` FOREIGN KEY (`idEquipo2`) REFERENCES `equipo` (`idEquipo`)
) ENGINE=InnoDB AUTO_INCREMENT=371 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES (1,'TICs sin maeta vs Los insanos','Semifinales','2024-06-30',1,2,1,2,2,2,98,2,2,2,0,'1',0,0,0,NULL,1),(2,'TICs vs Tercer equipo','Semifinales','2024-06-30',1,4,3,3,3,3,98,3,3,2,0,'1',0,0,0,NULL,1),(3,'Los insanos vs Tercer equipo','Semifinales','2024-06-30',2,0,0,0,0,3,0,0,0,0,0,'1',0,0,0,NULL,1),(89,'47 vs 48',NULL,NULL,47,3,0,0,0,48,2,0,0,0,0,'Equipo1',0,3,0,NULL,6),(90,'48 vs 47',NULL,NULL,48,1,0,0,0,47,1,0,0,0,0,'0',1,1,1,NULL,6),(91,'47 vs 55',NULL,NULL,47,0,0,0,0,55,0,0,0,0,0,NULL,0,0,0,NULL,6),(92,'55 vs 47',NULL,NULL,55,0,0,0,0,47,0,0,0,0,0,NULL,0,0,0,NULL,6),(93,'47 vs 56',NULL,NULL,47,0,0,0,0,56,0,0,0,0,0,NULL,0,0,0,NULL,6),(94,'56 vs 47',NULL,NULL,56,0,0,0,0,47,0,0,0,0,0,NULL,0,0,0,NULL,6),(95,'47 vs 57',NULL,NULL,47,0,0,0,0,57,0,0,0,0,0,NULL,0,0,0,NULL,6),(96,'57 vs 47',NULL,NULL,57,0,0,0,0,47,0,0,0,0,0,NULL,0,0,0,NULL,6),(97,'47 vs 58',NULL,NULL,47,0,0,0,0,58,0,0,0,0,0,NULL,0,0,0,NULL,6),(98,'58 vs 47',NULL,NULL,58,3,3,2,2,47,1,1,2,2,0,'Equipo1',0,3,0,NULL,6),(99,'47 vs 59',NULL,NULL,47,0,0,0,0,59,0,0,0,0,0,NULL,0,0,0,NULL,6),(100,'59 vs 47',NULL,NULL,59,0,0,0,0,47,0,0,0,0,0,NULL,0,0,0,NULL,6),(101,'48 vs 55',NULL,NULL,48,0,0,0,0,55,0,0,0,0,0,NULL,0,0,0,NULL,6),(102,'55 vs 48',NULL,NULL,55,0,0,0,0,48,0,0,0,0,0,NULL,0,0,0,NULL,6),(103,'48 vs 56',NULL,NULL,48,0,0,0,0,56,0,0,0,0,0,NULL,0,0,0,NULL,6),(104,'56 vs 48',NULL,NULL,56,0,0,0,0,48,0,0,0,0,0,NULL,0,0,0,NULL,6),(105,'48 vs 57',NULL,NULL,48,0,0,0,0,57,0,0,0,0,0,NULL,0,0,0,NULL,6),(106,'57 vs 48',NULL,NULL,57,0,0,0,0,48,0,0,0,0,0,NULL,0,0,0,NULL,6),(107,'48 vs 58',NULL,NULL,48,0,0,0,0,58,0,0,0,0,0,NULL,0,0,0,NULL,6),(108,'58 vs 48',NULL,NULL,58,0,0,0,0,48,0,0,0,0,0,NULL,0,0,0,NULL,6),(109,'48 vs 59',NULL,NULL,48,0,0,0,0,59,0,0,0,0,0,NULL,0,0,0,NULL,6),(110,'59 vs 48',NULL,NULL,59,0,0,0,0,48,0,0,0,0,0,NULL,0,0,0,NULL,6),(111,'55 vs 56',NULL,NULL,55,0,0,0,0,56,0,0,0,0,0,NULL,0,0,0,NULL,6),(112,'56 vs 55',NULL,NULL,56,0,0,0,0,55,0,0,0,0,0,NULL,0,0,0,NULL,6),(113,'55 vs 57',NULL,NULL,55,0,0,0,0,57,0,0,0,0,0,NULL,0,0,0,NULL,6),(114,'57 vs 55',NULL,NULL,57,0,0,0,0,55,0,0,0,0,0,NULL,0,0,0,NULL,6),(115,'55 vs 58',NULL,NULL,55,0,0,0,0,58,0,0,0,0,0,NULL,0,0,0,NULL,6),(116,'58 vs 55',NULL,NULL,58,0,0,0,0,55,0,0,0,0,0,NULL,0,0,0,NULL,6),(117,'55 vs 59',NULL,NULL,55,0,0,0,0,59,0,0,0,0,0,NULL,0,0,0,NULL,6),(118,'59 vs 55',NULL,NULL,59,0,0,0,0,55,0,0,0,0,0,NULL,0,0,0,NULL,6),(119,'56 vs 57',NULL,NULL,56,0,0,0,0,57,0,0,0,0,0,NULL,0,0,0,NULL,6),(120,'57 vs 56',NULL,NULL,57,0,0,0,0,56,0,0,0,0,0,NULL,0,0,0,NULL,6),(121,'56 vs 58',NULL,NULL,56,0,0,0,0,58,0,0,0,0,0,NULL,0,0,0,NULL,6),(122,'58 vs 56',NULL,NULL,58,0,0,0,0,56,0,0,0,0,0,NULL,0,0,0,NULL,6),(123,'56 vs 59',NULL,NULL,56,0,0,0,0,59,0,0,0,0,0,NULL,0,0,0,NULL,6),(124,'59 vs 56',NULL,NULL,59,0,0,0,0,56,0,0,0,0,0,NULL,0,0,0,NULL,6),(125,'57 vs 58',NULL,NULL,57,0,0,0,0,58,0,0,0,0,0,NULL,0,0,0,NULL,6),(126,'58 vs 57',NULL,NULL,58,0,0,0,0,57,0,0,0,0,0,NULL,0,0,0,NULL,6),(127,'57 vs 59',NULL,NULL,57,0,0,0,0,59,0,0,0,0,0,NULL,0,0,0,NULL,6),(128,'59 vs 57',NULL,NULL,59,0,0,0,0,57,0,0,0,0,0,NULL,0,0,0,NULL,6),(129,'58 vs 59',NULL,NULL,58,0,0,0,0,59,0,0,0,0,0,NULL,0,0,0,NULL,6),(130,'59 vs 58',NULL,NULL,59,0,0,0,0,58,0,0,0,0,0,NULL,0,0,0,NULL,6),(140,'',NULL,NULL,NULL,0,0,0,0,NULL,0,0,0,0,0,NULL,0,0,0,NULL,0),(141,'',NULL,NULL,NULL,0,0,0,0,47,0,0,0,0,0,NULL,0,0,0,NULL,0),(142,'48 vs 55',NULL,NULL,48,0,0,0,0,55,0,0,0,0,0,NULL,0,0,0,NULL,0),(143,'',NULL,NULL,NULL,0,0,0,0,NULL,0,0,0,0,0,NULL,0,0,0,NULL,0),(144,'56 vs 57',NULL,NULL,56,0,0,0,0,57,0,0,0,0,0,NULL,0,0,0,NULL,0),(145,'58 vs 59',NULL,NULL,58,0,0,0,0,59,0,0,0,0,0,NULL,0,0,0,NULL,0),(146,'47 vs 48',NULL,NULL,47,2,1,0,0,48,0,2,0,0,0,'Equipo 1',0,3,0,NULL,3),(147,'47 vs 55',NULL,NULL,47,1,1,0,0,55,2,3,0,0,0,'Equipo 2',0,0,3,NULL,3),(148,'47 vs 56',NULL,NULL,47,3,0,0,0,56,3,2,0,0,0,NULL,1,1,1,NULL,3),(149,'47 vs 57',NULL,NULL,47,1,2,0,0,57,0,1,0,0,0,'Equipo 1',0,3,0,NULL,3),(150,'47 vs 58',NULL,NULL,47,0,1,0,0,58,0,0,0,0,0,NULL,1,1,1,NULL,3),(151,'47 vs 59',NULL,NULL,47,2,1,0,0,59,1,2,0,0,0,'Equipo 1',0,3,0,NULL,3),(152,'48 vs 55',NULL,NULL,48,1,0,0,0,55,3,2,0,0,0,'Equipo 2',0,0,3,NULL,3),(153,'48 vs 56',NULL,NULL,48,2,2,0,0,56,2,1,0,0,0,NULL,1,1,1,NULL,3),(154,'48 vs 57',NULL,NULL,48,1,1,0,0,57,0,1,0,0,0,'Equipo 1',0,3,0,NULL,3),(155,'48 vs 58',NULL,NULL,48,0,2,0,0,58,1,0,0,0,0,'Equipo 2',0,0,3,NULL,3),(156,'48 vs 59',NULL,NULL,48,1,1,0,0,59,2,2,0,0,0,'Equipo 2',0,0,3,NULL,3),(157,'55 vs 56',NULL,NULL,55,0,3,0,0,56,0,0,0,0,0,NULL,1,1,1,NULL,3),(158,'55 vs 57',NULL,NULL,55,2,1,0,0,57,1,1,0,0,0,'Equipo 1',0,3,0,NULL,3),(159,'55 vs 58',NULL,NULL,55,3,0,0,0,58,1,2,0,0,0,'Equipo 1',0,3,0,NULL,3),(160,'55 vs 59',NULL,NULL,55,0,1,0,0,59,0,1,0,0,0,NULL,1,1,1,NULL,3),(161,'56 vs 57',NULL,NULL,56,1,2,0,0,57,2,1,0,0,0,'Equipo 2',0,0,3,NULL,3),(162,'56 vs 58',NULL,NULL,56,2,0,0,0,58,1,2,0,0,0,'Equipo 1',0,3,0,NULL,3),(163,'56 vs 59',NULL,NULL,56,0,1,0,0,59,0,3,0,0,0,NULL,1,1,1,NULL,3),(164,'57 vs 58',NULL,NULL,57,3,2,0,0,58,1,1,0,0,0,'Equipo 1',0,3,0,NULL,3),(165,'57 vs 59',NULL,NULL,57,1,0,0,0,59,2,2,0,0,0,'Equipo 2',0,0,3,NULL,3),(166,'58 vs 59',NULL,NULL,58,2,1,0,0,59,2,1,0,0,0,NULL,1,1,1,NULL,3),(362,'55 vs 44','Finales',NULL,55,1,0,0,0,44,0,0,0,0,0,'Equipo 1',NULL,NULL,NULL,1,5),(363,'46 vs 44','Semifinales',NULL,46,0,0,0,0,44,1,0,0,0,0,'Equipo 2',NULL,NULL,NULL,2,5),(364,'44 vs 45','Cuartos de finales',NULL,44,2,0,0,0,45,0,0,0,0,0,'Equipo 1',NULL,NULL,NULL,3,5),(365,'48 vs 46','Cuartos de finales',NULL,48,0,0,0,0,46,1,0,0,0,0,'Equipo 2',NULL,NULL,NULL,4,5),(366,'47 vs 48','Jornada de 16',NULL,47,1,0,0,0,48,2,0,0,0,0,'Equipo 2',NULL,NULL,NULL,5,5),(367,'57 vs 55','Semifinales',NULL,57,0,0,0,0,55,2,0,0,0,0,'Equipo 2',NULL,NULL,NULL,6,5),(368,'55 vs 56','Cuartos de finales',NULL,55,1,0,0,0,56,0,0,0,0,0,'Equipo 1',NULL,NULL,NULL,7,5),(369,'58 vs 57','Cuartos de finales',NULL,58,0,0,0,0,57,1,0,0,0,0,'Equipo 2',NULL,NULL,NULL,8,5),(370,'58 vs 59','Jornada de 16',NULL,58,1,0,0,0,59,0,0,0,0,0,'Equipo 1',NULL,NULL,NULL,9,5);
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institucion`
--

DROP TABLE IF EXISTS `institucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institucion` (
  `nombreInstitucion` varchar(255) NOT NULL,
  `direccionInstitucion` varchar(255) DEFAULT NULL,
  `nInstitucionPais` int DEFAULT NULL,
  `cct` int DEFAULT NULL,
  `nombreNivelEscolaridad` varchar(255) NOT NULL,
  `nombreTurno` varchar(255) NOT NULL,
  `nombreSostenimiento` varchar(255) NOT NULL,
  `paginaWebInstitucion` varchar(255) DEFAULT NULL,
  `institucionTelefono1` varchar(255) DEFAULT NULL,
  `institucionTelefono2` varchar(255) DEFAULT NULL,
  `nombreCiudad` varchar(255) NOT NULL,
  PRIMARY KEY (`nombreInstitucion`),
  KEY `nombreCiudad` (`nombreCiudad`),
  KEY `nombreNivelEscolaridad` (`nombreNivelEscolaridad`),
  KEY `nombreTurno` (`nombreTurno`),
  KEY `nombreSostenimiento` (`nombreSostenimiento`),
  CONSTRAINT `institucion_ibfk_1` FOREIGN KEY (`nombreCiudad`) REFERENCES `ciudad` (`nombreCiudad`),
  CONSTRAINT `institucion_ibfk_2` FOREIGN KEY (`nombreNivelEscolaridad`) REFERENCES `nivelEscolaridad` (`nombreNivelEscolaridad`),
  CONSTRAINT `institucion_ibfk_3` FOREIGN KEY (`nombreSostenimiento`) REFERENCES `sostenimiento` (`nombreSostenimiento`),
  CONSTRAINT `institucion_ibfk_4` FOREIGN KEY (`nombreTurno`) REFERENCES `turno` (`nombreTurno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institucion`
--

LOCK TABLES `institucion` WRITE;
/*!40000 ALTER TABLE `institucion` DISABLE KEYS */;
INSERT INTO `institucion` VALUES ('Colegio Acuña','Av. Revolución 111',6,678901,'bachillerato','abierto','privado','http://www.colegioacuna.mx','8771234567','8777654321','Acuña'),('Colegio Ciudad Obregón','Calle Reforma 666',21,345123,'primaria','nocrturno','público','http://www.colegiociudadobregon.mx','6441234567','6447654321','Ciudad Obregón'),('Colegio Cuauhtémoc','Calle Hidalgo 456',2,234567,'secundaria','vespertino','privado','http://www.colegiocuauhtemoc.mx','6251234567','6257654321','Cuauhtémoc'),('Colegio Huauchinango','Calle Reforma 222',17,890789,'licenciatura','continuo','público','http://www.colegiohuauchinango.edu.mx','7761234567','7767654321','Huauchinango'),('Colegio Nezahualcóyotl','Calle Reforma 888',13,456345,'inicial','matutino','público','http://www.colegioneza.edu.mx','5553456789','5559876543','Nezahualcóyotl'),('Colegio Saltillo','Calle Victoria 444',9,901234,'otro','nocrturno','público','http://www.colegiosaltillo.edu.mx','8441234567','8447654321','Saltillo'),('Colegio San Luis Río Colorado','Calle Reforma 100',25,789567,'profesional','matutino','público','http://www.colegiosanluisrc.mx','6531234567','6537654321','San Luis Río Colorado'),('Colegio Ticul','Calle Reforma 444',29,234901,'otro','continuo','público','http://www.colegioticul.mx','9971234567','9977654321','Ticul'),('Escuela Delicias','Calle Juárez 789',3,345678,'inicial','nocrturno','público','http://www.escueladelicias.edu.mx','6391234567','6397654321','Delicias'),('Escuela Hermosillo','Av. Morelos 777',22,456234,'secundaria','discontinuo','privado','http://www.escuelahermosillo.edu.mx','6621234567','6627654321','Hermosillo'),('Escuela Monclova','Calle Hidalgo 222',7,789012,'licenciatura','matutino','público','http://www.escuelamonclova.edu.mx','8661234567','8667654321','Monclova'),('Escuela Puebla','Av. Morelos 333',18,901890,'posgrado','abierto','privado','http://www.escuelapuebla.mx','2221234567','2227654321','Puebla'),('Escuela Test Ciudad','Av. Morelos 111',26,890678,'bachillerato','vespertino','privado','http://www.escuelatestciudad.edu.mx','5559876543','5551234567','ciudad1'),('Escuela Tlalnepantla','Av. Morelos 999',14,567456,'inicial general','vespertino','privado','http://www.escuelatlalnepantla.mx','5554567890','5550987654','Tlalnepantla'),('Escuela Torreón','Av. Universidad 555',10,123012,'preescolar','discontinuo','privado','http://www.escuelatorreon.mx','8711234567','8717654321','Torreón'),('Instituto Atlixco','Calle Juárez 111',16,789678,'bachillerato','discontinuo','privado','http://www.institutoatlixco.mx','2441234567','2447654321','Atlixco'),('Instituto Chihuahua','Av. Independencia 123',1,123456,'primaria','matutino','público','http://www.institutochihuahua.edu.mx','6141234567','6147654321','Chihuahua'),('Instituto Naucalpan','Blvd. Hidalgo 777',12,345234,'secundaria','abierto','privado','http://www.institutonaucalpan.mx','5552345678','5558765432','Naucalpan'),('Instituto Nogales','Blvd. Juárez 999',24,678456,'inicial general','abierto','privado','http://www.institutonogales.edu.mx','6311234567','6317654321','Nogales'),('Instituto Parral','Calle Reforma 654',5,567890,'profesional','continuo','público','http://www.institutoparral.edu.mx','6271234567','6277654321','Parral'),('Instituto Piedras Negras','Blvd. Morelos 333',8,890123,'posgrado','vespertino','privado','http://www.institutopiedrasnegras.mx','8781234567','8787654321','Piedras Negras'),('Instituto Progreso','Blvd. Juárez 333',28,123890,'posgrado','discontinuo','privado','http://www.institutoprogreso.edu.mx','9691234567','9697654321','Progreso'),('Instituto Tehuacán','Blvd. Juárez 555',20,234012,'preescolar','vespertino','privado','http://www.institutotehuacan.edu.mx','2381234567','2387654321','Tehuacán'),('Liceo Ecatepec','Calle Juárez 666',11,234123,'primaria','continuo','público','http://www.liceoecatepec.edu.mx','5551234567','5557654321','Ecatepec'),('Liceo Juárez','Blvd. Independencia 321',4,456789,'inicial general','discontinuo','privado','http://www.liceojuarez.mx','6561234567','6567654321','Juárez'),('Liceo Mérida','Calle Hidalgo 222',27,901789,'licenciatura','nocrturno','público','http://www.liceomerida.mx','9991234567','9997654321','Mérida'),('Liceo Navojoa','Calle Hidalgo 888',23,567345,'inicial','continuo','público','http://www.liceonavojoa.mx','6421234567','6427654321','Navojoa'),('Liceo San Andrés Cholula','Calle Hidalgo 444',19,123901,'otro','matutino','público','http://www.liceosanandres.mx','2222345678','2228765432','San Andrés Cholula'),('Liceo Toluca','Calle Hidalgo 100',15,678567,'profesional','nocrturno','público','http://www.liceotoluca.edu.mx','7221234567','7227654321','Toluca'),('test','test',1,1,'bachillerato','abierto','privado','test.com','1','1','ciudad1'),('Universidad Tecnológica de Ciudad Juárez','Yepomera Torres Lote Bravo V',67,6615,'licenciatura','matutino','público','utcj.edu.mx','123','123','Juárez');
/*!40000 ALTER TABLE `institucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nivelEscolaridad`
--

DROP TABLE IF EXISTS `nivelEscolaridad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nivelEscolaridad` (
  `nombreNivelEscolaridad` varchar(255) NOT NULL,
  PRIMARY KEY (`nombreNivelEscolaridad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nivelEscolaridad`
--

LOCK TABLES `nivelEscolaridad` WRITE;
/*!40000 ALTER TABLE `nivelEscolaridad` DISABLE KEYS */;
INSERT INTO `nivelEscolaridad` VALUES ('bachillerato'),('inicial'),('inicial general'),('licenciatura'),('otro'),('posgrado'),('preescolar'),('primaria'),('profesional'),('secundaria');
/*!40000 ALTER TABLE `nivelEscolaridad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participante`
--

DROP TABLE IF EXISTS `participante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participante` (
  `idParticipante` int NOT NULL AUTO_INCREMENT,
  `nombreParticipante` varchar(255) DEFAULT NULL,
  `fechaNacimientoParticipante` date DEFAULT NULL,
  `direccionParticipante` varchar(255) DEFAULT NULL,
  `nss` bigint DEFAULT NULL,
  `participanteTelefono1` varchar(255) DEFAULT NULL,
  `participanteTelefono2` varchar(255) DEFAULT NULL,
  `autorizacionAdulto` tinyint(1) DEFAULT NULL,
  `enfermedadesParticipante` varchar(255) DEFAULT NULL,
  `medicamentosParticipante` varchar(255) DEFAULT NULL,
  `operacionesParticipante` varchar(255) DEFAULT NULL,
  `idEquipo` int NOT NULL,
  PRIMARY KEY (`idParticipante`),
  KEY `idEquipo` (`idEquipo`),
  CONSTRAINT `participante_ibfk_1` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`idEquipo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participante`
--

LOCK TABLES `participante` WRITE;
/*!40000 ALTER TABLE `participante` DISABLE KEYS */;
INSERT INTO `participante` VALUES (1,'Miguel Santos Solórzano','2005-06-30',NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1),(2,'Juan Pérez','2005-04-15','123 Calle Falsa, Ciudad Ejemplo',123456789,NULL,NULL,1,'Asma','Inhalador',NULL,1),(3,'María Gómez','2003-11-30','456 Avenida Siempre Viva, Ciudad Ejemplo',987654321,NULL,NULL,0,'Diabetes','Insulina','Apendicitis',2),(4,'Luis Martínez','2007-07-21','789 Calle del Sol, Ciudad Ejemplo',112233445,NULL,NULL,1,NULL,NULL,NULL,3),(5,'Ana López','2006-09-10','321 Calle Luna, Ciudad Ejemplo',556677889,NULL,NULL,1,'Alergia a los frutos secos','Antihistamínico',NULL,1),(6,'Carlos Ruiz','2002-01-15','654 Calle Estrella, Ciudad Ejemplo',223344556,NULL,NULL,0,'Hipertensión','Betabloqueantes','Cirugía de rodilla',2);
/*!40000 ALTER TABLE `participante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `nombreRegion` varchar(255) NOT NULL,
  PRIMARY KEY (`nombreRegion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES ('Chihuahua'),('Coahuila'),('Estado de México'),('Puebla'),('Sonora'),('Test'),('Yucatán'),('Zacatecas');
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sostenimiento`
--

DROP TABLE IF EXISTS `sostenimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sostenimiento` (
  `nombreSostenimiento` varchar(255) NOT NULL,
  PRIMARY KEY (`nombreSostenimiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sostenimiento`
--

LOCK TABLES `sostenimiento` WRITE;
/*!40000 ALTER TABLE `sostenimiento` DISABLE KEYS */;
INSERT INTO `sostenimiento` VALUES ('privado'),('público');
/*!40000 ALTER TABLE `sostenimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tablaPuntaje`
--

DROP TABLE IF EXISTS `tablaPuntaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tablaPuntaje` (
  `idTablaPuntaje` int NOT NULL AUTO_INCREMENT,
  `posicion` int DEFAULT NULL,
  `idEquipoTablaPuntaje` int NOT NULL,
  `puntos` int DEFAULT NULL,
  `partidosGanados` int DEFAULT NULL,
  `partidosPerdidos` int DEFAULT NULL,
  `partidosEmpatados` int DEFAULT NULL,
  `golesAFavor` int DEFAULT NULL,
  `golesEnContra` int DEFAULT NULL,
  `diferenciaGoles` int DEFAULT NULL,
  `idCompeticion` int NOT NULL,
  PRIMARY KEY (`idTablaPuntaje`),
  KEY `idCompeticion` (`idCompeticion`),
  KEY `idEquipoTablaPuntaje` (`idEquipoTablaPuntaje`),
  CONSTRAINT `tablaPuntaje_ibfk_1` FOREIGN KEY (`idCompeticion`) REFERENCES `competicion` (`idCompeticion`),
  CONSTRAINT `tablaPuntaje_ibfk_2` FOREIGN KEY (`idEquipoTablaPuntaje`) REFERENCES `equipo` (`idEquipo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tablaPuntaje`
--

LOCK TABLES `tablaPuntaje` WRITE;
/*!40000 ALTER TABLE `tablaPuntaje` DISABLE KEYS */;
INSERT INTO `tablaPuntaje` VALUES (1,1,3,21,1,1,0,8,2,6,1),(2,2,1,7,1,1,0,3,1,2,1),(3,3,2,4,0,1,1,2,8,-6,1);
/*!40000 ALTER TABLE `tablaPuntaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoCompeticion`
--

DROP TABLE IF EXISTS `tipoCompeticion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoCompeticion` (
  `nombreTipoCompeticion` varchar(255) NOT NULL,
  PRIMARY KEY (`nombreTipoCompeticion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoCompeticion`
--

LOCK TABLES `tipoCompeticion` WRITE;
/*!40000 ALTER TABLE `tipoCompeticion` DISABLE KEYS */;
INSERT INTO `tipoCompeticion` VALUES ('Eliminación Directa'),('Regular. Ida y Vuelta'),('Regular. Todos contra Todos');
/*!40000 ALTER TABLE `tipoCompeticion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turno`
--

DROP TABLE IF EXISTS `turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turno` (
  `nombreTurno` varchar(255) NOT NULL,
  PRIMARY KEY (`nombreTurno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turno`
--

LOCK TABLES `turno` WRITE;
/*!40000 ALTER TABLE `turno` DISABLE KEYS */;
INSERT INTO `turno` VALUES ('abierto'),('continuo'),('discontinuo'),('matutino'),('no aplcia'),('nocrturno'),('vespertino');
/*!40000 ALTER TABLE `turno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(255) NOT NULL,
  `contraseniaUsuario` varchar(255) NOT NULL,
  `correoUsuario` varchar(255) DEFAULT NULL,
  `nTelefonoUsuario` bigint DEFAULT NULL,
  `fotoPerfilUsuario` blob,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Abdiel','1234',NULL,NULL,NULL),(2,'Javier','1234',NULL,NULL,NULL),(3,'Eder','1234',NULL,NULL,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-13 23:43:33
