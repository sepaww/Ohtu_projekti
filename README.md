# Ohtu_projekti
ohtu ryhmätyö

## Käyttöohjeet:

1. Asennetaan riippuvuudet komennolla:

```bash
poetry install
```

2. Käynnistetään sovellus komennolla:

```bash
poetry run invoke start
```

## Devaus komentoja:

Testausta voi helpottaa komento:

```bash
poetry shell
```

jolloin poetry run ei ole tarpeellinen (poistu komennolla exit)

### Testaus pytestillä

Testit suoritetaan komennolla:

```bash
poetry run invoke test
```

### Testaus Ja Testikattavuus

Testikattavuusreportin voi generoida komennolla:

```bash
poetry run invoke testcoverage
```

Reportin voi lukea _htmlcov_-hakemistosta tai terminaalista.

### Pylint

pelin koodin pelilogiikan laatua voi tarkastella komennolla

```bash
poetry run invoke lint
```

### Automaattinen formatointi

koodin rakenteen automaattinen formalisointi

```bash
poetry run invoke format
```