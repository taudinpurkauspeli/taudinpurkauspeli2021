# Ohjelman testaus

## Frontendin testit

### Ohjelmoidut testit

- Navbar: (lisätietoa)
- NewCase: testattu, että lomake toimii toivotusti. Ks. tiedosto NewCase.test.js.
- Frontpage: testattu, että etusivu näkyy, opiskelijalla näkyy piilottamattomat caset, opettajalla näkyy casejen lisäykseen nappi ja lisäksi piilotetut caset. Ks. tiedosto Frontpage.test.js
- CaseCard: testattu, että kortissa näkyy casen nimi, casen anamneesi ja etenemispalkki. Opiskelija ei nää poista ja kopioi -nappeja, mutta opettaja näkee. Ks. tiedosto CaseCard.test.js


### Käytännön testit

#### Ohjelman kielen vaihtaminen

Kun käyttäjä valitsee kielen käyttöliittymässä olevasta dropdown-valikosta, ohjelman käyttöliittymän kieli vaihtuu.

Toimivuus on testattu selaimen avulla kieliparilla suomi-englanti.



## Backendin testit

### Ohjelmoidut testit

- Case: Testattu, että kaikki halutut caset palautuvat tietokannasta, ja että tietty case on palautettujen casejen joukossa. Ks. tiedosto case_api.test.js
