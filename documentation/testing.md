# Ohjelman testaus

## Frontendin testit

### Ohjelmoidut testit

- Navbar: (lisätietoa) Ks. tiedosto ![Navbar.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/teacherListTest/taudinpurkauspeli/frontend/src/tests/Navbar.test.js).
- NewCase: testattu, että lomake toimii toivotusti. Ks. tiedosto ![NewCase.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/addDisease/taudinpurkauspeli/frontend/src/tests/case/NewCase.test.js).
- Frontpage: testattu, että etusivu näkyy, opiskelijalla näkyy piilottamattomat caset, opettajalla näkyy casejen lisäykseen nappi ja lisäksi piilotetut caset. Ks. tiedosto ![Frontpage.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/addDisease/taudinpurkauspeli/frontend/src/tests/frontpage/Frontpage.test.js).
- CaseCard: testattu, että kortissa näkyy casen nimi, casen anamneesi ja etenemispalkki. Opiskelija ei nää poista ja kopioi -nappeja, mutta opettaja näkee. Ks. tiedosto ![CaseCard.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/addDisease/taudinpurkauspeli/frontend/src/tests/case/CaseCard.test.js).
- Case: testattu, että käyttäjä voi navigoida casen sisällä eri välilehdillä. Ks. tiedosto ![Case.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/addDisease/taudinpurkauspeli/frontend/src/tests/case/Case.test.js)
- Anamnesis: testattu, että opiskelija ei voi muuttaa Casen nimeä, ja että anamneesi näkyy sivulla. Ks. tiedosto ![Anamnesis.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/addDisease/taudinpurkauspeli/frontend/src/tests/anamnesis/Anamnesis.test.js)
- UpdateCaseTitle: testattu, että opettaja pystyy muokkaamaan otsikkoa oikealla syötteellä, virheellisestä syötteestä tulee virheilmoitus. Ks. tiedosto ![UpdateCaseTitle.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/addDisease/taudinpurkauspeli/frontend/src/tests/case/UpdateCaseTitle.test.js)
- HideCase: testattu, että opettaja voi piilottaa casen opiskelijoilta. Ks. tiedosto ![HideCase.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/addDisease/taudinpurkauspeli/frontend/src/tests/case/HideCase.test.js)
- RemoveCase: testattu, että casen voi poistaa. Ks. tiedosto ![RemoveCase.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/addDisease/taudinpurkauspeli/frontend/src/tests/case/RemoveCase.test.js)
- AddDifferentialForm: testattu, että lomake toimii toivotusti. Ks. tiedosto ![AddDifferentialForm.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/addDisease/taudinpurkauspeli/frontend/src/tests/differential/AddDifferentialForm.test.js)
- NewDifferentail: testattu, että uuden diffin luomisikkuna renderöityy oikein. Ks. tiedosto ![NewDifferential.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/addDisease/taudinpurkauspeli/frontend/src/tests/differential/NewDifferential.test.js)
- SelectDifferentialForm: testattu, että valikosta voi valita olemassaolevan diffin, ja lomake lähetetään toivotulla tavalla. Ks. tiedosto ![SelectDifferentialForm.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/addDisease/taudinpurkauspeli/frontend/src/tests/differential/SelectDifferentialForm.test.js)
- AddDifferentialGroupForm: testattu, että uusi diffiryhmä voidaan lisätä. Tarkistettu tilanteet, kun diffiryhmän nimi on liian lyhyt tai nimi puuttuu kokonaan.
- DifferentialGroup: testattu, että diffiryhmä renderöityy näytölle.
- NewDifferentialGroup: testattu, että diffiryhmän lisäämisen ikkuna renderöityy näytölle.
- SelectDifferentialGroupForm: testattu, että olemassaolevan diffiryhmän voi valita valikosta.

### Käytännön testit

#### Ohjelman kielen vaihtaminen

Kun käyttäjä valitsee kielen käyttöliittymässä olevasta dropdown-valikosta, ohjelman käyttöliittymän kieli vaihtuu. Kieli pysyy myös, kun selain päivittää sivun, tai sivu suljetaan, ja avataan uudelleen.

Toimivuus on testattu selaimen avulla kieliparilla suomi-englanti.



## Backendin testit

### Ohjelmoidut testit

- Case: Testattu, että kaikki halutut caset palautuvat tietokannasta, ja että tietty case on palautettujen casejen joukossa. Casen lisääminen oikealla ja virheellisellä syötteellä testattu. Casen otsikon ja näkyvyyden muokkaus oikeilla ja viallisilla syötteillä testattu. Virheellisellä id:llä haettu case palauttaa 404. Ks. tiedosto ![case_api.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/teacherListTest/taudinpurkauspeli/backend/tests/case_api.test.js).
- Differential: Testattu, että kaikki diffit tietokannasta palautetaan, uuden validin diffin voi lisätä. Ks. tiedosto ![differential_api.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/addDisease/taudinpurkauspeli/backend/tests/differential_api.test.js)
- DifferentialUnderCase: Testattu, että palautetaan oikeanmuotoinen syöte, ja että kaikki tietyn casen/diffiryhmän diffit palautetaan. Ks. tiedosto ![differentialUnderCase_api.test.js](https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/blob/addDisease/taudinpurkauspeli/backend/tests/differentialUnderCase_api.test.js)
- DifferentialGroup: Testattu, että kaikki diffiryhmät palautetaan, ja että oikeanmuotoinen syöte voidaan lisätä tietokantaan.
- DifferentialGroupUnderCase: Testattu, että kaikki caseen liittyvät diffiryhmät palautetaan.
