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

!HUOM tällä hetkellä nuo käyttäjä/salasana/jne ovat kovakoodatut. Tämä ei hyvä asia, mutta siihen palataan ensi sprintin yhteydessä.

Alla olevat ohjeet tehty Windows käyttäjälle. Saattavat hieman poiketa muille. Nämä pitää toki myös dokumentoida.

Tiedettyjä ongelmia: Mac ei tykkää postgresql:n helposta asennuksesta. Mm ohjeita [täällä](https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)

Lataa ja asenna [Postgresql](https://www.postgresql.org/download/)
- Muista salasana. Tärkeä.
- Macilla Postgres kannattaa asentaa Homebrew'n kautta.

Lataa ja asenna [Node](https://nodejs.org/en/)

**WINDOWS:**
Luo tarvittu käyttäjä ja tietokanta Postgresql:iin: syötä seuraavat rivit komentoriviin:
- psql -d postgres -U postgres
- Syötä salasanasi
- CREATE ROLE taudinpurkaus WITH LOGIN PASSWORD 'kokeilu';
- ALTER ROLE taudinpurkaus CREATEDB;
- \q 
- psql -d postgres -U taudinpurkaus 
- syötä salasana (kokeilu)
- CREATE DATABASE taudinpurkaus;

**MAC:**
Luo tarvittu käyttäjä ja tietokanta Postgresql:iin: syötä seuraavat rivit komentoriviin:
- psql postgres
- Syötä salasanasi, jos sitä kysytään
- CREATE ROLE taudinpurkaus WITH LOGIN PASSWORD 'kokeilu';
- ALTER ROLE taudinpurkaus CREATEDB;
- \q 
- psql -d postgres -U taudinpurkaus 
- syötä salasana (kokeilu)
- CREATE DATABASE taudinpurkaus;
- \q

Lataa itse ohjelma/tämä branch

Käynnistä palvelin:
- mene kansioon backend 
- avaa komentorivi 
- syötä "node server.js" (anna tämän pyöriä niin kauan kun aiot käyttää ohjelmaa/tämä siis palvelimen käyttöönotto)

Käynnistä ohjelma
- mene kansioon frontend
- avaa komentorivi
- syötä "npm install"
- syötä "npm start"

