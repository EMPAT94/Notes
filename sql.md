# SQL

## [Postgres](./postgresql.md)

## Sqlite3

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
