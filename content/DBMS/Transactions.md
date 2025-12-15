---
title: Transactions
draft:
tags:
  - DatabaseManagementSystem
---
## <b><u>The General Idea</u></b>
**Transaction** is a unit of program execution within a database. It is delimited by statements or function calls such as **_BEGIN TRANSACTION_** and **_END TRANSACTION_**. A transaction executes either entirely or not at all. If a transaction fails, any changes made to the database are undone. This property is called **atomicity** — _all or nothing_.

A single SQL statement may involve multiple accesses to the database, and the database system must ensure that transactions operate correctly without interference from other concurrently executing transactions. This property is called **isolation**. (For a formal explanation - for every concurrently executing pair of transactions $T_i$ and $T_j$ , each transactions should be unaware of each other and it would appear to each of them that the other either started before they started or after they finished.)

A transaction must preserve database **consistency** and so, it must retain the data integrity constraint. If a data arrives as an illegal state, it's the programmer's duty to handle it delinquently and the transaction should result in an error.

Systems may crash (due to software or hardware failure) and it may forget about a transaction, but all transactions should be permanent when they're committed and must persist across crashes, we call this property as it's **durability**.

These 4 properties are required to maintain a database system. We may refer this to as the **ACID Properties**.

We may demonstrate this with an example. Let $T_i$ be a transaction that transfers 50 from account A to account B. It can be defined as:
$$
\begin{aligned}
\text{T}_{i}: \;& \text{read}(A); \\
           & A := A - 50; \\
           & \text{write}(A); \\
           & \text{read}(B); \\
           & B := B + 50; \\
           & \text{write}(B);
\end{aligned}
$$
Here, we may consider accounts A and B have 1000 and 2000 respectively and based on the above expressions, we take $50 from A and transfer it to B. 

>The terms **read()** and **write()** are Transaction operations. **read()** transfers the data item $X$ from database $\rightarrow$ a variable. **write()** will transfer the variable $X$ from the main-memory buffer (RAM) $\rightarrow$  database.

## Transaction State
![[TransactionStateDiagram.png | 500 center]]
A simple abstract transaction model has the following states:
1. **Active** : Initial State while executing.
2. **Partially Committed** : Statements have been executed, pre-stage before 'committed'.
3. **Failed** : When the normal execution can no longer proceed
4. **Aborted** : After failed state - rollback of the transaction and database changes.
5. **Committed** - successful completion.

A transaction is said to have **terminated** if it either has committed / aborted. Although we cannot undo a effect of a committed transaction, if a undo is a must required - the only way to achieve this is by a **compensating transaction**. For example - if a 20 is added to account, a compensating transaction would deduct a 20 from the account. Not the ideal way to handle this and it's not the responsibility of the database system to be executing such actions.

It is also to be noted that, when a transaction enters a failed state, such transaction must be rolled back (Aborted state). The system has two options during this time : 
1. It may **restart** the transaction (only if it was aborted because of hardware / software error and not the internal logic.)
2. **Kill** the transaction (usually it's the result of internal logical error. Needs rewriting.)

## Concurrent Executions
