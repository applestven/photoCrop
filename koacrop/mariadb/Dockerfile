#使用的基础镜像
FROM centos:7.4.1708
 
#添加作者信息
MAINTAINER applestven applestven@gmail.com
 
#安装mariadb数据库
RUN yum -y install mariadb-server
 
#设置环境变量，便于管理
ENV MYSQL_USER=nextcloud
ENV MYSQL_ROOT_PASSWORD=12345687
ENV MYSQL_PASSWORD=
ENV MYSQL_DATABASE=nextcloud
#让容器支持中文
ENV LC_ALL en_US.UTF-8
 
#初始化数据库
ADD db_init.sh /root/db_init.sh
RUN chmod 775 /root/db_init.sh
RUN /root/db_init.sh
 
#导出端口
EXPOSE 3306
 
#添加启动文件
ADD run.sh /root/run.sh
RUN chmod 775 /root/run.sh
 
#设置默认启动命令
CMD ["/root/run.sh"]