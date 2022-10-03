# Sqlite 3

## Cli shell commands

- Help

  ```sql
  .help
  ```

- Some useful commands:

  - Open a new connection `.open`
  - List of databases attached `.databases`
  - List of tables present `.tables`
  - Read an sql file `.read <file>`
  - Describe a table `.schema <table>` `pragma table_info("<table>")`
  - Display options `.header on` `.mode column`

- Create table (don't forget semicolon at end)

  ```sql
  create table [if not exists] <name> ( ... );
  ```

- Storage Classes (NOT Data Types!)

  - Null
  - Integer
  - Real
  - Text
  - Blob

- Foreign key (inside create table)

  ```sql
  foreign key ("column_id") references "foreign_table"("foreign_id")
  ```

- Insert Query

  ```sql
  insert into <table> (<col1>, <col2>, ...) values (<v1>, <v2>, ...), (<vk>, <vl>, ...);
  ```

- Update Query

  ```sql
  update <table> set <key> = <val>, ... [from select ...] [where <key> = <val>];
  ```

- Delete Query

  ```sql
  delete from <table> [where <col> = <val>];
  ```

- Select Query

  ```sql
  select [<col1>, <col2> | *]
    from <table1>, [<table2> ...]
    [where <cond1> [<cond2>]]
    [order by <colx> [desc | asc] ...]
    [group by <coly>]
  ```

  - Distinct Query

    ```sql
    select distinct <col1>, <col2> from <table>;
    ```

  - Count Query

    ```sql
    select count(*) from table;
    ```

- Backup Sqlite3 (non-interactively)

  ```shell
  $ sqlite3 <name>.db ".backup '<name>.backup.db'"
  ```

  - Alternatively, compress it with `xz`

    ```shell
    $ xz --compress --threads=0 --quiet <name>.backup.db
    ```
