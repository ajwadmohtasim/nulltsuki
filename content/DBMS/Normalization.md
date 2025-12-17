---
title: Normalization
draft:
tags:
  - DatabaseManagementSystem
---
## Normalization
**Normalization** is a database design process that organizes data into specific table structures. This optimizes tables based on a set of rules that specifies the organization. 

Let's recall the [[University Schema]]:
> **classroom**(<u>building</u>, <u>room number</u>, capacity) \
> **department**(<u>dept name</u>, building, budget) \
> **course**(<u>course id</u>, title, dept name, credits) \
> **instructor**(<u>ID</u>, name, dept name, salary) \
> **section**(<u>course id</u>, <u>sec id</u>, <u>semester</u>, <u>year</u>, building, room number, time slot id) \
> **teaches**(<u>ID</u>, <u>course id</u>, <u>sec id</u>, <u>semester</u>, <u>year</u>) \
> **student**(<u>ID</u>, name, dept name, tot cred) \ 
> **takes**(<u>ID</u>, <u>course id</u>, <u>sec id</u>, <u>semester</u>, <u>year</u>, grade) \
> **advisor**(<u>s ID</u>, i ID) \
> **time slot**(<u>time slot id</u>, <u>day</u>, <u>start time</u>, end time) \
> **prereq**(<u>course id</u>, <u>prereq id</u>) \

Consider a combined **instructor** and **department** table. We get:
![[inst_dept.png | 500 center]]
We see a lot of repetitions here. This makes things complicated on the basic operations. For example - If we would like to insert a New Department with no instructor we would have to use a NULL values. A deletion of a instructor may cause an entire department to be unintentionally deleted. And lastly, if would like to update a instructor's salary, we would have to update the $n$ rows wherever that's instructor is recorded. 

So, the only way we could avoid this repetitions is when we decompose it into separate table. However, not all **decomposition** are good. See this:
![[lossy_decomposition.png | 550 center]]

This is a lossy decomposition - an incorrectly mix of data values that should've been accurate. Natural Join is just a cartesian product of common attributes but as our decomposition structure is lossy, we result in this situation. We require **lossless decompositions**.
## Lossless Decomposition
A lossless decomposition is formally stated by:
$$\Pi_{R_{1}}(r) \bowtie \Pi_{R_{2}}(r) = r$$
This is only possible when at least one of these [[#Functional Dependency]] must hold in $F^+$:
- $R_1 \cap R_2 \rightarrow R_1$ (intersection determines first relation)
- $R_1 \cap R_2 \rightarrow R_2$ (intersection determines second relation)

To understand further, we would've to understand - what is Functional Dependency?
## Functional Dependency
A functional dependency occurs when the value of one attribute (or a set of attributes) uniquely determines the value of another attribute. This relationship is denoted as:
$$ X \rightarrow Y$$
For each unique value of $X$, there exists one corresponding values of $Y$. A good example would be $\text{studentID} \rightarrow \text{StudentName}$.

**Some Properties of Functional Dependencies**
- **Reflexivity**: If $( Y \subseteq X )$, then $( X \rightarrow Y )$.
- **Augmentation**: If $( X \rightarrow Y )$, then $( XZ \rightarrow YZ )$.
- **Transitivity**: If $( X \rightarrow Y )$ and $( Y \rightarrow Z )$, then $( X \rightarrow Z )$.
- **Union**: If $( X \rightarrow Y )$ and $( X \rightarrow Z )$, then $( X \rightarrow YZ )$.
- **Decomposition**: If $( X \rightarrow YZ )$, then $( X \rightarrow Y )$ and $( X \rightarrow Z )$.
- **Pseudo-transitivity**: If $( X \rightarrow Y )$ and $( WY \rightarrow Z )$, then $( WX \rightarrow Z )$.
- **Composition**: If $( X \rightarrow Y )$ and $( Z \rightarrow W )$, then $( XZ \rightarrow YW )$.

## Closure
The closure of an attribute set $( X )$ (denoted $( X^+ )$) is the set of all attributes that can be functionally determined from $( X )$ using given FDs. This would be important to determine the Candidate keys from given FDs. 

>[!Example]
>Consider the following Relation **R**$(A,B,C,D,E,H)$ and the FDs: \
>$$A \rightarrow B, A \rightarrow C, CD \rightarrow E, B \rightarrow D, E \rightarrow A$$
>
>We need to find it's candidate keys. \
$B,C,E,D,A$ can all be derived. But $H$ is missing. So every candidate key must include $H$. \
$(AE)^+ = \{A,E,B,C,D\} \neq R \;\Rightarrow\; \text{not a candidate key}$\
We do this following the FDs. Note that $AE$ can derive itself. If our final result is not equal to R it's not a candidate key. It's also should be remembered that, the candidate keys needs to be minimal. Otherwise it's a super key. Following this process - \
$(AEH)^+ = \{A,B,C,D,E,H\} \;\Rightarrow\; \text{candidate key}$\
$(AEH)^+ = \{A,B,C,D,E,H\} \;\Rightarrow\; \text{candidate key}$\
$(BEH)^+ = \{A,B,C,D,E,H\} \;\Rightarrow\; \text{candidate key}$\
$(BCH)^+ = \{A,B,C,D,H\} \neq R \;\Rightarrow\; \text{not a candidate key}$\
$(DEH)^+ = \{A,B,C,D,E,H\} \;\Rightarrow\; \text{candidate key}$\
$\boxed{\text{Candidate Keys} = \{AEH,\; BEH,\; DEH\}}$


## Normal Forms
**1NF (First Normal Form)**  
A table is in 1NF if it has no multivalued or repeating tuple. Each field must contain atomic (indivisible) values. The base table should contain the primary key, and multivalued attributes must be moved into separate tables.

**2NF (Second Normal Form)**  
A table is in 2NF if it is in 1NF and has no **partial dependency**. All non-prime attributes must be fully functionally dependent on the entire candidate key.
> For example - $XY$ is a candidate key of a table and $Y \rightarrow Z$. So $Z$ is partially dependent on $XY$.

**3NF (Third Normal Form)**  
A table is in 3NF if it is in 2NF and has no transitive dependency. For every FD $( X \rightarrow Y )$, either $( X )$ is a super key or $( Y )$ is a prime attribute.

**BCNF (Boyce–Codd Normal Form)**  
A stronger form of 3NF. For every FD $( X \rightarrow Y )$, $( X )$ must be a candidate key or super key.

>[!example]
> $\text{R}(A,B,C,D,E,F)$ - Check it's Highest Normal Form. \
>  $\text{FD}:AB\rightarrow C,C\rightarrow DE, E\rightarrow F,F\rightarrow A$
>
>**# Step 1: Find all candidate keys.** \
>$AB^+ = \{A,B,C,D,E,F\}$ so our $\text{CK} = \{AB\}$ \
>$FB^+ = \{F,B,A,C,D,E\}$, since $F\rightarrow A$. | $\text{CK} = \{AB,FB\}$ \
>$EB^+ = \{E,B,F,A,C,D\}$, since $E\rightarrow F$. | $\text{CK} = \{AB,FB,EB\}$ \
>$CB^+ = \{C,B,D,E,F,A\}$, since $C\rightarrow DE$ or $C\rightarrow E$. | $\text{CK} = \{AB,FB,EB,CB\}$ \
>
>**# Step 2 : Write all Prime and Non-Prime Attributes:** \
>From $\text{CK}$ we get, \
>$\text{Prime Attributes, PA}=\{A,B,C,E,F\}$ \
>$\text{Non-Prime Attributes, PA}=\{D\}$ 
>$$
>\begin{array}{|c|c|c|c|c|}
> \hline
> \text{FD} & \text{BCNF} & \text{3NF} & \text{2NF} & \text{1NF} \\
> \hline
> AB \to C & \checkmark & \checkmark & \checkmark & \checkmark \\
> C \to DE & \times & \times & \checkmark & \checkmark \\
> E \to F & \times & \times & \checkmark & \checkmark \\
> F \to A & \times & \times & \checkmark & \checkmark \\
> \hline
> \end{array}
>$$
>


**References**
1. 
2. [GFG - FDs](https://www.geeksforgeeks.org/dbms/what-is-functional-dependency-in-dbms/)
3. [IBM - database normalization](https://www.ibm.com/think/topics/database-normalization)
4. [Gate Smashers - Normalization Example](https://youtu.be/4h8VoRnRvnE?si=ONNqtrglrYpAa2AN)
