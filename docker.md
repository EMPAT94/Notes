                      ____                _
                     |  _ \   ___    ___ | | __ ___  _ __
                     | | | | / _ \  / __|| |/ // _ \| '__|
                     | |_| || (_) || (__ |   <|  __/| |
                     |____/  \___/  \___||_|\_\\___||_|

[Archwiki Doc](https://wiki.archlinux.org/title/Docker)

[Docker Docs](https://docs.docker.com/get-started/)

- Start docker service

```sh
systemctl start docker.service
```

- Start now & enable automatic startup on login

```sh
systemctl enable --now docker.service
```

- Deploy a container

```sh
docker run <image-name> [<command>]
```

with following options:

- -d = detached mode
- -e = environment variables
- -p <host port>:<container port> = port redirect
- -v <host dir> | <volumne name>:<container dir> = bound volume | named volume
- -i = interactive mode (keeps STDIN open)
- -t = pseudo-tty
- -name = assign a name to the container
- -w = work directory inside container
- -rm = automatically remove on exit

to get the rest of the options possible, run

```sh
docker run --help
```

* Show deployed containers

```sh
docker ps [-a for all]
```

- Execute a command in deployed container

```sh
docker exec [-it for interactive tty] <container-id> <command>
```

- Stop a container

```sh
docker stop <container-id>
```

- Remove a container

```sh
docker rm <container-id>
```

- Force stop & remove a container

```sh
docker rm -f <container-id>
```

- Pull an image

```sh
docker pull <image-name>
```

- Show all images

```sh
docker images
```

- Remove an image

```sh
docker rm <image-name> [or <image-id> for unnamed images]
```

- Build an image

```sh
docker build -t [<image-namespace>/]<new-image-name>[:<image-tag>] .
```

assuming current directory contains Dockerfile.

- A "container" is a virtually isolated environment. An "image" is formed from multiple layer of commands.

- Analogy : An "image" is like the concept of Class from OOP - a blueprint/recipe of what will be. A "container" on the other hand, is like an Object - an instance of Class, or the dish made from a recipe. Obviously, there can be multiple "containers" for same "image".
