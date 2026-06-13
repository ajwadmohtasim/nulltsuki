---
title: Intermediate SQL
draft:
tags:
  - DatabaseManagementSystem
---
## JOIN operation
**JOIN** operations combine rows from two or more tables through the related column between them. Formally - it's a cartesian product which requires tuples in relation to match under some condition. 
It's essential because it can help us reassemble data from multiple tables ([[Normalization|Data Normalization]]), complex queries while maintaining data integrity. 

Some widely used JOIN types are: 
1. [[#Inner JOIN and Natural JOIN]]
2. [[#Left Outer JOIN]]
3. [[#Right Outer JOIN]]
4. [[#Full Outer JOIN]]

### Inner JOIN and Natural JOIN
It only returns rows that have matching values in **both** tables.
```
SELECT * FROM table1
INNER JOIN table2
ON table1.col = table2.col;
```

We also have **NATURAL JOIN**, which automatically matches and combines rows from two tables based common names and data types. The syntax is fairly simple as well -
```
SELECT * FROM table1 NATURAL JOIN table2;
```

> **So, what's the difference between inner join and natural join?**
> An **INNER JOIN** combines rows from two tables only when a specified join condition is satisfied. In contrast, a **NATURAL JOIN** automatically performs an inner join by matching all columns that have the same names in both tables, without requiring an explicit join condition

Inner Join can be also written as:
```
SELECT * FROM table1 NATURAL INNER JOIN table2;
```
This will implicitly determine our common attributes.

*For the rest of the JOINs we shall use NATURAL variation for simplicity.*
### Left Outer JOIN
Here, the contents of the left table is returned regardless of the condition. But it will include the matching contents from the right table. Essentially it ensures, left table corresponds with right table and NULL values are assigned where there's no match.
```
SELECT * FROM table1 NATURAL LEFT JOIN table2;
```
### Right Outer JOIN
Vice versa of **OUTER JOIN**. Corresponds with left table while keeping all records of the right table.
```
SELECT * FROM table1 NATURAL RIGHT JOIN table2;
```
### Full Outer JOIN
This will return both tables but will have their corresponding tables joined. Rest unmatched columns will have the NULLs. 

```
SELECT * FROM table1 NATURAL FULL JOIN table2;
```

## VIEWS

## Authorization 

Authorization defines **what actions a user is allowed to perform** on database objects.
#### A. Authorization on Database Data
These control access to the **contents** of relations (tables/views):
- **Read** – Allows reading/querying data, but **no modification**.
- **Insert** – Allows insertion of **new tuples**, but no change to existing ones.
- **Update** – Allows **modification** of existing data, but **no deletion**.
- **Delete** – Allows **removal** of tuples from a relation.
#### B. Authorization on Database Schema
These control changes to the **structure** of the database:
- **Index** – Allows creation and deletion of indices.
- **Resources** – Allows creation of new relations (tables).
- **Alteration** – Allows adding or removing attributes (columns).
- **Drop** – Allows deletion of relations.

### GRANT
The `GRANT` statement is used to **confer privileges**.
```sql
grant <privilege list>
on <relation name | view name>
to <user list>;
```
### User List Can Be
- A **specific user-id**
- **public** → grants the privilege to **all users**
- A **role**

**Important Rules**
- Granting a privilege on a **view** does **not** automatically grant privileges on the underlying tables.
- The **grantor must already possess** the privilege (or be the DBA).

### Privileges in SQL

| Privilege        | Meaning                                      |
| ---------------- | -------------------------------------------- |
| `select`         | Read/query access to a table or view         |
| `insert`         | Ability to insert new tuples                 |
| `update`         | Ability to modify existing tuples            |
| `delete`         | Ability to delete tuples                     |
| `all privileges` | Shortcut for granting all allowed privileges |
```sql
grant select on instructor to U1, U2, U3;
```
This allows users **U1, U2, and U3** to read data from the `instructor` relation.
### Revoking Authorization (REVOKE)

The `REVOKE` statement is used to **remove privileges**.

### General Syntax

```sql
revoke <privilege list>
on <relation name | view name>
from <user list>;
```

### Example

```sql
revoke select on branch from U1, U2, U3;
```

### Key Points

- Using `all` revokes **all privileges** held by the user.
    
- If `public` is revoked, **all users lose the privilege**, except those who were granted it explicitly.
    
- If a privilege was granted **multiple times** by different users, revoking one grant may **not remove** the privilege.
    
- **Cascading effect**: all privileges that **depend** on the revoked privilege are also revoked.
    

---

## 5. Roles in SQL

Roles are used to **group privileges** and simplify authorization management.

### Creating and Granting Roles

```sql
create role instructor;
grant instructor to Amit;
```

### Granting Privileges to Roles

```sql
grant select on takes to instructor;
```

### Role Hierarchy (Inheritance)

Roles can be granted to other roles.

```sql
create role teaching_assistant;
grant teaching_assistant to instructor;
```

Here, **instructor inherits all privileges** of `teaching_assistant`.

### Chain of Roles

```sql
create role dean;
grant instructor to dean;
grant dean to Satoshi;
```

Satoshi now indirectly receives **all privileges** of `instructor`.

---

## 6. Authorization on Views
Views provide **controlled access** to data.
### Example View

```sql
create view geo_instructor as
select *
from instructor
where dept_name = 'Geology';
```

### Granting Access to a View

```sql
grant select on geo_instructor to geo_staff;
```
