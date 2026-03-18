#!/bin/sh

corepack enable

pnpm install

if [ -f /app/.env ]; then
  set -a
  . /app/.env
  set +a
fi

pnpm migrate

if [ "$PROD_PREVIEW" = 1 ]; then
  pnpm build
  pnpm start
else
  pnpm dev
fi