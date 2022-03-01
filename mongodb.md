# mongodb

- Mongo Connection commands <conn>

`<command> -h host -p port`

- Mongo Authentication commands <auth>

`<command> <conn> -u user -p pass --authenticationDatabase admin`

- Mongo backup/restore for json files

`mongoimport <conn> <auth> --type json --db db_name --collection coll_name --file ./path/to/ip_file.json`

  - Don't forget to add `--jsonArray` if file is in that form

`mongoexport <conn> <auth> -db db_name --collection coll_name -o ./path/to/op_file.json`

- Mongo backup/restore for bson files with meta data (created under ./dump/<db_name>)

`mongodump <conn> <auth> --db db_name`

`mongorestore <conn> <auth> --db db_name ./path/to/dump`

- Mongo auth

  1. At the mongo command line, set the administrator:

  ```sh
  use admin;
  db.addUser('admin','123456');
  ```

  2. Shutdown the server and exit

  ```sh
  db.shutdownServer();
  exit
  ```

  3. Restart mongod with --auth

  `$ sudo ./mongodb/bin/mongod --auth --dbpath /mnt/db/`

  4.  Run mongo again in 2 ways:

    - run mongo first then login:

    ```sh
    $ ./mongodb/bin/mongo localhost:27017
    use admin
    db.auth('admin','123456');
    ```

    - run & login to mongo in command line.

    `$ ./mongodb/bin/mongo localhost:27017/admin -u admin -p 123456`

    <https://docs.mongodb.com/manual/core/authentication/>
