# Caddy

> Caddy is a web server with automatic https, certificate renewal and http to https routing.

## Resources

- [Official Link](https://caddyserver.com/)

- [Docker Image](https://registry.hub.docker.com/_/caddy)

## Setup

> I use it with Caddyfile and docker-compose.yml for easy config and deploy of caddy as a reverse-proxy (like [nginx](./nginx.md)).

This sets up the basic framework:

```shell
$ mkdir caddy
$ cd caddy
$ mkdir site
$ touch Caddyfile docker-compose.yml
$ docker create volume caddy_data
$ docker create volume caddy_config
```

[Docker](./docker.md) compose be like:

```yml
version: "3"

services:
  caddy:
    image: caddy:<version-that-was-pulled>
    network_mode: host
    volumes:
      - $PWD/Caddyfile:/etc/caddy/Caddyfile
      - $PWD/site:/srv:ro
      - caddy_data:/data
      - caddy_config:/config
    restart: unless-stopped

volumes:
  caddy_data:
    external: true
  caddy_config:
    external: true
```

[Caddyfile](https://caddyserver.com/docs/caddyfile-tutorial) for reverse-proxy is:

```Caddyfile
# The entirety of ngnix nextcloud config turned into this:

nextcloud.<mydomain>.com {
    encode zstd gzip
    rewrite /.well-known/carddav /remote.php/dav
    rewrite /.well-known/caldav /remote.php/dav
    reverse_proxy localhost:8080
  }
```

Finally, to run things:

```shell
$ docker-compose up -d
```

Done!
