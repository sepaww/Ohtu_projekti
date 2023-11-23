# Ohtu_projekti

![GHA_workflow_badge](https://github.com/sepaww/Ohtu_projekti/workflows/CI/badge.svg)


[Product Backlog](https://helsinkifi-my.sharepoint.com/:x:/g/personal/simonena_ad_helsinki_fi/Ed88uF9sw4xFoWAGecS_zvIBGAcMHuNmpuXQZrrZfnn-5g)

## Käyttöohjeet

1. Asenna riippuvuudet komennolla

```bash
poetry install
```

2. Käynnistä backend

```bash
poetry shell
```

```bash
python3 backend/run.py
```

3. Käynnistä frontend
Navigoi hakemistoon frontend
Suorita komennot

```bash
npm install
```

```bash
npm start
```
Linkki sovellukseen:
http://localhost:5173/


## Definition of done

User story on valmis kun
- Product backlogiin kirjatut hyväksymiskriteerit täyttyvät
- Storyyn liittyvä toiminnallisuus on integroitu järjestelmään
- Toiminnallisuutta on testattu yksikkö- ja järjestelmätasolla ja testit menevät läpi
- Testaus on automatisoitu
- Koodin sisäinen laatu on hyvä
- Product owner hyväksyy user storyn
