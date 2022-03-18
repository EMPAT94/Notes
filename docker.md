# Docker

- [Archwiki Doc](https://wiki.archlinux.org/title/Docker)

- [Docker Docs](https://docs.docker.com/get-started/)

- [Docker container resource management](https://dzone.com/articles/docker-container-resource-management-cpu-ram-and-i)

- A "container" is a virtually isolated environment. An "image" is formed from multiple layer of commands.

- Analogy : An "image" is like the concept of Class from OOP - a blueprint/recipe of what will be. A "container" on the other hand, is like an Object - an instance of Class, or the dish made from a recipe. Obviously, there can be multiple "containers" for same "image".

- Start docker service

  ```sh
  systemctl start docker.service
  ```

- Start now & enable automatic startup on login

  ```sh
  systemctl enable --now docker.service
  ```

- Seek help

  ```sh
  docker [command] help
  ```

  ```sh
  docker <command> [subcommand] --help
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

- Show deployed containers

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

- Create a named volume

  ```sh
  docker volume create <some-name>
  ```

- List all volumes

  ```sh
  docker volume ls
  ```

- Use host's network interface (reduces NAT latency)

  ```sh
  docker run ... --net=host ...
  ```

- When mounting volumes "${PWD}" works, "${pwd}" doesn't. Keep env var case sensitivity in mind.

- Can get instance properties of containers (eg ip) as by runnings inspect

  ```sh
  docker inspect my-container
  ```

- Add current user to docker group (to avoid typing 'sudo' on every docker command); recommended only on trusted machines.

  ```sh
  sudo gpasswd -a $USER docker
  ```

- To access localhost (outside container), use ip address of bridge interface

  ```sh
  ip addr show docker0
  ```

- To Change default logger and data-root directory, add following to /etc/docker/daemon.json

  ```json
  {
    "log-driver": "local",
    "log-opts": {
      "max-size": "10m"
    },
    "data-root": "/mnt/volume/docker"
  }
  ```

  - Note that local log driver does not show logs with docker compose
