---
title: 8086 Addressing Modes
draft:
tags:
---
The CPU accesses operands(data) in various ways, called **addressing modes**. The number of addressing modes is determined when the microprocessor is designed. The 8086 provides a total of 7 distinct addressing modes.
1. [[#Register Addressing mode|Register]]
2. [[#Immediate Addressing mode|Immediate]]
3. [[#Direct Addressing mode|Direct]]
4. [[#Register indirect addressing mode|Register indirect]]
5. [[#Based relative addressing mode|Based relative]]
6. [[#Indexed relative addressing mode|Indexed relative]]
7. [[#Based indexed addressing mode|Based indexed relative]]


## Register Addressing mode
The register addressing mode involves the <u>use of registers to hold the data</u>. Memory is not accessed during execution - making it relatively fast.
```
Syntax : MOV destination_register, source_register
```
Example:
```
MOV BX,DX       ;copy the contents of DX into BX
MOV ES,AX
ADD AL,BH       ;add the contents of BH to contents of AL
```
*Note : The Source and Destination registers must of same size. A source of 16bit register will throw an error when the destination register is 8 bit. For example* `MOV CL, AX`.

## Immediate Addressing mode
The <u>source operand is a constant</u> (8bit / 16bit data) and when the instruction is assembled, the operand comes immediately after the opcode. 
```
Syntax : MOV register, immediate_value
```
Example:
```
MOV AX,2550H    ;move 2550H into AX
MOV CX,625      ;load decimal value 625 into CX
MOV BL,40H
```
Addressing mode executes quickly but it's use in programming is limited. It can be used to load information into any registers except the segment/flag registers.
To move information to the segment registers, the data requires to be moved to a general-purpose register first and then to segment register. It will produce an error otherwise.
```
MOV AX,2550H
MOV DS,AX

MOV DS,0123H    ;illegal
```
![[Immediate Addressing Mode.png | 700 center]]
## Direct Addressing mode
 Compared to Immediate addressing mode (where the operand itself is provided in the instruction), in direct addressing, the the address of the operand is provided with the instruction.
```
Syntax: MOV register, [offset_address]
```
*Note : The bracket is essential*
Example:
```
MOV DL,[2400]   ;move contents of DS:2400H into DL
```
Here, the data is in some memory location(s) and the address of the <u>data in memory comes immediately after the instruction</u>. This address is offset address and it's <u>physical address can be calculated by <b>shifting left</b> the <b>DS register</b> and adding it to the offset</u>. In the above case, the physical address is calculated by combining the contents of offset at location 2400 with `DS` (Data Segment register). 
![[DirectMemoryAddressing.png | 700 center]]

## Register indirect addressing mode
In the register indirect addressing mode, the <u>address of the memory location where the operand resides is held by a register</u>. The registers used for this purpose are `SI, DI, BP and BX`. These are combined with `DS` to generate the 20-bit physical address.
```
syntax: MOV register, [BX/SI/DI/BP]
```
Example:
```
MOV AL,[BX]     ;moves the contents pointed by DS:BX into AL
```
*Note : The bracket is essential, otherwise it will be interpreted as moving contents in BX register to AL.*
The physical address is calculated by shifting `DS` left one hex position and adding `BX` to it. (Same goes for `SI` or `DI`)

$$
\begin{aligned}
&\text{EA} &&= (\text{BX}) \\
&\text{BA} &&= (\text{DS}) \times 16_{10} \\
&\text{MA} &&= \text{BA} + \text{EA}\\
\\
&(\text{AL}) &&\leftarrow (\text{MA}) 
\end{aligned}
$$
*Register / Memory enclosed in brackets refers to the content inside.*

## Based relative addressing mode
Base registers `BX` and `BP`, as well as a **displacement value** are used to calculate the **Effective Address**. 
```
syntax: MOV register, [BX/BP + displacement]
```
Example:
```
MOV CX,[BX]+10  ;move DS:BX+10 and DS:BX+10+1 into CX
                ;PA = DS(shifted left) + BX + 10
MOV AL,[BP]+5   ;PA = SS(shifted left) + BP + 5
```
*Note :* `[BP]+5`, `[BX]+10` are the effective addresses.
![[Base Relative Addressing.png | 700 center]]
Here, `BX` or `BP` would hold the base value. The displacement value can be an `signed 8-bit` or `unsigned 16-bit` value. Incase of `8-bit` value it's extended to `16-bit` before adding to the base value. The default segment registers used for the calculation of **Physical Address** (PA) are `DS` for `BX` and `SS` for `BP`. <u>The base register provides a reference point, and the displacement adds an offset to that reference</u>. Together, they determine the location of the operand in memory. 
```
MOV AX, [BX + 08H]
```
$$
\begin{aligned}
&0008_{H} &&\leftarrow 08_{H}\space(\text{Sign extended})\\
&\text{EA} &&= (\text{BX})+0008_{H} \\
&\text{BA} &&= (\text{DS}) \times 16_{10} \\
&\text{MA} &&= \text{BA} + \text{EA}\\
\\
&(\text{AX}) &&\leftarrow (\text{MA}) \space \text{or,}\\
&(\text{AL}) &&\leftarrow (\text{MA}) \\
&(\text{AH}) &&\leftarrow (\text{MA + 1}) \\
\end{aligned}
$$


## Indexed relative addressing mode
Works the same as the [[#Based relative addressing mode|based relative addressing]] mode, except that registers `DI` and `SI` hold the offset address.
```
syntax: MOV register, [SI/DI + displacement]
```
Example:
```
MOV DX,[SI]+10  ;PA = DS(shifted left) + SI + 10
MOV CL,[DI]+20  ;PA = DS(shifted left) + D1 + 20

MOV CX,[SI + 0A2H]
```
$$
\begin{aligned}
&\text{FFA2}_{H} &&\leftarrow \text{A2}_{H}\space(\text{Sign extended})\\
&\text{EA} &&= (\text{SI})+\text{FFA2}_{H} \\
&\text{BA} &&= (\text{DS}) \times 16_{10} \\
&\text{MA} &&= \text{BA} + \text{EA}\\
\\
&(\text{CX}) &&\leftarrow (\text{MA}) \space \text{or,}\\
&(\text{CL}) &&\leftarrow (\text{MA}) \\
&(\text{CH}) &&\leftarrow (\text{MA + 1}) \\
\end{aligned}
$$
## Based indexed addressing mode
This is a combination of [[#Based relative addressing mode|based relative addressing]] and indexed relative addressing- called the [[#Indexed relative addressing mode|indexed relative addressing]] mode. <u>In this mode, one base register and one index register are used</u>. Here, the **Effective address** is computed from the sum of base register (`BX` or `BP`), index register (`SI` or `DI`) and a displacement.
```
syntax: MOV register, [base_register][index_register]+displacement
```
Example:
```
MOV CL,[BX][DI]
MOV CH,[BX][SI]+20
MOV AH,[BP][DI]+12
MOV DX,[BP+ SI+ 0AH]
```
$$
\begin{aligned}
&\text{000A}_{H} &&\leftarrow \text{0A}_{H}\space(\text{Sign extended})\\
&\text{EA} &&= (\text{BX})+ (\text{SI})+ \text{000A}_{H} \\
&\text{BA} &&= (\text{DS}) \times 16_{10} \\
&\text{MA} &&= \text{BA} + \text{EA}\\
\\
&(\text{DX}) &&\leftarrow (\text{MA}) \space \text{or,}\\
&(\text{DL}) &&\leftarrow (\text{MA}) \\
&(\text{DH}) &&\leftarrow (\text{MA + 1}) \\
\end{aligned}
$$
