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
  `restaurantName` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `priceRange` int NOT NULL DEFAULT 1,
  `latitude` double NOT NULL DEFAULT 0,
  `longitude` double NOT NULL DEFAULT 0,
  `cuisine` varchar(100) NOT NULL,
  `created` timestamp NOT NULL DEFAULT now(),
  `available` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`restaurantID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE diners (
  `customerId` int(100) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL UNIQUE,
  `name` varchar(40) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL UNIQUE,
  `reservationsMade` int(50) NOT NULL DEFAULT 0,
  PRIMARY KEY (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* test data */
insert into diners (username, name, email, reservationsMade) values ('armando', 'Armando', 'aaa@aaa.com', 12);
insert into diners (username, name, email, reservationsMade) values ('david', 'David', 'bbb@bbb.com', 34);
insert into diners (username, name, email, reservationsMade) values ('mai', 'Mai', 'ccc@ccc.com', 143);
insert into diners (username, name, email, reservationsMade) values ('eddie', 'Eddie', 'ddd@ddd.com', 4);

insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Zuni Cafe', '1658 Market St, San Francisco, CA', 1, 'mediterranean', 37.773646, -122.421573, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Brenda\'s French Soul Food', '652 Polk St, San Francisco, CA', 1, 'soul', 37.782922, -122.418893, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Absinthe Brasserie and Bar', '398 Hayes St, San Francisco, CA', 1, 'french', 37.777048, -122.422912, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Bartlett Hall', '242 O\'Farrell St, San Francisco, CA', 3, 'american', 37.786375, -122.408747, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Tropisueño', '75 Yerba Buena Ln, San Francisco, CA', 2, 'mexican', 37.785358, -122.40405, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Bluestem Brasserie', 'One Yerba Buena Ln, San Francisco, CA', 3, 'brasserie', 37.785955, -122.404952, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Colibri Mexican Bistro', '438 Geary St, San Francisco, CA', 2, 'mexican', 37.787257, -122.410539, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Hakkasan', '1 Kearny St, San Francisco, CA', 3, 'cantonese', 37.787833, -122.403624, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Chabaa Thai Cuisine', '420 Geary St, San Francisco, CA', 1, 'thai', 37.787255, -122.410326, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('54 Mint - Vineria Ristorante', '16 Mint Plz, San Francisco, CA', 3, 'italian', 37.782577, -122.407981, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Nordstrom Cafe Bistro', '865 Market St, San Francisco, CA', 2, 'american', 37.783951, -122.407162, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Kin Khao', '55 Cyril Magnin St, San Francisco, CA', 2, 'thai', 37.784926, -122.408942, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Farallon', '450 Post St, San Francisco, CA', 4, 'seafood', 37.788355, -122.409413, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Fino Restaurant', '624 Post St, San Francisco, CA', 2, 'italian', 37.788008, -122.412292, 1);
insert into restaurants (restaurantName, address, priceRange, cuisine, latitude, longitude, available) values ('Kuletos', '221 Powell St, San Francisco, CA', 3, 'italian', 37.786742, -122.408338, 1);
