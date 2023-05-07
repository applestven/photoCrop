FROM nextcloud

EXPOSE 8080

VOLUME /var/www/data/html

RUN sed -i "s/localhost/db/g" /var/www/html/config/config.php
