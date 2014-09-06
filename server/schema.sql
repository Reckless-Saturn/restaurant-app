/*
  Just a basic db build for now
*/

CREATE DATABASE restApp;

USE restApp;

/* watch out for these lines - remove later */
drop table restaurants;
drop table diners;

CREATE TABLE restaurants (
  `restaurantID` int(100) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL UNIQUE,
  `restaurantName` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `priceRange` int NOT NULL DEFAULT 1,
  `latitude` double NOT NULL DEFAULT 0,
  `longitude` double NOT NULL DEFAULT 0,
  `cuisine` varchar(100) NOT NULL,
  `email` varchar(40) NOT NULL UNIQUE,
  `phone` varchar(20) NOT NULL, 
  `created` timestamp NOT NULL DEFAULT now(),
  `available` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`restaurantID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE diners (
  `customerID` int(100) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL UNIQUE,
  `password` varchar(40) NOT NULL,
  `firstName` varchar(40) DEFAULT NULL,
  `lastName` varchar(40) DEFAULT NULL,
  `email` varchar(40) NOT NULL UNIQUE,
  `phone` varchar(20) NOT NULL,
  `reservationsMade` int(50) NOT NULL DEFAULT 0,
  PRIMARY KEY (`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE trans_history {
  `transactionID`, int(100) NOT NULL AUTO_INCREMENT,
  `restaurantID` int(100) NOT NULL,
  `customerID` int(100) NOT NULL,
  `partySize` int DEFAULT 1,
  PRIMARY KEY (`transactionID`)
} ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* test data */
insert into diners (username, password, firstName, lastName, email, phone, reservationsMade) values ('armando', 'armando', 'Armando', 'P', 'aaa@aaa.com', '5555555555', 12);
insert into diners (username, password, firstName, lastName, email, phone, reservationsMade) values ('david', 'david', 'David', 'N', 'bbb@bbb.com', '5555555555', 34);
insert into diners (username, password, firstName, lastName, email, phone, reservationsMade) values ('mai', 'mai', 'Mai', 'L', 'ccc@ccc.com', '5555555555', 143);
insert into diners (username, password, firstName, lastName,  email, phone, reservationsMade) values ('eddie', 'eddie', 'Eddie', 'J', 'ddd@ddd.com', '5555555555', 4);

insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Zuni Cafe', 'a', '1', '1658 Market St, San Francisco, CA', 1, 'mediterranean', 'eee@eee.com', '5555555555', 37.773646, -122.421573, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Brenda\'s French Soul Food', 'b', '1', '652 Polk St, San Francisco, CA', 1, 'soul', 'fff@fff.com', '5555555555', 37.782922, -122.418893, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Absinthe Brasserie and Bar', 'c', '1', '398 Hayes St, San Francisco, CA', 1, 'french', 'ggg@ggg.com', '5555555555', 37.777048, -122.422912, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Bartlett Hall', 'd', '1', '242 O\'Farrell St, San Francisco, CA', 3, 'american', 'hhh@hhh.com', '5555555555', 37.786375, -122.408747, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Tropisueño', 'e', '1', '75 Yerba Buena Ln, San Francisco, CA', 2, 'mexican', 'iii@iii.com', '5555555555', 37.785358, -122.40405, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Bluestem Brasserie', 'f', '1', 'One Yerba Buena Ln, San Francisco, CA', 3, 'brasserie', 'jjj@jjj.com', '5555555555', 37.785955, -122.404952, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Colibri Mexican Bistro', 'g', '1', '438 Geary St, San Francisco, CA', 2, 'mexican', 'kkk@kkk.com', '5555555555', 37.787257, -122.410539, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Hakkasan', 'h', '1', '1 Kearny St, San Francisco, CA', 3, 'cantonese', 'lll@lll.com', '5555555555', 37.787833, -122.403624, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Chabaa Thai Cuisine', 'i', '1', '420 Geary St, San Francisco, CA', 1, 'thai', 'mmm@mmm.com', '5555555555', 37.787255, -122.410326, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('54 Mint - Vineria Ristorante', 'j', '1', '16 Mint Plz, San Francisco, CA', 3, 'italian', 'nnn@nnn.com', '5555555555', 37.782577, -122.407981, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Nordstrom Cafe Bistro', 'k', '1', '865 Market St, San Francisco, CA', 2, 'american', 'ooo@ooo.com', '5555555555', 37.783951, -122.407162, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Kin Khao', 'l', '1', '55 Cyril Magnin St, San Francisco, CA', 2, 'thai', 'ppp@ppp.com', '5555555555', 37.784926, -122.408942, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Farallon', 'm', '1', '450 Post St, San Francisco, CA', 4, 'seafood', 'qqq@qqq.com', '5555555555', 37.788355, -122.409413, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Fino Restaurant', 'n', '1', '624 Post St, San Francisco, CA', 2, 'italian', 'rrr@rrr.com', '5555555555', 37.788008, -122.412292, 1);
insert into restaurants (restaurantName, username, password, address, priceRange, cuisine, email, phone, latitude, longitude, available) values ('Kuletos', 'o', '1', '221 Powell St, San Francisco, CA', 3, 'italian', 'sss@sss.com', '5555555555', 37.786742, -122.408338, 1);
