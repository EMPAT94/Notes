# VIM

#### Redirect output of Ex commands to register

1. `:redir @a`
2. `:<commands>`
3. `:redir END`
4. `"ap`

#### Run bash (or any shell) commands from buffer

```
:%!bash
```

#### Convert textfile to pdf (via ps)

```sh
$ vim filename.txt -c "hardcopy > filename.ps | q"; pstopdf filename.ps
```

_pstopdf may be names ps2pdf on other OSes_

#### Alternative undo redo

```vim
:earlier <time>
:later <time>
```

where <time> = x(s|m|h|d) (s = second, m = minute, h = hour, day)

to go back and forth on state of buffer in time of x units

#### Remote editing (using ssh config)

```vim
:e scp://staging/~/path/to/file.ext
```

_Assuming a Host for 'staging' is set in ~/.ssh/config_

#### Delete other buffers except current

```vim
:% bd | e # | bd #
```

where % bd = delete all buffers (creates a new no-name buffer),
e # = edit previous buffer (since current is no-name),
bd # = delete previous buffer (no-name)

_spaces are optional_

#### Ex mode completion options

<TAB> cycles through options; <C-a> inputs all options.

Example: To delete all \*.js files in buffer list

```vi
:bd js<C-a>
```

_Can use :bwipe to completely remove a buffer_

# SHELL

#### Use user argument or default Valued

```sh
VAL=${1:-"<default>"}
```

Example: assuming above default is "/tmp" and the script is run

1. with argument /home then VAL = /home
2. with no argument then VAL = /tmp

#### Reuse previous shell command

```sh
$ !!
```

Example: check git root and cd if proper

```sh
$ git rev-parse --show-toplevel
/git/root
$ cd $(!!)
```

#### Reinstall xcode-select

```sh
sudo rm -rf $(xcode-select --print-path) && xcode-select --install
```

#### Mount external ntfs hdd on macos

1. `brew cask install osxfuse`
2. Reboot
3. `brew install ntfs-3g`
4. Connect hdd
5. `mkdir ~/NTFS`
6. `diskutil list` (check MS drive num eg disk2s1)
7. `sudo umount /dev/disk2s1`
8. `sudo /usr/local/bin/ntfs-3g /dev/disk2s1 ~/NTFS -olocal -oallow_other`

#### Check size of a directory

```sh
du -sh <dir>
```

where s = summary, h = human readable format

Example: Get size of all directories in current directory

```sh
du -sh ./*/
```

#### Move new files only (do not overwrite if exists)

```sh
$ mv -vn <source> <target>
```

where v = verbose, n = no overwrite

#### if/else

```sh
if [ <test> ]; then <do something>; fi
```

#### for loop

```sh
for <variable> in <list>; do <command>; done
```

Example: Add all dot files to gitignore

```sh
for file in .*; do echo $file >> .gitignore; done
```

#### Script strict mode

_Ignore the \ in \# below, kept for formatting reasons_

```sh
\#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
```

[http://redsymbol.net/articles/unofficial-bash-strict-mode/](http://redsymbol.net/articles/unofficial-bash-strict-mode/)

#### Find command

```sh
find <path> [-type | -size] -name "regex" [-exec <another cmd> | -delete]
```

Example: find and delete all dot files in current directory

```sh
find . -name ".*" -delete
```

#### Remove duplicate lines from a file

```sh
awk '!l[$0]++' file > newfile
```

if order is not important

```sh
sort -u file > newfile
```

#### Download songs from youtube

```sh
youtube-dl --ignore-errors --format bestaudio --extract-audio --audio-format mp3 [--yes-playlist] [ "URL" | -a  ./fileName ]
```

_where fileName is a list of urls separated by blank lines; [youtube-dl](https://youtube-dl.org/)_

#### Start a background job

```sh
nohup <job> < /dev/null > /dev/null & disown
```

where
  nohup = no hangup sig
  < /dev/null = no stdin (input)
  > /dev/null = no nohup file (output)
  > & = start in background
  > disown = detach from shell

Example: To start [mpv](https://mpv.io/) as music daemon

```sh
nohup mpv --no-audio-display --shuffle ~/Music < /dev/null > /dev/null 2>&1 & disown
```

# NODE/JS

#### Node make a dynamic chain of promises

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

#### Get integer part of a fraction

```javascript
let fraction = 1.234;
let intPart = ~~fraction; // 1
```

# ADB

#### Connect wirelessly

1. Connect adb with cable
2. `adb tcpip 5555`
3. `adb connect <phone-ip>:5555`

#### Push new files only

```sh
adb push [-n for dryrun] --sync <source> <target>
```

#### Make an app fullscreen

```sh
adb shell settings put global policy_control immersive.full=com.package
```

where immersive.full can be replaced by immersive.status or immersive.navigation

To remove

```sh
adb shell settings put global policy_control immersive.off=com.package
```

#### Screenshot & Screenrecord

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

# SQL

#### Distinct Query

```sql
select distinct col1, col2 from table;
```

#### Delete Query

```sql
delete from table where col = val;
```

#### Count Query

```sql
select count(*) from table;
```

# WRITING

#### Rule of English adjective order

The rule is that multiple adjectives are always ranked accordingly: opinion, size, age, shape, colour, origin, material, purpose

#### A good video on writing

https://youtu.be/vtIzMaLkCaM

#### Guide to Grammar and Style - By Jack Lynch

http://www.jacklynch.net/Writing/index.html
