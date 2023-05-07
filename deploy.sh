## 放在linux服务器上的文件   applestven是dockerHub用户名  $1是需要填的密码
docker ps
echo -e "---------docker Login--------"
docker login --username=$1  --password=$2 # 这个是yml文件最后一行所传递的参数，你docker的用户名和密码
echo -e "---------docker Stop--------"
docker stop vue-crop
echo -e "---------docker Rm--------"
docker rm vue-crop
docker rmi applestven/applestven:latest
echo -e "---------docker Pull--------"
docker pull applestven/vue-crop:latest 
echo -e "---------docker Create and Start--------"
docker run --rm -d -p 9943:80 --name vue-crop applestven/vue-crop:latest
echo -e "---------deploy Success--------"
