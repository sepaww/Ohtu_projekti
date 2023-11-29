#!/bin/bash

npm install --prefix frontend
npm run build --prefix frontend

poetry run gunicorn --chdir backend -b 127.0.0.1:5173 'app:create_app()' &

# suoritetaan testit
poetry run robot backend/tests

status=$?

# pysäytetään palvelin portissa 5173
kill $(lsof -t -i:5173)

exit $status
