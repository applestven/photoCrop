# photoCrop
图片自动裁剪


## 搭建可持续集成部署系统 

第一次实现的是将每个服务分开构建docker image Dockerfile有单一构建原则 


## gitaction 部署走两个文件  
1. deploy 用来部署主程 koacrop   以及 辅助应用 mariadb nextcloud 
注意 ： 使用的是分开 构建 docker image  然后一次性docker run 运行多个容器 并分开映射接口 ， 运行有依赖关系 

2. vdeploy 用来部署nginx 分发  前端 

