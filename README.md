# Taudinpurkaus


## Dokumentaatio

[Backlog ja aikakirjanpito](https://docs.google.com/spreadsheets/d/e/2PACX-1vT-c9lv_qbbtI2iUYnYm3j4XEcGpK-cvejJRi9k49gu4HiQ41ATS_wnY1VlinJPRadF8myDc4ngpZzG/pubhtml)


## DoD-määritelmä

Dod-määritelmä (täsmentyy vielä 0 sprintin aikana):

- koodi toimii kriteerien mukaisesti
- testikattavuus väh. 80 %
- koodin laatu on varmistettu (katselmoitu)
- pull request tehty & hyväksytty

## Käyttöohje

Lataa ja asenna [Postgresql](https://www.postgresql.org/download/)
- Muista salasana. Tärkeä.

Lataa ja asenna [Node](https://nodejs.org/en/)

Luo tarvittu käyttäjä ja tietokanta Postgresql:iin: syötä seuraavat rivit komentoriviin:
- psql -d postgres -U postgres
- Syötä salasanasi
- CREATE ROLE taudinpurkaus WITH LOGIN PASSWORD 'kokeilu';
- ALTER ROLE my_user CREATEDB;
- \q 
- psql -d postgres -U my_user 
- syötä salasana (kokeilu)
- CREATE DATABASE taudinpurkaus;

Lataa itse ohjelma

Käynnistä palvelin:
- mene kansioon backend 
- avaa komentorivi 
- syötä "node server.js"

Käynnistä ohjelma
- mene kansioon frontend
- avaa komentorivi
- syötä "npm start"

