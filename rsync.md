# rsync (Remote Sync)

From `man rsync`:

> Rsync is a fast and extraordinarily versatile file copying tool. It can copy locally, to/from another host over any remote shell, or to/from a remote rsync daemon.

> It is famous for its delta-transfer algorithm, which reduces the amount of data sent over the network by sending only the differences between the source files and the existing files in the destination.

- Basic Usage:

  ```sh
  rsync [options] <src> <dest>
  ```

  src/dest can be local or remote, but not both remote!

- Important options:

  - --help, -h
  - --verbose, -v
  - --quiet, -q
  - --dry-run, -n
  - --recursive, -r
  - --archive, -a (recursive and preserve file metadata)
  - --backup, -b (preexisting dest files renamed)
  - --backup-dir=DIR (store backups in different dir on dest)
  - --compress, -z
  - --delete (remove dest files not in src)
  - --exclude=PATTERN
  - --include=PATTERN
  - --partial (keep partially transferred files, fill on next transfer)
  - --progress
  - --stats
  - -P = --partial + --progress

- Replicate data from folder1 to folder2:

  ```sh
  rsync -avrzP --delete folder1/ folder2
  ```

  - For scripts, remove `-v -P` and use `-q --partial` instead

  Note the trailing slash; without slash it will put folder1 inside folder2
