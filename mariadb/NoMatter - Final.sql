-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema nomatter
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `nomatter` ;

-- -----------------------------------------------------
-- Schema nomatter
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nomatter` DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
USE `nomatter` ;

-- -----------------------------------------------------
-- Table `nomatter`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nomatter`.`users` ;

CREATE TABLE IF NOT EXISTS `nomatter`.`users` (
  `member_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(20) NOT NULL,
  `user_email` VARCHAR(25) NOT NULL,
  `user_password` VARCHAR(100) NOT NULL,
  `user_name` VARCHAR(10) NOT NULL,
  `user_img` VARCHAR(100) NULL DEFAULT NULL,
  `user_phone` VARCHAR(20) NOT NULL,
  `refresh_token` VARCHAR(200) NULL,
  `user_svc_agmt` TINYINT(1)  NOT NULL DEFAULT TRUE ,
  `social_type` VARCHAR(10) NOT NULL,
  `user_svc_agmt_date` DATETIME NULL DEFAULT NOW(),
  `user_info_agmt` TINYINT(1) NOT NULL DEFAULT TRUE,
  `user_info_agmt_date` DATETIME NULL DEFAULT NOW(),
  `user_alert_agmt` TINYINT(1) NULL DEFAULT FALSE,
  `user_alert_agmt_date` DATETIME NULL DEFAULT NULL,
  `is_push_alert_on` TINYINT(1) NULL DEFAULT FALSE,
  `is_dark_alert_on` TINYINT(1) NULL DEFAULT FALSE,
  `create_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`member_id`))
ENGINE = InnoDB
DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- -----------------------------------------------------
-- Table `nomatter`.`hubs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nomatter`.`hubs` ;

CREATE TABLE IF NOT EXISTS `nomatter`.`hubs` (
  `hub_id` BIGINT NOT NULL AUTO_INCREMENT,
  `hub_uuid` VARCHAR(36) NOT NULL,
  `weather_key` VARCHAR(40) NOT NULL,
  `location` VARCHAR(100) NULL DEFAULT NULL,
  `invite_code` VARCHAR(50) NULL,
  `code_expired_time` DATETIME NULL,
  PRIMARY KEY (`hub_id`))
ENGINE = InnoDB
DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- -----------------------------------------------------
-- Table `nomatter`.`alert`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nomatter`.`alert` ;

CREATE TABLE IF NOT EXISTS `nomatter`.`alert` (
  `alert_id` BIGINT NOT NULL AUTO_INCREMENT,
  `hub_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `alert_category` VARCHAR(20) NOT NULL,
  `alert_title` VARCHAR(30) NULL DEFAULT NULL,
  `alert_detail` VARCHAR(100) NULL DEFAULT NULL,
  `alert_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`alert_id`),
  INDEX `fk_users_alert_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_hubs_alert_idx` (`hub_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_alert`
    FOREIGN KEY (`user_id`)
    REFERENCES `nomatter`.`users` (`member_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_hubs_alert`
    FOREIGN KEY (`hub_id`)
    REFERENCES `nomatter`.`hubs` (`hub_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- -----------------------------------------------------
-- Table `nomatter`.`users-hubs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nomatter`.`usershubs` ;

CREATE TABLE IF NOT EXISTS `nomatter`.`usershubs` (
  `users_hubs_id` BIGINT NOT NULL AUTO_INCREMENT,
  `hub_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `user_hub_auth` VARCHAR(10) NOT NULL,
  `user_hub_name` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`users_hubs_id`),
  INDEX `fk_user_user_hubs_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_hubs_user_hubs_idx` (`hub_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_user_hubs`
    FOREIGN KEY (`user_id`)
    REFERENCES `nomatter`.`users` (`member_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_hubs_user_hubs`
    FOREIGN KEY (`hub_id`)
    REFERENCES `nomatter`.`hubs` (`hub_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- -----------------------------------------------------
-- Table `nomatter`.`remote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nomatter`.`remote` ;

CREATE TABLE IF NOT EXISTS `nomatter`.`remote` (
  `remote_id` BIGINT NOT NULL AUTO_INCREMENT,
  `hub_id` BIGINT NOT NULL,
  `controller_name` VARCHAR(20) NOT NULL,
  `create_date` DATETIME NULL DEFAULT NOW(),
  `remote_type` VARCHAR(15) NOT NULL,
  `remote_code` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`remote_id`),
  INDEX `fk_hubs_remote_idx` (`hub_id` ASC) VISIBLE,
  CONSTRAINT `fk_hubs_remote`
    FOREIGN KEY (`hub_id`)
    REFERENCES `nomatter`.`Hubs` (`hub_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- -----------------------------------------------------
-- Table `nomatter`.`button`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nomatter`.`button` ;

CREATE TABLE IF NOT EXISTS `nomatter`.`button` (
  `button_id` BIGINT NOT NULL AUTO_INCREMENT,
  `remote_id` BIGINT NOT NULL,
  `button_name` VARCHAR(20) NOT NULL,
  `ir_signal` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`button_id`),
  INDEX `fk_remote_custombutton_idx` (`remote_id` ASC) VISIBLE,
  CONSTRAINT `fk_remote_controller`
    FOREIGN KEY (`remote_id`)
    REFERENCES `nomatter`.`remote` (`remote_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARSET=utf8 COLLATE=UTF8_GENERAL_CI;

-- -----------------------------------------------------
-- Table `nomatter`.`custombutton`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nomatter`.`custombutton` ;

CREATE TABLE IF NOT EXISTS `nomatter`.`custombutton` (
  `custombutton_id` BIGINT NOT NULL AUTO_INCREMENT,
  `remote_id` BIGINT NOT NULL,
  `button_name` VARCHAR(20) NOT NULL,
  `width` DECIMAL(6,2) NOT NULL,
  `height` DECIMAL(6,2) NOT NULL,
  `ir_signal` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`custombutton_id`),
  INDEX `fk_remote_custombutton_idx` (`remote_id` ASC) VISIBLE,
  CONSTRAINT `fk_remote_custombutton`
    FOREIGN KEY (`remote_id`)
    REFERENCES `nomatter`.`remote` (`remote_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- -----------------------------------------------------
-- Table `nomatter`.`routine`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nomatter`.`routine` ;

CREATE TABLE IF NOT EXISTS `nomatter`.`routine` (
  `routine_id` BIGINT NOT NULL AUTO_INCREMENT,
  `hub_id` BIGINT NOT NULL,
  `attributes` JSON NOT NULL,
  PRIMARY KEY (`routine_id`),
  INDEX `fk_hubs_routine_idx` (`hub_id` ASC) VISIBLE,
  CONSTRAINT `fk_hubs_routine`
    FOREIGN KEY (`hub_id`)
    REFERENCES `nomatter`.`hubs` (`hub_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARSET=utf8 COLLATE=UTF8_GENERAL_CI;

-- -----------------------------------------------------
-- Table `nomatter`.`board`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nomatter`.`board` ;

CREATE TABLE IF NOT EXISTS `nomatter`.`board` (
  `board_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `remote_id` BIGINT NOT NULL,
  `download`  BIGINT NOT NULL,
  `create_date` DATETIME NOT NULL,
  PRIMARY KEY (`board_id`),
  INDEX `fk_users_board_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_remote_board_idx` (`remote_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_board`
    FOREIGN KEY (`user_id`)
    REFERENCES `nomatter`.`users` (`member_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_remote_board`
    FOREIGN KEY (`remote_id`)
    REFERENCES `nomatter`.`remote` (`remote_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

SELECT * FROM nomatter.alert;
SELECT * FROM nomatter.button;
SELECT * FROM nomatter.hubs;
SELECT * FROM nomatter.remote;
SELECT * FROM nomatter.routine;
SELECT * FROM nomatter.users;
SELECT * FROM nomatter.usershubs;
SELECT * FROM nomatter.board;
SELECT * FROM nomatter.custombutton;
