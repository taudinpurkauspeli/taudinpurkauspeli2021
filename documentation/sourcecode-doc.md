# Lähdekoodin dokumentointi

- CSRF / muilta mahdollisilta hyökkäyksiltä suojautuminen
- Kuvaavat virheilmoitukset ja ohjeet joka kohtaan
- Kuvaavasti nimetyt muuttujat ja metodit
  - Yhtenäinen nimentä ohjelman eri osissa
  - Metodeista niin selkeitä, että kommentit turhia
- Mahdolliset kommentit samalla kielellä (= ohjelman kielellä?)
- Ohjelman refaktorointi järkeviksi, tarpeeksi pieniksi kokonaisuuksiksi, jaottelu kuvaavasti nimettyihin kansioihin
  - Riippuvuuskaavion teko?
- Autentikointi
- Mitkä näkymät näkyvät kenellekin (kirjautumaton käyttäjä, kirjautunut käyttäjä, ylläpitäjä)
- Koodin siisteys (yhtenäisyys, ei poiskommentoitua koodia...)
- Vanhan ohjelman validoinnit uuden ohjelman tukena
  - Katsoa läpi, riittävätkö ne, onko jotain liikaa...
- Omat testit, vanhoista testeistä voi katsoa, unohtuiko jonkun asian testaaminen
- Ohjelman errorsivut
  - Vanhassa ohjelmassa koodeille 404, 422, 500 omat errorsivut

  ## Huomioita koodin rakenteesta

- Rakennekaaviossa tiedostopolut ovat seuraavassa järjestyksessä:
  - staattiset html-sivut, sivun ulkonäkö (.html, tiedostosijainnit muotoa app / assets / javascripts / templates / )
  - javascript / frontend controller (.js, tiedostosijainnit muotoa app / assets / javascripts / controllers / )
  - dynaamiset html-sivut, sivun toiminnallisuus (.html.erb, tiedostosijainnit muotoa app / views / )
  - ruby on rails / backend controllerit (.rb, tiedostosijainnit app / controllers / )
  - tietokantavalidoinnit (.rb, tiedostosijainnit app / models / )
- Kaikki backendin controller-luokat perii luokan ApplicationCotroller
- AuthenticationService (app / assets / javascripts / controllers / application ) käytössä käytännössä koko frontendissa, tarkastaa sisäänkirjautuneen käyttäjän oikeuksia ym.
- Validoinnit ja _form.html.erb (erilaiset lomakkeet) ovat käytössä myös muokkausnäkymissä (ei näy kaaviossa)
- Kirjautuneena pysyminen myös oleellista (session -nimiset tiedostot front- sekä backendissa)
- Kysymyksien ja kysymyspankkien näyttävä luokka on hieman harhaanjohtavasti nimetty edit.html:ksi
- Frontendista ei löydy eroteltua question_group tiedostoa, kuten backendissa
- Exercises-kansiossa on paljon html-tiedostoja, jotka olivat itselläni hukassa
- Caseen kuuluvan diffin muokkauksella ja diffipankin diffin muokkauksella on eri näkymät
- Kaaviosta saattoi jäädä pois asioita, mitä opiskelija näkee (kaavio tehty perustuen opettajan näkymään)

![Ajatuskartta rakenteesta](images/taudinpurkaus_ohjelmarakenne.pdf)

### Lähdekoodissa käytettyä sanastoa

prerequisities = anamneesit
conclusion = diagnoositoimenpide
exercise = case
task = toimenpide
hypothesis = diffi
interview = pohdintatehtävä

Sanat ja käännökset poimittu lähdekoodista, voivat olla virheellisiä. Näiden sanojen käyttö ei välttämätöntä, mutta voivat olla hyödyllisiä vanhan koodin lukemisen tueksi. Samoin jos ohjelman kääntämistä eri kielille mietitään (silloin täytyisi tarkistaa virallinen käännös, jos nämä virheelliset)