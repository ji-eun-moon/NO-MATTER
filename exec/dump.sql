-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: i9c105.p.ssafy.io    Database: nomatter
-- ------------------------------------------------------
-- Server version	11.0.2-MariaDB-1:11.0.2+maria~ubu2204

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
-- Table structure for table `alert`
--

DROP TABLE IF EXISTS `alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alert` (
  `alert_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `hub_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `alert_category` varchar(20) NOT NULL,
  `alert_title` varchar(30) DEFAULT NULL,
  `alert_detail` varchar(100) DEFAULT NULL,
  `alert_date` datetime DEFAULT NULL,
  PRIMARY KEY (`alert_id`),
  KEY `fk_users_alert_idx` (`user_id`),
  KEY `fk_hubs_alert_idx` (`hub_id`),
  CONSTRAINT `fk_hubs_alert` FOREIGN KEY (`hub_id`) REFERENCES `hubs` (`hub_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_users_alert` FOREIGN KEY (`user_id`) REFERENCES `users` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alert`
--

LOCK TABLES `alert` WRITE;
/*!40000 ALTER TABLE `alert` DISABLE KEYS */;
/*!40000 ALTER TABLE `alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `download` bigint(20) NOT NULL,
  `remote_type` varchar(15) NOT NULL,
  `remote_code` varchar(30) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,1,'TV','Samsung_BN59-00683A','2023-08-14 15:18:02'),(2,3,'TV','Samsung_BN59-00861A','2023-08-14 15:19:04'),(3,1,'TV','Samsung_BN59-00865A','2023-08-14 15:19:13'),(4,0,'TV','Samsung_BN59-00869A','2023-08-14 15:19:50'),(5,0,'TV','Samsung_BN59-00940A','2023-08-14 15:20:33'),(6,1,'TV','SamsungBN59-01054A','2023-08-14 15:20:42'),(7,2,'TV','Samsung_BN59-01175B','2023-08-14 15:20:51');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hubs`
--

DROP TABLE IF EXISTS `hubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hubs` (
  `hub_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `hub_uuid` varchar(36) NOT NULL,
  `weather_key` varchar(40) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `invite_code` varchar(50) DEFAULT NULL,
  `code_expired_time` datetime DEFAULT NULL,
  PRIMARY KEY (`hub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hubs`
--

LOCK TABLES `hubs` WRITE;
/*!40000 ALTER TABLE `hubs` DISABLE KEYS */;
INSERT INTO `hubs` VALUES (1,'doha-hubUuid','weatherKey','location',NULL,NULL),(2,'jieun-hubUuid1','weatherKey','location',NULL,NULL),(3,'seohuiHub','weatherKey','location',NULL,NULL),(4,'seohuiHubId','weatherKey','location','DoXdNdY8KdrdkMRVQ7WY','2023-08-17 16:42:39'),(6,'doha-hubUuid2','weatherKey','location','6lpLeoxbcZQQZY8Q9mZZ','2023-08-17 09:48:55'),(8,'00000001-1d10-4282-b68c-e17c508b94f4','weatherKey','location','JYcJBxO4ElO1hqUtBYFz','2023-08-19 10:42:35');
/*!40000 ALTER TABLE `hubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `remote`
--

DROP TABLE IF EXISTS `remote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `remote` (
  `remote_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `hub_id` bigint(20) NOT NULL,
  `controller_name` varchar(20) NOT NULL,
  `remote_type` varchar(15) NOT NULL,
  `remote_code` varchar(30) NOT NULL,
  `is_board` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`remote_id`),
  KEY `fk_hubs_remote_idx` (`hub_id`),
  CONSTRAINT `fk_hubs_remote` FOREIGN KEY (`hub_id`) REFERENCES `hubs` (`hub_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `remote`
--

LOCK TABLES `remote` WRITE;
/*!40000 ALTER TABLE `remote` DISABLE KEYS */;
INSERT INTO `remote` VALUES (1,2,'에어컨','AC','A1B2C3D4',-1),(2,2,'티비','TV','A1B2C3D4',-1),(3,1,'삼성 티비','TV','Samsung_BN59-00861A',2),(4,2,'선풍기','Fan','A1B2C3D4',-1),(6,4,'해보자','TV','Samsung_BN59-00683A',1),(7,4,'new','TV','Samsung_BN59-00861A',2),(13,4,'ac','AC','A1B2C3D4',-1),(15,4,'ㅇㄴㅇㅇㄹ','TV','Samsung_BN59-00865A',3),(16,4,'가보자','TV','SamsungBN59-01054A',6),(28,4,'해보자','TV','Samsung_BN59-00683A',-1),(31,1,'싸피티비','TV','Samsung_BN59-01175B',7),(33,8,'강의실티비','TV','Samsung_BN59-01175B',7),(34,8,'강의실tv','TV','Ssafy',-1);
/*!40000 ALTER TABLE `remote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routine`
--

DROP TABLE IF EXISTS `routine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routine` (
  `routine_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `hub_id` bigint(20) NOT NULL,
  `attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`attributes`)),
  PRIMARY KEY (`routine_id`),
  KEY `fk_hubs_routine_idx` (`hub_id`),
  CONSTRAINT `fk_hubs_routine` FOREIGN KEY (`hub_id`) REFERENCES `hubs` (`hub_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routine`
--

LOCK TABLES `routine` WRITE;
/*!40000 ALTER TABLE `routine` DISABLE KEYS */;
INSERT INTO `routine` VALUES (3,1,'{\"kind\":\"schedule\",\"condition\":{\"day\":[],\"hour\":1,\"minute\":0,\"ampm\":\"am\"},\"selectedHub\":{\"usersHubsId\":1,\"hubId\":1,\"userId\":2,\"userHubAuth\":\"admin\",\"userHubName\":\"거실\"},\"selectedRemote\":{\"remoteId\":3,\"hubId\":1,\"controllerName\":\"삼성 티비\",\"remoteType\":\"TV\",\"remoteCode\":\"Samsung_BN59-00861A\",\"isBoard\":2},\"selectedRemoteAction\":null,\"selectedRemoteButton\":\"전원 ON/OFF\",\"active\":true}'),(59,8,'{\"kind\":\"schedule\",\"condition\":{\"day\":[\"금\"],\"hour\":10,\"minute\":20,\"ampm\":\"am\"},\"selectedHub\":{\"usersHubsId\":15,\"hubId\":8,\"userId\":6,\"userHubAuth\":\"admin\",\"userHubName\":\"강의실\"},\"selectedRemote\":{\"remoteId\":33,\"hubId\":8,\"controllerName\":\"강의실티비\",\"remoteType\":\"TV\",\"remoteCode\":\"Samsung_BN59-01175B\",\"isBoard\":7},\"selectedRemoteAction\":\"KEY_POWER\",\"selectedRemoteButton\":\"전원 ON/OFF\",\"active\":true}'),(62,8,'{\"kind\":\"schedule\",\"condition\":{\"day\":[\"금\"],\"hour\":10,\"minute\":40,\"ampm\":\"am\"},\"selectedHub\":{\"usersHubsId\":15,\"hubId\":8,\"userId\":6,\"userHubAuth\":\"admin\",\"userHubName\":\"강의실\"},\"selectedRemote\":{\"remoteId\":33,\"hubId\":8,\"controllerName\":\"강의실티비\",\"remoteType\":\"TV\",\"remoteCode\":\"Samsung_BN59-01175B\",\"isBoard\":7},\"selectedRemoteAction\":\"KEY_POWER\",\"selectedRemoteButton\":\"전원 ON/OFF\",\"active\":true}');
/*!40000 ALTER TABLE `routine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `member_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `user_email` varchar(25) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_name` varchar(10) NOT NULL,
  `user_img` varchar(100) DEFAULT NULL,
  `user_phone` varchar(20) NOT NULL,
  `refresh_token` varchar(200) DEFAULT NULL,
  `user_svc_agmt` tinyint(1) NOT NULL DEFAULT 1,
  `social_type` varchar(10) NOT NULL,
  `user_svc_agmt_date` datetime DEFAULT current_timestamp(),
  `user_info_agmt` tinyint(1) NOT NULL DEFAULT 1,
  `user_info_agmt_date` datetime DEFAULT current_timestamp(),
  `user_alert_agmt` tinyint(1) DEFAULT 0,
  `user_alert_agmt_date` datetime DEFAULT NULL,
  `is_push_alert_on` tinyint(1) DEFAULT 0,
  `is_dark_alert_on` tinyint(1) DEFAULT 0,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jieun','mjieun0956@gmail.com','$2a$10$qj8IJ5iRt4atldCBf80JAOxHktZ1ACXV4f3SrfgPpjQHqlDzEgjES','문지은',NULL,'01023306694','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIzMjI5MTQsImV4cCI6MTY5MjkyNzcxNH0.cENbH0i2MhQ-w_y-_0rxbvWiPzxz0T3EsUPDID2ThYY',1,'nomatter','2023-08-14 15:49:11',1,'2023-08-14 15:49:11',0,NULL,0,0,'2023-08-14 15:49:11'),(2,'ssafy','ssafy1@ssafy.com','$2a$10$Lsc8bFCWkXZMQvKPI/TSKeMJoC4Mn3yFKjCGmZbzMMbPyW0HDHUZ.','ssafyName',NULL,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIyNzUyNTMsImV4cCI6MTY5Mjg4MDA1M30.n81G57nLjO_CyhWvDB4uWdbupCVpRgwBGvvV8C7SyAE',1,'nomatter','2023-08-14 15:49:52',1,'2023-08-14 15:49:52',0,NULL,0,0,'2023-08-14 15:49:52'),(3,'togkstls1008','togkstls1008@samsung.com','$2a$10$XaDSXI3ouZB07ozrVgFj7u2p67nzf/LqNdn6L1UWjz7biiTxmdMUq','한석현',NULL,'01064366951','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIyOTY5NDgsImV4cCI6MTY5MjkwMTc0OH0.1PVZ0nTFhZzP32QPQeYSSkFPGOq1jjrAkGR1C9mQ-qo',1,'nomatter','2023-08-15 04:58:47',1,'2023-08-15 04:58:47',0,NULL,0,0,'2023-08-15 04:58:47'),(5,'chanseok','ssafy@naver.com','$2a$10$V3yiUMQNSx7qVb5aY4Brje5o3emxp495HEmRQSisraXJg8j7crs6W','최찬석',NULL,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIyOTkwMzIsImV4cCI6MTY5MjkwMzgzMn0.-7efVSkXVBON_3Q-DrAUJXXUuhDUPuD4CRZQ66RFVwE',1,'nomatter','2023-08-15 11:40:58',1,'2023-08-15 11:40:58',0,NULL,0,0,'2023-08-15 11:40:58'),(6,'phj799','phj799@naver.com','$2a$10$DSWs1Ay/r65yUESj/g/v8uV455GjP1IbV4/A2FraqKtkXWiGviB7C','박현종',NULL,'01033369361','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIzMjI0NjUsImV4cCI6MTY5MjkyNzI2NX0.0R3JJGM5zNtORjqal_V0etFi0kj_8RvtNnAKigc5y30',1,'nomatter','2023-08-15 12:38:05',1,'2023-08-15 12:38:05',0,NULL,0,0,'2023-08-15 12:38:05'),(7,'12345','sds@zxa.com','$2a$10$SkVKR0OuHVH4a3Mb5zqrzevUVJkIUgywqCmnT.B0VT5NEeuJWpi96','이게안전해',NULL,'01000000000','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIxNTg3ODQsImV4cCI6MTY5Mjc2MzU4NH0.LWOXm2VT_DERjVgheAogucJeFpUvTdfYUA4gwVGZ4TE',1,'nomatter','2023-08-16 04:06:07',1,'2023-08-16 04:06:07',0,NULL,0,0,'2023-08-16 04:06:07'),(8,'ssafy1234','quso12358@naver.com','$2a$10$lKxjwhMT89JCSOqonlBGCe.9YLLJXvUtX4jc8dvzRAh6v/R8Jefp2','ssafy',NULL,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIyMzEwMDMsImV4cCI6MTY5MjgzNTgwM30.o_uQYGJKfsXMdHi2q7uPm6TLkuUmOKuE6t0s9Xj_n5c',1,'nomatter','2023-08-17 00:09:52',1,'2023-08-17 00:09:52',0,NULL,0,0,'2023-08-17 00:09:52'),(9,'seohui','seohui@naver.com','$2a$10$aMF5d6I4fU37Ym8mPjaAIOLSmR18OaQH8m4J.tIEqUdJZTH5hGjhW','박서희',NULL,'01012341234','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIyOTM3MzcsImV4cCI6MTY5Mjg5ODUzN30.MK1SVm2uEdB2w8Kxveg3wpXu7b75kiKp_wVZ3pw3TnE',1,'nomatter','2023-08-17 05:18:25',1,'2023-08-17 05:18:25',0,NULL,0,0,'2023-08-17 05:18:25'),(11,'choichanseok','ssafy@naver.com','$2a$10$eqnGz8rJFsR9P6.51cgDzur2MvvBXV4ovmPGUX8yQDNLTa1F3OD7a','최찬석',NULL,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIyODAzNTksImV4cCI6MTY5Mjg4NTE1OX0.ZVjJiXaytp6i_d-7k0hQmX0wFN4xEkR7W3nYdJrk7YQ',1,'nomatter','2023-08-17 13:52:33',1,'2023-08-17 13:52:33',0,NULL,0,0,'2023-08-17 13:52:33');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usershubs`
--

DROP TABLE IF EXISTS `usershubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usershubs` (
  `users_hubs_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `hub_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `user_hub_auth` varchar(10) NOT NULL,
  `user_hub_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`users_hubs_id`),
  KEY `fk_user_user_hubs_idx` (`user_id`),
  KEY `fk_hubs_user_hubs_idx` (`hub_id`),
  CONSTRAINT `fk_hubs_user_hubs` FOREIGN KEY (`hub_id`) REFERENCES `hubs` (`hub_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_user_hubs` FOREIGN KEY (`user_id`) REFERENCES `users` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usershubs`
--

LOCK TABLES `usershubs` WRITE;
/*!40000 ALTER TABLE `usershubs` DISABLE KEYS */;
INSERT INTO `usershubs` VALUES (1,1,2,'admin','거실'),(2,2,1,'admin','지은허브'),(8,6,2,'admin','방'),(15,8,6,'admin','강의실'),(16,8,1,'user','강의실');
/*!40000 ALTER TABLE `usershubs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 10:43:31
