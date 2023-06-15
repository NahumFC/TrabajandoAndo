-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema trabajando_ando
-- -----------------------------------------------------
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`tipo_insti`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tipo_insti` (
  `idtipo_insti` INT NOT NULL AUTO_INCREMENT,
  `nombre_tipo_insti` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idtipo_insti`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`intituciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`intituciones` (
  `idinst` INT NOT NULL AUTO_INCREMENT,
  `nombre_insti` VARCHAR(45) NOT NULL,
  `tipo_insti_idtipo_insti` INT NOT NULL,
  PRIMARY KEY (`idinst`),
  INDEX `fk_intituciones_tipo_insti1_idx` (`tipo_insti_idtipo_insti` ASC) VISIBLE,
  CONSTRAINT `fk_intituciones_tipo_insti1`
    FOREIGN KEY (`tipo_insti_idtipo_insti`)
    REFERENCES `mydb`.`tipo_insti` (`idtipo_insti`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apPat` VARCHAR(45) NOT NULL,
  `apMat` VARCHAR(45) NOT NULL,
  `permiso` INT NOT NULL,
  `institucion` VARCHAR(45) NOT NULL,
  `boleta` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `intituciones_idinst` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuario_intituciones1_idx` (`intituciones_idinst` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_intituciones1`
    FOREIGN KEY (`intituciones_idinst`)
    REFERENCES `mydb`.`intituciones` (`idinst`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cv`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cv` (
  `idcv` INT NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(45) NOT NULL,
  `est_sec` VARCHAR(45) NOT NULL,
  `est_ms` VARCHAR(45) NOT NULL,
  `est_sup` VARCHAR(45) NOT NULL,
  `exp_lab` VARCHAR(45) NOT NULL,
  `usuario_id` INT NOT NULL,
  `skills` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcv`),
  INDEX `fk_cv_usuario_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_cv_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
