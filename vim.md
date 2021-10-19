#### Redirect output of Ex commands to register

1. `:redir @a`
2. `:__commands__`
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

```vi
:earlier __time__
:later __time__
```

where **time** = x(s|m|h|d) (s = second, m = minute, h = hour, day)

to go back and forth on state of buffer in time of x units

#### Remote editing (using ssh config)

```vi
:e scp://staging/~/path/to/file.ext
```

_Assuming a Host for 'staging' is set in ~/.ssh/config_

#### Delete other buffers except current

```vi
:% bd | e # | bd #
```

where

- % bd = delete all buffers (creates a new no-name buffer),
- e # = edit previous buffer (since current is no-name),
- bd # = delete previous buffer (no-name)

_spaces are optional_

#### Ex mode completion options

TAB cycles through options; Ctrl-a inputs all options.

Example: To delete all \*.js files in buffer list

```vi
:bd js Ctrl-a
```

_Can use :bwipeout to completely remove a buffer_

