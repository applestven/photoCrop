FROM mariadb
USER root
# Create a new user and group
RUN getent group mysql || groupadd -r mysql && getent passwd mysql || useradd -r -g mysql mysql
RUN chown -R mysql:mysql /var/lib/mysql

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=12345687
ENV MYSQL_USER=nextcloud
ENV MYSQL_PASSWORD=
ENV MYSQL_DATABASE=nextcloud

# Set permissions for the data directory
VOLUME ["/var/lib/mysql"]
RUN chown -R mysql:mysql /var/lib/mysql

# Expose the MySQL port
EXPOSE 3306/tcp

# Switch to the new user
USER mysql

# Start the MySQL daemon
CMD ["mysqld", "--user=mysql"]
