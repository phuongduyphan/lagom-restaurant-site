-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mis-restaurant
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mis-restaurant
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mis-restaurant` DEFAULT CHARACTER SET utf8 ;
USE `mis-restaurant` ;

-- -----------------------------------------------------
-- Table `mis-restaurant`.`dish`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mis-restaurant`.`dish` (
  `dish_id` INT(11) NOT NULL AUTO_INCREMENT,
  `dish_name` VARCHAR(100) NOT NULL,
  `dish_description` VARCHAR(255) NULL DEFAULT NULL,
  `dish_image_path` VARCHAR(255) NULL DEFAULT NULL,
  `dish_status` ENUM('available', 'unavailable') NULL DEFAULT NULL,
  PRIMARY KEY (`dish_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mis-restaurant`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mis-restaurant`.`user` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_full_name` VARCHAR(100) NOT NULL,
  `user_phone_number` VARCHAR(15) NOT NULL,
  `user_address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mis-restaurant`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mis-restaurant`.`order` (
  `order_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `order_creation_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_status` ENUM('pending', 'confirmed', 'delivered') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`order_id`),
  INDEX `user_id` (`user_id` ASC),
  CONSTRAINT `order_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mis-restaurant`.`user` (`user_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mis-restaurant`.`order_contains`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mis-restaurant`.`order_contains` (
  `order_id` INT(11) NOT NULL,
  `dish_id` INT(11) NOT NULL,
  PRIMARY KEY (`order_id`, `dish_id`),
  INDEX `dish_id` (`dish_id` ASC),
  CONSTRAINT `order_contains_ibfk_1`
    FOREIGN KEY (`order_id`)
    REFERENCES `mis-restaurant`.`order` (`order_id`)
    ON DELETE CASCADE,
  CONSTRAINT `order_contains_ibfk_2`
    FOREIGN KEY (`dish_id`)
    REFERENCES `mis-restaurant`.`dish` (`dish_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mis-restaurant`.`reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mis-restaurant`.`reservation` (
  `reservation_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `reservation_date` DATE NOT NULL,
  `expected_arrival_time` TIME NOT NULL,
  `number_of_guests` INT(11) NOT NULL,
  `status` ENUM('pending', 'confirmed', 'declined') NULL DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  INDEX `user_id` (`user_id` ASC),
  CONSTRAINT `reservation_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mis-restaurant`.`user` (`user_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
