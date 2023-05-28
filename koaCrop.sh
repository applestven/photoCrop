# docker stop mariadb-crop
# docker rm mariadb-crop
# docker pull applestven/mariadb-crop:latest
# docker run -d -p 8282:3000 --name nodejstest applestven/nodejstest:latest sh -c "npm i && pm2 start /service/koa/src/main.js --no-daemon"
# docker run -d -p 3306:3306 --name mariadb-crop 
# docker run -d -p 3306:3306 --name mariadb-crop -v /path/on/host:/var/lib/mysql applestven/mariadb-crop:latest 

# docker run -d -e MYSQL_USER=nextcloud -e MYSQL_ROOT_PASSWORD=12345687 -e MYSQL_DATABASE=nextcloud -p 3306:3306 --name mariadb-crop mariadb:latest

# if docker inspect --format '{{.State.Running}}' mariadb-crop; then
#     echo "mariadb-crop is already running"
#     docker run -d -e MYSQL_USER=nextcloud -e MYSQL_ROOT_PASSWORD=12345687 -e MYSQL_DATABASE=nextcloud -p 3306:3306 --name mariadb-crop mariadb:latest
# else
#     docker rm mariadb-crop
#     docker run -d -e MYSQL_USER=nextcloud -e MYSQL_ROOT_PASSWORD=12345687 -e MYSQL_DATABASE=nextcloud -p 3306:3306 --name mariadb-crop mariadb:latest
# fi

#!/bin/bash

if [[ "$(docker inspect -f '{{.State.Running}}' mariadb-crop)" ]]; then
    echo "mariadb-crop container is running."
else
    echo "mariadb-crop container is not running."
    docker rm mariadb-crop
    docker run -d -e MYSQL_USER=nextcloud -e MYSQL_ROOT_PASSWORD=12345687 -e MYSQL_DATABASE=nextcloud -p 3306:3306 --name mariadb-crop mariadb:latest
fi





docker stop koa-crop
docker rm koa-crop
docker pull applestven/koa-crop:latest
# docker run -d -p 8282:3000 --name nodejstest applestven/nodejstest:latest sh -c "npm i && pm2 start /service/koa/src/main.js --no-daemon"
docker run -d -p 8282:3000 --name koa-crop applestven/koa-crop:latest

# docker stop nextcloud-crop
# docker rm nextcloud-crop
# docker pull applestven/nextcloud-crop:latest
# docker run -d -p 8080:80 --name nextcloud-crop applestven/nextcloud-crop:latest


if docker inspect --format '{{.State.Running}}' nextcloud-crop; then
    echo "nextcloud-crop is already running"
    docker run -d -p 8080:80 --name nextcloud-crop applestven/nextcloud-crop:latest
else
    docker rm nextcloud-crop
    docker pull applestven/nextcloud-crop:latest
    docker run -d -p 8080:80 --name nextcloud-crop applestven/nextcloud-crop:latest
fi

# 要停止所有的Docker镜像，可以使用以下命令 docker stop $(docker ps -aq)  
# 删除所有容器 docker rm $(docker ps -aq)
# 可以使用以下命令来删除所有镜像 docker rmi $(docker images -q)
