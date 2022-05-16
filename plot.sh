#! /bin/bash

plotResult=$(node ./src/plotOnMap.js "$1")

if [[ $plotResult == 'ERROR' ]]; then
  echo "Some error occurred, try again!"
  exit 1;
fi

open -a Brave\ Browser public/index.html
