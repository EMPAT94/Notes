## Mount external ntfs hdd on macos

1. `brew cask install osxfuse`
2. Reboot
3. `brew install ntfs-3g`
4. Connect hdd
5. `mkdir ~/NTFS`
6. `diskutil list` (check MS drive num eg disk2s1)
7. `sudo umount /dev/disk2s1`
8. `sudo /usr/local/bin/ntfs-3g /dev/disk2s1 ~/NTFS -olocal -oallow_other`

## Check size of a directory dir

`du -sh dir` where s = summary, h = human readable format

_Alternatively, `./*/` gives sizes of all directories_

## Connect ADB wirelessly

1. Connect adb with cable
2. `adb tcpip 5555`
3. `adb connect <phone-ip>:5555`

## Vim redirect output of Ex commands to register

1. :redir @a
2. :<commands>
3. :redir END
4. "ap

## Vim run bash (or any shell) commands from buffer

`:%!bash`

## Rule of English adjective order

The rule is that multiple adjectives are always ranked accordingly: opinion, size, age, shape, colour, origin, material, purpose
