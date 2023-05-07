# 基于官方 PHP 7.4 镜像
FROM php:7.4-apache

# 安装必要的依赖
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmcrypt-dev \
    libpng-dev \
    libzip-dev \
    unzip \
    wget \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql zip \
    && a2enmod rewrite

# 下载并解压 Nextcloud
RUN wget https://download.nextcloud.com/server/releases/nextcloud-22.0.0.tar.bz2 && \
    tar -xjf nextcloud-22.0.0.tar.bz2 && \
    rm nextcloud-22.0.0.tar.bz2 && \
    mv nextcloud /var/www/html/

# 设置 Nextcloud 数据目录权限
RUN chown -R www-data:www-data /var/www/html/nextcloud

# 暴露端口
EXPOSE 8080

# 启动 Apache2 服务器
CMD ["apache2-foreground"]

