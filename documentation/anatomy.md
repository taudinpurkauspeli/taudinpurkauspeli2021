# Ohjelman alustava rakenne

Sisältää hyvin alustavan pohjan/kommentoinnin nykyisestä rakenteesta. Kehittyy projektin edetessä.


## Backend

Serverin toimintaan liittyvät asiat.

![Backendin tiedostorakenne.](images/backend-plan.png)

### App/Config
Serverin pakollisten asioiden määrittäminen (käyttäjä/salasana/tietokanta/pool)

### App/Controllers
Määritellään tietokantojen taulukoiden toiminnallisuudet

### App/Models
Määritellään tietokantojen taulukot

### App/Routes
Määritellään toiminnot, joiden avulla päästään käsiksi tietokannan tietoihin frontendistä


## Frontend

Ohjelman tiedot.

![Frontendin tiedostorakenne.](images/frontend-plan.png)

### Src/Components
Ohjelman alasivustojen määritykset

Nimentä: PascalCase.js, komponentissa määritelty nuolifunktio samanniminen kuin tiedosto ilman päätettä.

Muista importata react ja kääntämiseen vaadittu toiminnallisuus!

### Src/Services
Frontendin yhdistäminen backendiin

Nimentä: camelCase

### Sisältö: Monia nuolifunktioita, joista jokainen suorittaa jonkin sopivasti nimetyn toiminnallisuuden viemisen backendiin

Muista importtaa axios, joka huolehtii http-pyynnöistä!

Yksi service vastaa yhtä componentia, jolla on tarve keskustella backendin/tietokannan kanssa.

### Src/Tests
Frontendin yksikkötestit