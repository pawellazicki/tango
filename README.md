# Tango2

Wymagany node w wersji minimum 12

```
npm install
node index.js
```

http://localhost:3000

## MYSQL - instalacja

Pobieramy
https://dev.mysql.com/downloads/installer/

Instalacja:
https://www.youtube.com/watch?v=WuBcTJnIuzo
W naszym przypadku hasło 'root'

Po instalacji otwieramy Workbench i wykonujemy poniższy skrypt, aby HAPI miało dostęp do sql

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
flush privileges;
```

## Dodawanie tablic

```
create database trello
create table board (
	id int not null auto_increment,
    title char(30) not null,
    team_name char(50) not null,
    primary key (id)
)

insert into board (title, team_name) values
	('web app', 'tango'), ('mobile app', 'delta'),
    ('calculator', 'best team');
```
