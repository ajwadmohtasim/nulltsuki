---
title: Final
draft:
tags:
  - DatabaseManagementSystem
---
# DBMS Theory

## **Chapter-1**
### “Using database can overcome the drawbacks of file system to store data”- justify you opinion.
> **Ans:** Transitioning from a file system to a Database Management System (DBMS) is essential because file systems lack the mechanisms to ensure data reliability and safety. DBMS justifies its use by solving the following critical problems:
> 1. **Ensuring Atomicity of Updates** File systems cannot guarantee that complex updates happen correctly. If a system crashes during a fund transfer, data might be left in a broken state (e.g., money deducted but not credited). A DBMS guarantees atomicity, meaning a transaction is treated as a single unit, it either completes fully or not at all, preventing data corruption.
> 2. **Handling Concurrent Access** In file systems, if multiple users try to update data simultaneously, they can overwrite each other’s work (e.g., two people withdrawing money at the exact same moment). DBMSs use concurrency control mechanisms to manage simultaneous access, ensuring data remains accurate even with many users.
> 3. **Reducing Redundancy and Inconsistency** File systems encourage duplicating data across different files. This leads to redundancy and eventually inconsistency (e.g., a student’s address is updated in one file but not another). A DBMS centralizes data storage, ensuring that any update is instantly reflected across the entire system.
> 4. **Enforcing Integrity and Security** File systems bury data rules (like “balance > 0”) inside program code, making them hard to change. A DBMS enforces these integrity constraints globally. Additionally, while file systems often give “all-or-nothing” access, a DBMS provides granular security, allowing specific users to access only the data they need.
### Levels of Abstraction
> 1. Physical Level : Describes how a record is stored.
> 2. Logical Level : The conceptual schema describes the design of a database.
> 3. View Level : Hides unrelated details from the user. 
### Architecture of DBMS system (view of data)
> ![[archi_dbms.png | 500 center]]
### Difference Between Instances and Schemes
> Schema is the logical structure of the database. There's the physical level and the logical level. Instance is the actual content of the database at any particular point in time.
### Types of Data Model
> 1. Relational Model
> 2. ER data Model
> 3. Object-based Data Model
> 4. Semi-structured data model (XML)
> 5. Network Model
> 6. Hierarchical Model
### Query Processing
> ![[Query Processing.png | 500 center]]
### Database Architecture - Centralized, Client-server, Parallel, Distributed. 
> **Ans:** **Database architecture** defines how a database system is organized and accessed.
> 
> A **centralized architecture** stores the entire database on a single computer. All users access this central system, which is easy to manage but has low scalability and fails completely if the central system goes down.
> 
> In a **client–server architecture**, the database is stored on a server and users access it through client machines. The client handles the interface, while the server processes database requests, making the system more efficient and scalable than a centralized one.
> 
> A **parallel database architecture** uses multiple processors and disks to process queries at the same time. This improves performance and is mainly used for large databases and high-speed data processing.
> A **distributed database architecture** stores data across multiple locations connected by a network. It provides better availability and reliability but is more complex to manage due to coordination and consistency issues.
## Chapter-(2-4)
### Types of keys : super key, candidate key, foreign key, primary key
> **Ans:** **Types of Keys (minimal):**
> - **Super Key:** Attribute(s) that uniquely identify a row.
> - **Candidate Key:** Minimal super key.
> - **Primary Key:** Chosen candidate key.
> - **Foreign Key:** References primary key of another table.
### What is materialized view? how is it different from non-materialized view?
> **Ans:** A **materialized view** is a database object that stores the actual result of a query physically on the disk, much like a standard table. Instead of running the underlying query every time, the database computes the result once (or periodically) and saves it. The fundamental difference lies in **when** the computation happens and **where** the data lives.
> 
> - **Non-Materialized View (Standard View):** This is a “virtual” table. It stores only the SQL query definition, not the data. Every time you query a standard view, the database engine executes the underlying query in real-time against the source tables.
> - **Materialized View:** This is a “physical” copy. It executes the query ahead of time and stores the output. When you query it, the database reads the stored output directly, skipping the complex processing (joins, aggregations) required to generate it.

1. Explain cascading actions in a referential integrity
2. Explain Authorization privileges 

**Ch-7**
1. Types of Attributes
2. Redundant attributes with example
3. Mapping Cardinality Constraints
4. Participation of an Entity set inn a relation
5. Explain Weak Entity
6. Explain Specialization and Generalization (Design Constraints)
7. Aggregation short note


**Ch-11**
1. Ordered index, Primary/Clustering index, Secondary index
2. Dense Index
3. Sparse Index
4. Multilevel Index
### Write B, B*, B+ Tree properties

## **B-Tree (Order M)**

- Each node has **≤ M children**
    
- Every **non-root, non-leaf** node has **≥ ⌊(2M−2)/3⌋ + 1 children**
    
- **Root** has **≥ 2** children (if not single node) and **≤ 2⌊(2M−2)/3⌋ + 1**
    
- **All leaf nodes** are at the **same level**
    
- Non-leaf node with **k children → k−1 records**
    
- Leaf node contains **⌊(2M−2)/3⌋ to (M−1) records**
    

---

## **B⁺-Tree (Order M)**

- **Root** has **0, 2, or ⌈M/2⌉ to M children**
    
- Every **non-root internal node** has **⌈M/2⌉ to M children**
    
- **All leaf nodes** are at the **same level**
    
- Internal node with **k children → k−1 keys**
    
- **Leaf nodes store data** and are **linked sequentially**
    

---

**One-line difference:**

- **B-tree:** records stored in **all nodes**
    
- **B⁺-tree:** records stored **only in leaf nodes**, optimized for range queries


**Ch-8**
1. Explain Lossy and Lossless Decomposition
2. Explain Functional Dependencies
3. Goals of Normalization
4. Explain 1NF, 3NF and BCNF
5. BCNF and Dependency preservation
6. Design goals for a relational database

## Chapter - 14
### Explain ACID properties
> **Ans:** **Transaction** is a unit of program execution within a database. It is delimited by statements or function calls such as **_BEGIN TRANSACTION_** and **_END TRANSACTION_**. A transaction executes either entirely or not at all. If a transaction fails, any changes made to the database are undone. This property is called **atomicity** — _all or nothing_.
> 
> A single SQL statement may involve multiple accesses to the database, and the database system must ensure that transactions operate correctly without interference from other concurrently executing transactions. This property is called **isolation**. (For a formal explanation - for every concurrently executing pair of transactions $T_i$ and $T_j$ , each transactions should be unaware of each other and it would appear to each of them that the other either started before they started or after they finished.)
> 
> A transaction must preserve database **consistency** and so, it must retain the data integrity constraint. If a data arrives as an illegal state, it's the programmer's duty to handle it delinquently and the transaction should result in an error.
> 
> Systems may crash (due to software or hardware failure) and it may forget about a transaction, but all transactions should be permanent when they're committed and must persist across crashes, we call this property as it's **durability**.
> 
### Show Transaction state with diagram
> ![[TransactionStateDiagram.png | 350 center]]
> A simple abstract transaction model has the following states:
> 1. **Active** : Initial State while executing.
> 2. **Partially Committed** : Statements have been executed, pre-stage before 'committed'.
> 3. **Failed** : When the normal execution can no longer proceed
> 4. **Aborted** : After failed state - rollback of the transaction and database changes.
> 5. **Committed** - successful completion.
### What is Schedule?
**Ans:** A sequences of instructions that specify the chronological orders in which instructions of concurrent transactions are executed.

1. Implementation of Shadow-database scheme
2. Explain Serializability and Conflict Serializability
3. Recoverability Explain
4. Levels of Consistency in SQL
