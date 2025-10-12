---
title: 8086 Control Transfer Instructions
draft:
tag:
---
When the instructions are executed sequentially, often times a change/transfer of program control is required. There are `JUMP` and `CALL` instructions that achieves these. But before that we should understand the concept of **FAR** ad **NEAR**.

## FAR and NEAR

If control is transferred to a memory location within the current code segment, it is **NEAR** (also called intrasegment).  If it's outside current code segment, it's **FAR** (intersegment). As `CS:IP` registers always points to address of the next instruction to be executed, they must be updated when a control transfer instruction is executed. During **NEAR** jump, `IP` is updated while `CS` remains same. In **FAR**  jump, the control is passing outside the current code segment - so, both `CS` and `IP`have to be updated. 

## Conditional jumps

In the conditional jump, <u>control is transferred to a new location if a certain condition is met</u>. 