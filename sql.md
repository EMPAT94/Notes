# SQL

## [Postgres](./postgresql.md)

## Sqlite3

- Show all tables

  ```sql
  .tables
  ```

- Create table (don't forget semicolon at end)

  ```sql
  create table [if not exists] <name> ( ... );
  ```

- Describe table

  ```sql
  .schema <table>
  ```

  - NOTE: no `;` at the end

  ```sql
  .header on
  .mode column
  pragma table_info("<table>")
  ```

- Insert Query

  ```sql
  insert into <table> (<col1>, <col2>, ...) values (<v1>, <v2>, ...), (<vk>, <vl>, ...);
  ```

- Update Query

  ```sql
  update <table> set <key> = <val>, ... [from select ...] where <key> = <val>;
  ```

- Distinct Query

  ```sql
  select distinct col1, col2 from table;
  ```

- Delete Query

  ```sql
  delete from table where col = val;
  ```

- Count Query

  ```sql
  select count(*) from table;
  ```

## MySQL

## VoltDB

## Scylla
