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
  `idCiudad` int NOT NULL AUTO_INCREMENT,
  `nombreCiudad` varchar(255) DEFAULT NULL,
  `idRegion` int NOT NULL,
  PRIMARY KEY (`idCiudad`),
  KEY `idRegion` (`idRegion`),
  CONSTRAINT `ciudad_ibfk_1` FOREIGN KEY (`idRegion`) REFERENCES `region` (`idRegion`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (1,'Juárez',1),(2,'Ciudad Chihuahua',1),(3,'Delicias',1),(4,'Parral',1),(5,'Cuauhtémoc',1),(6,'Hermosillo',2),(7,'Ciudad Obregón',2),(8,'Nogales',2),(9,'Guaymas',2),(10,'Navojoa',2),(11,'Saltillo',3),(12,'Torreón',3),(13,'Monclova',3),(14,'Piedras Negras',3),(15,'Acuña',3),(16,'Toluca',4),(17,'Ecatepec',4),(18,'Naucalpan',4),(19,'Nezahualcóyotl',4),(20,'Tlalnepantla',4),(21,'Mérida',5),(22,'Valladolid',5),(23,'Tizimín',5),(24,'Progreso',5),(25,'Tekax',5),(26,'Puebla',6),(27,'Tehuacán',6),(28,'San Martín Texmelucan',6),(29,'Atlixco',6),(30,'Cholula',6);
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
  `idTipoCompeticion` int NOT NULL,
  PRIMARY KEY (`idCompeticion`),
  KEY `idTipoCompeticion` (`idTipoCompeticion`),
  CONSTRAINT `competicion_ibfk_1` FOREIGN KEY (`idTipoCompeticion`) REFERENCES `tipoCompeticion` (`idTipoCompeticion`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competicion`
--

LOCK TABLES `competicion` WRITE;
/*!40000 ALTER TABLE `competicion` DISABLE KEYS */;
INSERT INTO `competicion` VALUES (1,'Competicion Toro Nativo 25 Aniversario','Toro Nativo es una competicion entre los docentes de las distintos grupos de carreras para promover la competencia, la actividad física tanto en alumnos como en docentes y la solidaridad social. En estos eventos únicamente pueden participar docentes.',3);
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
-- Table structure for table `competicionParticipantes`
--

DROP TABLE IF EXISTS `competicionParticipantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competicionParticipantes` (
  `idCompeticion` int NOT NULL,
  `idEquipo` int NOT NULL,
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
INSERT INTO `competicionParticipantes` VALUES (1,1),(1,2),(1,3);
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
  `idInstitucion` int NOT NULL,
  PRIMARY KEY (`idEquipo`),
  KEY `idInstitucion` (`idInstitucion`),
  CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`idInstitucion`) REFERENCES `institucion` (`idInstitucion`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipo`
--

LOCK TABLES `equipo` WRITE;
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
INSERT INTO `equipo` VALUES (1,3,'TRM31','TICs sin maeta',1),(2,2,'TDM21','Los insanos',1),(3,3,'TDM33','Tecer equipo',1),(4,1,'TRM11','Los iniciales',1),(5,1,'TDM12','Primer equipo',1),(6,3,'TRS31','Superiores TIC',2),(7,2,'TDS21','Tecnólogos sonorenses',2),(8,3,'TDS33','Tercer equipo TIC',2),(9,1,'TRS11','Iniciales TIC',2),(10,1,'TDS12','Primer equipo TIC',2),(11,3,'TRC31','Superiores Coahuila',3),(12,2,'TDC21','Tecnólogos coahuilenses',3),(13,3,'TDC33','Tercer equipo Coahuila',3),(14,1,'TRC11','Iniciales Coahuila',3),(15,1,'TDC12','Primer equipo Coahuila',3),(16,3,'TRE31','Superiores EDOMEX',4),(17,2,'TDE21','Tecnólogos mexiquenses',4),(18,3,'TDE33','Tercer equipo EDOMEX',4),(19,1,'TRE11','Iniciales EDOMEX',4),(20,1,'TDE12','Primer equipo EDOMEX',4),(21,3,'TRY31','Superiores Yucatán',5),(22,2,'TDY21','Tecnólogos yucatecos',5),(23,3,'TDY33','Tercer equipo Yucatán',5),(24,1,'TRY11','Iniciales Yucatán',5),(25,1,'TDY12','Primer equipo Yucatán',5),(26,3,'TRP31','Superiores Puebla',6),(27,2,'TDP21','Tecnólogos poblanos',6),(28,3,'TDP33','Tercer equipo Puebla',6),(29,1,'TRP11','Iniciales Puebla',6),(30,1,'TDP12','Primer equipo Puebla',6);
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
  `fechaInicio` datetime DEFAULT NULL,
  `idEquipo1` int NOT NULL,
  `golesEquipo1` int DEFAULT NULL,
  `tarjetasAmarillasEquipo1` int DEFAULT NULL,
  `tarjetasRojasEquipo1` int DEFAULT NULL,
  `golesPenalesFinalesEquipo1` int DEFAULT NULL,
  `idEquipo2` int NOT NULL,
  `golesEquipo2` int DEFAULT NULL,
  `tarjetasAmarillasEquipo2` int DEFAULT NULL,
  `tarjetasRojasEquipo2` int DEFAULT NULL,
  `golesPenalesFinalesEquipo2` int DEFAULT NULL,
  `cantidadTiempoExtra` int DEFAULT NULL,
  `ganadorPartido` int DEFAULT NULL,
  `esPartidoEmpatado` tinyint(1) DEFAULT NULL,
  `puntosEquipo1` int DEFAULT NULL,
  `puntosEquipo2` int DEFAULT NULL,
  `idCompeticion` int NOT NULL,
  PRIMARY KEY (`idEvento`),
  KEY `idCompeticion` (`idCompeticion`),
  KEY `idEquipo1` (`idEquipo1`),
  KEY `idEquipo2` (`idEquipo2`),
  CONSTRAINT `evento_ibfk_1` FOREIGN KEY (`idCompeticion`) REFERENCES `competicion` (`idCompeticion`),
  CONSTRAINT `evento_ibfk_2` FOREIGN KEY (`idEquipo1`) REFERENCES `equipo` (`idEquipo`),
  CONSTRAINT `evento_ibfk_3` FOREIGN KEY (`idEquipo2`) REFERENCES `equipo` (`idEquipo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES (1,'TICs sin maeta vs Los insanos','Semifinales','2024-06-30 07:30:00',1,0,0,0,0,2,0,0,0,0,9,1,0,3,0,1),(2,'TICs vs Tercer equipo','Semifinales','2024-06-30 07:30:00',1,0,0,0,0,3,0,0,0,0,9,1,0,3,0,1),(3,'Los insanos vs Tercer equipo','Semifinales','2024-06-30 07:30:00',2,0,0,0,0,3,0,0,0,0,9,1,0,3,0,1);
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institucion`
--

DROP TABLE IF EXISTS `institucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institucion` (
  `idInstitucion` int NOT NULL AUTO_INCREMENT,
  `nombreInstitucion` varchar(255) DEFAULT NULL,
  `direccionInstitucion` varchar(255) DEFAULT NULL,
  `nInstitucionPais` int DEFAULT NULL,
  `cct` int DEFAULT NULL,
  `idNivelEscolaridad` int NOT NULL,
  `idTurno` int NOT NULL,
  `idSostenimiento` int NOT NULL,
  `paginaWebInstitucion` varchar(255) DEFAULT NULL,
  `idCiudad` int NOT NULL,
  PRIMARY KEY (`idInstitucion`),
  KEY `idCiudad` (`idCiudad`),
  KEY `idNivelEscolaridad` (`idNivelEscolaridad`),
  KEY `idTurno` (`idTurno`),
  KEY `idSostenimiento` (`idSostenimiento`),
  CONSTRAINT `institucion_ibfk_1` FOREIGN KEY (`idCiudad`) REFERENCES `ciudad` (`idCiudad`),
  CONSTRAINT `institucion_ibfk_2` FOREIGN KEY (`idNivelEscolaridad`) REFERENCES `nivelEscolaridad` (`idNivelEscolaridad`),
  CONSTRAINT `institucion_ibfk_3` FOREIGN KEY (`idSostenimiento`) REFERENCES `sostenimiento` (`idSostenimiento`),
  CONSTRAINT `institucion_ibfk_4` FOREIGN KEY (`idTurno`) REFERENCES `turno` (`idTurno`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institucion`
--

LOCK TABLES `institucion` WRITE;
/*!40000 ALTER TABLE `institucion` DISABLE KEYS */;
INSERT INTO `institucion` VALUES (1,'Universidad Tecnológica de Ciudad Juárez','Esquina entre Yepomera y Calle Tórres',3051,32695,8,3,1,'utcj.edu.mx',1),(2,'Instituto Tecnológico de Ciudad Juárez','Av. Tecnológico 1340, Juárez, Chihuahua',1,123456,3,1,1,'www.itcj.edu.mx',1),(3,'Universidad de Sonora','Blvd. Luis Encinas y Rosales S/N, Hermosillo, Sonora',2,654321,3,1,1,'www.unison.mx',6),(4,'Universidad Autónoma de Coahuila','Blvd. Venustiano Carranza s/n, Saltillo, Coahuila',3,112233,3,1,1,'www.uadec.mx',11),(5,'Universidad Autónoma del Estado de México','Paseo Tollocan S/N, Toluca, Estado de México',4,334455,3,1,1,'www.uaemex.mx',16),(6,'Universidad Autónoma de Yucatán','Calle 60 S/N, Mérida, Yucatán',5,556677,3,1,1,'www.uady.mx',21),(7,'Benemérita Universidad Autónoma de Puebla','4 Sur 104 Centro Histórico, Puebla, Puebla',6,778899,3,1,1,'www.buap.mx',26);
/*!40000 ALTER TABLE `institucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nivelEscolaridad`
--

DROP TABLE IF EXISTS `nivelEscolaridad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nivelEscolaridad` (
  `idNivelEscolaridad` int NOT NULL,
  `nombreNivelEscolaridad` varchar(255) NOT NULL,
  PRIMARY KEY (`idNivelEscolaridad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nivelEscolaridad`
--

LOCK TABLES `nivelEscolaridad` WRITE;
/*!40000 ALTER TABLE `nivelEscolaridad` DISABLE KEYS */;
INSERT INTO `nivelEscolaridad` VALUES (1,'preescolar'),(2,'primaria'),(3,'secundaria'),(4,'inicial'),(5,'inicial general'),(6,'profesional'),(7,'bachillerato'),(8,'licenciatura'),(9,'posgrado'),(10,'otro');
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
INSERT INTO `participante` VALUES (1,'Miguel Santos Solórzano','2005-06-30',NULL,NULL,1,NULL,NULL,NULL,1),(2,'Juan Pérez','2005-04-15','123 Calle Falsa, Ciudad Ejemplo',123456789,1,'Asma','Inhalador',NULL,1),(3,'María Gómez','2003-11-30','456 Avenida Siempre Viva, Ciudad Ejemplo',987654321,0,'Diabetes','Insulina','Apendicitis',2),(4,'Luis Martínez','2007-07-21','789 Calle del Sol, Ciudad Ejemplo',112233445,1,NULL,NULL,NULL,3),(5,'Ana López','2006-09-10','321 Calle Luna, Ciudad Ejemplo',556677889,1,'Alergia a los frutos secos','Antihistamínico',NULL,1),(6,'Carlos Ruiz','2002-01-15','654 Calle Estrella, Ciudad Ejemplo',223344556,0,'Hipertensión','Betabloqueantes','Cirugía de rodilla',2);
/*!40000 ALTER TABLE `participante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `idRegion` int NOT NULL AUTO_INCREMENT,
  `nombreRegion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idRegion`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'Chihuahua'),(2,'Sonora'),(3,'Coahuila'),(4,'Estado de México'),(5,'Yucatán'),(6,'Puebla'),(8,'Zacatecas');
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sostenimiento`
--

DROP TABLE IF EXISTS `sostenimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sostenimiento` (
  `idSostenimiento` int NOT NULL,
  `nombreSostenimiento` varchar(255) NOT NULL,
  PRIMARY KEY (`idSostenimiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sostenimiento`
--

LOCK TABLES `sostenimiento` WRITE;
/*!40000 ALTER TABLE `sostenimiento` DISABLE KEYS */;
INSERT INTO `sostenimiento` VALUES (1,'público'),(2,'privado');
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
-- Table structure for table `telefonosInstitucion`
--

DROP TABLE IF EXISTS `telefonosInstitucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefonosInstitucion` (
  `nTelefonoInstitucion` bigint NOT NULL,
  `idInstitucion` int NOT NULL,
  KEY `idInstitucion` (`idInstitucion`),
  CONSTRAINT `telefonosInstitucion_ibfk_1` FOREIGN KEY (`idInstitucion`) REFERENCES `institucion` (`idInstitucion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefonosInstitucion`
--

LOCK TABLES `telefonosInstitucion` WRITE;
/*!40000 ALTER TABLE `telefonosInstitucion` DISABLE KEYS */;
INSERT INTO `telefonosInstitucion` VALUES (6561234567,1),(6562345678,1),(6563456789,1),(6561234567,1),(6567654321,1),(6561122334,1),(6621234567,2),(6627654321,2),(8441234567,3),(8447654321,3),(8441122334,3),(7221234567,4),(7227654321,4),(9991234567,5),(9997654321,5),(9991122334,5),(2221234567,6),(2227654321,6);
/*!40000 ALTER TABLE `telefonosInstitucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefonosParticipante`
--

DROP TABLE IF EXISTS `telefonosParticipante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefonosParticipante` (
  `nTelefonoParticipante` bigint NOT NULL,
  `idParticipante` int NOT NULL,
  KEY `idParticipante` (`idParticipante`),
  CONSTRAINT `telefonosParticipante_ibfk_1` FOREIGN KEY (`idParticipante`) REFERENCES `participante` (`idParticipante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefonosParticipante`
--

LOCK TABLES `telefonosParticipante` WRITE;
/*!40000 ALTER TABLE `telefonosParticipante` DISABLE KEYS */;
INSERT INTO `telefonosParticipante` VALUES (5551234567,1),(5559876543,1),(5552345678,2),(5558765432,2),(5553456789,3),(5557654321,3),(5554567890,4),(5556543210,4),(5555678901,5),(5555432109,5);
/*!40000 ALTER TABLE `telefonosParticipante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoCompeticion`
--

DROP TABLE IF EXISTS `tipoCompeticion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoCompeticion` (
  `idTipoCompeticion` int NOT NULL AUTO_INCREMENT,
  `nombreTipoCompeticion` varchar(255) NOT NULL,
  PRIMARY KEY (`idTipoCompeticion`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoCompeticion`
--

LOCK TABLES `tipoCompeticion` WRITE;
/*!40000 ALTER TABLE `tipoCompeticion` DISABLE KEYS */;
INSERT INTO `tipoCompeticion` VALUES (1,'Regular. Ida y Vuelta'),(2,'Regular. Todos contra Todos'),(3,'Eliminación Directa'),(4,'Combinado');
/*!40000 ALTER TABLE `tipoCompeticion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turno`
--

DROP TABLE IF EXISTS `turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turno` (
  `idTurno` int NOT NULL,
  `nombreTurno` varchar(255) NOT NULL,
  PRIMARY KEY (`idTurno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turno`
--

LOCK TABLES `turno` WRITE;
/*!40000 ALTER TABLE `turno` DISABLE KEYS */;
INSERT INTO `turno` VALUES (1,'no aplcia'),(2,'matutino'),(3,'vespertino'),(4,'nocrturno'),(5,'discontinuo'),(6,'continuo'),(7,'abierto');
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

-- Dump completed on 2024-07-17 19:47:28
