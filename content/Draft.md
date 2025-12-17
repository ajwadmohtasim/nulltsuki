---
title: Nulltsuki
draft: true
tags:
---
## Examples

>**Consider the following relation, R used to track appointments, and the Functional Dependencies (FDs) that hold true**: 
>Relation **R** (<u>DoctorID</u>, <u>Date</u>, <u>Time</u>, DocName, DocSalary, PatientID, PatientName, Diagnosis, Fee)
>Functional Dependencies (FDs) holding in R: 
>- DoctorID → DocName, DocSalary
>- PatientID → PatientName 
>- DoctorID, Date, Time → PatientID, Diagnosis, Fee 
>- DoctorID, Date, Time, PatientID → Diagnosis, Fee 
>
>What are the Candidate Keys (CK) of the relation R? Decompose the relation R into a set of smaller relations that must be lossless. Show your final decomposed relations with their attributes and Primary Keys.


# Chapter 8: Relational Database Design

## 1. Introduction to Database Design

Database design involves determining the optimal organization of relations (tables) to minimize redundancy and ensure data integrity. The key challenge is deciding whether to combine or split relations.

---

## 2. Design Alternatives - University Schema

### Complete University Database Schema

```sql
classroom(building, room_number, capacity)
department(dept_name, building, budget)
course(course_id, title, dept_name, credits)
instructor(ID, name, dept_name, salary)
section(course_id, sec_id, semester, year, building, room_number, time_slot_id)
teaches(ID, course_id, sec_id, semester, year)
student(ID, name, dept_name, tot_cred)
takes(ID, course_id, sec_id, semester, year, grade)
advisor(s_ID, i_ID)
time_slot(time_slot_id, day, start_time, end_time)
prereq(course_id, prereq_id)
```

---

## 3. Problems with Larger Schemas

### Example: Combined `inst_dept` Relation

**Schema**: `inst_dept(ID, name, salary, dept_name, building, budget)`

|ID|name|salary|dept_name|building|budget|
|---|---|---|---|---|---|
|22222|Einstein|95000|Physics|Watson|70000|
|12121|Wu|90000|Finance|Painter|120000|
|32343|El Said|60000|History|Painter|50000|
|45565|Katz|75000|Comp. Sci.|Taylor|100000|
|98345|Kim|80000|Elec. Eng.|Taylor|85000|

**Problem**: **Data Redundancy**

- Department information (building, budget) is repeated for each instructor in that department
- If Computer Science has 100 instructors, Taylor and 100000 are stored 100 times
- **Update Anomaly**: Changing the CS budget requires updating 100 rows
- **Insertion Anomaly**: Cannot add a new department without an instructor
- **Deletion Anomaly**: Deleting the last instructor removes department information

---

## 4. Combined Schema Without Repetition

### Example: Combining `sec_class` and `section`

**Original Relations**:

- `sec_class(sec_id, building, room_number)`
- `section(course_id, sec_id, semester, year)`

**Combined Relation**:

- `section(course_id, sec_id, semester, year, building, room_number)`

**Why No Repetition?** Each section has a unique combination of $(course_id, sec_id, semester, year)$, and each section meets in one location. There's a **one-to-one** relationship between sections and classroom assignments.

---

## 5. Decomposition Motivation

### When to Decompose?

Starting with `inst_dept(ID, name, salary, dept_name, building, budget)`:

**Functional Dependency Violation**: $$dept_name \rightarrow building, budget$$

This rule means: "If you know the department name, you can determine its building and budget."

**Problem**: `dept_name` is **not a candidate key** for `inst_dept`, yet it functionally determines some attributes.

**Bad Decomposition Example**:

Starting with: `employee(ID, name, street, city, salary)`

Decomposing into:

- `employee1(ID, name)`
- `employee2(name, street, city, salary)`

---

## 6. Lossy Decomposition

### Example: Employee Decomposition

**Original Relation**:

|ID|name|street|city|salary|
|---|---|---|---|---|
|57766|Kim|Main|Perryridge|75000|
|98776|Kim|North|Hampton|67000|

**After Decomposition**:

**employee1**:

|ID|name|
|---|---|
|57766|Kim|
|98776|Kim|

**employee2**:

|name|street|city|salary|
|---|---|---|---|
|Kim|Main|Perryridge|75000|
|Kim|North|Hampton|67000|

**After Natural Join** (reconstructing):

|ID|name|street|city|salary|
|---|---|---|---|---|
|57766|Kim|Main|Perryridge|75000|
|57766|Kim|North|Hampton|67000|
|98776|Kim|Main|Perryridge|75000|
|98776|Kim|North|Hampton|67000|

**Problem**: We get **4 tuples** instead of the original **2 tuples**! Information is lost - we can't determine which ID goes with which address.

---

## 7. Lossless-Join Decomposition

### Mathematical Definition

For decomposition of $R = (A, B, C)$ into $R_1 = (A, B)$ and $R_2 = (B, C)$:

**Example**:

|A|B|C|
|---|---|---|
|α|1|A|
|β|2|B|

**Projections**:

$\Pi_{A,B}(r)$:

| A   | B   |
| --- | --- |
| α   | 1   |
| β   | 2   |

$\Pi_{B,C}(r)$:

|B|C|
|---|---|
|1|A|
|2|B|

**Join**: $\Pi_A(r) \bowtie \Pi_B(r)$:

|A|B|C|
|---|---|---|
|α|1|A|
|β|2|B|

**Result**: Original relation is preserved! ✓

---

## 8. Conditions for Lossless-Join

For decomposition of $R$ into $R_1$ and $R_2$ to be lossless:

$$r = \Pi_{R1}(r) \bowtie \Pi_{R2}(r)$$

**Sufficient Condition**: At least one of these functional dependencies must hold in $F^+$:

- $R_1 \cap R_2 \rightarrow R_1$ (intersection determines first relation)
- $R_1 \cap R_2 \rightarrow R_2$ (intersection determines second relation)

**Example**:

- $R_1 =$ `instructor(ID, name, dept_name, salary)`
- $R_2 =$ `department(dept_name, building, budget)`
- $R_1 \cap R_2 = {dept\_name}$
- Since $dept\_name \rightarrow building, budget$, we have $R_1 \cap R_2 \rightarrow R_2$ ✓

---

## 9. Functional Dependencies (FDs)

### Definition

A **functional dependency** is a constraint on the set of legal relations.

**Notation**: $\alpha \rightarrow \beta$

**Meaning**: For any two tuples $t_1$ and $t_2$: $$t_1[\alpha] = t_2[\alpha] \Rightarrow t_1[\beta] = t_2[\beta]$$

If two tuples agree on attributes $\alpha$, they must also agree on attributes $\beta$.

### Examples

**Example 1**: Simple FD

|A|B|
|---|---|
|1|4|
|1|5|
|3|7|

- Does $A \rightarrow B$ hold? **NO** (tuples 1 and 2 have same A but different B)
- Does $B \rightarrow A$ hold? **YES** (each B value has unique A value)

**Example 2**: University Database

For `inst_dept(ID, name, salary, dept_name, building, budget)`:

**Functional Dependencies**:

- $ID \rightarrow name, salary, dept_name$ (ID determines instructor info)
- $dept_name \rightarrow building, budget$ (department determines location and budget)
- $ID \rightarrow building$ (by transitivity through dept_name)

**Does NOT Hold**:

- $dept_name \rightarrow salary$ (different instructors in same department have different salaries)

---

## 10. Keys and Functional Dependencies

### Superkey Definition

$K$ is a **superkey** for relation schema $R$ if and only if: $$K \rightarrow R$$

**Example**: For `instructor(ID, name, dept_name, salary)`:

- ${ID}$ is a superkey because $ID \rightarrow ID, name, dept_name, salary$
- ${ID, name}$ is also a superkey (but redundant)

### Candidate Key Definition

$K$ is a **candidate key** if:

1. $K \rightarrow R$ (it's a superkey)
2. For no $\alpha \subset K$, $\alpha \rightarrow R$ (it's minimal)

**Example**: For the same instructor relation:

- ${ID}$ is a candidate key
- ${ID, name}$ is NOT a candidate key (not minimal - we can remove name)

---

## 11. Using Functional Dependencies

### Testing Relations

**Purpose**: Determine if a relation instance $r$ satisfies a set $F$ of functional dependencies.

**Example**:

Given $F = {A \rightarrow B, B \rightarrow C}$ and relation:

|A|B|C|
|---|---|---|
|1|2|3|
|1|2|3|
|4|5|6|

**Testing $A \rightarrow B$**:

- Rows 1,2: $A=1 \Rightarrow B=2$ ✓
- Row 3: $A=4 \Rightarrow B=5$ ✓
- **Holds**: ✓

**Important Note**: A specific instance might satisfy an FD by chance, even if it doesn't hold for all legal instances.

### Specifying Constraints

FDs specify which relations are legal. We say $F$ **holds on** $R$ if all legal relations on $R$ satisfy $F$.

---

## 12. Trivial Functional Dependencies

### Definition

A functional dependency $\alpha \rightarrow \beta$ is **trivial** if it is satisfied by **all instances** of any relation.

**Rule**: $\alpha \rightarrow \beta$ is trivial if $\beta \subseteq \alpha$

### Examples

**Trivial FDs**:

- $ID, name \rightarrow ID$ (trivial because $ID \subseteq {ID, name}$)
- $name \rightarrow name$ (always true)
- $A, B, C \rightarrow A, B$ (trivial)

**Non-trivial FDs**:

- $ID \rightarrow name$ (not trivial)
- $dept_name \rightarrow building$ (not trivial)

---

## 13. Closure of Functional Dependencies

### Definition

Given a set $F$ of functional dependencies, the **closure** $F^+$ is the set of **all** functional dependencies that can be logically implied from $F$.

### Example

**Given**: $$F = {A \rightarrow B, B \rightarrow C}$$

**Derived FDs** (some members of $F^+$):

- $A \rightarrow C$ (by transitivity)
- $A \rightarrow A$ (by reflexivity - trivial)
- $A \rightarrow B, C$ (by union)
- $A \rightarrow A, B$ (by augmentation)

**Mathematical Notation**: $F^+$ is a superset of $F$: $F \subseteq F^+$

---

## 14. Armstrong's Axioms

### The Three Fundamental Rules

These rules are **sound** (generate only true FDs) and **complete** (generate all true FDs):

1. **Reflexivity**: If $\beta \subseteq \alpha$, then $\alpha \rightarrow \beta$
    
    _Example_: ${A, B, C} \rightarrow {A, B}$
    
2. **Augmentation**: If $\alpha \rightarrow \beta$, then $\gamma\alpha \rightarrow \gamma\beta$
    
    _Example_: If $A \rightarrow B$, then $A C \rightarrow B C$
    
3. **Transitivity**: If $\alpha \rightarrow \beta$ and $\beta \rightarrow \gamma$, then $\alpha \rightarrow \gamma$
    
    _Example_: If $A \rightarrow B$ and $B \rightarrow C$, then $A \rightarrow C$
    

---

## 15. Additional Inference Rules

These can be derived from Armstrong's Axioms:

### Union Rule

If $\alpha \rightarrow \beta$ and $\alpha \rightarrow \gamma$, then $\alpha \rightarrow \beta\gamma$

**Example**:

- $A \rightarrow B$
- $A \rightarrow C$
- Therefore: $A \rightarrow B, C$

### Decomposition Rule

If $\alpha \rightarrow \beta\gamma$, then $\alpha \rightarrow \beta$ and $\alpha \rightarrow \gamma$

**Example**:

- $A \rightarrow B, C$
- Therefore: $A \rightarrow B$ and $A \rightarrow C$

### Pseudotransitivity Rule

If $\alpha \rightarrow \beta$ and $\gamma\beta \rightarrow \delta$, then $\alpha\gamma \rightarrow \delta$

**Example**:

- $A \rightarrow B$
- $C B \rightarrow D$
- Therefore: $A C \rightarrow D$

---

## 16. Computing $F^+$ - Example

### Given

$$R = (A, B, C, G, H, I)$$ $$F = {A \rightarrow B, A \rightarrow C, CG \rightarrow H, CG \rightarrow I, B \rightarrow H}$$

### Deriving Members of $F^+$

**Derivation 1**: $A \rightarrow H$

1. $A \rightarrow B$ (given)
2. $B \rightarrow H$ (given)
3. $A \rightarrow H$ (by transitivity)

**Derivation 2**: $AG \rightarrow I$

1. $A \rightarrow C$ (given)
2. $AG \rightarrow CG$ (by augmentation with G)
3. $CG \rightarrow I$ (given)
4. $AG \rightarrow I$ (by transitivity)

**Derivation 3**: $CG \rightarrow HI$

1. $CG \rightarrow I$ (given)
2. $CG \rightarrow CGI$ (by augmentation)
3. $CG \rightarrow H$ (given)
4. $CGI \rightarrow HI$ (by augmentation)
5. $CG \rightarrow HI$ (by transitivity)

---

## 17. Algorithm for Computing $F^+$

### Procedure

```
F⁺ = F
repeat
    for each functional dependency f in F⁺ do
        apply reflexivity and augmentation rules on f
        add resulting FDs to F⁺
    end for
    for each pair f₁, f₂ in F⁺ do
        if f₁ and f₂ can be combined using transitivity then
            add resulting FD to F⁺
        end if
    end for
until F⁺ does not change
```

**Note**: This algorithm is theoretical. In practice, we use **attribute closure** (next section).

---

## 18. Closure of Attribute Sets

### Definition

Given a set of attributes $\alpha$, the **closure** $\alpha^+$ under $F$ is the set of all attributes that are functionally determined by $\alpha$.

### Algorithm

```
result := α
while (changes to result) do
    for each β → γ in F do
        if β ⊆ result then
            result := result ∪ γ
        end if
    end for
end while
```

**Output**: $\alpha^+ = result$

---

## 19. Attribute Closure Example

### Given

$$R = (A, B, C, G, H, I)$$ $$F = {A \rightarrow B, A \rightarrow C, CG \rightarrow H, CG \rightarrow I, B \rightarrow H}$$

### Computing $(AG)^+$

**Step-by-step**:

1. **Initialize**: $result = {A, G}$
    
2. **Iteration 1**:
    
    - Check $A \rightarrow B$: ${A} \subseteq {A, G}$ ✓ → $result = {A, B, G}$
    - Check $A \rightarrow C$: ${A} \subseteq {A, B, G}$ ✓ → $result = {A, B, C, G}$
3. **Iteration 2**:
    
    - Check $CG \rightarrow H$: ${C, G} \subseteq {A, B, C, G}$ ✓ → $result = {A, B, C, G, H}$
4. **Iteration 3**:
    
    - Check $CG \rightarrow I$: ${C, G} \subseteq {A, B, C, G, H}$ ✓ → $result = {A, B, C, G, H, I}$
5. **No more changes**: $(AG)^+ = {A, B, C, G, H, I}$
    

### Is AG a Candidate Key?

**Test 1**: Is AG a superkey?

- $AG \rightarrow R$?
- $(AG)^+ = {A, B, C, G, H, I} = R$ ✓

**Test 2**: Is any subset of AG a superkey?

- Test $A$: $(A)^+ = {A, B, C, H} \neq R$ ✗
- Test $G$: $(G)^+ = {G} \neq R$ ✗

**Conclusion**: AG is a **candidate key** ✓

---

## 20. Uses of Attribute Closure

### 1. Testing for Superkey

To test if $\alpha$ is a superkey:

- Compute $\alpha^+$
- Check if $\alpha^+ = R$

**Example**: Is ${A, B}$ a superkey for $R = (A, B, C, D)$ with $F = {A \rightarrow C, B \rightarrow D}$?

- $(AB)^+ = {A, B, C, D} = R$ ✓
- **Yes**, it's a superkey

### 2. Testing Functional Dependencies

To check if $\alpha \rightarrow \beta$ holds:

- Compute $\alpha^+$
- Check if $\beta \subseteq \alpha^+$

**Example**: Does $A \rightarrow D$ hold with $F = {A \rightarrow B, B \rightarrow C, C \rightarrow D}$?

- $(A)^+ = {A, B, C, D}$
- ${D} \subseteq {A, B, C, D}$ ✓
- **Yes**, it holds

### 3. Computing $F^+$

For each subset $\gamma \subseteq R$:

- Compute $\gamma^+$
- For each $S \subseteq \gamma^+$, output $\gamma \rightarrow S$

---

## 21. Goals of Normalization

### Design Objectives

For a relation schema $R$ with functional dependencies $F$:

1. **Decide if $R$ is in "good" form**
2. **If not, decompose** $R$ into ${R_1, R_2, ..., R_n}$ such that:
    - Each $R_i$ is in good form
    - The decomposition is **lossless-join**
    - Preferably, the decomposition is **dependency-preserving**

---

## 22. First Normal Form (1NF)

### Definition

A relational schema $R$ is in **first normal form** if the domains of all attributes are **atomic** (indivisible).

### Non-Atomic Domain Examples

❌ **Set of names**: `{John, Jane}` in a single cell ❌ **Composite attributes**: Address as `{street, city, zip}` stored together ❌ **Identification numbers**: `CS101` (can be broken into department "CS" and number "101")

### Example: Atomic vs Non-Atomic

**Non-1NF** (Bad):

|Student_ID|Courses_Taken|
|---|---|
|101|{CS101, CS102, MATH201}|
|102|{CS101, PHY101}|

**1NF** (Good):

|Student_ID|Course|
|---|---|
|101|CS101|
|101|CS102|
|101|MATH201|
|102|CS101|
|102|PHY101|

### Atomicity Context

Atomicity depends on **usage**:

- Strings are normally atomic
- BUT if you extract department from "CS0012" (first 2 chars), the domain is **not atomic**

**Best Practice**: Don't encode information in attributes - use separate columns.

---

## 23. Boyce-Codd Normal Form (BCNF)

### Definition

A relation schema $R$ is in **BCNF** with respect to $F$ if for all $\alpha \rightarrow \beta$ in $F^+$ where $\alpha \subseteq R$ and $\beta \subseteq R$, at least one of the following holds:

1. $\alpha \rightarrow \beta$ is **trivial** ($\beta \subseteq \alpha$)
2. $\alpha$ is a **superkey** for $R$

### Example: Schema NOT in BCNF

**Schema**: `inst_dept(ID, name, salary, dept_name, building, budget)`

**Functional Dependency**: $dept_name \rightarrow building, budget$

**Why NOT BCNF**:

- $dept_name \rightarrow building, budget$ is not trivial
- $dept_name$ is NOT a superkey for inst_dept
- **Violates BCNF** ❌

---

## 24. BCNF Examples - Testing Relations

### Example 1: Flight

**Schema**: `Flight(FlightNumber, Origin, Destination, ScheduledTime)`

**FD**: $FlightNumber \rightarrow Origin, Destination, ScheduledTime$

**Test**:

- Is FlightNumber a superkey? **YES** ✓
- **In BCNF**: ✓

### Example 2: Inventory

**Schema**: `Inventory(ProductID, WarehouseID, QuantityInStock)`

**FD**: $ProductID, WarehouseID \rightarrow QuantityInStock$

**Test**:

- Is {ProductID, WarehouseID} a superkey? **YES** ✓
- **In BCNF**: ✓

### Example 3: Movie_genre

**Schema**: `Movie_genre(MovieID, GenreID)`

**FD**: $MovieID, GenreID \rightarrow \emptyset$

**Test**:

- Only trivial FDs exist
- **In BCNF**: ✓

### Example 4: Project_Assignment

**Schema**: `Project_Assignment(EmpID, ProjID, EmpName, ProjHours)`

**FDs**:

- $EmpID \rightarrow EmpName$
- $ProjID \rightarrow ProjHours$

**Test**:

- Is EmpID a superkey? **NO** ❌
- Is ProjID a superkey? **NO** ❌
- **NOT in BCNF**: ❌

### Example 5: Room

**Schema**: `Room(RoomID, Capacity, BuildingID, BuildingAddress)`

**FD**: $BuildingID \rightarrow BuildingAddress$

**Test**:

- Is BuildingID a superkey? **NO** ❌
- **NOT in BCNF**: ❌

---

## 25. Decomposing into BCNF

### Decomposition Algorithm

Given schema $R$ with FD $\alpha \rightarrow \beta$ that violates BCNF:

**Replace $R$ with**:

- $R_1 = (\alpha \cup \beta)$
- $R_2 = (R - (\beta - \alpha))$

### Example: inst_dept Decomposition

**Original**: `inst_dept(ID, name, salary, dept_name, building, budget)`

**Violating FD**: $dept_name \rightarrow building, budget$

**Decomposition**:

- $\alpha = {dept_name}$
- $\beta = {building, budget}$

**Result**:

- $R_1 = \alpha \cup \beta = $ `department(dept_name, building, budget)`
- $R_2 = R - (\beta - \alpha) = $ `instructor(ID, name, salary, dept_name)`

Both are in BCNF! ✓

---

## 26. BCNF Decomposition - Complete Example

### Step 1: Initial Schema

**Schema**: `class(course_id, title, dept_name, credits, sec_id, semester, year, building, room_number, capacity, time_slot_id)`

**Functional Dependencies**:

- $course_id \rightarrow title, dept_name, credits$
- $building, room_number \rightarrow capacity$
- $course_id, sec_id, semester, year \rightarrow building, room_number, time_slot_id$

**Candidate Key**: ${course_id, sec_id, semester, year}$

### Step 2: First Decomposition

**Violating FD**: $course_id \rightarrow title, dept_name, credits$

**Decompose**:

- $R_1 = $ `course(course_id, title, dept_name, credits)` ✓ **BCNF**
- $R_2 = $ `class-1(course_id, sec_id, semester, year, building, room_number, capacity, time_slot_id)`

### Step 3: Second Decomposition

**Violating FD** in class-1: $building, room_number \rightarrow capacity$

**Decompose**:

- $R_3 = $ `classroom(building, room_number, capacity)` ✓ **BCNF**
- $R_4 = $ `section(course_id, sec_id, semester, year, building, room_number, time_slot_id)` ✓ **BCNF**

**Final Result**: All relations in BCNF ✓

---

## 27. BCNF and Dependency Preservation

### The Trade-off

- **BCNF** eliminates redundancy
- BUT it's **not always possible** to achieve:
    1. BCNF
    2. Lossless-join decomposition
    3. Dependency preservation

**All at once**!

### Why Dependency Preservation Matters

Checking functional dependencies is **costly** unless they pertain to a single relation.

**Example**: If we decompose such that $A \rightarrow B$ is split across two relations, checking it requires a **join** operation on every update.

---

## 28. Third Normal Form (3NF)

### Definition

A relation schema $R$ is in **3NF** with respect to $F$ if for all $\alpha \rightarrow \beta$ in $F^+$, at least one holds:

1. $\alpha \rightarrow \beta$ is **trivial** ($\beta \subseteq \alpha$)
2. $\alpha$ is a **superkey** for $R$
3. **Each attribute** $A$ in $\beta - \alpha$ is contained in a **candidate key** for $R$

### Key Differences from BCNF

- **BCNF**: Condition 1 or 2 must hold
- **3NF**: Condition 1, 2, **or 3** must hold

**Relationship**: If $R$ is in BCNF $\Rightarrow$ $R$ is in 3NF

But: 3NF $\not\Rightarrow$ BCNF

---

## 29. 3NF Example - TimeSlot (Version 1)

### Schema

`TimeSlot(Course, Day, Room, Time)`

**Functional Dependencies**:

- $Course \rightarrow Room, Time$ ... (1)
- $Room, Day \rightarrow Course$ ... (2)

### Finding Candidate Keys

**CK₁**: ${Course, Day}$

- $(Course, Day)^+ = {Course, Day, Room, Time}$ = R ✓

**CK₂**: ${Room, Day}$

- $(Room, Day)^+ = {Room, Day, Course, Time}$ = R ✓

### Testing for 3NF

**Check FD (1)**: $Course \rightarrow Room, Time$

❌ Course is **not** a superkey ✓ Room is part of CK₂ ❌ Time is **NOT** part of any CK

**Conclusion**: **NOT in 3NF** ❌

### Testing for BCNF

**Check FD (1)**: $Course \rightarrow Room, Time$

❌ Course is **not** a superkey

**Conclusion**: **NOT in BCNF** ❌

---

## 30. 3NF Example - TimeSlot (Version 2)

### Schema

`TimeSlot(Course, Day, Room, Time)`

**Functional Dependencies**:

- $Course, Day \rightarrow Room, Time$ ... (1)
- $Room, Day \rightarrow Course$ ... (2)
- $Time \rightarrow Room$ ... (3)

### Finding Candidate Keys

**CK₁**: ${Course, Day}$ **CK₂**: ${Time, Day}$ **CK₃**: ${Room, Day}$

### Testing for 3NF

**Check FD (1)**: $Course, Day \rightarrow Room, Time$

- ✓ {Course, Day} is a superkey (it's CK₁)

**Check FD (2)**: $Room, Day \rightarrow Course$

- ✓ {Room, Day} is a superkey (it's CK₃)

**Check FD (3)**: $Time \rightarrow Room$

- ❌ Time is **not** a superkey
- ✓ Room is part of CK₃

**Conclusion**: **In 3NF** ✓

### Testing for BCNF

**Check FD (3)**: $Time \rightarrow Room$

- ❌ Time is **not** a superkey

**Conclusion**: **NOT in BCNF** ❌

---

## 31. Special Case: All Attributes in Candidate Keys

### Important Observation

If **all attributes** of a relation are part of **at least one** candidate key, then the relation is automatically in **3NF**.

**Why?** Condition 3 of 3NF is always satisfied: "Each attribute in $\beta - \alpha$ is contained in a candidate key."

### Example

**Schema**: `TimeSlot(Course, Day, Room, Time)`

With:

- $Course \rightarrow Room, Time$
- $Room, Day \rightarrow Course$

**Candidate Keys**:

- CK₁ = {Course, Day}
- CK₂ = {Room, Day}

**Attribute Coverage**:

- Course: in CK₁, CK₂ ✓
- Day: in CK₁, CK₂ ✓
- Room: in CK₂ ✓
- Time: **NOT in any CK** ❌

**Result**: NOT automatically 3NF because Time is not in any candidate key.

---

## 32. Comparison of BCNF and 3NF

### Decomposition Properties

|Property|BCNF|3NF|
|---|---|---|
|**Lossless-join**|Always achievable ✓|Always achievable ✓|
|**Dependency preservation**|May not be possible ❌|Always achievable ✓|
|**Redundancy**|No redundancy ✓|May have redundancy ⚠️|

### Trade-offs

**BCNF**:

- ✓ Eliminates all redundancy based on FDs
- ❌ May lose some functional dependencies

**3NF**:

- ✓ Preserves all functional dependencies
- ⚠️ May have some redundancy

---

## 33. Design Goals Summary

### Ideal Database Design

1. **BCNF** (for minimal redundancy)
2. **Lossless join** (no information loss)
3. **Dependency preservation** (efficient constraint checking)

### Reality

**If we cannot achieve all three**:

- Accept lack of dependency preservation, OR
- Accept redundancy by using 3NF instead of BCNF

### SQL Limitation

SQL does **not** provide direct specification of functional dependencies (except superkeys via PRIMARY KEY/UNIQUE).

**Workaround**: Can use ASSERTIONS (but expensive to test and not widely supported).

---

## 34. Complete Example Comparison

### TimeSlot Analysis Summary

|Version|FDs|3NF?|BCNF?|Reason|
|---|---|---|---|---|
|1|$Course \rightarrow Room, Time$<br>$Room, Day \rightarrow Course$|❌|❌|Time not in any CK|
|2|Same as 1|❌|❌|Same reason|
|3|+ $Course \rightarrow Time$|❌|❌|Time not in any CK|
|4|$Course, Day \rightarrow Room, Time$<br>$Room, Day \rightarrow Course$<br>$Time \rightarrow Room$|✓|❌|All attrs in CKs|

---

## 35. Practical Recommendations

### When to Use BCNF

Use BCNF when:

- ✓ Data integrity is critical
- ✓ Redundancy must be eliminated
- ✓ Dependency preservation is not essential
- ✓ Performance impact of joins is acceptable

### When to Use 3NF

Use 3NF when:

- ✓ Dependency preservation is required
- ✓ Constraint checking must be efficient
- ✓ Some redundancy is acceptable
- ✓ Complex joins should be avoided

---

## Summary Table: Normal Forms

|Normal Form|Key Requirement|Redundancy|Complexity|
|---|---|---|---|
|**1NF**|Atomic attributes|High|Low|
|**2NF**|No partial dependencies|Medium|Medium|
|**3NF**|No transitive dependencies (with exceptions)|Low|Medium|
|**BCNF**|No non-trivial dependencies from non-superkeys|None (for FDs)|High|

---

## Key Formulas and Definitions

### Functional Dependency

$$\alpha \rightarrow \beta \text{ holds if } t_1[\alpha] = t_2[\alpha] \Rightarrow t_1[\beta] = t_2[\beta]$$

### Attribute Closure

$$\alpha^+ = {\text{all attributes functionally determined by } \alpha}$$

### BCNF Condition

$$\forall \alpha \rightarrow \beta \in F^+: (\beta \subseteq \alpha) \lor (\alpha \text{ is superkey})$$

### 3NF Condition

$$\forall \alpha \rightarrow \beta \in F^+: (\beta \subseteq \alpha) \lor (\alpha \text{ is superkey}) \lor (\forall A \in \beta - \alpha: A \text{ in some CK})$$

---




# Chapter 8: Practice Exercises - Relational Database Design

## Practice Exercise 8.1: Lossless-Join Decomposition

### Problem Statement

Given schema $R = (A, B, C, D, E)$ decomposed into:

- $R_1 = (A, B, C)$
- $R_2 = (A, D, E)$

**Functional Dependencies**: $$F = {A \rightarrow BC, CD \rightarrow E, B \rightarrow D, E \rightarrow A}$$

Show this is a **lossless-join decomposition**.

### Solution

**Lossless-Join Condition**: A decomposition ${R_1, R_2}$ is lossless if: $$R_1 \cap R_2 \rightarrow R_1 \text{ OR } R_1 \cap R_2 \rightarrow R_2$$

**Analysis**:

- $R_1 \cap R_2 = {A}$
- Need to show: $A \rightarrow R_1$ or $A \rightarrow R_2$

**Computing $A^+$**:

|Step|Current Result|FD Applied|New Attributes|
|---|---|---|---|
|0|${A}$|Initialize|A|
|1|${A, B, C}$|$A \rightarrow BC$|B, C|
|2|${A, B, C, D}$|$B \rightarrow D$|D|
|3|${A, B, C, D, E}$|$CD \rightarrow E$|E|

**Result**: $A^+ = {A, B, C, D, E} = R$

Therefore:

- $A \rightarrow R$ (A is a candidate key)
- $A \rightarrow R_1$ (since $R_1 \subseteq R$)
- $A \rightarrow R_2$ (since $R_2 \subseteq R$)

**Conclusion**: ✓ **Lossless-join decomposition**

### Example Instance

**Original Relation $r(R)$**:

|A|B|C|D|E|
|---|---|---|---|---|
|a₁|b₁|c₁|d₁|e₁|
|a₂|b₂|c₂|d₂|e₂|

**After Decomposition**:

$\Pi_{A,B,C}(r)$:

|A|B|C|
|---|---|---|
|a₁|b₁|c₁|
|a₂|b₂|c₂|

$\Pi_{A,D,E}(r)$:

|A|D|E|
|---|---|---|
|a₁|d₁|e₁|
|a₂|d₂|e₂|

**Natural Join** (reconstructing):

|A|B|C|D|E|
|---|---|---|---|---|
|a₁|b₁|c₁|d₁|e₁|
|a₂|b₂|c₂|d₂|e₂|

**Result**: Original relation perfectly reconstructed! ✓

---

## Practice Exercise 8.2: Finding All Functional Dependencies

### Given Relation

**Figure 8.17**:

|A|B|C|
|---|---|---|
|a₁|b₁|c₁|
|a₁|b₁|c₂|
|a₂|b₁|c₁|
|a₂|b₁|c₃|

### Solution: Non-Trivial Functional Dependencies

**Testing Each Possible FD**:

|FD to Test|Tuples to Check|Same LHS?|Same RHS?|Holds?|
|---|---|---|---|---|
|$A \rightarrow B$|(1,2)|a₁ = a₁ ✓|b₁ = b₁ ✓|**YES**|
||(3,4)|a₂ = a₂ ✓|b₁ = b₁ ✓||
|$A \rightarrow C$|(1,2)|a₁ = a₁ ✓|c₁ ≠ c₂ ✗|**NO**|
|$B \rightarrow A$|(1,3)|b₁ = b₁ ✓|a₁ ≠ a₂ ✗|**NO**|
|$B \rightarrow C$|(1,3)|b₁ = b₁ ✓|c₁ = c₁ ✓|**NO**|
||(1,4)|b₁ = b₁ ✓|c₁ ≠ c₃ ✗|(counterexample)|
|$C \rightarrow A$|(1,3)|c₁ = c₁ ✓|a₁ ≠ a₂ ✗|**NO**|
|$C \rightarrow B$|(1,2,3,4)|All c values|All map to b₁|**YES**|
|$AC \rightarrow B$|All tuples|-|-|**YES** (by union)|

**Complete List of Non-Trivial FDs**:

1. $A \rightarrow B$
2. $C \rightarrow B$
3. $AC \rightarrow B$ (implied by #1)

**Trivial FDs** (19 total):

- Form $\alpha \rightarrow \beta$ where $\beta \subseteq \alpha$
- Examples: $A \rightarrow A$, $AB \rightarrow A$, $AB \rightarrow B$, $ABC \rightarrow AB$, etc.

### Detailed Verification Table

|Tuple Pair|A Values|B Values|C Values|Conclusion|
|---|---|---|---|---|
|(1,2)|a₁, a₁|b₁, b₁|c₁, c₂|$A \rightarrow B$ ✓, $A \rightarrow C$ ✗|
|(1,3)|a₁, a₂|b₁, b₁|c₁, c₁|$C \rightarrow B$ ✓, $C \rightarrow A$ ✗|
|(1,4)|a₁, a₂|b₁, b₁|c₁, c₃|$B \rightarrow C$ ✗|
|(2,3)|a₁, a₂|b₁, b₁|c₂, c₁|Similar patterns|
|(2,4)|a₁, a₂|b₁, b₁|c₂, c₃|Similar patterns|
|(3,4)|a₂, a₂|b₁, b₁|c₁, c₃|$A \rightarrow B$ ✓|

---

## Practice Exercise 8.3: FDs Indicating Relationships

### One-to-One Relationship

**ER Diagram**:

```
[Student] ←──1:1──→ [Instructor]
```

**Functional Dependencies**: $$Pk(student) \leftrightarrow Pk(instructor)$$

**Both directions hold**:

- $Pk(student) \rightarrow Pk(instructor)$
- $Pk(instructor) \rightarrow Pk(student)$

**Example Table**:

|Student_ID|Instructor_ID|Name|
|---|---|---|
|S001|I100|John|
|S002|I101|Jane|
|S003|I102|Bob|

**Verification**:

- Each Student_ID maps to exactly **one** Instructor_ID ✓
- Each Instructor_ID maps to exactly **one** Student_ID ✓
- **Bijection** (one-to-one correspondence)

### Many-to-One Relationship

**ER Diagram**:

```
[Student] ──N:1──→ [Instructor]
```

**Functional Dependency**: $$Pk(student) \rightarrow Pk(instructor)$$

**Only one direction holds**.

**Example Table**:

|Student_ID|Instructor_ID|Student_Name|Advisor|
|---|---|---|---|
|S001|I100|Alice|Dr. Smith|
|S002|I100|Bob|Dr. Smith|
|S003|I100|Carol|Dr. Smith|
|S004|I101|David|Dr. Jones|
|S005|I101|Eve|Dr. Jones|

**Verification**:

- Each Student_ID maps to exactly **one** Instructor_ID ✓
- Multiple Student_IDs can map to **same** Instructor_ID ✓
- **Many-to-one** relationship confirmed

**Counter-example for reverse**:

- $Pk(instructor) \rightarrow Pk(student)$ does **NOT** hold
- I100 maps to {S001, S002, S003} (not a function)

---

## Practice Exercise 8.4: Proving the Union Rule

### Union Rule Statement

**If** $\alpha \rightarrow \beta$ and $\alpha \rightarrow \gamma$, **then** $\alpha \rightarrow \beta\gamma$

### Proof Using Armstrong's Axioms

|Step|Statement|Justification|
|---|---|---|
|1|$\alpha \rightarrow \beta$|Given|
|2|$\alpha\alpha \rightarrow \alpha\beta$|Augmentation (add α to both sides)|
|3|$\alpha \rightarrow \alpha\beta$|Simplification ($\alpha\alpha = \alpha$)|
|4|$\alpha \rightarrow \gamma$|Given|
|5|$\alpha\beta \rightarrow \gamma\beta$|Augmentation (add β to both sides)|
|6|$\alpha \rightarrow \gamma\beta$|Transitivity (steps 3 and 5)|
|7|$\alpha \rightarrow \beta\gamma$|Commutativity of set union|

### Example Verification

**Given**:

- $A \rightarrow B$
- $A \rightarrow C$

**Relation Instance**:

|A|B|C|D|
|---|---|---|---|
|1|x|y|p|
|1|x|y|q|
|2|m|n|r|

**Verification of $A \rightarrow BC$**:

|Tuple Pair|A Values|B Values|C Values|BC Values|Holds?|
|---|---|---|---|---|---|
|(1,2)|1, 1|x, x|y, y|(x,y), (x,y)|✓|
|(3)|2|m|n|(m,n)|✓|

**Conclusion**: $A \rightarrow BC$ holds ✓

---

## Practice Exercise 8.5: Proving Pseudotransitivity Rule

### Pseudotransitivity Rule Statement

**If** $\alpha \rightarrow \beta$ and $\gamma\beta \rightarrow \delta$, **then** $\alpha\gamma \rightarrow \delta$

### Proof Using Armstrong's Axioms

|Step|Statement|Justification|
|---|---|---|
|1|$\alpha \rightarrow \beta$|Given|
|2|$\alpha\gamma \rightarrow \beta\gamma$|Augmentation (add γ to both sides)|
|3|$\alpha\gamma \rightarrow \gamma\beta$|Commutativity ($\beta\gamma = \gamma\beta$)|
|4|$\gamma\beta \rightarrow \delta$|Given|
|5|$\alpha\gamma \rightarrow \delta$|Transitivity (steps 3 and 4)|

### Example Verification

**Given**:

- $A \rightarrow B$
- $CB \rightarrow D$

**To Prove**: $AC \rightarrow D$

**Relation Instance**:

|A|B|C|D|
|---|---|---|---|
|1|2|x|5|
|1|2|y|6|
|3|4|x|7|

**Step-by-Step Verification**:

|Step|Attributes Known|FD Applied|New Attributes|
|---|---|---|---|
|1|{A, C}|$A \rightarrow B$|Add B → {A, B, C}|
|2|{A, B, C}|$CB \rightarrow D$|Add D → {A, B, C, D}|

**Checking tuple (1) and (3)**:

- Both have different A values (1 ≠ 3)
- Not applicable (different determinant values)

**Checking tuple (1) and (2)**:

- Same A value (1 = 1)
- Same C value? No (x ≠ y)
- Not applicable

**Conclusion**: Pseudotransitivity holds structurally ✓

---

## Practice Exercise 8.6: Computing Closure and Candidate Keys

### Given

$$R = (A, B, C, D, E)$$ $$F = {A \rightarrow BC, CD \rightarrow E, B \rightarrow D, E \rightarrow A}$$

### Step 1: Computing $F^+$ (Selected Members)

**Derivation Table**:

|Derived FD|Derivation Steps|Rule Used|
|---|---|---|
|$A \rightarrow B$|From $A \rightarrow BC$|Decomposition|
|$A \rightarrow C$|From $A \rightarrow BC$|Decomposition|
|$A \rightarrow D$|$A \rightarrow B$, $B \rightarrow D$|Transitivity|
|$A \rightarrow CD$|$A \rightarrow C$, $A \rightarrow D$|Union|
|$A \rightarrow E$|$A \rightarrow CD$, $CD \rightarrow E$|Transitivity|
|$A \rightarrow ABCDE$|Combining all above|Union|
|$E \rightarrow ABCDE$|$E \rightarrow A$, $A \rightarrow ABCDE$|Transitivity|
|$BC \rightarrow D$|$B \rightarrow D$|Augmentation|
|$BC \rightarrow CD$|$BC \rightarrow D$, $C \rightarrow C$|Union|
|$BC \rightarrow E$|$BC \rightarrow CD$, $CD \rightarrow E$|Transitivity|
|$BC \rightarrow A$|$BC \rightarrow E$, $E \rightarrow A$|Transitivity|
|$BC \rightarrow ABCDE$|Combining all|Union|
|$CD \rightarrow A$|$CD \rightarrow E$, $E \rightarrow A$|Transitivity|
|$CD \rightarrow ABCDE$|$CD \rightarrow A$, ...|Transitivity|

### Step 2: Finding All Candidate Keys

**Testing Single Attributes**:

|Attribute|Closure|Contains All Attributes?|Is Candidate Key?|
|---|---|---|---|
|$A^+$|{A, B, C, D, E}|YES|**Candidate Key ✓**|
|$B^+$|{B, D}|NO|Not a key|
|$C^+$|{C}|NO|Not a key|
|$D^+$|{D}|NO|Not a key|
|$E^+$|{A, B, C, D, E}|YES|**Candidate Key ✓**|

**Testing Two-Attribute Combinations**:

|Combination|Closure|Contains All?|Minimal?|Candidate Key?|
|---|---|---|---|---|
|${B,C}^+$|{A, B, C, D, E}|YES|YES|**✓**|
|${C,D}^+$|{A, B, C, D, E}|YES|YES|**✓**|
|${A,B}^+$|{A, B, C, D, E}|YES|NO (A alone works)|NO|

**Complete List of Candidate Keys**:

1. ${A}$
2. ${E}$
3. ${B, C}$
4. ${C, D}$

### Step 3: Detailed Closure Computation Example

**Computing ${BC}^+$**:

|Iteration|Current Result|FD Checked|β ⊆ result?|New Attributes|
|---|---|---|---|---|
|0|{B, C}|Initialize|-|-|
|1|{B, C, D}|$B \rightarrow D$|{B} ⊆ {B,C} ✓|D|
|2|{B, C, D, E}|$CD \rightarrow E$|{C,D} ⊆ {B,C,D} ✓|E|
|3|{A, B, C, D, E}|$E \rightarrow A$|{E} ⊆ {B,C,D,E} ✓|A|
|4|{A, B, C, D, E}|No change|-|Done|

**Result**: ${BC}^+ = R$, so {B, C} is a superkey ✓

---

## Practice Exercise 8.7: Computing Canonical Cover

### Given

$$F = {A \rightarrow BC, CD \rightarrow E, B \rightarrow D, E \rightarrow A}$$

### Canonical Cover Algorithm Steps

**Step 1**: Put FDs in standard form (right side single attribute)

$$F' = {A \rightarrow B, A \rightarrow C, CD \rightarrow E, B \rightarrow D, E \rightarrow A}$$

**Step 2**: Check for extraneous attributes on LEFT side

| FD | Test Attribute | New Closure | Extraneous? | |----|--------------|----- -------|-------------| | $CD \rightarrow E$ | Remove C: $D \rightarrow E$? | $D^+ = {D}$ | Not extraneous | | $CD \rightarrow E$ | Remove D: $C \rightarrow E$? | $C^+ = {C}$ | Not extraneous |

**Step 3**: Check for extraneous attributes on RIGHT side

|FD|Can remove RHS?|Test|
|---|---|---|
|$A \rightarrow B$|Check if $A \rightarrow B$ without it|B not elsewhere ✗|
|$A \rightarrow C$|Check if $A \rightarrow C$ without it|C not elsewhere ✗|

**Step 4**: Check for redundant FDs

Each FD is minimal and necessary.

**Canonical Cover**: $$F_c = F = {A \rightarrow BC, CD \rightarrow E, B \rightarrow D, E \rightarrow A}$$

**Conclusion**: The given set is already in canonical form! ✓

---

## Practice Exercise 8.9: SQL Query for Testing FDs

### Problem

Test if $B \rightarrow C$ holds on relation $r(A, B, C)$.

### Solution Part (a): SQL Query

```sql
SELECT b
FROM r
GROUP BY b
HAVING COUNT(DISTINCT c) > 1;
```

**Logic**:

- Group tuples by B values
- Count distinct C values for each B group
- If any group has more than 1 distinct C value, FD is violated

### Example Instances

**Instance 1: FD HOLDS**

|A|B|C|
|---|---|---|
|1|x|p|
|2|x|p|
|3|y|q|
|4|z|r|

**Query Result**: Empty set ✓ (FD holds)

|B|COUNT(DISTINCT C)|
|---|---|
|x|1|
|y|1|
|z|1|

**Instance 2: FD VIOLATED**

|A|B|C|
|---|---|---|
|1|x|p|
|2|x|q|
|3|y|r|

**Query Result**: {x} (FD violated!)

|B|COUNT(DISTINCT C)|
|---|---|
|x|**2** ← Violation!|
|y|1|

### Solution Part (b): SQL Assertion

```sql
CREATE ASSERTION b_to_c CHECK (
    NOT EXISTS (
        SELECT b
        FROM r
        GROUP BY b
        HAVING COUNT(DISTINCT c) > 1
    )
);
```

**Explanation**:

- Assertion checks the constraint automatically
- Prevents any INSERT/UPDATE that violates $B \rightarrow C$
- **Note**: Not supported by most current DBMS implementations

---

## Practice Exercise 8.11: BCNF Decomposition and Constraints

### Problem

Decompose $r(\alpha, \beta, \gamma)$ using FD $\alpha \rightarrow \beta$ into:

- $r_1(\alpha, \beta)$
- $r_2(\alpha, \gamma)$

### Solution (a): Expected Constraints

**Primary Key**:

- $\alpha$ is PRIMARY KEY of $r_1$

**Foreign Key**:

- $\alpha$ in $r_2$ REFERENCES $r_1(\alpha)$

**Diagram**:

```
r₁(α, β)          r₂(α, γ)
   ↑                 |
   |    REFERENCES   |
   |←────────────────┘
  PK               FK
```

### Solution (b): Inconsistency Example

**Scenario**: Foreign key constraint NOT enforced

**Initial State**:

**r₁**:

|α|β|
|---|---|
|1|x|
|2|y|

**r₂**:

|α|γ|
|---|---|
|1|p|
|2|q|

**Bad Operation**: DELETE FROM r₁ WHERE α = 1

**After Deletion**:

**r₁**:

|α|β|
|---|---|
|2|y|

**r₂**: (unchanged)

|α|γ|
|---|---|
|1|p|
|2|q|

**Problem**:

- Cannot reconstruct original relation
- Lost information: α=1 had β=x
- **Referential integrity violated**

**What SHOULD happen with FK constraint**:

```sql
-- Option 1: CASCADE
DELETE FROM r₂ WHERE α = 1;  -- Automatic

-- Option 2: RESTRICT
-- DELETE fails with error
```

### Solution (c): 3NF Decomposition Constraints

**For 3NF algorithm** (dependency-preserving):

Each schema $r_i(\alpha\beta)$ created from FD $\alpha \rightarrow \beta$:

- **Primary Key**: $\alpha$

Candidate key $\gamma$ of original relation:

- **Primary Key** in its schema $r_k$

**Foreign Key Constraints**:

- For each $r_i$, if PK attributes also appear in $r_j$:
    - FK from $r_j$ to $r_i$

**Example**:

Original: $R(A, B, C, D)$ with:

- $A \rightarrow B$
- $C \rightarrow D$
- Candidate key: {A, C}

**3NF Decomposition**:

1. $r_1(A, B)$ — PK: A
2. $r_2(C, D)$ — PK: C
3. $r_3(A, C)$ — PK: {A, C}

**Foreign Keys**:

- $r_3.A$ REFERENCES $r_1(A)$
- $r_3.C$ REFERENCES $r_2(C)$

---

## Practice Exercise 8.13: Testing Dependency Preservation

### Given

**Decomposition** from Exercise 8.1:

- $R_1 = (A, B, C)$
- $R_2 = (A, D, E)$

**Original FDs**: $$F = {A \rightarrow BC, CD \rightarrow E, B \rightarrow D, E \rightarrow A}$$

### Solution: Show $B \rightarrow D$ Not Preserved

**Step 1**: Find $F_1$ (FDs on $R_1$)

Project $F$ onto $(A, B, C)$:

|Original FD|Involves only {A,B,C}?|In $F_1$?|
|---|---|---|
|$A \rightarrow BC$|YES|✓|
|$CD \rightarrow E$|NO (has D, E)|✗|
|$B \rightarrow D$|NO (has D)|✗|
|$E \rightarrow A$|NO (has E)|✗|

$$F_1 = {A \rightarrow BC, A \rightarrow B, A \rightarrow C, ...\text{(trivial)}}$$

**Key observation**: No FD in $F_1$ has D on right side!

**Step 2**: Find $F_2$ (FDs on $R_2$)

Project $F$ onto $(A, D, E)$:

|Original FD|Involves only {A,D,E}?|In $F_2$?|
|---|---|---|
|$A \rightarrow BC$|NO (has B, C)|✗|
|$CD \rightarrow E$|NO (has C)|✗|
|$B \rightarrow D$|NO (has B)|✗|
|$E \rightarrow A$|YES|✓|

$$F_2 = {E \rightarrow A, E \rightarrow D, ...\text{(derived)}}$$

**Key observation**: No FD in $F_2$ has B on left side!

**Step 3**: Test if $B \rightarrow D$ in $(F_1 \cup F_2)^+$

For $B \rightarrow D$ to be preserved, we need:

- Some $B \rightarrow \alpha$ in $F_1^+$, AND
- Some $\alpha \rightarrow D$ in $F_2^+$

Where $\alpha = R_1 \cap R_2 = {A}$

**Test**: Is $B \rightarrow A$ in $F_1^+$?

Compute $B^+$ using $F_1$:

- Start: ${B}$
- No FD in $F_1$ has B alone on left
- Result: $B^+ = {B}$

**Conclusion**: $B \rightarrow A \notin F_1^+$

Therefore: **$B \rightarrow D$ is NOT preserved** ✗

### Verification Table

|FD|In $F_1$?|In $F_2$?|In $(F_1 \cup F_2)^+$?|Preserved?|
|---|---|---|---|---|
|$A \rightarrow BC$|✓|Partial|✓|YES|
|$CD \rightarrow E$|✗|✗|?|**NO**|
|$B \rightarrow D$|✗|✗|✗|**NO**|
|$E \rightarrow A$|✗|✓|✓|YES|

---

## Practice Exercise 8.15: Multiple BCNF Decompositions

### Given

$$R' = (A, B, C, D)$$ $$F' = {A \rightarrow B, C \rightarrow D, B \rightarrow C}$$

### Finding BCNF Violations

**Compute Candidate Keys**:

|Attribute Set|Closure|Is Superkey?|
|---|---|---|
|$A^+$|{A, B, C, D}|YES - **Candidate Key**|

**Test Each FD**:

|FD|LHS is Superkey?|BCNF?|
|---|---|---|
|$A \rightarrow B$|YES (A is CK)|✓|
|$C \rightarrow D$|NO|**Violates** ✗|
|$B \rightarrow C$|NO|**Violates** ✗|

### Decomposition 1

**Using** $A \rightarrow B$:

1. $(A, B)$
2. $(A, C, D)$

**Further decompose $(A, C, D)$ using $C \rightarrow D$**: 3. $(C, D)$

**Final**: ${(A, B), (A, C), (C, D)}$ ✗ Not quite...

**Correct Decomposition 1**: $$R_1 = {(A, B), (B, C), (C, D)}$$

**Verification**:

|Relation|FDs|Candidate Key|BCNF?|
|---|---|---|---|
|(A, B)|$A \rightarrow B$|A|✓|
|(B, C)|$B \rightarrow C$|B|✓|
|(C, D)|$C \rightarrow D$|C|✓|

### Decomposition 2

**Using** $C \rightarrow D$ **first**:

1. $(C, D)$
2. $(A, B, C)$

**Further decompose $(A, B, C)$ using $A \rightarrow B$**: 3. $(A, B)$ 4. $(A, C)$

**Final**: $$R_2 = {(A, B), (A, C), (C, D)}$$

**Verification**:

|Relation|FDs|Candidate Key|BCNF?|
|---|---|---|---|
|(A, B)|$A \rightarrow B$|A|✓|
|(A, C)|Trivial only|A|✓|
|(C, D)|$C \rightarrow D$|C|✓|

### Decomposition 3

**Using** $B \rightarrow C$ **first**:

1. $(B, C)$
2. $(A, B, D)$

**Check $(A, B, D)$** - need to derive FDs:

- From $A \rightarrow B$ (original)
- From $B \rightarrow C$ and $C \rightarrow D$: $B \rightarrow D$ (transitivity)
- From $A \rightarrow B$ and $B \rightarrow D$: $A \rightarrow D$ (transitivity)

**Further decompose using $A \rightarrow D$**: 3. $(A, D)$ 4. $(A, B)$

**Final**: $$R_3 = {(B, C), (A, D), (A, B)}$$

**Verification**:

|Relation|FDs|Candidate Key|BCNF?|
|---|---|---|---|
|(B, C)|$B \rightarrow C$|B|✓|
|(A, D)|$A \rightarrow D$|A|✓|
|(A, B)|$A \rightarrow B$|A|✓|

### Summary of All Three Decompositions

|Decomposition|Relations|Lossless?|BCNF?|
|---|---|---|---|
|$R_1$|{(A,B), (B,C), (C,D)}|✓|✓|
|$R_2$|{(A,B), (A,C), (C,D)}|✓|✓|
|$R_3$|{(B,C), (A,D), (A,B)}|✓|✓|

---

## Practice Exercise 8.16: Transitive Dependencies and 3NF

### Definitions

**Prime Attribute**: Attribute that appears in at least one candidate key

**Transitive Dependency**: Given $\alpha \rightarrow \beta$ holds but $\beta \rightarrow \alpha$ does not, and $\beta \rightarrow A$ holds, where $A \notin \alpha$, $A \notin \beta$, then $A$ is **transitively dependent** on $\alpha$.

**Alternative 3NF Definition**: "A relation schema R is in 3NF if there are no **nonprime attributes** A that are transitively dependent on any key."

### Proof of Equivalence

**Part 1**: 3NF (textbook) ⟹ 3NF (exercise)

Assume R is in 3NF by textbook definition. Suppose A is a nonprime attribute transitively dependent on key $\alpha$.

**Then**:

- $\alpha \rightarrow \beta$ (where $\beta \rightarrow \alpha$ does not hold)
- $\beta \rightarrow A$
- $A \notin \alpha$, $A \notin \beta$

**Consider FD** $\beta \rightarrow A$:

1. Is $A \in \beta$? NO (given)
2. Is $\beta$ a superkey? NO ($\beta \rightarrow \alpha$ doesn't hold)
3. Is A in any candidate key? NO (A is nonprime)

**This violates textbook 3NF!** Contradiction. ✓

**Part 2**: 3NF (exercise) ⟹ 3NF (textbook)

Assume R satisfies exercise definition (no nonprime attribute transitively dependent). Suppose R violates textbook 3NF with FD $\alpha \rightarrow \beta$.

**Then**:

- $\alpha \rightarrow \beta$ is nontrivial
- $\alpha$ is not a superkey
- Some $A \in \beta - \alpha$ is not in any candidate key (nonprime)

**Let** $\gamma$ be a candidate key:

- $\gamma \rightarrow \alpha$ (since γ is a key)
- $\alpha \rightarrow \gamma$ does not hold (α not a superkey)
- $A \notin \gamma$ (A is nonprime)
- $A \notin \alpha$ (given)

**Therefore**: A is transitively dependent on γ, violating exercise definition! ✓

### Example Illustration

**Schema**: $R(A, B, C, D)$

**FDs**:

- $A \rightarrow B$
- $B \rightarrow C$

**Candidate Key**: {A, D}

**Analysis Table**:

|Attribute|In CK?|Prime/Nonprime|
|---|---|---|
|A|YES|Prime|
|D|YES|Prime|
|B|NO|**Nonprime**|
|C|NO|**Nonprime**|

**Transitive Dependencies**:

|From|Via|To|Transitive?|Violates 3NF?|
|---|---|---|---|---|
|A|B|C|YES|C is nonprime ✓|
|AD|B|C|YES|C is nonprime ✓|

**Verification**:

- $B \rightarrow C$ violates textbook 3NF ✓
- C is transitively dependent on key {A, D} ✓
- **Both definitions agree**: NOT in 3NF

---

## Practice Exercise 8.17: Partial Dependencies and 2NF

### Definitions

**Partial Dependency**: FD $\alpha \rightarrow \beta$ is partial if there exists proper subset $\gamma \subset \alpha$ such that $\gamma \rightarrow \beta$.

**Second Normal Form (2NF)**: R is in 2NF if each attribute A either:

1. Appears in a candidate key (is prime), OR
2. Is not partially dependent on any candidate key

### Theorem: 3NF ⟹ 2NF

**Proof Strategy**: Show every partial dependency is a transitive dependency.

**Given**: Nonprime attribute A partially dependent on candidate key $\alpha$.

**Then**:

- There exists $\beta \subset \alpha$ where $\beta \rightarrow A$
- $\beta$ is proper subset of $\alpha$

**Prove A is transitively dependent on** $\alpha$**:**

1. $\alpha \rightarrow \beta$ (reflexivity, since $\beta \subseteq \alpha$)
2. $\beta \rightarrow A$ (given partial dependency)
3. $\beta \rightarrow \alpha$ does NOT hold (else $\beta$ would be superkey)
4. $A \notin \alpha$ (A is nonprime, $\alpha$ is candidate key)
5. $A \notin \beta$ (else dependency would be trivial)

**Therefore**: A is transitively dependent on $\alpha$ ✓

**Conclusion**: If R is in 3NF, it has no transitive dependencies of nonprime attributes, hence no partial dependencies. Thus R is in 2NF. ✓

### Example Illustration

**Schema**: $R(A, B, C, D)$

**FDs**:

- $AB \rightarrow C$
- $A \rightarrow D$

**Candidate Key**: {A, B}

**Check 2NF**:

|Attribute|Prime?|Dependency|Full/Partial?|2NF?|
|---|---|---|---|---|
|C|NO|$AB \rightarrow C$|**Full** (no proper subset)|✓|
|D|NO|$A \rightarrow D$|**Partial** (A ⊂ AB)|**✗**|

**Visualization**:

```
Candidate Key: {A, B}
                 ↓
            ┌────┴────┐
            ↓         ↓
           {A}  (proper subset)
            ↓
           {D}  (nonprime)
           
Partial Dependency: AB → A → D
```

**NOT in 2NF** because D is partially dependent on {A, B}.

**Check 3NF**:

FD $A \rightarrow D$ violates 3NF because:

- A is not superkey ✗
- D is not prime ✗

**Transitive Dependency**:

- $AB \rightarrow A$ (reflexivity)
- $A \rightarrow D$ (given)
- $AB \not\rightarrow A$ properly (would make A superkey)
- D transitively dependent ✓

**Conclusion**: Partial dependency ⟹ Transitive dependency ⟹ Violates 3NF ✓

---

## Practice Exercise 8.18: BCNF but not 4NF

### Given

$$R(A, B, C)$$ $$A \twoheadrightarrow B$$ (multivalued dependency)

### Verification

**Check BCNF**:

Only trivial FDs exist (no nontrivial functional dependencies).

|FD|Trivial?|BCNF Condition|
|---|---|---|
|$A \rightarrow A$|YES|✓|
|$B \rightarrow B$|YES|✓|
|$C \rightarrow C$|YES|✓|

**Conclusion**: **In BCNF** ✓ (vacuously true - no FD violations)

**Check 4NF**:

MVD $A \twoheadrightarrow B$ exists.

**4NF Condition**: For $A \twoheadrightarrow B$:

- Either trivial ($B \subseteq A$ or $AB = R$), OR
- A is superkey

**Test**:

- Is $B \subseteq A$? NO ✗
- Is $AB = R$? NO ($AB = {A, B} \neq {A, B, C}$) ✗
- Is A a superkey? NO (A doesn't determine C) ✗

**Conclusion**: **NOT in 4NF** ✗

### Example Instance Showing MVD

**Relation r**:

|A|B|C|
|---|---|---|
|a₁|b₁|c₁|
|a₁|b₁|c₂|
|a₁|b₂|c₁|
|a₁|b₂|c₂|

**MVD** $A \twoheadrightarrow B$ means: For each A value, the set of B values is **independent** of C values.

**Verification**:

- A = a₁ has B values {b₁, b₂}
- These B values appear with **every** C value
- B values independent of C ✓

### Summary Table

|Property|R(A,B,C) with $A \twoheadrightarrow B$|
|---|---|
|**1NF**|✓ (atomic attributes)|
|**2NF**|✓ (no partial dependencies)|
|**3NF**|✓ (no transitive dependencies)|
|**BCNF**|✓ (no FD violations)|
|**4NF**|**✗** (MVD violation)|

---

## Summary: Key Concepts

### Normal Forms Hierarchy

```
1NF ⊂ 2NF ⊂ 3NF ⊂ BCNF ⊂ 4NF
```

**Every** BCNF relation is in 3NF, but not vice versa.

### Decomposition Properties

|Property|BCNF|3NF|
|---|---|---|
|Lossless-join|Always ✓|Always ✓|
|Dependency-preserving|Sometimes ✗|Always ✓|
|Redundancy|None ✓|Minimal ⚠️|

### Key Algorithms

1. **Attribute Closure**: Test superkeys and FDs
2. **BCNF Decomposition**: Eliminate redundancy
3. **3NF Synthesis**: Preserve dependencies
4. **Canonical Cover**: Minimize FD set

---