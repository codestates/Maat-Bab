#!/bin/bash
cd /home/ubuntu/Maat-Bab/server
npm install
npm install pm2@latest -g
sudo apt-get update
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown ubuntu /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80
# sudo touch /etc/authbind/byport/443
# sudo chown ubuntu /etc/authbind/byport/443
# sudo chmod 755 /etc/authbind/byport/443
sudo chmod -R 755 /etc/letsencrypt/archive
sudo chmod -R 755 /etc/letsencrypt/live