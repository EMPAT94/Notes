                                          _
                                ___  ___ | |__
                               / __|/ __|| '_ \
                               \__ \\__ \| | | |
                               |___/|___/|_| |_|

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
