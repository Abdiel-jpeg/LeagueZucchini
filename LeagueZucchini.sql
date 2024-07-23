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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competicion`
--

LOCK TABLES `competicion` WRITE;
/*!40000 ALTER TABLE `competicion` DISABLE KEYS */;
INSERT INTO `competicion` VALUES (0,'Competicion Toro Nativo 25 Aniversario','Toro Nativo es una competicion entre los docentes de las distintos grupos de carreras para promover la competencia, la actividad física tanto en alumnos como en docentes y la solidaridad social. En estos eventos únicamente pueden participar docentes.','3');
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
  `nombreInstitucion` varchar(255) NOT NULL,
  PRIMARY KEY (`idEquipo`),
  KEY `nombreInstitucion` (`nombreInstitucion`),
  CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`nombreInstitucion`) REFERENCES `institucion` (`nombreInstitucion`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipo`
--

LOCK TABLES `equipo` WRITE;
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
INSERT INTO `equipo` VALUES (32,1,'A','Team Karroten','Escuela Delicias'),(33,2,'B','Team Kartoffeln','Escuela Delicias'),(34,3,'C','Team Gemüse','Escuela Delicias'),(35,1,'A','Field Karroten','Liceo Ecatepec'),(36,2,'B','Field Kartoffeln','Liceo Ecatepec'),(37,3,'C','Field Gemüse','Liceo Ecatepec'),(38,1,'A','League Karroten','Escuela Hermosillo'),(39,2,'B','League Kartoffeln','Escuela Hermosillo'),(40,3,'C','League Gemüse','Escuela Hermosillo'),(41,1,'A','Team Karroten','Colegio Huauchinango'),(42,2,'B','Team Kartoffeln','Colegio Huauchinango'),(43,3,'C','Team Gemüse','Colegio Huauchinango'),(44,1,'A','Field Karroten','Liceo Juárez'),(45,2,'B','Field Kartoffeln','Liceo Juárez'),(46,3,'C','Field Gemüse','Liceo Juárez'),(47,1,'A','TRMA','Universidad Tecnológica de Ciudad Juárez'),(48,2,'B','League Kartoffeln','Universidad Tecnológica de Ciudad Juárez'),(50,1,'A','Team Karroten','Liceo Mérida'),(51,2,'B','Team Kartoffeln','Liceo Mérida'),(52,3,'C','Team Gemüse','Liceo Mérida'),(54,1,'TDM15','Programacion','test'),(55,1,'TDM15','Programacion','Universidad Tecnológica de Ciudad Juárez'),(56,3,'TRM31','Redes','Universidad Tecnológica de Ciudad Juárez');
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
INSERT INTO `tipoCompeticion` VALUES ('Combinado'),('Eliminación Directa'),('Regular. Ida y Vuelta'),('Regular. Todos contra Todos');
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

-- Dump completed on 2024-07-22 20:12:43
