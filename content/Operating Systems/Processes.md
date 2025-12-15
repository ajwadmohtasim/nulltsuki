---
title: Processes
draft: false
tags:
---


## What is a Process?
<u>A process is an instance of a program in execution.</u>
When we write a code and compile it, a executable file (.exe) is stored in non-volatile (SSD, HDD) storage.  When we run the program, the OS loads the executable into the RAM (volatile). This instance of the program is a process and it has it's own memory layout.
![[3_01_Process_Memory.jpg | 200 right]]The process memory layout is divided into 4 sections.

1. The Text section contains the compiled program code, read in from non-volatile storage when the program is launched.
2. The Data section stores global and static variables. These are allocated and initialized prior to execution.
3. The heap is used for dynamic memory allocation, and is managed via calls to new, delete, malloc, free, etc.
4. The stack is used for local variables. Space on the stack is reserved for local variables when they are declared ( at function entrance or elsewhere, depending on the language ), and the space is freed up when the variables go out of scope.

*It's to be noted that, Stack is also used for function return values. However, stack management have some variations depending on the language specific usage. Heap and stack start at opposite ends of the process's free space and grow towards each other. If they ever meet, either a stack overflow will occur or calling of new or malloc will fail due to insufficient memory available.*

## Processes may be in one of 5 states.

The process is created at "**New**" stage. When the process has all the resources available to run, but the CPU is not currently working on this process's instruction - it's in "**Ready**" stage. When the CPU is working on the process - it's in "**Running**" stage, During this transition, the <u>CPU scheduler selects a process from the ready queue, and the dispatcher (or dispatch module) gives control of the CPU to that process</u> (More on CPU Scheduling). If the process needs some event to occur and requires some resources it goes in the "**Waiting**" stage. During this time, it may wait for keyboard input, disk access request, child process to finish etc.  When it finishes and terminates - it's the "**Terminated**" stage.

![[3_02_ProcessState.jpg | 500 center]]

## Process Control Block (PCB)

A PCB is a data structure used by the OS to manage information about a process.
![[3_03_PCB.jpg | 150 right]]For each <u>process</u> there is a Process Control Block, which stores the following process-specific information:

1. Process State
2. Process ID
3. CPU registers and Program Counter
4. CPU-Scheduling information
5. Memory-Management information
6. Accounting information
7. I/O Status information

The PCB is off-limits by the normal users and is stored in a special part of memory (kernel). These are usually stored in a linked-list format and is up for the scheduling queue. The OS puts the PCB on appropriate queues and as the processes are being executed, freed from queue, the OS deallocates the PCB.

## Process Scheduling

The CPU needs to be kept busy at all times and to deliver "acceptable" response times for all programs. That's where process scheduling comes in - it needs to optimize the swapping processes in and out of the CPU by implementing suitable policies.

<u>All processes are stored in the job queue</u> and the processes that are in ready state would be placed in  the <u>ready queue</u>. Processes requiring devices or to deliver data are placed in <u>device queues</u>.

![[3_05_Queues.jpg | 500 center]]

We then have **Schedulers** - who decides which process gets CPU or other resources next. There are 3 levels of Schedulers -

1. Short-Term Scheduling
2. Medium-Term Scheduling
3. Long-Term Scheduling

<u>Short-Term Scheduler</u> decides which available process will be executed by the processor. This runs very frequently, about 100ms, quickly swapping one process out of the CPU with another in.  <u>Medium-Term Scheduler</u> swaps one or more processes out of the ready queue system for few seconds, allowing smaller faster jobs to finish up quickly or to free up RAM. <u>Long-Term Schedulers</u> are typical batch system that decides the pool of processes to be executed by deciding advanced scheduling algorithms. They thereby controls the level of **Multiprogramming**.

*Note that - Ready, Suspend queue and Blocked, Suspended queue are different. Blocked, Suspended queues are Ready processes requiring and I/O event to complete and to free up RAM it is swapped from the Ready Queue. Meanwhile, Ready, suspended processes are only swapped to free up RAMs or to prioritize a smaller-faster job.*
## Context Switch

Whenever there's an interrupt, CPU needs to do a <u>state-save</u> of the current running process, then switches to kernel mode to handle the interrupt and do a <u>state-restore</u> after that.
![[3_04_ProcessSwitch 1.jpg| 500 center]]**Context Switch** is a similar case, which occurs when the <u>time slice</u> for one process is over and a new process is to be loaded from the <u>ready queue</u>. This is caused by a timer interrupt. Saving and restoring states involves saving and restoring all of the registers and program counter(s) and PCBs. Although there's the problem of lost CPU time, context switching needs to be fast as possible. As such, some hardware's are designed specially to speed things up.
## Interprocess Communication (IPC)

Processes need to communicate with each other in many situations. IPC allows that.
<u>Independent Processes</u> running concurrently on a system are not affected by other processes. <u>Cooperating Processes</u> does, and there's a good reason for that :
	It may require information sharing where multiple processes may be accesses the same file (e.g. pipelines). Computation speed can be achieved when a problem is broken down into smaller sub-problems and are to be solved simultaneously (Helps specially when multiple processors are involved).
	A efficient architecture requires it's system to be modular and specially cooperating. For example - client-server database architectures. Lastly - Multitasking, convenient!

![[3_12_CommunicationsModels.jpg | 400 right]]Cooperating processes require some type of IPC which are one of two types:

- (a) Message Passing
- (b) Shared Memory

The Kernel allocates the common memory for **Shared Memories**  and processes can then read/write from it. These are fast once they're set up and requires synchronization mechanisms to avoid conflicts when multiple processes read/write simultaneously. Generally preferred when large amount of information must be shared quickly on the same computer.

**Message passing** requires system calls for every message transfer, slower but safer and simpler. Works well with multiple computers.

#### References

1. [Dr. John T. Bell - Processes](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/3_Processes.html) (Primary Source)
2. [GFG - PCB](https://www.geeksforgeeks.org/operating-systems/process-table-and-process-control-block-pcb/)
3. [Steven Gong - Schedulers](https://stevengong.co/notes/Scheduler)
4. [GFG - IPC](https://www.geeksforgeeks.org/operating-systems/inter-process-communication-ipc/)
