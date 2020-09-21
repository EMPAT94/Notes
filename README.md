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
du -sh dir
```
where s = summary, h = human readable format

_Alternatively, `./*/` gives sizes of all directories_

## Connect ADB wirelessly

1. Connect adb with cable
2. `adb tcpip 5555`
3. `adb connect <phone-ip>:5555`

## ADB push new files only

```sh
adb push --sync <source> <target>
```

## Move new files only (do not overwrite if exists)

```sh
mv -vn <source> <target> where v = verbose, n = no overwrite
```

## Shell if/else

```sh
if [ <test> ]; then <do something>; fi
```

## Shell for loop

```sh
for <variable> in <list>; do <command>; done
```

Example
```sh
for file in .*; do echo $file >> .gitignore; done
```

## Vim redirect output of Ex commands to register

1. `:redir @a`
2. `:<commands>`
3. `:redir END`
4. `"ap`

## Vim run bash (or any shell) commands from buffer

```
:%!bash
```

## Vim convert textfile to pdf (via ps) using inbuilt utils macos

```sh
vim filename.txt -c "hardcopy > filename.ps | q"; pstopdf filename.ps
```

*pstopdf may be names ps2pdf on other OSes*

## Rule of English adjective order

The rule is that multiple adjectives are always ranked accordingly: opinion, size, age, shape, colour, origin, material, purpose

## Node make a dynamic chain of promises

```javascript
arr.reduce((c, d) => c.then(() => fn(d)), Promise.resolve()).catch(error);
```

This converts 

```javascript
const arr = [d1, d2, d3, ..., dn];

function fn(d) {
  return new Promise((res, rej) => { ...; res() });
}
```

Into

```javascript
Promise.resolve().then(() => fn(d1)).then(() => fn(d2)).then(() => fn(d3))...then(() => fn(dn)).catch(error)
```
