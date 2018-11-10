
default: run

run: git pull clean start

start:
	docker-compose up -d

clean: stop rm

stop:
	docker-compose stop

rm: stop
	docker-compose rm -f

pull:
	docker-compose pull

git:
	git fetch
	git reset origin/master --hard
