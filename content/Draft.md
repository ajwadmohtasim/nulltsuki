---
title: Nulltsuki
draft: true
tags:
---
# Disk Scheduling Algorithms: Comprehensive Analysis and Performance Evaluation

**Course**: Operating Systems  
**Assignment Type**: Academic Analysis with Numerical Evaluation

---

## Executive Summary

Disk scheduling algorithms are critical components of operating system design that **directly impact system performance by up to 63%** in head movement optimization. This assignment analyzes four fundamental algorithms—FCFS, SSTF, SCAN, and C-SCAN—using a standardized request queue to demonstrate that SSTF achieves the minimum seek time of **236 tracks** while C-SCAN provides the most uniform wait time distribution. The analysis reveals fundamental trade-offs between performance optimization and fairness guarantees that inform real-world engineering decisions.

---

## Task 1: Conceptual explanation of disk scheduling

### The critical role of disk scheduling in operating systems

Disk scheduling represents one of the most impactful optimization opportunities in operating system design because of the dramatic speed disparity between electronic and mechanical components. While CPU cache references occur in approximately **1-10 nanoseconds** and RAM access takes roughly **50-100 nanoseconds**, traditional hard disk access requires approximately **13 milliseconds**—a difference of five orders of magnitude. This I/O bottleneck means that every millisecond saved through intelligent scheduling translates directly into improved system throughput and responsiveness.

In multiprogrammed systems, multiple processes compete for access to shared disk resources simultaneously. The operating system's disk scheduler must determine the order in which pending I/O requests are serviced, making decisions that affect both individual process response times and overall system throughput. Without proper scheduling, disk access becomes a severe bottleneck, particularly under heavy multi-tasking loads where the "convoy effect" can cause short requests to wait behind lengthy seek operations.

### Components of disk access time

Disk access time consists of three primary components, each contributing differently to total latency:

**Seek Time** is the most significant component, representing the time required for the disk arm to move the read/write head from its current position to the target track. This mechanical movement typically ranges from **8-10 milliseconds** on average, though adjacent track accesses may require only **2-3 milliseconds**. Because seek time involves physical arm movement across the disk platter, it dominates the total access time calculation and serves as the primary optimization target for scheduling algorithms.

**Rotational Latency** represents the time for the desired sector to rotate under the read/write head after the correct track has been reached. On average, this equals half of one complete disk rotation. For a standard 7200 RPM drive, one rotation takes 8.33 milliseconds, yielding an average rotational latency of approximately **4.16 milliseconds**.

**Transfer Time** is the actual data read/write duration once the head is properly positioned. Modern HDDs achieve sustained transfer rates of 100-200+ MB/s, making this the smallest component of access time for typical request sizes.

The formula governing disk access is:

$$\text{Disk Access Time} = \text{Seek Time} + \text{Rotational Latency} + \text{Transfer Time}$$

Because seek time typically dominates this equation, disk scheduling algorithms focus primarily on **minimizing total head movement** across all pending requests.

---

## Task 2: Algorithm descriptions

### FCFS (First-Come, First-Served)

FCFS processes disk requests in their exact arrival order, implementing a simple First-In-First-Out queue with no optimization based on head position. When a request arrives, it joins the end of the queue and waits until all previously arrived requests have been serviced.

**Working Principle:**

1. Maintain a queue of pending disk requests in arrival order
2. Service the request at the front of the queue
3. Move the disk head to the requested track
4. Complete the I/O operation and remove the request from the queue
5. Repeat until all requests are serviced

**Advantages:** FCFS offers maximum fairness—every request is guaranteed service in a predictable order with no possibility of starvation. Its simplicity makes implementation trivial and debugging straightforward.

**Disadvantages:** FCFS provides no seek optimization, often causing dramatic "wild swings" where the head oscillates across the entire disk surface. This results in high total head movement and poor throughput.

### SSTF (Shortest Seek Time First)

SSTF always selects the pending request that requires the minimum head movement from the current position. This greedy algorithm optimizes each individual selection but does not guarantee globally optimal scheduling.

**Working Principle:**

1. Calculate the seek distance from current head position to all pending requests
2. Select the request with the minimum seek distance
3. Move the head to that track and service the request
4. Update the current head position
5. Repeat until all requests are serviced

**Advantages:** SSTF typically achieves significantly lower total head movement than FCFS by exploiting spatial locality. It maximizes immediate throughput and reduces average seek time.

**Disadvantages:** SSTF can cause **starvation** for requests at distant disk locations. If new requests continuously arrive near the current head position, far requests may wait indefinitely—similar to the starvation problem in Shortest Job First CPU scheduling.

### SCAN (Elevator Algorithm)

SCAN moves the disk head in one direction, servicing all requests in its path, until it reaches the disk boundary, then reverses direction and services requests on the return sweep. This behavior mirrors an elevator moving between floors.

**Working Principle:**

1. Begin moving the head in the specified direction (toward higher or lower tracks)
2. Service all requests encountered in the current direction of movement
3. Continue until reaching the disk boundary (track 0 or maximum track)
4. Reverse direction
5. Service all requests in the new direction
6. Continue this back-and-forth pattern

**Advantages:** SCAN prevents starvation because every request will be serviced within at most two complete sweeps. It provides more predictable response times than SSTF and works well under heavy loads.

**Disadvantages:** The head travels to the disk boundary even when no requests exist there, wasting movement. Additionally, requests at disk edges may experience longer average wait times than middle-track requests.

### C-SCAN (Circular SCAN)

C-SCAN modifies SCAN by treating the disk as a circular list. After reaching one disk boundary, the head immediately jumps to the opposite boundary and continues in the **same direction**, providing more uniform wait times across all disk positions.

**Working Principle:**

1. Move the head in one direction (typically toward higher tracks), servicing requests
2. Continue until reaching the disk boundary
3. Jump immediately to the opposite boundary without servicing requests during the jump
4. Resume movement in the same direction as before
5. Service remaining requests

**Advantages:** C-SCAN provides the **most uniform wait time distribution** among these algorithms because all requests experience similar expected delays regardless of their disk position. It eliminates the bias toward middle tracks present in SCAN.

**Disadvantages:** The return jump adds overhead, potentially increasing total head movement compared to SCAN. The head still travels to disk boundaries even without requests there.

---

## Task 3: Numerical analysis

### Input Parameters

- **Request Queue (Arrival Order):** 98, 183, 37, 122, 14, 124, 65, 67
- **Initial Head Position:** 53
- **Disk Size:** 0 – 199 tracks
- **Initial Direction:** Toward higher-numbered tracks

---

### FCFS Analysis

**Service Order:** 53 → 98 → 183 → 37 → 122 → 14 → 124 → 65 → 67

**Step-by-Step Calculation:**

|Step|From|To|Head Movement|
|---|---|---|---|
|1|53|98|\|98 - 53\| = **45**|
|2|98|183|\|183 - 98\| = **85**|
|3|183|37|\|37 - 183\| = **146**|
|4|37|122|\|122 - 37\| = **85**|
|5|122|14|\|14 - 122\| = **108**|
|6|14|124|\|124 - 14\| = **110**|
|7|124|65|\|65 - 124\| = **59**|
|8|65|67|\|67 - 65\| = **2**|

**Total Head Movement:** 45 + 85 + 146 + 85 + 108 + 110 + 59 + 2 = **640 tracks**

**Disk Head Movement Diagram (FCFS):**

```
Track:  0    14   37   53   65 67   98   122 124      183      199
        |----|----|----|----|--|----|----|---|---------|--------|
                   ↑
             Start(53)
        
Movement Sequence:
53 ──────────────────→ 98 ──────────────────────────→ 183
                                                        │
    ←───────────────────────────────────────────────────┘
37 ────────────────────────→ 122
                               │
    ←──────────────────────────┘
14 ─────────────────────────────────────────→ 124
                                               │
    ←──────────────────────────────────────────┘
65 ──→ 67

```

---

### SSTF Analysis

**Selection Process (always choose nearest unvisited request):**

|Step|Current Position|Pending Requests|Distances|Nearest|Movement|
|---|---|---|---|---|---|
|1|53|98,183,37,122,14,124,65,67|45,130,16,69,39,71,**12**,14|65|12|
|2|65|98,183,37,122,14,124,67|33,118,28,57,51,59,**2**|67|2|
|3|67|98,183,37,122,14,124|31,116,**30**,55,53,57|37|30|
|4|37|98,183,122,14,124|61,146,85,**23**,87|14|23|
|5|14|98,183,122,124|**84**,169,108,110|98|84|
|6|98|183,122,124|85,**24**,26|122|24|
|7|122|183,124|61,**2**|124|2|
|8|124|183|**59**|183|59|

**Service Order:** 53 → 65 → 67 → 37 → 14 → 98 → 122 → 124 → 183

**Total Head Movement:** 12 + 2 + 30 + 23 + 84 + 24 + 2 + 59 = **236 tracks**

**Disk Head Movement Diagram (SSTF):**

```
Track:  0    14   37   53   65 67   98   122 124      183      199
        |----|----|----|----|--|----|----|---|---------|--------|
                   ↑
             Start(53)

Movement Sequence:
53 → 65 → 67
         │
    ←────┘
37 ← 14
│
└──────────────────────────→ 98 ──→ 122 → 124 ────────→ 183
```

---

### SCAN Analysis

**Sorted Requests:** 14, 37, 65, 67, 98, 122, 124, 183

**Direction:** Moving toward higher tracks (right) first

**Service Order:** 53 → 65 → 67 → 98 → 122 → 124 → 183 → 199 → 37 → 14

**Step-by-Step Calculation:**

|Step|From|To|Direction|Head Movement|
|---|---|---|---|---|
|1|53|65|→|12|
|2|65|67|→|2|
|3|67|98|→|31|
|4|98|122|→|24|
|5|122|124|→|2|
|6|124|183|→|59|
|7|183|199|→ (to boundary)|16|
|8|199|37|← (reverse)|162|
|9|37|14|←|23|

**Total Head Movement:** 12 + 2 + 31 + 24 + 2 + 59 + 16 + 162 + 23 = **331 tracks**

**Disk Head Movement Diagram (SCAN):**

```
Track:  0    14   37   53   65 67   98   122 124      183      199
        |----|----|----|----|--|----|----|---|---------|--------|
                   ↑                                         ↑
             Start(53)                              Boundary(199)

Movement Sequence (→ then ← ):
53 ──→ 65 → 67 ────→ 98 ──→ 122 → 124 ──────────→ 183 ────→ 199
                                                              │
              REVERSE DIRECTION                               │
    ←─────────────────────────────────────────────────────────┘
14 ← 37
```

---

### C-SCAN Analysis

**Direction:** Moving toward higher tracks, then jump to track 0 and continue in same direction

**Service Order:** 53 → 65 → 67 → 98 → 122 → 124 → 183 → 199 → (jump to 0) → 14 → 37

**Step-by-Step Calculation:**

|Step|From|To|Action|Head Movement|
|---|---|---|---|---|
|1|53|65|Move →|12|
|2|65|67|Move →|2|
|3|67|98|Move →|31|
|4|98|122|Move →|24|
|5|122|124|Move →|2|
|6|124|183|Move →|59|
|7|183|199|Move → (to boundary)|16|
|8|199|0|Jump (circular wrap)|199|
|9|0|14|Move →|14|
|10|14|37|Move →|23|

**Total Head Movement:** 12 + 2 + 31 + 24 + 2 + 59 + 16 + 199 + 14 + 23 = **382 tracks**

_Note: The circular jump from track 199 to track 0 is included in this calculation as physical head movement. Some academic treatments model this as instantaneous repositioning with zero seek time, which would reduce the total to 183 tracks._

**Disk Head Movement Diagram (C-SCAN):**

```
Track:  0    14   37   53   65 67   98   122 124      183      199
        |----|----|----|----|--|----|----|---|---------|--------|
        ↑              ↑                                         ↑
    Jump Here      Start(53)                            Boundary(199)

Movement Sequence (→ only, circular):
53 ──→ 65 → 67 ────→ 98 ──→ 122 → 124 ──────────→ 183 ────→ 199
                                                              │
                        CIRCULAR JUMP (no requests serviced)  │
┌─────────────────────────────────────────────────────────────┘
↓
0 ──────→ 14 ────→ 37
```

---

## Task 4: Performance comparison

### Comprehensive Comparison Table

|Criterion|FCFS|SSTF|SCAN|C-SCAN|
|---|---|---|---|---|
|**Total Head Movement**|640 tracks|**236 tracks**|331 tracks|382 tracks|
|**Reduction vs. FCFS**|—|63.1%|48.3%|40.3%|
|**Average Seek per Request**|80.0 tracks|**29.5 tracks**|41.4 tracks|47.8 tracks|
|**Performance Efficiency**|Poor|Excellent|Good|Good|
|**Fairness**|**Excellent**|Poor|Good|**Very Good**|
|**Starvation Possibility**|None|**High**|None|None|
|**Wait Time Variance**|High|**Highest**|Medium|**Lowest**|
|**Implementation Complexity**|Simple|Moderate|Moderate|Moderate|
|**Predictability**|High|Low|Medium|**High**|
|**Best Workload**|Light loads|High locality|Heavy loads|Heavy loads|

### Detailed Performance Analysis

**FCFS** demonstrates the worst performance with **640 tracks** of head movement because it makes no attempt to optimize seek sequences. The dramatic swings between distant tracks (such as the 146-track movement from 183 to 37) exemplify inefficiency. However, FCFS guarantees perfect fairness with every request served in arrival order.

**SSTF** achieves the best performance with only **236 tracks** of movement, a **63.1% improvement** over FCFS. The greedy selection strategy clusters requests efficiently, but this comes at the cost of potential starvation. Notice that track 183 is serviced last despite arriving second in the queue, demonstrating the inherent unfairness.

**SCAN** provides a balanced approach with **331 tracks** of movement. The systematic sweep pattern ensures all requests are serviced within bounded time while achieving significant optimization over FCFS. The movement to track 199 (16 extra tracks past the last request at 183) represents the cost of going to the boundary.

**C-SCAN** requires **382 tracks** of movement when counting the return jump, making it less efficient than SCAN in raw distance. However, this algorithm provides the most uniform wait time distribution—requests at track 14 don't need to wait for the entire return sweep as they would in SCAN.

---

## Task 5: CEP (Complex Engineering Problem) analysis

### Trade-offs between performance and fairness

The fundamental tension in disk scheduling lies between **maximizing throughput** (minimizing seek time) and **ensuring fairness** (providing reasonable service to all requests). This trade-off manifests clearly in our analysis:

SSTF achieves optimal performance but exhibits the classic **starvation problem**. In our example, track 183 waited through seven other requests because closer options were always available. In a continuous stream of requests, a track at the disk edge might wait indefinitely while the head services requests in the middle—a critical failure in multi-user environments where every user deserves reasonable service.

FCFS represents the opposite extreme: perfect fairness with severely degraded performance. The **170% additional head movement** compared to SSTF translates directly into reduced system throughput and longer average response times for all users.

SCAN and C-SCAN occupy the middle ground, achieving substantial optimization while guaranteeing bounded wait times. The engineering decision between them involves weighing **average performance** (SCAN is more efficient) against **service uniformity** (C-SCAN treats all disk positions equally). For systems where consistent response times matter more than absolute throughput—such as real-time systems or interactive applications—C-SCAN's higher overhead may be justified.

### Algorithm that minimizes seek time: SSTF

Among the four algorithms analyzed, **SSTF unambiguously minimizes seek time** with only 236 tracks of head movement versus 331+ for other algorithms. This **28.7% improvement over SCAN** results from the locally optimal selection at each step. SSTF's greedy approach exploits spatial locality effectively, making it ideal for workloads where requests naturally cluster together.

However, the seek time advantage must be weighed against operational risks. In production environments, starvation represents a serious failure mode that can cause application timeouts, user frustration, and system instability. Therefore, despite its performance advantage, SSTF is rarely used as the sole scheduling algorithm in production operating systems.

### Algorithm providing uniform waiting time: C-SCAN

**C-SCAN provides the most uniform waiting time distribution** among these algorithms. By treating the disk as a circular list and always servicing requests in one direction, C-SCAN ensures that every disk position experiences similar expected delay regardless of location.

Consider the wait time variance: in SCAN, a request arriving at track 10 just after the head passes might wait for the entire upward sweep, the reversal, and most of the downward sweep—potentially the longest wait. A request at track 100 would experience much shorter average wait times. C-SCAN eliminates this positional bias by ensuring the head always "starts fresh" from track 0, treating all positions symmetrically.

This uniformity comes at a cost—the **382-track total movement** is 15.4% higher than SCAN's 331 tracks. Real-world engineering decisions must determine whether consistent user experience justifies this overhead.

---

## Task 6: Engineering judgment and recommendation

### Recommended algorithm for real-world operating systems

For a general-purpose operating system serving diverse workloads, I recommend implementing **a priority-enhanced SCAN algorithm (often called LOOK or C-LOOK) as the default**, with adaptive selection based on workload characteristics.

### Justification based on key criteria

**Performance Consideration:** SCAN achieves **48.3% improvement over FCFS** while avoiding SSTF's starvation risk. In practice, modern implementations use LOOK (which reverses at the last request rather than the disk boundary), saving additional movement. Our SCAN calculation shows 16 wasted tracks traveling from 183 to 199; LOOK would eliminate this inefficiency, reducing total movement to approximately 315 tracks.

**Fairness Consideration:** SCAN's sweep pattern guarantees that every request will be serviced within two complete disk traversals at most. This **bounded waiting time** is crucial for multi-user systems and applications with timing requirements. Unlike SSTF, SCAN cannot starve any request, making it suitable for production environments where reliability matters.

**Workload Behavior Consideration:** Modern systems exhibit diverse I/O patterns:

- **Sequential workloads** (file copying, media streaming): SCAN handles efficiently
- **Random workloads** (databases, virtual machines): SCAN prevents worst-case behavior
- **Mixed workloads** (typical desktops): SCAN provides consistent, predictable performance

For specific deployment scenarios, the recommendation adapts:

|Environment|Recommended Scheduler|Rationale|
|---|---|---|
|Database Server|mq-deadline/deadline|Read prioritization, predictable latency|
|Desktop/Interactive|BFQ (modern) or C-SCAN|Low latency, responsive user experience|
|File Server|SCAN/LOOK|Balanced throughput and fairness|
|NVMe/SSD Storage|NOOP or none|Hardware handles scheduling; minimize overhead|
|Virtualized Guest|NOOP|Let hypervisor optimize across VMs|

### Real-world implementation evidence

This recommendation aligns with industry practice. Linux kernel developers transitioned from CFQ (Completely Fair Queuing) to **mq-deadline** as the default scheduler in kernel 5.0+. mq-deadline extends deadline scheduling concepts (related to SCAN) with read/write prioritization and is explicitly recommended by Red Hat for enterprise workloads.

The Linux BFQ (Budget Fair Queueing) scheduler, designed for interactive desktops, achieves **30% higher throughput than CFQ** on sequential workloads while maintaining low latency—demonstrating that modern implementations successfully balance the performance-fairness trade-off our analysis identified.

### Final engineering recommendation

A well-designed operating system should implement **adaptive scheduling** that:

1. Uses **SCAN/LOOK variants** as the default for HDD storage
2. Switches to **NOOP/none** for SSD/NVMe where seek time is negligible
3. Provides **priority queues** to handle time-critical I/O
4. Allows **workload-specific tuning** for specialized applications

This approach acknowledges that no single algorithm optimally serves all scenarios—the core insight from our comparative analysis. By understanding the fundamental trade-offs between FCFS's fairness, SSTF's efficiency, SCAN's balance, and C-SCAN's uniformity, engineers can make informed decisions appropriate to their specific requirements.

---

## Conclusion

This analysis demonstrates that disk scheduling algorithm selection involves fundamental trade-offs that cannot be eliminated, only managed. **SSTF minimizes seek time** (236 tracks) but risks starvation. **FCFS maximizes fairness** but wastes 63% more head movement. **SCAN and C-SCAN** occupy the practical middle ground suitable for production systems.

The **63.1% performance improvement** from FCFS to SSTF quantifies the value of intelligent scheduling, while the starvation risk quantifies its cost. Modern operating systems resolve this tension through hybrid approaches that combine SCAN's systematic sweep pattern with priority mechanisms and workload-adaptive selection.

For undergraduate understanding, the key insight is that algorithm selection is not about finding the "best" algorithm but about understanding trade-offs and matching algorithm characteristics to system requirements. The calculations performed here—showing FCFS at 640 tracks, SSTF at 236, SCAN at 331, and C-SCAN at 382—provide the quantitative foundation for making these engineering judgments in practice.

---
