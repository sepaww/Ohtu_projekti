#!/bin/bash

npm install --prefix frontend
npm run build --prefix frontend

poetry run gunicorn --chdir backend -b 127.0.0.1:5173 'app:create_app()' &

# odetetaan, että palvelin on valmiina ottamaan vastaan pyyntöjä
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:5173/ping)" != "200" ]];
  do sleep 1;
done

# suoritetaan testit
poetry run robot backend/tests

status=$?

# pysäytetään Flask-palvelin portissa 5173
kill $(lsof -t -i:5173)

exit $status
