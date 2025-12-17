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





