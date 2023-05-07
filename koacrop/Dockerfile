FROM node:16.17.0
# 创建工作目录
RUN mkdir -p /service
WORKDIR /service

# 复制应用程序
ADD ./ /service

# 修改权限
RUN chmod 755 /service

# 安装依赖
WORKDIR /service/koacrop
RUN npm config set registry http://registry.npmmirror.com
RUN npm install -g npm@9.6.5
RUN npm install
RUN npm install pm2 -g
# RUN pm2 start /service/koa/src/main.js

# 暴露端口
EXPOSE 80

# 使用守护进程管理工具启动应用程序
CMD ["pm2-runtime", "/service/koacrop/src/main.js"]

