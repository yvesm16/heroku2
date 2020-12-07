CREATE DATABASE  IF NOT EXISTS nicehome ;
USE nicehome;


DROP TABLE IF EXISTS admin;

CREATE TABLE admin (
  id int(11) NOT NULL,
  username varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES admin WRITE;
INSERT INTO admin VALUES (1,'styledbynicehome@gmail.com','123'),(2,'Admin','123');
UNLOCK TABLES;


DROP TABLE IF EXISTS billing;
CREATE TABLE billing (
  billing_id int(11) NOT NULL AUTO_INCREMENT,
  order_id int(11) NOT NULL,
  uname varchar(100) DEFAULT NULL,
  address varchar(200) DEFAULT NULL,
  email varchar(150) DEFAULT NULL,
  contact varchar(20) DEFAULT NULL,
  dateofpayment date DEFAULT NULL,
  modeofpayment varchar(100) DEFAULT NULL,
  PRIMARY KEY (billing_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


LOCK TABLES billing WRITE;
UNLOCK TABLES;



DROP TABLE IF EXISTS category;

CREATE TABLE category (
  cat_id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  picture varchar(100) NOT NULL,
  PRIMARY KEY (cat_id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;


LOCK TABLES category WRITE;
INSERT INTO category VALUES (1,'Throw Blankets','prod1.jpg'),(2,'Flower+Vase','prod2.jpg'),(3,'Planters','prod3.jpg'),(4,'Mugs','prod4.jpg'),(5,'Rugs','prof5.jpg'),(6,'Pans','prod6.jpg'),(7,'Wall Hangings','prod7.jpg'),(8,'Dining Wares','prod8.jpg');
UNLOCK TABLES;


DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id int(11) NOT NULL AUTO_INCREMENT,
  order_id int(11) NOT NULL,
  prod_id int(11) NOT NULL,
  quantity double NOT NULL,
  subtotal double NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


LOCK TABLES orders WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  prod_id int(11) NOT NULL,
  cat_id varchar(100) NOT NULL,
  item_name varchar(200) NOT NULL,
  price double NOT NULL,
  picture varchar(150) NOT NULL,
  PRIMARY KEY (prod_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES products WRITE;
INSERT INTO products VALUES (1,'1','Maiara',1599,'maiara.png'),(2,'1','Space',1599,'space.png'),(3,'1','Naima',1499,'naima.png'),(4,'2','Calanthe Set',880,'vase.jpg'),(5,'2','Calista Set',880,'vase1.JPG'),(6,'2','Baris Set',470,'vase2.JPG'),(7,'3','Rosa Set',999,'plant1.png'),(8,'3','Beau Vase & Dried Flowers',1100,'9.JPG'),(9,'3','Thalia Set',950,'plant2.png'),(10,'4','Bonnie',470,'mug1.JPG'),(11,'4','Poppy',250,'mug2.JPG'),(12,'5','Yona',999,'prod5.JPG'),(13,'5','Wei',999,'rug1.JPG'),(14,'5','Zhara',999,'rug2.JPG'),(15,'6','Watermalon Pan',430,'pan1.JPG'),(16,'6','Pineapple Pan',430,'pan2.JPG'),(17,'7','Yoffa',750,'yaffa.png'),(18,'7','Vanya',750,'vanya.png'),(19,'7','Wera',750,'wera.png'),(20,'8','Azure Pitcher',480,'prod8.JPG'),(21,'8','Astrid Set',1799,'pitcherglass1.JPG'),(22,'8','Rafia',320,'placemat1.JPG'),(23,'4','Big Arch',500,'bigarch.JPG'),(24,'7','Banana Pan',430,'bananapan.jpg');
UNLOCK TABLES;
