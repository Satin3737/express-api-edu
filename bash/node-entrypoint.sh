#!/bin/sh

npm install
npm run migrate

if [ "$PROD_PREVIEW" = 1 ]; then
  npm run build
  npm run start
else
  npm run dev
fi
