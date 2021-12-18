
# adb

## Connect wirelessly

1. Connect adb with cable
2. `adb tcpip 5555`
3. `adb connect <phone-ip>:5555`

## Push new files only

```sh
adb push [-n for dryrun] --sync __source__ __target__
```

## Make an app fullscreen

```sh
adb shell settings put global policy_control immersive.full=com.package
```

where immersive.full can be replaced by immersive.status or immersive.navigation

To remove

```sh
adb shell settings put global policy_control immersive.off=com.package
```

## Screenshot & Screenrecord

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



# git

## Create a tag (annotated)

`git tag -a v0.2 -m "Release v0.2"`

Note that simple `git push` does not push a tag to remote, must do something like:

`git push origin <tag>`

## List tags

`git tag -l`

## Show specific tag details

`git show v0.2`

# nodejs

## Node make a dynamic chain of promises

Use

```javascript
arr.reduce((c, d) => c.then(() => fn(d)), Promise.resolve()).catch(error);
```

to convert

```javascript
const arr = [d1, d2, d3, ..., dn];

function fn(d) {
  return new Promise((res, rej) => { ...; res() });
}
```

into

```javascript
Promise.resolve().then(() => fn(d1)).then(() => fn(d2)).then(() => fn(d3))...then(() => fn(dn)).catch(error)
```

## Get integer part of a fraction

```javascript
let fraction = 1.234;
let intPart = ~~fraction; // 1
```



# shell

## Use user argument or default Valued

```sh
VAL=${1:-"__default__"}
```

Example: assuming above default is "/tmp" and the script is run

1. with argument /home then VAL = /home
2. with no argument then VAL = /tmp

## Reuse previous shell command

```sh
$ !!
```

Example: check git root and cd if proper

```sh
$ git rev-parse --show-toplevel
/git/root
$ cd $(!!)
```

## Reinstall xcode-select

```sh
$ sudo rm -rf $(xcode-select --print-path) && xcode-select --install
```

## Mount external ntfs hdd on macos

1. `brew cask install osxfuse`
2. Reboot
3. `brew install ntfs-3g`
4. Connect hdd
5. `mkdir ~/NTFS`
6. `diskutil list` (check MS drive num eg disk2s1)
7. `sudo umount /dev/disk2s1`
8. `sudo /usr/local/bin/ntfs-3g /dev/disk2s1 ~/NTFS -olocal -oallow_other`

## Check size of a directory

```sh
$ du -sh __dir__
```

where

- s = summary
- h = human readable format

Example: Get size of all directories in current directory

```sh
$ du -sh ./*/
```

## Move new files only (do not overwrite if exists)

```sh
$ mv -vn <source> <target>
```

where

- v = verbose
- n = no overwrite

## if/else

```sh
$ if [ __test__ ]; then __something__; fi
```

for command sucess | fail, simply do this (not no sq brackets)

```sh
$ if command; then __sucess__; else __fail__; fi
```

## for loop

```sh
for __variable__ in __list__; do __command__; done
```

Example: Add all dot files to gitignore

```sh
for file in .*; do echo $file >> .gitignore; done
```

## Script strict mode

_Ignore the \ in \# below, kept for formatting reasons_

```sh
\#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
```

[http://redsymbol.net/articles/unofficial-bash-strict-mode/](http://redsymbol.net/articles/unofficial-bash-strict-mode/)

## Find command

```sh
find __path__ [-type | -size] -name "regex" [-exec __another cmd__ | -delete]
```

Example: find and delete all dot files in current directory

```sh
find . -name ".*" -delete
```

## Remove duplicate lines from a file

```sh
awk '!l[$0]++' file > newfile
```

if order is not important

```sh
sort -u file > newfile
```

## Download songs from youtube

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

## Start a background job

```sh
nohup __job__ < /dev/null > /dev/null 2>&1 & disown
```

where

- nohup = no hangup signal
- < /dev/null = no stdin (input)
- \> /dev/null = no nohup file (output)
- 2>&1 = redirect errors to stdout (which is null)
- & = start in background
- disown = detach from shell

Example: To start [mpv](https://mpv.io/) as music daemon

```sh
nohup mpv --no-audio-display --shuffle ~/Music < /dev/null > /dev/null 2>&1 & disown
```
## Git delete all branches except main and featurex

```sh
git branch | awk '!/main|featurex/ { print $1 }' | xargs git branch -D
```

## Mount Ram as disk

```sh
sudo mount -t tmpfs -o size=5g tmpfs /mnt/ramfs
```

where a new temporary mount point /mnt/ramfs is created with 5 Gigabytes of capacity;
to unmount, do

```sh
umount /mnt/ramfs
```

## Watch a file for change and run command when changes

```sh
while true; do watch -g ls -l __filename__ && __cmd__; sleep 5; done
```

## Download a webpage and all it's linked pages and content

```shell
wget -r -l 1 -p -k -H -D domain.com,relateddomain.com http://domain.com/page/in/domain
```

where
  r = recurse
  k = patch local links
  H = traverse domains other than original
  D = limit domains traversed
  l = depth of recursion
  p = download related content like images

# sql

## Distinct Query

```sql
select distinct col1, col2 from table;
```

## Delete Query

```sql
delete from table where col = val;
```

## Count Query

```sql
select count(*) from table;
```



# vim

## Redirect output of Ex commands to register

1. `:redir @a`
2. `:__commands__`
3. `:redir END`
4. `"ap`

## Run bash (or any shell) commands from buffer

```
:%!bash
```

## Convert textfile to pdf (via ps)

```sh
$ vim filename.txt -c "hardcopy > filename.ps | q"; pstopdf filename.ps
```

_pstopdf may be names ps2pdf on other OSes_

## Alternative undo redo

```vi
:earlier __time__
:later __time__
```

where **time** = x(s|m|h|d) (s = second, m = minute, h = hour, day)

to go back and forth on state of buffer in time of x units

## Remote editing (using ssh config)

```vi
:e scp://staging/~/path/to/file.ext
```

_Assuming a Host for 'staging' is set in ~/.ssh/config_

## Delete other buffers except current

```vi
:% bd | e # | bd #
```

where

- % bd = delete all buffers (creates a new no-name buffer),
- e # = edit previous buffer (since current is no-name),
- bd # = delete previous buffer (no-name)

_spaces are optional_

## Ex mode completion options

TAB cycles through options; Ctrl-a inputs all options.

Example: To delete all \*.js files in buffer list

```vi
:bd js Ctrl-a
```

_Can use :bwipeout to completely remove a buffer_


# writing

## Rule of English adjective order

The rule is that multiple adjectives are always ranked accordingly: opinion, size, age, shape, colour, origin, material, purpose

## A good video on writing

https://youtu.be/vtIzMaLkCaM

## Guide to Grammar and Style - By Jack Lynch

http://www.jacklynch.net/Writing/index.html

## Dynomight

https://dynomight.net/2021/02/07/writing-as-a-craft/

# yay

https://aur.archlinux.org/packages/yay

## Install yay (for manjaro)

```sh
sudo pacman -S yay
```

where pacman is the default package manager, yay is aur helper wrapped around pacman

## Print Help

```sh
yay -h
```

for general help and

```sh
yay -[S|Q|R|...]h
```

where S = Sync, Q = Query, R = Remove

## Remove all old packages from cache

```sh
yay -Scc
```
## Remove unneeded dependencies

```sh
yay -c
```

## Search for a package

```sh
yay -Ss __regex__
```

## Print information about a package

```sh
yay -[S|Q]i
```

where S = remote info, Q = local info

## Install a package

```sh
yay -S __package__
```

## List all explicitly installed packages

```sh
yay -Qe
```

## Remove a package (use with caution, check for cross deps)

```sh
yay -Runs __package__
```

where u = unneeded packages, n = remove config files, s = unneeded dependencies

