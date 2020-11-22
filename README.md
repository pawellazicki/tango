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

Odpal skrypt w ./infra-db/prepare-db.sql

## Dodawanie zmiennych srodowiskowych

Zawartosc pliku 'env.demo' przekopiuj do .env (musisz go najpierw stworzyć)
PORT - port serwera
SALTROUNDS - ilosc iteracji przy haszowaniu hasla
HASHKEY - klucz do podisywania hasla (ustalasz sobie cokolwiek np. 'strong_key')
ISS - key issuer, przy sprawdzaniu tokena brana jest pod uwage domena z ktorej pochodzi - zostaw tak domyslnie