FROM php:7.4-apache

# 安装所需的 PHP 模块
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    libxml2-dev \
    libpq-dev \
    libmagickwand-dev \
    && docker-php-ext-install -j$(nproc) iconv mysqli pdo_mysql gd zip xmlrpc opcache intl pgsql pdo_pgsql exif pcntl \
    && pecl install imagick redis xdebug \
    && docker-php-ext-enable imagick redis xdebug

# 下载并解压 Nextcloud
ADD https://download.nextcloud.com/server/releases/latest.tar.bz2 /var/www/html/
RUN tar -xjf /var/www/html/latest.tar.bz2 -C /var/www/html/ --strip-components=1 \
    && rm /var/www/html/latest.tar.bz2

# 设置文件权限
RUN chown -R www-data:www-data /var/www/html/

# 添加配置文件
COPY config.php /var/www/html/config/

# 添加启动脚本
COPY start.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/start.sh
EXPOSE 8080
# 设置容器默认的启动命令
CMD ["/usr/local/bin/start.sh"]
