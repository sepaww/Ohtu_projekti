# Ohtu_projekti

![GHA_workflow_badge](https://github.com/sepaww/Ohtu_projekti/workflows/CI/badge.svg) 
[![codecov](https://codecov.io/gh/sepaww/Ohtu_projekti/graph/badge.svg?token=DKGEKUINOQ)](https://codecov.io/gh/sepaww/Ohtu_projekti)

## Testikattavuus Graafi
https://codecov.io/gh/sepaww/Ohtu_projekti/graphs/sunburst.svg?token=DKGEKUINOQ

[Product Backlog](https://helsinkifi-my.sharepoint.com/:x:/g/personal/simonena_ad_helsinki_fi/Ed88uF9sw4xFoWAGecS_zvIBGAcMHuNmpuXQZrrZfnn-5g)

## [Linkki sovellukseen](https://bibmanager.onrender.com/index.html)


## Käyttöohjeet kehittäjille

1. Asenna riippuvuudet komennolla

```bash
poetry install
```

2. Päivitä tietokanta ja käynnistä backend

```bash
poetry shell
```

```bash
cd backend && flask --app app db upgrade && cd ..
```

```bash
flask run --debug
```

3. Käynnistä frontend

```bash
npm install --prefix frontend
```

```bash
npm run dev --prefix frontend
```
Linkki sovellukseen:
http://localhost:5173/


## Pylint

Tiedoston .pylintrc määrittelemät tarkistukset suoritetaan komennolla:

```bash
poetry run pylint backend
```


## Definition of done

User story on valmis kun
- Product backlogiin kirjatut hyväksymiskriteerit täyttyvät
- Storyyn liittyvä toiminnallisuus on integroitu järjestelmään
- Toiminnallisuutta on testattu yksikkö- ja järjestelmätasolla ja testit menevät läpi
- Testaus on automatisoitu
- Koodin sisäinen laatu on hyvä
- Product owner hyväksyy user storyn
