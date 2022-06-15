version: '2'
services:
  database_server:
    image: percona:5.7.31-centos
    restart: always
    ports:
      - "3306:3306"
    volumes:
      - C:\database:/var/lib/mysql # Defaults to location inside user home dir. Change if desired.
    environment:
      MYSQL_ROOT_PASSWORD: password # Specify password
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    restart: always
    ports:
      - 8080:80
    environment:
      PMA_HOST: database_server
      PMA_USER: root
      PMA_PASSWORD: password # Specify password
      UPLOAD_LIMIT: 1024M