---
title: 8086 Memory Interfacing
draft: true
tags:
---

The commonly used memories in 8086 are
1. ROM
2. Flash (EEPROM)
3. Static RAM (SRAM)
4. Dynamic RAM (DRAM)

The generic pin configuration:
![[8086_memory1-1.gif]]

The number of addresses pins depends on number of memory locations and the data pins depends on the size of the memory location. For example - 8 bit wide memory device would have 8 data bins and for 1M memory locations we would need about $\log_{2}{(1024 \times 1024)}= 20$ addresses pin.

Each memory device has at least one  **chip select (CS) / chip enable (CE) / select (S)** that would enable the memory device, allowing read-write operations. If multiple is present, all must be 0 in order to perform a read/write. RAM generally has one $\overline{CS}$ or $\overline{S}$ input and ROM as at-least one $\overline{CE}$.


Each of them has at-least one control pin.


### temp note
processor in 8086 in min or max mode. 
00000 - FFFFF [RAM intial - ROM end]

For memory interfacing - know address lines, data lines, control lines, chip select.
8086 is 16 bit, $D_0 \rightarrow D_{15}$. The commercially memory devices are in bytes. The memory are stored in layers (ODD and EVEN / LOWER and UPPER). Know the $\overline{BHE}$ and $A_0$ table
Available Memory Space = EPROM + RAM and we need to allocate equal address space in odd and even bank for both EPROM and RAM. 
EPROM - Read operations, RAM - Read and Write

In order to perform read/write operations, 
- Memory access time < read/write time of the processor
- Chip Select signal has to be generated
- Control signals for read/write operations
- Allot address for each memory location