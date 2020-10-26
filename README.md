Tango2

Wymagany node w wersji minimum 12

npm install

node index.js

http://localhost:3000

#MYSQL

Pobieramy
https://dev.mysql.com/downloads/installer/

Instalacja:
https://www.youtube.com/watch?v=WuBcTJnIuzo
W naszym przypadku hasło 'root'

Po instalacji otwieramy Workbench i wykonujemy poniższy skrypt, aby HAPI miało dostęp do sql

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
flush privileges;

http://localhost:3001/city
zwraca dane jednego miasta dla domyślnej bazy world