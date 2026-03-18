#!/bin/sh

corepack enable

pnpm install
pnpm migrate

if [ "$PROD_PREVIEW" = 1 ]; then
  pnpm build
  pnpm start
else
  pnpm dev
fi