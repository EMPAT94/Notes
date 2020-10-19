
# VIM

## Redirect output of Ex commands to register

1. `:redir @a`
2. `:<commands>`
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

*pstopdf may be names ps2pdf on other OSes*

## Alternative undo redo

```vim
:earlier <time>
:later <time>
```
where <time> = x(s|m|h|d) (s = second, m = minute, h = hour, day)

to go back and forth on state of buffer in time of x units

## Remote editing (using ssh config)

```vim
:e scp://staging/~/path/to/file.ext
```

*Assuming a Host for 'staging' is set in ~/.ssh/config*

## Delete other buffers except current

```vim
:% bd | e # | bd #
```

where % bd = delete all buffers (creates a new no-name buffer),
  e # = edit previous buffer (since current is no-name),
  bd # = delete previous buffer (no-name)

*spaces are optional*

## Ex mode completion options

<TAB> cycles through options; <C-a> inputs all options.

Example: To delete all \*.js files in buffer list

```vi
:bd js<C-a>
```

*Can use :bwipe to completely remove a buffer*
 

# SHELL

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
du -sh <dir>
```
where s = summary, h = human readable format

Example: Get size of all directories in current directory

```sh
du -sh ./*/
```

## Move new files only (do not overwrite if exists)

```sh
$ mv -vn <source> <target> 
```

where v = verbose, n = no overwrite

## if/else

```sh
if [ <test> ]; then <do something>; fi
```

## for loop

```sh
for <variable> in <list>; do <command>; done
```

Example: Add all dot files to gitignore
```sh
for file in .*; do echo $file >> .gitignore; done
```

## Script strict mode

```sh
#!/bin/bash
set -euo pipefail
IFS=$'\n\t'
```

[http://redsymbol.net/articles/unofficial-bash-strict-mode/](http://redsymbol.net/articles/unofficial-bash-strict-mode/)

## Find command

```sh
find <path> [-type | -size] -name "regex" [-exec <another cmd> | -delete]
```

Example: find and delete all dot files in current directory

```sh
find . -name ".*" -delete
```


# NODE/JS

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


# ADB

## Connect wirelessly

1. Connect adb with cable
2. `adb tcpip 5555`
3. `adb connect <phone-ip>:5555`

## Push new files only

```sh
adb push --sync <source> <target>
```


# WRITING

## Rule of English adjective order

The rule is that multiple adjectives are always ranked accordingly: opinion, size, age, shape, colour, origin, material, purpose

## A good video on writing

https://youtu.be/vtIzMaLkCaM
