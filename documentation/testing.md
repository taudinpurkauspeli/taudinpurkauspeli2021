# Ohjelman testaus

## Frontendin testit

### Ohjelmoidut testit

- Navbar: (lisätietoa) Ks. tiedosto ![Navbar.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/teacherListTest/taudinpurkauspeli/frontend/src/tests/Navbar.test.js).
- NewCase: testattu, että lomake toimii toivotusti. Ks. tiedosto ![NewCase.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/teacherListTest/taudinpurkauspeli/frontend/src/tests/NewCase.test.js).
- Frontpage: testattu, että etusivu näkyy, opiskelijalla näkyy piilottamattomat caset, opettajalla näkyy casejen lisäykseen nappi ja lisäksi piilotetut caset. Ks. tiedosto ![Frontpage.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/teacherListTest/taudinpurkauspeli/frontend/src/tests/Frontpage.test.js).
- CaseCard: testattu, että kortissa näkyy casen nimi, casen anamneesi ja etenemispalkki. Opiskelija ei nää poista ja kopioi -nappeja, mutta opettaja näkee. Ks. tiedosto ![CaseCard.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/teacherListTest/taudinpurkauspeli/frontend/src/tests/CaseCard.test.js).


### Käytännön testit

#### Ohjelman kielen vaihtaminen

Kun käyttäjä valitsee kielen käyttöliittymässä olevasta dropdown-valikosta, ohjelman käyttöliittymän kieli vaihtuu. Kieli pysyy myös, kun selain päivittää sivun, tai sivu suljetaan, ja avataan uudelleen.

Toimivuus on testattu selaimen avulla kieliparilla suomi-englanti.



## Backendin testit

### Ohjelmoidut testit

- Case: Testattu, että kaikki halutut caset palautuvat tietokannasta, ja että tietty case on palautettujen casejen joukossa. Ks. tiedosto ![case_api.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/teacherListTest/taudinpurkauspeli/backend/tests/case_api.test.js).
