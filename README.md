

# ADB

- Connect wirelessly

1. Connect adb with cable
2. `adb tcpip 5555`
3. `adb connect <phone-ip>:5555`

- Push new files only

```sh
adb push [-n for dryrun] --sync __source__ __target__
```

- Make an app fullscreen

```sh
adb shell settings put global policy_control immersive.full=com.package
```

where immersive.full can be replaced by immersive.status or immersive.navigation

To remove

```sh
adb shell settings put global policy_control immersive.off=com.package
```

- Screenshot & Screenrecord

```sh
adb shell screenrecord /sdcard/test.mp4
```

Close with Ctrl-C

```sh
adb shell screencap /sdcard/test.png
```

To pull file on pc and remove from phone

```sh
adb pull /sdcard/test.mp4 ./ && adb shell rm /sdcard/test.mp4
```


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

- Add current user to docker group (to avoid typing 'sudo' on every docker command); recommended only on localhost.

```sh
sudo gpasswd -a $USER docker
```

- To access localhost (outside container), use ip address of bridge interface

```sh
ip addr show docker0
```


# Git

- Tags: Mark a point in commit history (useful for releases and such)

- [Docs](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

- Create a tag (annotated)

`git tag -a v0.2 -m "Release v0.2"`

Note that simple `git push` does not push a tag to remote, must do something like:

`git push origin <tag>`

- List tags

`git tag -l`

- Show specific tag details

`git show v0.2`

- Delete all branches except main and featurex

```sh
git branch | awk '!/main|featurex/ { print $1 }' | xargs git branch -D
```

- Submodules: Make a repository a subdirectory of another repository

- [Docs](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

- Add a submodule

```sh
git submodule add <sub-repo-link>
```

Creates a .gitmodules file with path and url of submodules
Adds a submodule in detached HEAD state

- Clone with submodules

```sh
git clone --recurse-submodules <main-repo-link>
```

- If already clone but no submodules, do

```sh
git submodule update --init --recursive
```

- Update submodules from remote

```sh
git submodule update --remote [name]
```

- The 'foreach' command

```sh
git submodule foreach 'git pull'
```

- Worktrees: Make a directory for each working branch

- Useful when working on multiple branches, to avoid stash/pop unmerged paths confusion and work without disturbing other branches. Parallel branches ftw!

- Having multiple folders for each branch makes things easy for IDEs, compared to restructuring same folder multiple times

- ! IMPORTANT ! Do not use with submodules

- [Docs](https://git-scm.com/docs/git-worktree)

- Not essential but a better workflow is to start off with a bare repository and have one folder each for each branch:

```sh
# Clone repository only (no working tree)
# .bare contains what .git would have if we did git clone without --bare
git clone --bare <remote> .bare

# git command needs a .git to work with
echo "gitdir: ./.bare > .git"

# When cloning bare repos, remote stuff is not setup
# Set it up so git fetch and etc start working
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"

# Fetch remote branches
git fetch origin
```

- It is possible to set this up in a single shell command and bind an alias in .gitconfig


# Nginx

- [Beginner's Guide](https://nginx.org/en/docs/beginners_guide.html#control)

- Some CLI commands:

  - Start nginx `sudo nginx` (takes config from /etc/nginx/nginx.conf)
  - Manage service : `sudo nginx -s [reload|stop|quit]`
  - Test config: `sudo nginx -t`
  - Custom config: `sudo nginx -c /custom/config` # Couldn't get this to work

- Config file syntax:

  - Consists of "directives" that are like for eg a "simple" directive: `<command> [<key>] <value>;`
  - A "block" directive consits of a number of simple directives in braces for eg:

  ```
  <block_command> <value> {
    <command1> <value>;
    <command2> <value>;
    <command3> <value>;
  }
  ```

  - Braces form a "context", which is similar to a lexical scope of javascript braces
  - And just like javascript global scope, nginx's is called "main context".
  - main { events {} http { server { location {} }}}

- Static Serve:

  - Define inside several server (and location) blocks
  - client request -> parse URI -> match longest location string -> append <value> and respond
  - Eg, 2 locations : /data/html /data/images with following config:

  ```
  server {
    location / {
      root /data/html;
    }

    location /images {
      root /data;
    }
  }
  ```

  request : localhost/ => matches / => /data/html/index.html
  request : localhost/images/test.png => matches /images (longest) => /data/images/test.png

  - Regular expression:

  ```
  location ~ \.(gif|jpg|png)$ {
    root /data/images;
  }
  ```

- Proxy:

  - Act as a middleman for requests
  - Client request -> Forward to specific server -> Receive reply from server -> Client response
  - Eg, request come on /proxy-this and need to be sent to a separate server on port 8080, and /proxy-that on port 8081, then config would be:

  ```
  server {
      listen 80;
      server_name somedomain.com; # This is optional
      location /proxy-this/ {
        proxy_pass        http://127.0.0.1:8080;
      }
      location /proxy-that/ {
        proxy_pass        http://127.0.0.1:8081;
      }
  }
  ```

  - Note that the trailing slash in proxy_pass value changes where location is truncated

  - Helpful directives:

  ```
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_set_header  X-Real-IP        $remote_addr;
  proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
  proxy_cache_bypass $http_upgrade;
  ```

- Load balancing: This config will start balancing requests on 3 addresses (default round robin)

```
http {
  upstream poxy-server {
    server server_addr1;
    server server_addr2;
    server server_addr3;
  }

  server {
    location / {
      proxy_pass http://proxy-server;
    }
  }
}
```


# Nodejs

- Node make a dynamic chain of promises

Use

```
arr.reduce((c, d) => c.then(() => fn(d)), Promise.resolve()).catch(error);
```

to convert

```
const arr = [d1, d2, d3, ..., dn];

function fn(d) {
  return new Promise((res, rej) => { ...; res() });
}
```

into

```
Promise.resolve().then(() => fn(d1)).then(() => fn(d2)).then(() => fn(d3))...then(() => fn(dn)).catch(error)
```

- Get integer part of a fraction

```
let fraction = 1.234;
let intPart = ~~fraction; // 1
```


# python

- [Google's Python Class](https://developers.google.com/edu/python/)

- [Learnpyton.org](https://www.learnpython.org/)

- [Exercism](https://exercism.org/tracks/python)




# Shell

- Use user argument or default Valued

```sh
VAL=${1:-"<default>"}
```

Example: assuming above default is "/tmp" and the script is run

1. with argument /home then VAL = /home
2. with no argument then VAL = /tmp

- Reuse previous shell command

```sh
$ !!
```

Example: check git root and cd if proper

```sh
$ git rev-parse --show-toplevel
/git/root
$ cd $(!!)
```

- Reinstall xcode-select @MACOS

```sh
$ sudo rm -rf $(xcode-select --print-path) && xcode-select --install
```

- Mount external ntfs hdd @MACOS

1. `brew cask install osxfuse`
2. Reboot
3. `brew install ntfs-3g`
4. Connect hdd
5. `mkdir ~/NTFS`
6. `diskutil list` (check MS drive num eg disk2s1)
7. `sudo umount /dev/disk2s1`
8. `sudo /usr/local/bin/ntfs-3g /dev/disk2s1 ~/NTFS -olocal -oallow_other`

- Check size of a directory

```sh
$ du -sh <dir>
```

where

- s = summary
- h = human readable format

Example: Get size of all directories in current directory

```sh
$ du -sh ./*/
```

- Move new files only (do not overwrite if exists)

```sh
$ mv -vn <source> <target>
```

where

- v = verbose
- n = no overwrite

- if/else

```sh
$ if [ <test> ]; then <something>; fi
```

for command sucess | fail, simply do this (not no sq brackets)

```sh
$ if command; then <sucess>; else <fail>; fi
```

- for loop

```sh
for <variable> in <list>; do <command>; done
```

Example: Add all dot files to gitignore

```sh
for file in .*; do echo $file >> .gitignore; done
```

- Script strict mode

_Ignore the \ in \# below, kept for formatting reasons_

```sh
\#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
```

[http://redsymbol.net/articles/unofficial-bash-strict-mode/](http://redsymbol.net/articles/unofficial-bash-strict-mode/)

- Find command

```sh
find <path> [-type | -size] -name "regex" [-exec <another cmd> | -delete]
```

Example: find and delete all dot files in current directory

```sh
find . -name ".*" -delete
```

as an alternative, `fd` works as follows

```sh
fd "regex"
```

- Remove duplicate lines from a file

```sh
awk '!l[$0]++' file > newfile
```

if order is not important

```sh
sort -u file > newfile
```

- Download songs from youtube

[https://youtube-dl.org/](https://youtube-dl.org/)

Only audio:

```sh
youtube-dl --ignore-errors --format bestaudio --extract-audio --audio-format mp3 -o '%(title)s.%(ext)s' [--yes-playlist] [ "URL" | -a  ./fileName ]
```

_where fileName is a list of urls separated by blank lines;_

Best video+audio:

```sh
youtube-dl --ignore-errors --format 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio' --merge-output-format mp4  -o '%(title)s.%(ext)s' "VIDEO-LINK"
```

- Start a background job

```sh
nohup <job> < /dev/null > /dev/null 2>&1 & disown
```

where

- nohup = no hangup signal
- \< /dev/null = no stdin (input)
- \> /dev/null = no nohup file (output)
- 2>&1 = redirect errors to stdout (which is null)
- & = start in background
- disown = detach from shell

Example: To start [mpv](https://mpv.io/) as music daemon

```sh
nohup mpv --no-audio-display --shuffle ~/Music < /dev/null > /dev/null 2>&1 & disown
```

- Mount Ram as disk

```sh
sudo mount -t tmpfs -o size=5g tmpfs /mnt/ramfs
```

where a new temporary mount point /mnt/ramfs is created with 5 Gigabytes of capacity;
to unmount, do

```sh
umount /mnt/ramfs
```

- Watch a file for change and run command when changes

```sh
while true; do watch -g ls -l <filename> && <cmd>; sleep 5; done
```

- Download a webpage and all it's linked pages and content

```sh
wget -r -l 1 -p -k -H -D domain.com,relateddomain.com http://domain.com/page/in/domain
```

where,

- r = recurse
- k = patch local links
- H = traverse domains other than original
- D = limit domains traversed
- l = depth of recursion
- p = download related content like images

- Lazy regex quatifier (works in js, not is sed, vim)

Suppose there is a line like so:

`"this is some string" "this is another string"`

And the aims is to select everything within quotes as a string.

A naive regex would be: `/".*"/`

But it actually selects everything inside starting from first " to the end of line "

To select only the content withing first closing quote, do : `/.*?/`

That is, add a `?` aka a lazy quatifier (as opposed to normal greedy approach)


# SQL

- Distinct Query

```sql
select distinct col1, col2 from table;
```

- Delete Query

```sql
delete from table where col = val;
```

- Count Query

```sql
select count(*) from table;
```


# SSH

- Connect to remote host (assuming id_rsa.pub is submitted)

```sh
ssh <username>@<hostname/ip> [-p <port>]
```

- Add a known host to ssh config for easier connection (also used by scp & rsync), using ssh config

```sh
touch ~/.ssh/config && chmod 600 ~/.ssh/config
```

```sh
Host server-name # server-name is pattern matched
  HostName <hostname/ip> # indentation optional but recommended
  User <username>
  Port <port>
```

```sh
ssh server-name
```

- Recommended - generate a new ssh key pair for every remote host (so even if stolen, cannot compromise others). Can add in config as:

```sh
Host name1
  ...
  Identity ~/.ssh/id_rsa.name1

Host name2
  ...
  Identity ~/.ssh/id_rsa.name2
```


# (NEO)VIM

- Redirect output of Ex commands to register

1. `:redir @a`
2. `:__commands__`
3. `:redir END`
4. `"ap`

- Run bash (or any shell) for buffer content

```
:%!bash
```

- Convert textfile to pdf (via ps)

```sh
$ vim filename.txt -c "hardcopy > filename.ps | q"; pstopdf filename.ps
```

_pstopdf may be names ps2pdf on other OSes_

- Alternative undo redo

```vi
:earlier __time__
:later __time__
```

where **time** = x(s|m|h|d) (s = second, m = minute, h = hour, day)

to go back and forth on state of buffer in time of x units

- Remote editing (using ssh config)

```vi
:e scp://staging/~/path/to/file.ext
```

_Assuming a Host for 'staging' is set in ~/.ssh/config_

- Delete other buffers except current

```vi
:% bd | e # | bd #
```

where

- % bd = delete all buffers (creates a new no-name buffer),
- e # = edit previous buffer (since current is no-name),
- bd # = delete previous buffer (no-name)

_spaces are optional_

- Ex mode completion options

TAB cycles through options; Ctrl-a inputs all options.

Example: To delete all \*.js files in buffer list

```vi
:bd js Ctrl-a
```

_Can use :bwipeout to completely remove a buffer_


# Writing

- Rule of English adjective order

The rule is that multiple adjectives are always ranked accordingly: opinion, size, age, shape, colour, origin, material, purpose

- A good video on writing

https://youtu.be/vtIzMaLkCaM

- Guide to Grammar and Style - By Jack Lynch

http://www.jacklynch.net/Writing/index.html

- Dynomight

https://dynomight.net/2021/02/07/writing-as-a-craft/


# YAY

- Install yay (for manjaro)

```sh
sudo pacman -S yay
```

where pacman is the default package manager, yay is aur helper wrapped around pacman. Here is the link : https://aur.archlinux.org/packages/yay

- Print Help

```sh
yay -h
```

for general help and

```sh
yay -[S|Q|R|...]h
```

where S = Sync, Q = Query, R = Remove

- Remove all old packages from cache

```sh
yay -Scc
```

- Remove unneeded dependencies

```sh
yay -c
```

- Search for a package

```sh
yay -Ss __regex__
```

- Print information about a package

```sh
yay -[S|Q]i
```

where S = remote info, Q = local info

- Install a package

```sh
yay -S __package__
```

- List all explicitly installed packages

```sh
yay -Qe
```

- Remove a package (use with caution, check for cross deps)

```sh
yay -Runs __package__
```

where u = unneeded packages, n = remove config files, s = unneeded dependencies

