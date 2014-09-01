/*
  Just a basic db build for now
*/

CREATE DATABASE restApp;

USE restApp;

/* watch out for these lines - remove later */
drop table restaurants;
drop table diners;

CREATE TABLE restaurants (
  `restaurantId` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `cuisine` varchar(100) NOT NULL,
  `created` timestamp NOT NULL DEFAULT now(),
  `available` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`restaurantId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE diners (
  `userId` int(100) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL UNIQUE,
  `name` varchar(40) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL UNIQUE,
  `reservationsMade` int(50) NOT NULL DEFAULT 0,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into diners (username, name, email, reservationsMade) values ('armando', 'Armando', 'aaa@aaa.com', 12);
insert into diners (username, name, email, reservationsMade) values ('david', 'David', 'bbb@bbb.com', 34);
insert into diners (username, name, email, reservationsMade) values ('mai', 'Mai', 'ccc@ccc.com', 143);
insert into diners (username, name, email, reservationsMade) values ('eddie', 'Eddie', 'ddd@ddd.com', 4);

insert into restaurants (name, address, cuisine) values ('Zuni Cafe', '1658 Market St, San Francisco, CA', 'Mediterranean');
insert into restaurants (name, address, cuisine) values ('Brenda\'s French Soul Food', '652 Polk St, San Francisco, CA', 'Southern/Soul');
insert into restaurants (name, address, cuisine) values ('Absinthe Brasserie and Bar', '398 Hayes St, San Francisco, CA', 'French');
