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
    ssh-copy-id  -i ~/.ssh/<key-name>.pub <username>@<hostname>
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

  - May change default port

  - Reload ssh daemon via systemctl `sudo systemctl reload sshd`

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
