docker stop mariadb-crop
docker rm mariadb-crop
docker pull applestven/mariadb-crop:latest
# docker run -d -p 8282:3000 --name nodejstest applestven/nodejstest:latest sh -c "npm i && pm2 start /service/koa/src/main.js --no-daemon"
# docker run -d -p 3306:3306 --name mariadb-crop 
# docker run -d -p 3306:3306 --name mariadb-crop -v /path/on/host:/var/lib/mysql applestven/mariadb-crop:latest 

docker run -d -e MYSQL_USER=nextcloud -e MYSQL_ROOT_PASSWORD=12345687 -e MYSQL_DATABASE=nextcloud -p 3306:3306 --name mariadb:latest



docker stop koa-crop
docker rm koa-crop
docker pull applestven/koa-crop:latest
# docker run -d -p 8282:3000 --name nodejstest applestven/nodejstest:latest sh -c "npm i && pm2 start /service/koa/src/main.js --no-daemon"
docker run -d -p 8282:3000 --name koa-crop applestven/koa-crop:latest

docker stop nextcloud-crop
docker rm nextcloud-crop
docker pull applestven/nextcloud-crop:latest
# docker run -d -p 8282:3000 --name nodejstest applestven/nodejstest:latest sh -c "npm i && pm2 start /service/koa/src/main.js --no-daemon"
docker run -d -p 8080:80 --name nextcloud-crop applestven/nextcloud-crop:latest