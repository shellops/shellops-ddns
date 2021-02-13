sudo docker rm shellops-ddns --force; \
docker run -d --name shellops-ddns \
 --restart always \
 -w /code \
 -v /home/shellops/shellops-ddns:/code \
 -p 1.2.3.4:53:53/udp \
 node:alpine \
 node app.js