---
title: "8086"
draft: true
tag:
---


![[8086 block diagram.png]]%%  %%

# Flags
%% ![[Flags Registers.png | 700 center]] %%
%% Overlapping %%

%% ![[Nonoverlapping vs Overlapping Segments.png | 600 center]] %%



MOV AX, 1234H
PUSH AX    

Stack segment : Stack Pointer (SS : SP)

Stack Segment Memory r Stack Segment locate kore.
Let's say Stack Segment Memory r 3000H location e ase. 

Erpor amader Stack pointer ase 2000H e. Eita amader offset. 

So, jokhon amara PUSH AX kori, AX er value 16bit e ase jeita 8 bit - 8 bit e separate hoye AL, AH e thake.
AH -> 12
AL -> 34

Stack LIFO follow kore.
So, age AH push kora hoi stack e . 
Stack pointer -1 kore kome. 
Erpor AL push kora hoi. another -1. 

Jokhon POP kora hoi, 
Ulta kaj. 
Age AL ber hoi er por AH.


| Step | Instruction | Action        | SP (Before) | SP (After) | Memory Address                      | Data Stored / Retrieved | Description |
| ---- | ----------- | ------------- | ----------- | ---------- | ----------------------------------- | ----------------------- | ----------- |
| 1    | —           | Initial state | 2000H       | 2000H      | —                                   | —                       | Stack empty |
| 2    | PUSH AX     | SP ← SP − 2   | 2000H       | 1FFEH      | 3000:1FFF = 12H3000:1FFE = 34H      | AX (1234H) pushed       |             |
| 3    | PUSH BX     | SP ← SP − 2   | 1FFEH       | 1FFCH      | 3000:1FFD = 56H3000:1FFC = 78H      | BX (5678H) pushed       |             |
| 4    | POP CX      | SP ← SP + 2   | 1FFCH       | 1FFEH      | Read 3000:1FFC = 78H3000:1FFD = 56H | CX = 5678H              |             |
| 5    | POP DX      | SP ← SP + 2   | 1FFEH       | 2000H      | Read 3000:1FFE = 34H3000:1FFF = 12H | DX = 1234H              |             |