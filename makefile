preview ?= 0

up:
	PROD_PREVIEW=${preview} docker compose up

exec:
	docker compose exec -it express-api-backend /bin/bash

clear:
	docker compose down --rmi all