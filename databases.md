# Databases

## Resources

- [Awesome Databases Collection Github](https://github.com/pingcap/awesome-database-learning)

## RDBMS Notes

### Terminology

- Tables - Collection of entities

- Columns - Single Attribute

- Rows - Single Entity (Record)

### Normalization

- 1st Form

  - Must have a Primary key
  - No repetition of column data
  - No multivalue attributes

- 2st Form

  - No repetition of row data
  - All keys in a table depend on primary key
  - Each table is one logical unit

- 3rd Form

  - No dependencies in between columns of same table
  - No derived values stored

- Goes all the way till 6th Normal Form (theoretically)

### Denormalization

### Multiplicity (Foreign Relations)

- One to One

- One to Many

  - Key stored in "Many" table

- Many to Many

  - Requires extra table to hold relations (junction table)

---

## Database Implementations

- [Sqlite](./sqlite.md)

- [Postgres](./postgresql.md)

- MySQL
- VoltDB
- Scylla
- Redis
- MongoDB
- Realm
- Neo4j
- ArrangoDB
- CouchDB
- IndexDB
