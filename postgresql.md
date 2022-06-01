# Postgresql

- [Official site](https://www.postgresql.org)

- [Official docs](https://www.postgresql.org/docs)

- [Tutorial](https://www.postgresqltutorial.com/)

- [Quick Reference](https://zaiste.net/posts/postgresql-primer-for-busy-people/)

## Notes

- Executing psql

  ```sh
  psql -U <username> -d <database>
  ```

- Backing up postgres (use `pg_dumpall` for... all)

  ```sh
  pg_dump -U username dbname | xz -4 > /tmp/postgres_dump_$(date +"%Y-%m-%d_%H_%M").sql.xz
  ```

- Restoring from dump

  ```sh
  xz -d < /tmp/postgres_dump_<date>.sql.xz | <docker exec> psql -U  <user> -d <db>
  ```

  - If restoring a particularly big dump or throwing errors, `docker cp` it inside container and restore from within.

- To run above commands inside docker container (denoted by `<docker exec>`)

  ```sh
  docker exec -it <postgres-container-name> <command>
  ```
