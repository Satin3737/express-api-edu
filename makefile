preview ?= 0

up:
	PROD_PREVIEW=${preview} docker compose up

exec:
	docker compose exec -it express-api-edu-backend /bin/bash

clear:
	docker compose down --rmi all