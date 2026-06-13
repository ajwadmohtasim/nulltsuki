---
title: Deadlock
draft:
tags:
---
>Note's credit : Zunayed Iqbal Shahed
# Deadlock:

A deadlock is a situation in a computing environment where a set of processes gets permanently stuck because each process

is waiting for a resource held by another process, and none of them can proceed.

Deadlock can arise if the following four conditions hold simultaneously (Necessary Conditions):

1. ***Mutual Exclusion:*** Only one process can use a resource at any given time i.e. the resources are non-sharable.

2. ***Hold and Wait:*** A process is holding at least one resource at a time and is waiting to acquire other resources held by some other process.

3. ***No Preemption:*** A resource cannot be taken from a process unless the process releases the resource.

4. ***Circular Wait:***  set of processes are waiting for each other in a circular fashion. For example, imagine four processes ***P1***, ***P2***, **P3***, and ***P4*** and four resources **R1***, **R2***, **R3***, and ***R4***.

![[Deadlock.png| center | 250]]

The above image demonstrates a circular wait deadlock, here's how:

- **P1*** is holding ***R1*** and waiting for ***R2*** (which is held by P2).

- ***P2*** is holding ***R2*** and waiting for ***R3*** (which is held by P3).

- ***P3*** is holding ***R3*** and waiting for ***R4*** (which is held by P4).

- ***P4*** is holding ***R4*** and waiting for ***R1*** (which is held by P1)

# Handling Deadlocks:

Deadlock handling methods are strategies used in operating systems to ensure processes do not remain permanently blocked, maintaining smooth execution and system reliability.

There are four approaches of dealing with deadlocks:

## 1. Deadlock Prevention:

Deadlock prevention is a strategy used in computer systems to ensure that different processes can run smoothly without getting stuck waiting for each other forever. Think of it like a traffic system where cars (processes) must move through intersections (resources) without getting into a gridlock. Deadlock can only happen if all four of the following conditions are met simultaneously:

- Mutual Exclusion

- Hold and Wait

- No Preemption

- Circular Wait

So we can prevent a Deadlock by eliminating any of the above **four conditions**.

- **Eliminate Mutual Exclusion:**

    - Some resources, like a printer, are inherently non-sharable, so this condition is difficult to break.

    - However, sharable resources like read-only files can be accessed by multiple processes at the same time.

    - For non-sharable resources, prevention through this method is not possible.

- **Eliminate Hold and Wait:**

    Hold and wait is a condition in which a process holds one resource while simultaneously waiting for another resource that is being held by a different process. The process cannot continue until it gets all the required resources. There are two ways to eliminate hold and wait:

    - ***By eliminating wait***: The process specifies the resources it requires in advance so that it does not have to wait for allocation after execution starts.  

        For Example, Process1 declares in advance that it requires both Resource1 and Resource2.

    - ***By eliminating hold***: The process has to release all resources it is currently holding before making a new request.

        For Example: Process1 must release Resource2 and Resource3 before requesting Resource1.

- **Eliminate No Preemption:**

    No preemption means resources can’t be taken away once allocated. To prevent this:

    - ***Processes must release resources voluntarily***: A process gives up resources once it finishes using them.

    - ***Avoid partial allocation***: If a process requests resources that are unavailable, it must release all currently held resources and wait until all required resources are free.

- **Eliminate Circular Wait:**

    No preemption means resources can’t be taken away once allocated. To prevent this:

    - ***Processes must release resources voluntarily***: A process gives up resources once it finishes using them.

    - ***Avoid partial allocation***: If a process requests resources that are unavailable, it must release all currently held resources and wait until all required resources are free.

## 2. Deadlock Avoidance:

In Deadlock Avoidance, the system will be checked if it is in a safe state or an unsafe state. Safe state is ensured when the request for the resource by the process is permitted when there is no deadlock found in the system. If there is deadlock found then the system will be in an unsafe state.

To avoid deadlocks the process should inform the system that how many resources that a process should request for its execution. To make that happen we use Algorithm.

- Step 1: Work and finish the 2 vectors of size m & n. Initialize work with available and finish[i] = false
  ```
  for i=1 to n , m=>#resources and n=>#processes.
  ```
- Step 2: Find an i such that both (i) finish[i] = false (ii) need(i) <= work , if no such i exists then go to Step 4.

- Step 3: 
```
  Work = work + allocation
  finish[i] = true
  go to Step 2.
  ```

 - Step 4: if finish[i] = true for all _i_ then the system is in a safe state.

#### Terminologies with example:

Suppose that there are m = 4 (A, B, C, D) resources and n=5 <P$_{0}$, P$_{1}$, P$_{2}$, P$_{3}$, P$_{4}$> processes. Build a safe sequence to keep the system in a safe state.

![[example_safeState_math.png | center | 375]]

Here,
n => processes = 5 = <P$_{0}$, P$_{1}$, P$_{2}$, P$_{3}$, P$_{4}$>
m => resources = 4 = (A, B, C, D)


**Available:** It defines how many instances that are available for a particular resource.

**Allocation:** It defines the number of instances that are allocated for all the resources of a particular process.

**Max:** It defines the maximum number of instances that are available for all the resources of a particular process.

**Need:** It tells how many instances will be required more for a resource of a process. To check for a safe sequence first we need to calculate the Need matrix.

$$

\text{Need}_{(i)} = \text{Max}_{(i)} - \text{Allocation}_{(i)}

$$

From this equation, we derive the Need table:

![[needTable.png| center | 185]]

Now to try to generate a sequence that will make sure system will always be in safe state avoiding the Deadlock following the algorithm:

- **Step 1:** Initialize the work and finish table:

    ![[workFinishTable.png| center | 200]]

- **Step 2:** Now take Process P$_{0}$ and according to step-2 in algorithm we need to find an i such that both conditions

    i. finish[i] = false.

    ii. Need$_{(i)}$ <= Work, should be satisfied.

    Both the conditions satisfies, so we perform the step 3 of the algorithm by updating the Work table and making finish[i] = true or,  P$_{0}$ True in the Finish table

    ![[Pasted image 20251111134604.png | center | 235]]

- **Step 3:** Now we take P$_{1}$ process, we find 1st condition (finish[i] = false) is true, but the 2nd condition ( Need$_{(i)}$ <= Work) is false, as

    7 <= 5 and 5 <= 3 is false. Thus we skip  P$_{1}$ and repeat step 2 for P$_{2}$ process.

    For Process P$_{2}$, we found both the conditions are satisfied. So calculate according to step-3 in the algorithm and update the work and finish table accordingly:

    ![[Pasted image 20251111140226.png | center | 230]]

    For Process P3, we found both the conditions are satisfied. So calculate according to step 3 in the algorithm.

    ![[Pasted image 20251111140403.png | center | 250]]

    For Process P$_{4}$, we found both the conditions are satisfied. So calculate according to step 3 in the algorithm.

    ![[Pasted image 20251111140316.png | center | 255]]

    Now we are remaining with the Process P1. So, if we check for Process P1, we found both the conditions are satisfied. So calculate according to step 3 in the algorithm.

    ![[Pasted image 20251111140618.png | center | 275]]So when we go to step 2 in the algorithm again we can't find any `i` for both the conditions as all processes are completed. So now go to step 4 in the algorithm. we find all finish [i] = true. So according to the algorithm, the system is in a safe state.

    Finally, the `safe sequence` for the above example would be:

    $$<P_{0}, P_{2}, P_{3}, P_{4}, P_{1}>.$$

## 3. Deadlock Detection & Recovery:

  

## 4. Deadlock Ignorance: