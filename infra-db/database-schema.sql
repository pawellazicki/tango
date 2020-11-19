DROP DATABASE IF EXISTS trello;
CREATE DATABASE IF NOT EXISTS trello;

USE trello;

DROP TABLE IF EXISTS USER;
CREATE TABLE USER (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO USER (username, password, email) VALUES ("admin", "$2y$10$c/nwIeRtsQMWDx27NytCe.nyo3ITxxTP2QSPKVpi7z0hJ/fOA8uBm ", "admin@admin.com");
INSERT INTO USER (username, password, email) VALUES ("damian", "$2b$10$x6JNpzHeFXt7qR88prwVae0wSHfsLi4LsnB6dXMg6xi42SmRErfSO", "damian@admin.com");
INSERT INTO USER (username, password, email) VALUES ("patyk", "$2b$10$GTta9RWWEO3wZpmkEoKBAuI6UOITHYW3zUCJcWBpWQWndKW.OzUIq", "patyk@admin.com");
INSERT INTO USER (username, password, email) VALUES ("trello", "$2b$10$Noq34eIWcux.KdAbkQ3S/uokkAbPcUWEcKYpC8jvqwNunl864VBx2", "trello@admin.com");