
-- TODO: REMOVE DROP DATABASE LINE AFTER EVERYTHING IS FINALIZE
-- Check Google Spreadsheet for visual version of the table with example.

DROP DATABASE IF EXISTS binder_db;
CREATE DATABASE binder_db;

USE binder_db;

CREATE TABLE user_table(
user_id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
points TINYINT NOT NULL,
PRIMARY KEY (user_id)
);

CREATE TABLE book_list(
book_isbn VARCHAR(15) NOT NULL,
owner_id INT NOT NULL,
CONSTRAINT fk1 FOREIGN KEY (ownder_id) REFERENCES user_table(user_id)
);