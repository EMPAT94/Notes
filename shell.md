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

