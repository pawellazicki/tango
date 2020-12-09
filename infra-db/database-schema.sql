DROP DATABASE IF EXISTS trello;
CREATE DATABASE
IF NOT EXISTS trello;

USE trello;

DROP TABLE IF EXISTS USER;
CREATE TABLE USER
(
    id INT
    UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR
    (50) NOT NULL,
    password VARCHAR
    (100) NOT NULL,
    email VARCHAR
    (50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON
    UPDATE CURRENT_TIMESTAMP
);

    INSERT INTO USER
        (username, password, email)
    VALUES
        ("admin", "$2y$10$c/nwIeRtsQMWDx27NytCe.nyo3ITxxTP2QSPKVpi7z0hJ/fOA8uBm", "admin@admin.com");
    INSERT INTO USER
        (username, password, email)
    VALUES
        ("damian", "$2b$10$x6JNpzHeFXt7qR88prwVae0wSHfsLi4LsnB6dXMg6xi42SmRErfSO", "damian@admin.com");
    INSERT INTO USER
        (username, password, email)
    VALUES
        ("patyk", "$2b$10$GTta9RWWEO3wZpmkEoKBAuI6UOITHYW3zUCJcWBpWQWndKW.OzUIq", "patyk@admin.com");
    INSERT INTO USER
        (username, password, email)
    VALUES
        ("trello", "$2b$10$Noq34eIWcux.KdAbkQ3S/uokkAbPcUWEcKYpC8jvqwNunl864VBx2", "trello@admin.com");


    DROP TABLE IF EXISTS BOARD;
    CREATE TABLE BOARD
    (
        ID INT NOT NULL
        AUTO_INCREMENT,
        TITLE CHAR
        (30) NOT NULL,
        TEAM_NAME CHAR
        (50) NOT NULL,
        USER_ID INT UNSIGNED NOT NULL,
        PRIMARY KEY
        (ID),
        FOREIGN KEY
        (USER_ID) REFERENCES USER
        (id)
    );

    INSERT INTO BOARD
            (title, team_name, user_id)
        VALUES
            ('web app', 'tango', 1),
            ('mobile app', 'delta', 2),
            ('calculator', 'best team', 2);

    DROP TABLE IF EXISTS TrelloList;
    CREATE TABLE TrelloList(
	ListID INT Primary KEY AUTO_INCREMENT,
    BoardID INT NOT NULL,
    ListName VARCHAR(50),
    CONSTRAINT FOREIGN KEY (BoardID) REFERENCES board (ID) ON DELETE CASCADE
    ); 

    INSERT INTO TrelloList VALUES (1, 2, "lista 123");
    INSERT INTO TrelloList VALUES (2, 2, "lista fgfffff");
    INSERT INTO TrelloList VALUES (3, 3, "lista b oad");
    INSERT INTO TrelloList VALUES (4, 3, "listassssss");
    INSERT INTO TrelloList VALUES (5, 1, "listassssss no access damian");

    DROP TABLE IF EXISTS Card;
    CREATE TABLE Card (
	CardID INT Primary KEY AUTO_INCREMENT,
    ListID INT NOT NULL,
    CardName VARCHAR(50) NOT NULL,
    Deadline DATETIME NOT NULL,
    CONSTRAINT FOREIGN KEY (ListID) REFERENCES TrelloList (ListID) ON DELETE CASCADE
    ); 

    INSERT INTO Card VALUES (1, 1, "lista 1", "2020-01-01 10:10:10");
    INSERT INTO Card VALUES (2, 2, "lista 2", "2020-01-01 10:10:10");
    INSERT INTO Card VALUES (3, 3, "lista 3", "2020-01-01 10:10:10");
    INSERT INTO Card VALUES (4, 4, "lista 4", "2020-01-01 10:10:10");
    INSERT INTO Card VALUES (5, 1, "lista 1", "2020-01-01 10:10:10");
    INSERT INTO Card VALUES (6, 1, "lista 1", "2020-01-01 10:10:10");