docker stop mariadb-crop
docker rm mariadb-crop
docker pull applestven/mariadb-crop:latest
# docker run -d -p 8282:3000 --name nodejstest applestven/nodejstest:latest sh -c "npm i && pm2 start /service/koa/src/main.js --no-daemon"
docker run -d -p 3306:3306 --name mariadb-crop applestven/mariadb-crop:latest

docker stop koa-crop
docker rm koa-crop
docker pull applestven/koa-crop:latest
# docker run -d -p 8282:3000 --name nodejstest applestven/nodejstest:latest sh -c "npm i && pm2 start /service/koa/src/main.js --no-daemon"
docker run -d -p 8282:3000 --name koa-crop applestven/koa-crop:latest

docker stop nextcloud-crop
docker rm nextcloud-crop
docker pull applestven/nextcloud-crop:latest
# docker run -d -p 8282:3000 --name nodejstest applestven/nodejstest:latest sh -c "npm i && pm2 start /service/koa/src/main.js --no-daemon"
docker run -d -p 8080:8080 --name nextcloud-crop applestven/nextcloud-crop:latest