

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

  where immersive.full can be replaced by immersive.status or immersive.navigation, to remove

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

- Add current user to docker group (to avoid typing 'sudo' on every docker command); recommended only on trusted machines.

  ```sh
  sudo gpasswd -a $USER docker
  ```

- To access localhost (outside container), use ip address of bridge interface

  ```sh
  ip addr show docker0
  ```


# Git

## Tags

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

## Submodules

- Submodules: Make a repository a subdirectory of another repository

- [Docs](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

- Add a submodule

  ```sh
  git submodule add <sub-repo-link>
  ```

  Creates a .gitmodules file with path and url of submodules and adds a submodule in detached HEAD state

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

## Worktrees

- Worktrees: Make a directory for each working branch

- Useful when working on multiple branches, to avoid stash/pop unmerged paths confusion and work without disturbing other branches. Parallel branches ftw!

- Having multiple folders for each branch makes things easy for IDEs, compared to restructuring same folder multiple times

- <span style="color:orange">IMPORTANT!</span> Do not use with submodules

- [Docs](https://git-scm.com/docs/git-worktree)

- Not essential but a better workflow is to start off with a bare repository and have one folder each for each branch:

  - Clone bare repo

  ```sh
  git clone --bare <remote> .bare
  ```

  - git command needs a .git to work with

  ```sh
  echo "gitdir: ./.bare > .git"
  ```

  - Set remote brances up so git fetch and etc start working

  ```sh
  git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
  ```

  - Fetch remote branches

  ```sh
  git fetch origin
  ```

- It is possible to set this up in a single shell command and bind an alias in .gitconfig


# mongodb

- Mongo Connection commands <conn>

`<command> -h host -p port`

- Mongo Authentication commands <auth>

`<command> <conn> -u user -p pass --authenticationDatabase admin`

- Mongo backup/restore for json files

`mongoimport <conn> <auth> --type json --db db_name --collection coll_name --file ./path/to/ip_file.json`

  - Don't forget to add `--jsonArray` if file is in that form

`mongoexport <conn> <auth> -db db_name --collection coll_name -o ./path/to/op_file.json`

- Mongo backup/restore for bson files with meta data (created under ./dump/<db_name>)

`mongodump <conn> <auth> --db db_name`

`mongorestore <conn> <auth> --db db_name ./path/to/dump`

- Mongo auth

  1. At the mongo command line, set the administrator:

  ```sh
  use admin;
  db.addUser('admin','123456');
  ```

  2. Shutdown the server and exit

  ```sh
  db.shutdownServer();
  exit
  ```

  3. Restart mongod with --auth

  `$ sudo ./mongodb/bin/mongod --auth --dbpath /mnt/db/`

  4.  Run mongo again in 2 ways:

    - run mongo first then login:

    ```sh
    $ ./mongodb/bin/mongo localhost:27017
    use admin
    db.auth('admin','123456');
    ```

    - run & login to mongo in command line.

    `$ ./mongodb/bin/mongo localhost:27017/admin -u admin -p 123456`

    <https://docs.mongodb.com/manual/core/authentication/>


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

- Nodejs code to stream in a file one line at a times: [Source code](./stream-file.js)


# Postgresql

- [Official site](https://www.postgresql.org)

- [Official docs](https://www.postgresql.org/docs)

- [Tutorial](https://www.postgresqltutorial.com/)

- [Quick Reference](https://zaiste.net/posts/postgresql-primer-for-busy-people/)


# python

## Links

- [Official site](https://www.python.org/)

- [Official docs](https://docs.python.org/3/tutorial/index.html)

- [Exercism site](https://exercism.org/tracks/python)

- [Awsome python github](https://github.com/vinta/awesome-python)

## Notes from official docs (v3.10.2)

- [Basics](./python/basics.md)

Next: https://docs.python.org/3/tutorial/datastructures.html

## Upcoming

More Data Type

Modules and Packaging

I/O

Error Handling

Classes

Standard Library

Virtual Environment and External Packages

Decided on a minor project?

## May be useful

Commandline stuff?

Code formatting [Pep8](https://www.python.org/dev/peps/pep-0008)

[Python Language Reference](https://docs.python.org/3/reference/index.html)


# reactjs

- Use absolute imports `@component/Button`

  - As opposed to relative imports, which grow longer the deeper one goes
  - Makes it easier to refactor components
  - Makes code more readable
  - Will need more configuration for both bundling and ide errors

- Use builtin reducer to manage complex state `useReducer`

- Use index.js in components/ to import all common modules from one place instead of from each file

  - Helps avoid duplication
  - Reduces cognitive load
  - Easier to reason about code
  - Reduces loc

- Use "views" folder to hold single page components and "components" (or "modules") to define common basic components

- Wrap vendor components such that they are indistinguishable from custom components

- All styles, tests and data required by a view (or component) should be in one single folder

  - Makes it easier to view the whole project structure
  - Makes it trivial to add new components

- Split bundle by view (or route), load on-demand. Network requests are the slowest part of app life-cycle.


# Shell

- Use user argument or default Valued

  ```sh
  VAL=${1:-"<default>"}
  ```

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

  where,

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

  where,

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

- Start a background job

  ```sh
  nohup <job> < /dev/null > /dev/null 2>&1 & disown
  ```

  where,

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

- Add colour to console output (make sure to add _Reset_ at the end after adding colour)

  `\033[0m` : Reset
  `\033[1m` : Bold
  `\033[91m` : Red
  `\033[92m` : Green
  `\033[93m` : Blue

  - JS Function

  ```js
  const colorize = (...args) => ({
    black: `\x1b[30m${args.join(" ")}`,
    red: `\x1b[31m${args.join(" ")}`,
    green: `\x1b[32m${args.join(" ")}`,
    yellow: `\x1b[33m${args.join(" ")}`,
    blue: `\x1b[34m${args.join(" ")}`,
    magenta: `\x1b[35m${args.join(" ")}`,
    cyan: `\x1b[36m${args.join(" ")}`,
    white: `\x1b[37m${args.join(" ")}`,
    bgBlack: `\x1b[40m${args.join(" ")}\x1b[0m`,
    bgRed: `\x1b[41m${args.join(" ")}\x1b[0m`,
    bgGreen: `\x1b[42m${args.join(" ")}\x1b[0m`,
    bgYellow: `\x1b[43m${args.join(" ")}\x1b[0m`,
    bgBlue: `\x1b[44m${args.join(" ")}\x1b[0m`,
    bgMagenta: `\x1b[45m${args.join(" ")}\x1b[0m`,
    bgCyan: `\x1b[46m${args.join(" ")}\x1b[0m`,
    bgWhite: `\x1b[47m${args.join(" ")}\x1b[0m`,
  });
  ```

## youtube-dl

- Download songs from youtube

  [https://youtube-dl.org/](https://youtube-dl.org/)

  Only audio:

  ```sh
  youtube-dl --ignore-errors --format bestaudio --extract-audio --audio-format mp3 -o '%(title)s.%(ext)s' [--yes-playlist] <"URL" | -a  ./fileName>
  ```

  _where fileName is a list of urls separated by blank lines;_

  Best video+audio:

  ```sh
  youtube-dl --ignore-errors --format 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio' --merge-output-format mp4  -o '%(title)s.%(ext)s' <"video-link">
  ```

  Note the brackets for the above are part of the command.

## gpg

- Encrypt file for self

  ```sh
  gpg --encrypt --recipient <self@mail.com> <file>
  ```

  This will create an encryped `<file>.gpg` file in same directory. Opening it normally will show gibberish.

- Decrypt a file

  ```sh
  gpg --decrypt <file>.gpg
  ```

  This will ask for your gpg passphrase and output the original `<file>`.


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

- Connect to remote host

```sh
ssh <username>@<hostname/ip> [-p <port>]
```

- Setup keys (no password login)

  - Generate keys on client

  ```sh
  ssh-keygen -t ed25519  -f ~/.ssh/<key-name> -C "<Some comment>"
  ```

  where,

  t = type of key algo
  f = file name of generated keys
  C = comment regarding who and where of key usage

  - Ensure passphrase is entered, it is remembered later

  - Copy public key to remote server

  ```sh
  ssh-copy-id  -i ~/.ssh/<key-name> <username>@<hostname>
  ```

  where,

  i = Identity file to use

  - Turn off password authentication on remote server

  ```sh
  sudo sed -i \
    -e 's/#\?PasswordAuthentication yes/PasswordAuthentication no/' \
    -e 's/PubkeyAuthentication no/PubkeyAuthentication yes/' \
    /etc/ssh/sshd_config
  ```

  - May also disable `PermitRootLogin`

  - Reload ssh daemon via systemctl

  - May change default ssh porto

  - Should use tool like fail2ban to reject unauthorized attempts

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
  Identity ~/.ssh/<key-name>

Host name2
  ...
  Identity ~/.ssh/<key-name>
```


# System

- [Official Site](https://systemd.io/)

> Systemd is a suite of basic building blocks for a Linux system. It provides a system and service manager that runs as PID 1 and starts the rest of the system.

- [A blog from creator](https://0pointer.de/blog/projects/systemd.html)

- [Arch Wiki](https://wiki.archlinux.org/title/Systemd)

## Units:

- Services (Daemons) [Uses `systemctl`]
- Timers (similar to Cron)
- Mounts (File system mounts, from /etc/fstab)
- Devices
- Sockets

- List all units for a type:

  ```sh
  systemctl list-units --type <name>
  ```

## Serices:

- Start a service:

  ```sh
  systemctl start <name>
  ```

- Stop a service:

  ```sh
  systemctl stop <name>
  ```

- Enable a service to start on boot:

  ```sh
  systemctl enable <name>
  ```

- Disable a service from starting on boot:

  ```sh
  systemctl disable <name>
  ```

- Disable a service from being started by other services:

  ```sh
  systemctl mask <name>
  ```

- Status of a service:

  ```sh
  systemctl status <name>
  ```

  - Enable [or disable or mask] and start immediatly:

  ```sh
  systemctl enable [disable | mask] --now <name>
  ```

  - Reload service units

  ```sh
  systemctl daemon-reload
  ```

## Journal:

- [Arch Wiki](https://wiki.archlinux.org/title/Systemd/Journal)

> systemd has its own logging system called the journal; running a separate logging daemon is not required. To read the log, use `man journalctl(1)`

- Show all messages since boot:

  ```sh
  journalctl -b [-n for nth boot, 0 = current, 1 = previous etc]
  ```

- Show all messages with prority higher than n [2 = critical, 3 = error, 4 = warn]:

  ```sh
  journalctl -p n
  ```

- Show all messages for a unit:

  ```sh
  journalctl -u <unit-name>
  ```

- Show all messages for an executable:

  ```sh
  journalctl /path/to/executable
  ```

## Timers:

- [Arch Wiki](https://wiki.archlinux.org/title/Systemd/Timers)

> Timers are systemd unit files with a suffix of .timer. Timers are like other unit configuration files and are loaded from the same paths but include a [Timer] section which defines when and how the timer activates.

> For each .timer file, a matching .service file exists (e.g. foo.timer and foo.service). The .timer file activates and controls the .service file.

### Example of a timer service:

- [Website link #Demo](https://fedoramagazine.org/systemd-timers-for-scheduling-tasks/)

- Executable to run (can be any language, using a bash script here). Inside $HOME/bin/schedule-test.sh:

  ```sh
  #!/usr/bin/env bash
  echo "This is only a test: $(date)" >> "$HOME/schedule-test-output.txt"
  ```

  - Make sure the executable is... executable.

    ```sh
    chmod u+x $HOME/bin/schedule-test.sh
    ```

- Systemd Service Unit inside ~/.config/systemd/user/schedule-test.service:

  ```ini
  [Unit]
  Description=A job to test the systemd scheduler

  [Service]
  Type=simple
  ExecStart=/home/<user>/bin/schedule-test.sh

  [Install]
  WantedBy=default.target
  ```

- Systemd Timer Unit inside ~/.config/systemd/user/schedule-test.timer:

  ```ini
  [Unit]
  Description=Schedule a message every 1 minute

  [Timer]

  #Execute job if it missed a run due to machine being off
  Persistent=true

  #Run 120 seconds after boot for the first time
  OnBootSec=120

  #Run every 1 minute thereafter
  OnUnitActiveSec=60

  #File describing job to execute
  Unit=schedule-test.service

  [Install]

  # So systemd can manage automatically
  WantedBy=timers.target
  ```

  - Can use `OnCalendar` instead of `OnUnitActiveSec`

- Reload daemons and start service to test:

  ```sh
  systemctl --user daemon-reload
  systemctl --user start schedule-test.service
  tail $HOME/schedule-test-output.txt
  ```

- Enable timer if test pass and check status:

  ```sh
  systemctl --user enable --now schedule-test.timer
  systemctl --user status schedule-test.timer
  tail -f $HOME/schedule-test-output.txt
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


# vuejs

- Mounting Vue App:

```html
<div id="app"></div>
```

```js
Vue.createApp({ ... }).mount("#app")
```

- Directives:

  - v-bind:

    - Dynamically bind javascript variables to html attributes

    ```html
    <div v-bind:title="some_var"></div>
    ```

    ```js
    data() {
        return {
            some_var: "some_val"
          }
      }
    ```

    - Shorthand `v-bind:<attr>` => `:<attr>`

    - Dynamic Attribute `:[expr]="some_var"`

    - Can be used to pass props to child `:[prop_name]="prop_val"`

    - v-bind:class TODO
    - v-bind:style TODO

  - v-on:

    - Attach event listeners

    ```html
    <div v-on:click="some_fn"></div>
    ```

    ```js
    methods: {
        some_fn() { ... }
      }
    ```

    - Shorthand `v-on:<event>` => `@<event>`

  - v-model:

    - 2-way data binding (between html form and javascript object)

    ```html
    <input v-model="some_var"></input>
    ```

    ```js
    data() {
        return {
            some_var: "some_val"
          }
      }
    ```

  - v-if, v-elseif, v-else:

    - Conditionally render html

    ```html
    <div v-if="some_var"></div>
    <div v-elseif="some_var"></div>
    <div v-else></div>
    ```

    - v-show is similar but uses css display to modify visibility

  - v-once: TODO

  - v-html: TODO

- Component Properties (inside createApp({ ... })):

  - data() { ... } = Data (object) passed to instance

  - mounted() { ... } = Functions passed to instance

  - computed() { ... } = Functions that return calculated strings when data() changes (cached!)

  - watch() { ... } = Functions that run when data changes (async ops or data dependencies)

  - Hooks:
    - Types: created, mounted, updated, unmounted
    - Usage: [before]<hook>() { ... }

- Events:


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

