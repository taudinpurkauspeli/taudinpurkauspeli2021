# Vanhan pelin toiminnallisuuksien dokumentaatio

## Sisällys
- Yleistä
  - Rekisteröityminen
  - Sisäänkirjautuminen
  - Uloskirjautuminen
- Opiskelijoiden näkymä
  - Omat käyttäjätiedot
  - Käyttäjän tietojen muokkaaminen
  - Salasanan vaihtaminen
  - Casen valinta
  - Casen pelaaminen
  - Sairaskertomus
  - Toimenpiteet
  - Diffit
  - Casen aloittaminen alusta
- Opettajan näkymä ja toiminnot
  - Tunnuksen päivittäminen opettajatunnukseksi
  - Etusivun toiminnot
    - Aloitussivu
    - Caset
      - Sairaskertomus opettaja-käyttäjällä
      - Toimenpiteet opettaja-käyttäjällä
      - Diffit opettaja-käyttäjällä
  - Yläpalkin toiminnot
    - Käyttäjien seuranta
      - Opiskelijoiden eteneminen
      - Lista kaikista opiskelijoista
      - Opettajat
      - Testaajat
    - Tiedostopankki
      - Perustoiminnot
      - Tiedoston lisääminen
      - Tiedoston muokkaaminen
    - Omat käyttäjätiedot
      - Käyttäjän tietojen muokkaaminen
      - Salasanan vaihtaminen
      - Kirjaudu ulos
- Saavutettavuus
  - Tabilla navigointi
  - axe DevTools -raportti
  - Värit
- Huomioita

## Yleistä

### Rekisteröityminen
Käyttäjä voi rekisteröityä peliin klikkaamalla käyttöliittymän oikeasta yläkulmasta kohtaa "Luo uusi tunnus" ja täyttämällä avautuvan lomakkeen. 

Rekisteröityessä tulee huomata, että käyttäjätunnuksen tulee olla vähintään kolme merkkiä pitkä
etu- ja sukunimien tulee olla vähintään kolme merkkiä pitkiä ja opiskelijanumerossa tulee olla yhdeksän numeroa.

### Sisäänkirjautuminen
Ennen sisäänkirjautumista etusivun case-painikkeet ovat harmaat ja niiden klikkaaminen on estetty.
Sisään voi kirjautua klikkaamalla etusivulta yläpalkista, josta avautuu pop up, jossa pyydetään tunnus ja salasana. 

Mikäli kirjautumistiedot on väärin, ilmoitetaan kirjautumisen epäonnistuneen (ei täsmennetä miksi).
Mikäli kirjautuminen onnistuu, etusivun caset muuttuvat vihreiksi, ja opiskelija voi aloittaa pelaamisen. 
Lisäksi yläpalkin Kirjaudu sisään muuttuu Kirjaudu ulos -valinnaksi ja Luo uusi käyttäjä -valinta muuttuu Omat käyttäjätiedot -valinnaksi.

### Uloskirjautuminen
Kun sisäänkirjautunut käyttäjä painaa yläpalkista "Kirjaudu ulos" -tekstiä, hänet kirjataan ulos ja ohjataan pelin etusivulle.


## Opiskelijoiden näkymä
Jokaiselta sivulta löytyy Ohje-painike, joissa lyhyet ohjeet, mitä sivulla voi tehdä.

### Omat käyttäjätiedot
Omat käyttäjätiedot -sivulla käyttäjä voi tarkastella oman tunnuksensa tietoja, aloitettuja caseja sekä pelattuja pelejä.

- Klikkaamalla "ohje"-nappia ikkunan otsikon vierestä käyttäjä saa tietoa sivun toiminnoista.
- Sivulla on kolme laatikkoa: käyttäjän perustiedot, caset sekä pelatut pelit.
    - Käyttäjän perustietolaatikon otsikkona on käyttäjän nimi.
    - Laatikossa on allekkain tiedot: käyttäjätunnus, opiskelijanumero, sähköposti, epidemiologian kurssin aloitusvuosi, sallitaanko analytiikkadatan kerääminen, saako käyttäjän tietoja käyttää tutkimukseen.
    - Alimpana on kaksi nappia: "Muokkaa tietoja" ja "Vaihda salasana". Näistä tarkemmin alempana.
    - Caset-laatikossa on listattu käyttäjän caset (aloitetut pelit) sekä se, kuinka monta % pelistä on suoritettu.
    - Tallennetut pelikerrat -laatikossa näkyvät käyttäjän onnistuneesti suoritetut pelikerrat sekä suorituspäivä.

#### Käyttäjän tietojen muokkaaminen
Kun perustietolaatikosta painaa "Muokkaa tietoja" nappia, avautuu ikkuna, jossa on lomake.
Ikkunan yläreunassa on "Ohje" -nappi.

Lomakkeen kentät:
- **Käyttäjätunnus**: tekstikenttä, jossa näkyy nykyinen käyttäjätunnus
- **Etunimi**: tekstikenttä, jossa näkyy nykyinen etunimi
- **Sukunimi**: tekstikenttä, jossa näkyy nykyinen sukunimi
- **Opiskelijanumero**: tekstikenttä, jossa näkyy nykyinen opiskelijanumero
- **Sähköposti**: tekstikenttä, jossa näkyy nykyinen sähköpostiosoite
- **Epidemiologian kurssin aloitusvuosi**: dropdown-valikko, jossa valittuna käyttäjän asettama vuosi
- **Sallin analytiikkadatan keräämisen, joka Taudinpurkauspelissä sisältää pelissä etenemisestä tallentuneet logitiedot**: checkbox-ruutu, käyttäjän rekisteröityessä asettama valinta näkyvissä
- **Sallin minusta kurssin aikana kerättyjen tietojen käyttämisen oppimiseen liittyvässä tutkimuksessa**: checkbox-ruutu, käyttäjän rekisteröityessä asettama valinta näkyvissä
- **Tallenna**-nappi
- **Peruuta**-nappi

Kentillä on vastaavat minimipituusvaatimukset kuin rekisteröitymislomakkeessa.

#### Salasanan vaihtaminen
Kun perustietolaatikosta painaa "Vaihda salasana" -nappia, avautuu ikkuna, jossa on lomake.
Ikkunan yläreunassa on "Ohje" -nappi.

Lomakkeen kentät:
- **Uusi salasana**: tyhjä tekstikenttä
- **Salasanan vahvistus**: tyhjä tekstikenttä
- **Päivitä**-nappi
- **Peruuta**-nappi

Virheilmoituksia ja huomioita
- Jos salasana ja sen vahvistus eivät ole identtiset, annetaan virheilmoitus:
  * * Salasanan vahvistus ei vastaa salasanaa * *
- Jos salasanakentän jättää tyhjäksi, annetaan virheilmoitus:
  * * Salasana on pakollinen * *
- Jos salasanan vahvistuskenttä jätetään tyhjäksi, annetaan virheilmoitus:
  * * Salasanan vahvistus on pakollinen * *
- Salasanalla ei tässä lomakkeessa ole pituusvaatimusta; yhden merkin salasanat sallitaan
- Jos salasanakenttiä ei ole muokattu, "Päivitä"-nappi ei ole klikattavissa

### Casen valinta
Etusivulta löytyy lista pelattavia Caseja, joita voi valita klikkaamalla.
Caseja voi hakea hakusanoilla (Casen nimi).

- Haku löytää caset, josta löytyy haettu merkkijono samassa muodossa.
- Case-lista päivittyy sitä mukaan, kun hakukenttään lisätään merkkejä.

Klikatessa casea siirrytän casen omalle sivulle ja peli alkaa.

### Casen pelaaminen
Pelissä on yläpalkki, jossa välilehdet:

- Sairaskertomus
- Toimenpiteet
- Diffit

Casen valitessa aukeaa ensimmäisseksi Sairaskertomus-välilehti. 

#### Sairaskertomus

Sivulta löytyy
- **Peliohjeet**
- **Anamneesi**
- **Oma Ohje**-painike
- Jo tehdyt toimenpiteet suoritusjärjestyksessä

Mikäli tyhjä, kertoo, ettei vielä olla suoritettu yhtään toimenpidettä.

#### Toimenpiteet

Sivulta löytyy
- Lista klikkaamalla valittavia toimenpiteitä
- Lista suoritetuista toimenpiteistä.
    - Järjestetty tasoittain mahdollisen suoritusjärjestyksen mukaan
    - Saman tason toimenpiteet voi suorittaa missä vain järjestyksessä

Mikäli valitun toimenpiteen voi suorittaa, vie klikkaaminen toimenpiteen omalle sivulle.

Mikäli ei, näkyy virheilmoitus (et voi vielä suorittaa toimenpidettä). Tällöin tulee valita toinen toimenpide.


#### Toimenpiteen oma sivu
Mikäli valittiin oikea toimenpide, siirrytään toimenpiteen omalle sivulle.

Toimeniteellä on oma välilehti yläpalkissa, jonka voi halutessaan sulkea välilehdessä olevasta X-painikkeesta.

- Mikäli toimenpiteen sulkee ennen sen suorittamista, jää se toimenpidelistaan uudelleen valittavaksi. 

Toimenpiteen suoritus tallentuu, kun valitaan toimenpiteesä liittyen Tarkista / Jatka tms.

Toimenpide suoritetaan yhdellä tai useammalla seuraavista tavoista
- Lukemalla annetut tiedot
- Valitsemalla toimenpiteen sisäisiä toimenpiteitä/vaihtoehtoja
- Vastaamalla kysymyksiin

Kysymyksien vastauksia tarkistettaessa
- Mikäli kaikkia oikeita vastauksia ei valittu ennen tarkistamista, näytetään selitykset vain valituille 
    - Näytetään virheviesti
    - Vastauksia voi muuttaa
- Mikäli kaikki oikeat valittiin ennen tarkastusta, näytetään kaikkien vaihtoehtojen kohdalla selitys
    - Voidaan siirtyä eteenpäin

Toimenpiteitä/vaihtoehtoja valitessa
- Mikäli vaihtoehtona on Jatka eikä Tarkista eikä kaikka oikeita vaihtoehtoja ole valittu, tulee virheilmoitus eikä voida jatkaa eteenpäin ennenkuin kaikki oikeat on valittu
- Vaihtoehdoille näytetään selitykset, kun ne valitaan

Kun toimenpide on suoritettu oikein loppuun, sivulle tulee tehtävä suoritettu ja linkit, joista voidaan siirtyä
- Poissulkemaan diffejä diffit-sivulle
- Suorittamaan toimeenpiteitä takaisin toimenpiteet-sivulle.

Suoritettu toimenpide
- Poistuu toimenpidelistalta
- Näkyy Sairaskertomus-sivun tehdyt toimenpiteet listalla
- Näkyy Toimenpiteet-sivun suoritetut toimenpiteet listalla

#### Diffit

Sivulta löytyy alaotsikoihin jaotellut sairaudet.

Sairautta klikatessa
- Mikäli ei voi poissulkea tässä kohtaa peliä, tulee virheilmoitus
- Mikäli voi poissulkea
    - Tulee ilmoitus, että sairaus on poissuljettu
    - Aukeaa selitys, miksi sairauden pystyi poissulkemaan
    - Sairauden napin väri muuttuu punaiseksi
      (hieman hämäävä, tuntuu, kun olisi mennyt poissulkeminen väärin. Ideana on, että sairaus ei ole oikea vastaus ja siksi punainen, mutta tuntuu epäintuitiiviselta)

Kun Toimenpiteet-sivun toimenpiteistä suoritetaan Diagnoosi, näytetään kaikki ei poissuljetut sairaudet. Näistä, kun valitsee oikein ja menee Diffit-sivulle, löytyy onitteluteksti oikean taudin kohdalta, joka on värjätty vihreäksi.

Kun Loppuratkaisu-toimenpide on tehty, näkyy oikea suoritusjärjestys Toimenpide-sivun "tehdyt toimenpiteet tasottain" listalla. Casen voi myös aloittaa alusta sekä loppuratkaisusivulta tai sairaskertomus-sivulta.


### Casen aloittaminen alusta

Jo suoritetun casen voi aloittaa alusta klikkaamalla etusivulta kyseisen casen auki, ja klikkaamalla keltavihreässä laatikossa olevaa "Aloita alusta" -nappia.

Sivun ylälaitaan ilmestyy viesti "Oletko aivan varma, että haluat aloittaa casen alusta? Etenemisesi casessa nollautuu, mutta aiemmasta etenemisestä tallentuu merkintä siitä, kuinka pitkälle olit casea pelannut." ja napit "Cancel" ja "Ok".

Painettaessa "Cancel" -nappia ilmestyy ilmoitus "Casea ... ei aloitettu uudelleen.".

Painettaessa "Ok" -nappia ilmestyy ilmoitus "Casen uudelleen aloittaminen onnistui!" ja case alkaa alusta.

Pelin voi jättää kesken missä vain kohtaa peliä. Tiedot tallentuvat aina toimenpiteen suorittaessa, ja palatessa peliin voi jatkaa tästä tilanteesta.


## Opettajan näkymä ja toiminnot

### Tunnuksen päivittäminen opettajatunnukseksi

Kun käyttäjä on rekisteröitynyt, hänen täytyy lähettää viesti pelin hallinnoijalle. Hallinnoija muuttaa käyttäjän tunnuksen opettajatunnukseksi.

Jos käyttäjä on kirjautuneena peliin sisälle, kun tunnus päivitetään opettajatunnukseksi, hänen täytyy kirjautua ulos ja uudelleen sisään, jotta opettajille näkyvät toiminnallisuudet näkyvät.

### Etusivun toiminnot

Etusivulla näkyvät toiminnot opettaja-käyttäjille:

#### Aloitussivu

Pelin aloitussivulla on ensimmäisenä näkyvissä **Ohjeita opettajalle** koskien tunnusten käyttöä selaimilla: yhdessä selaimessa voi kirjautua sisään vain yksillä tunnuksilla. 

Lisäksi sivulla on **"Ohje"-nappi**, jossa on tietoa sivun toiminnoista.

Samalla sivulla opettaja voi myös **kopioida casen** klikkaamalla "Kopioi"-nappia tai piilottaa casen opiskelijoilta klikkaamalla "Piilota opiskelijoilta"-nappia.

Opettaja voi myös luoda uusia caseja klikkaamalla **"Luo uusi case"**-nappia, joka johtaa uudelle sivulle.

Aloitussivun alaosassa on lisäksi linkkeinä pelin **Käyttöehdot** ja **tutkimukseen liittyvät tiedot**,**Tietosuojaseloste** ja **Tietosuojailmoitus.**

#### Caset

Opettajat voivat tarkastella olemassa olevia caseja klikkaamalla haluttua case-nappia. Klikkaaminen johtaa case-sivun sairaskertomus-välilehdelle (kts. myös opiskelijan näkymä).

##### Sairaskertomus opettaja-käyttäjällä
Sivulla on casen anamneesi ja lisäksi seuraavia toimintoja:

- Klikkaamalla **Ohje-nappeja** saa tietoa sivun toiminnallisuuksista
- **Casea voi muokata** klikkaamalla "Muokkaa"-nappia 
- **Casen voi poistaa** klikkaamalla "Poista"-nappia

##### Toimenpiteet opettaja-käyttäjällä
Sivulla on lueteltu vaaditut toimenpiteet vaaditussa järjestyksessä. Sivun toiminnat ovat:

- **Klikkaamalla Ohje-nappeja** saa tietoa sivun toiminnallisuuksista
- **Toimenpiteiden järjestyksen vaihtaminen** pitämällä hiirten vasenta nappia pohjassa ja siirtämällä case haluttuun kohtaan
- **Luoda uusia toimenpiteitä** klikkaamalla "Luo uusi toimenpide"-nappia
- **Muokata toimenpiteitä** klikkaamalla toimeenpiteen nappia. Klikkaaminen luo toimenpiteelle uuden välilehden ylös, jonka voi halutessaan myös sulkea

##### Toimenpiteen oma sivu
Sivulla on vasemmalla lista toimeenpiteen alakohdista ja oikealla lista lisättävistä alakohdista, joita on neljä eri tyyppiä. (Viimeinen ei klikattavissa?) Sivun toiminnat ovat:

- Klikkaamalla **Ohje-nappeja** saa tietoa sivun toiminnallisuuksista. Lisäksi lisättävien alakohtien viereiset napit antavat tietoa eri alakohdista
- **Toimeenpiteen voi poistaa** tai sen nimeä voi muuttaa klikkaamalla "Muokkaa"-nappia
- **Klikkaamalla jo luotuja alakohtia** vasemmalla avautuu sivu, jossa voi muokata alakohtien yksityiskohtia. Muokkaussivun toiminnallisuudet riippuvat alakohdan tyypistä
- Klikkaamalla oikealla olevia alakohta tyyppejä voi **lisätä toimeenpiteelle uusia alakohtia**. Tämä avaa luomissivun, joka vaihtelee alakohdittain
- **Toimenpide-välilehden voi sulkea** klikkaamalla välilehdessä sijaitsevaa "x"-nappia


##### Diffit opettaja-käyttäjällä
Sivulla on lueteltu casen eri diffit. Vasemmalla on lisätyt diffiryhmät ja niiden sisällä diffit lueteltuna ja oikealla niiden lisäys ja muokkaus. Sivun toiminnat ovat:

- **Klikkaamalla Ohje-nappeja** saa tietoa sivun toiminnallisuuksista
- **Klikkaamalla vasemmalla sijaitsevia luotuja diffejä** avautuu sivu, jossa voi lisätä diffin tarkemman kuvauksen ja niiden esitietovaatimukset
- **Klikkaamalla oikealla sijaitsevia "Muokkaa"-nappeja** voi poistaa luotuja diffejä tai diffiryhmiä ja muokata niiden nimiä, siten miten ne napeissa näkyvät
- **Klikkaamalla "Luo uusi diffi"-nappia** voi lisätä uusia diffi-painikkeita. Tarkempi kuvaus annetaan edellä mainitusti
- **Klikkaamalla "Luo uusi diffiryhmä"-nappia** voi lisätä uuden diffiryhmän, jonka sisälle voi lisätä diffejä

### Yläpalkin toiminnot
Nämä toiminnot näkyvät vain sisäänkirjautuneille.

#### Käyttäjien seuranta
Käyttäjien seuranta -kohdasta klikkaamalla käyttäjä pääsee tarkastelemaan peliin rekisteröityneiden pelaajien tietoja. Sivun ylälaidassa on neljä linkkiä, joista pääsee seuraaville sivuille.

##### Opiskelijoiden eteneminen
Opiskelijoiden eteneminen on käyttäjäseurannan etusivu. Sivulla on listattuna käyttäjät caseittain.

- Klikkaamalla "ohje"-nappia sivun otsikon vierestä käyttäjä saa tietoa sivun toiminnoista.
- Sivun ylälaidassa on hakukenttä, jonka avulla käyttäjiä voi suodattaa casen, opiskelun aloitusvuoden, etunimen, sukunimen ja opiskelijanumeron perusteella.
- Hakukentän alapuolella on listattuna pelaajat caseittain. Listaukessa jokaisesta opiskelijasta näytetään etu- ja sukunimi, opiskelijanumero, opintojen aloitusvuosi sekä suoritettujen pelien %.
- Klikkaamalla käyttäjän etunimeä pääsee tarkastelemaan ko. pelaajan tietoja tarkemmin.

##### Lista kaikista opiskelijoista
Lista kaikista opiskelijoista -välilehdellä käyttäjä voi tarkastella kaikkia pelaajia yhtenä listana.
 
- Klikkaamalla "ohje"-nappia sivun otsikon vierestä käyttäjä saa tietoa sivun toiminnoista.
- Sivulla on suuri taulukko, jossa on sarakkeittain otsikot etunimi, sukunimi, opiskelijanumero, sähköposti ja aloitusvuosi.
- Klikkaamalla haluttua sarakeotsikkoa taulukko järjestyy ko. sarakkeen arvojen mukaisesti joko laskevaan tai nousevaan järjestykseen.
- Taulukon 1. rivillä on joka sarakkeessa suodatuskenttä, johon kirjoittamalla opiskelijoita voi suodattaa halutun hakusanan avulla. Haku ei erota isoja ja pieniä kirjaimia toisistaan.
- Klikkaamalla minkä tahansa käyttäjän etunimeä pääsee tarkastelemaan ko. pelaajan tietoja tarkemmin.

##### Opettajat
Opettajat-välilehdellä käyttäjä voi tarkastella kaikkia opettajia yhtenä listana. Sivulla on vastaavat toiminnot ja rakenne kuin "Lista kaikista opiskelijoista" -välilehdellä.

##### Testaajat
Testaajat-välilehdellä käyttäjä voi tarkastella kaikkia pelille asetettujen testaajien tietoja yhtenä listana. Sivulla on vastaavat toiminnot ja rakenne kuin "Lista kaikista opiskelijoista" -välilehdellä.


#### Tiedostopankki
Tiedostopankki-sivulla käyttäjä voi lisätä, muokata ja poistaa tiedostoja pelistä.

##### Perustoiminnot
Klikkaamalla "ohje"-nappia sivun otsikon vierestä käyttäjä saa tietoa sivun toiminnoista.

- Sivulla on taulukko peliin ladatuista tiedostoista. Taulukossa on neljä otsikkoa: kuva, nimi, kuvaus ja tiedot.
- Nimi- ja kuvaus-otsikkojen alla on hakukentät, joiden avulla taulukosta voi suodattaa tiedostoja. Isoja ja pieniä kirjaimia ei eroteta toisistaan.
- Kuva-sarakkeessa on näkyvillä joko tiedoston esikatselu (kuvatiedostot) tai tiedoston nimi (muut tiedostot). Jos kyseessä ei ole kuva, tiedoston nimeä klikkaamalla tiedoston voi avata selaimessa.
- Tiedot-sarakkeessa olevaa nappia painamalla pääsee päivittämään tiedostoa (ks. ohje alla).
- Alareunan "Luo uusi tiedosto" -nappia painamalla pääsee luomaan uuden tiedoston (ks. ohje alla).

##### Tiedoston lisääminen
Uuden tiedoston voi lisätä klikkaamalla sivun alalaidasta nappia "Luo uusi tiedosto".

- Kun nappia painaa, avautuu ikkuna nimeltä "Uusi tiedosto".
- Klikkaamalla "ohje"-nappia ikkunan otsikon vierestä käyttäjä saa tietoa sivun toiminnoista.
- Ikkunassa on kolme täytettävää kenttää: nimi, kuvaus ja tiedosto. Näistä kaksi ensimmäistä on tekstikenttiä, kolmanteen lisätään tiedosto käyttäjän tietokoneelta.
- Nimikentässä tulee olla vähintään kaksi merkkiä. Kuvauskentän saa halutessaan jättää tyhjäksi.
- Tiedosto-kohtaan lisätään tiedosto painamalla nappia "Lisää tiedosto", valitsemalla haluttu tiedosto käyttäjän tietokoneelta ja painamalla "Lähetä". (Tämä voi olla käyttöjärjestelmäriippuvainen? Windowsissa / Linuxissa voi lukea jotakin muuta!)
- Klikkaamalla lopuksi "Luo"-nappia ikkunan alalaidassa tiedosto lisätään peliin.
- Klikkaamalla "Peruuta"-nappia ikkunan alalaidassa  tiedoston luomisen voi perua.

Epäselvää: mitkä tiedostotyypit hyväksytään?

##### Tiedoston muokkaaminen
Tiedostoa pääsee muokkaamaan painamalla "Tiedot"-nappia tiedostopankin etusivulla olevasta listauksesta halutun tiedoston kohdalta.

Kun nappia painaa, avautuu ikkuna nimeltä "Päivitä tiedostoa".

- Klikkaamalla "ohje"-nappia ikkunan otsikon vierestä käyttäjä saa tietoa sivun toiminnoista.
- Ikkunassa on kaksi muokattavaa tekstikenttää: nimi ja kuvaus.
- Tekstikenttien alla on esikatselu ladatusta tiedostosta. Itse tiedostoa ei voi tässä vaiheessa muokata.
- Esikatselun alla on tiedoston jakamista varten http-osoite sekä nappi "kopioi linkki tiedostoon". Nappia painamalla tiedostoon johtava linkki kopioituu käyttäjän leikepöydälle.
- Alimpana on kolme nappia: "Päivitä", "Peruuta" ja "Poista tiedosto".
    - Päivitä-nappia voi painaa vain, mikäli tiedostoon on tehty muutoksia.
    - Peruuta-nappia painamalla tiedoston tietoihin tehdyt muokkaukset peruuntuvat.
    - Poista tiedosto -nappia painamalla käyttäjä voi poistaa tiedoston.
      Ennen poistoa käyttäjälle näytetään varoitus:
      "VAROITUS: TÄMÄ OPERAATIO POISTAA TÄMÄN TIEDOSTON NÄKYVISTÄ MYÖS CASEISTA! Oletko aivan varma, että haluat poistaa tiedoston?" 
      Mikäli käyttäjä painaa "OK", tiedosto poistetaan. Mikäli käyttäjä painaa "Peruuta", tiedostoa ei poisteta.


#### Omat käyttäjätiedot
Omat käyttäjätiedot -sivulla käyttäjä voi tarkastella oman tunnuksensa tietoja, aloitettuja caseja sekä pelattuja pelejä.

- Klikkaamalla "ohje"-nappia ikkunan otsikon vierestä käyttäjä saa tietoa sivun toiminnoista.
- Sivulla on kolme laatikkoa: käyttäjän perustiedot, caset sekä pelatut pelit.
    - Käyttäjän perustietolaatikon otsikkona on käyttäjän nimi.
      Laatikossa on allekkain tiedot: käyttäjätunnus, opiskelijanumero, sähköposti, epidemiologian kurssin aloitusvuosi, sallitaanko analytiikkadatan kerääminen, saako käyttäjän tietoja käyttää tutkimukseen.
      Alimpana on kaksi nappia: "Muokkaa tietoja" ja "Vaihda salasana". Näistä tarkemmin alempana.
    - Caset-laatikossa on listattu käyttäjän caset (aloitetut pelit) sekä se, kuinka monta % pelistä on suoritettu.
    - Tallennetut pelikerrat -laatikossa näkyvät käyttäjän onnistuneesti suoritetut pelikerrat sekä suorituspäivä.

##### Käyttäjän tietojen muokkaaminen
Kun perustietolaatikosta painaa "Muokkaa tietoja" nappia, avautuu ikkuna, jossa on lomake.

Ikkunan yläreunassa on "Ohje" -nappi.

Lomakkeen kentät:

- Käyttäjätunnus: tekstikenttä, jossa näkyy nykyinen käyttäjätunnus
- Etunimi: tekstikenttä, jossa näkyy nykyinen etunimi
- Sukunimi: tekstikenttä, jossa näkyy nykyinen sukunimi
- Opiskelijanumero: tekstikenttä, jossa näkyy nykyinen opiskelijanumero
- Sähköposti: tekstikenttä, jossa näkyy nykyinen sähköpostiosoite
- Epidemiologian kurssin aloitusvuosi: dropdown-valikko, jossa valittuna käyttäjän asettama vuosi
- Sallin analytiikkadatan keräämisen, joka Taudinpurkauspelissä sisältää pelissä etenemisestä tallentuneet logitiedot: checkbox-ruutu, käyttäjän rekisteröityessä asettama valinta näkyvissä
- Sallin minusta kurssin aikana kerättyjen tietojen käyttämisen oppimiseen liittyvässä tutkimuksessa: checkbox-ruutu, käyttäjän rekisteröityessä asettama valinta näkyvissä
- Tallenna-nappi
- Peruuta-nappi

Kentillä on vastaavat minimipituusvaatimukset kuin rekisteröitymislomakkeessa.

##### Salasanan vaihtaminen
Kun perustietolaatikosta painaa "Vaihda salasana" -nappia, avautuu ikkuna, jossa on lomake.

Ikkunan yläreunassa on "Ohje" -nappi.

Lomakkeen kentät:
- Uusi salasana: tyhjä tekstikenttä
- Salasanan vahvistus: tyhjä tekstikenttä
- Päivitä-nappi
- Peruuta-nappi

Virheilmoituksia ja huomioita
- Jos salasana ja sen vahvistus eivät ole identtiset, annetaan virheilmoitus:
  Salasanan vahvistus ei vastaa salasanaa
- Jos salasanakentän jättää tyhjäksi, annetaan virheilmoitus:
  Salasana on pakollinen 
- Jos salasanan vahvistuskenttä jätetään tyhjäksi, annetaan virheilmoitus:
  Salasanan vahvistus on pakollinen
- Salasanalla ei tässä lomakkeessa ole pituusvaatimusta; yhden merkin salasanat sallitaan
- Jos salasanakenttiä ei ole muokattu, "Päivitä"-nappi ei ole klikattavissa

###### Kirjaudu ulos
Kun käyttäjä painaa yläpalkista "Kirjaudu ulos" -tekstiä, hänet kirjataan ulos ja ohjataan pelin etusivulle.

## Saavutettavuus

### Tabilla navigointi
Tabilla navigoiminen onnistuu (navigointi tapahtuu loogisessa järjestyksessä). Kirjaudu sisään -painikkeesta puuttuu kuitenkin focus indicator.

### axe DevTools -raportti
axe DevTools löytää etusivulta neljä ongelmaa:

- kuvilla ei ole alt-tekstiä
- html-elementillä ei ole lang-attribuuttia (lang-attribuutti mahdollistaa sen, että ruudunlukija lukee sivun oikealla kielellä)
- sivun alalaidan linkeissä (Käyttöehdot ja tutkimukseen liittyvät tiedot | Tietosuojaseloste | Tietosuojailmoitus)​_ei ole riittävää värikontrastia taustaan nähden
- aria-hidden = true, mutta elementti on silti focusable (vaatii lisää selvitystä)

### Värit

Oikeat ja väärät vastaukset erotellaan ainoastaan punaisella, vihreällä ja keltaisella värillä. 

Saavutettavuuden kannalta parempi ratkaisu olisi esimerkiksi vahvistaa oikea vastaus checkmark-merkillä ja väärä vastaus ruksisymbolilla. 

## Huomioita

Onko järkevää, että käyttäjä voi muuttaa omaa käyttäjätunnustaan?

Casejen kohdalla voisi olla jokin merkintä, että se on suoritettu / vaiheessa ilman, että tarvitsee mennä casen sivulle katsomaan
