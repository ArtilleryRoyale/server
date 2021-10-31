# Artillery Royale Server code

## Install

`npm install`

## Dev

Update debug symbols: `npm run debug_symbols`

## Start

`npm run start`

## Build

`npm run build`

## Deploy

For now it's via git on the server using nvm to get the right version (>= 12)
Install nvm then:
 - `nvm install 12`
 - `nvm use 12`

## Production

It uses pm2, more doc on pm2 here: https://marketplace.digitalocean.com/apps/nodejs and https://pm2.keymetrics.io/

Install
 - `npm install pm2 -g`
 - `pm2 install pm2-logrotate`
 - `pm2 set pm2-logrotate:compress true`
Run
 - `pm2 start --name server server.js`

The server listen on port 8080 you probably want to proxy this with nginx or apache
```ngnix
location / {
    proxy_http_version 1.1;
    proxy_cache_bypass $http_upgrade;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_pass http://localhost:8080;
}
```

```apache
<VirtualHost *:80>
    ServerName game.artilleryroyale.com
    ServerAdmin jerome@gangneux.net

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log vhost_combined

    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} =websocket [NC]
    RewriteRule /(.*)           ws://localhost:8080/$1 [P,L]
    RewriteCond %{HTTP:Upgrade} !=websocket [NC]
    RewriteRule /(.*)           http://localhost:8080/$1 [P,L]

    ProxyPassReverse / http://localhost:8080/
    ProxyRequests Off
</VirtualHost>
```
