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
