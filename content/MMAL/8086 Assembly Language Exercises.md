---
title: 8086 Assembly Language Exercises
draft:
tag:
---

### **`JG` (Jump if Greater)** is a conditional jump in assembly:
- Used **after a `CMP` instruction**.
- Jumps to the specified label if the **first operand is greater than the second operand**, treating them as **signed numbers**.
- Checks **ZF = 0** and **SF = OF**.
Example:
```
CMP AL, BL
JG GREATER   ; Jump here if AL > BL (signed)
```
- If `AL > BL` → jump taken
- If `AL ≤ BL` → continue sequentially

### **`JE` (Jump if Equal)** is a conditional jump in assembly:
- Used **after a `CMP` instruction**.
- Jumps to the specified label if the **two compared operands are equal**.
- Checks **ZF = 1** (Zero Flag).
Example:
```
CMP AL, BL
JE EQUAL     ; Jump here if AL == BL
```
- If `AL = BL` → jump taken
- If `AL ≠ BL` → continue sequentially



## 1. Write an ASML code to calculate the result of the number series below and store the result in the accumulator register.
$$
1+3+5+7+9+\dots+15
$$

```
.MODEL SMALL
.STACK 100H
.DATA
.CODE

MAIN PROC
    MOV AL, 1       ; Initialize AL with first term of series (1)
    MOV BL, 3       ; Initialize BL with next odd number (3)
    
NEXT:
    ADD AL, BL      ; Add current odd number to sum in AL
    CMP BL, 15      ; Check if current number is 15
    JE END          ; If yes, end loop
    ADD BL, 2       ; Move to next odd number
    
LOOP NEXT          ; Decrement CX (implicitly used by LOOP), repeat NEXT

END:
    HLT             ; Stop execution

MAIN ENDP
END MAIN
```


## 2. Write an ASML code to calculate the result of the number series below and store the result in the accumulator register.
$$
1^2+2^2+3^2+4^2+\dots+9^2
$$
```
.MODEL SMALL
.STACK 100H
.DATA
.CODE

MAIN PROC
    MOV BX, 1       ; Initialize BX with first number (1)
    XOR SI, SI      ; Clear SI to store the sum of squares
    
NEXT:
    MOV AX, BX      ; Move current number into AX for multiplication
    MUL BX          ; AX = BX * BX (square of current number)
    ADD SI, AX      ; Add square to sum in SI
    CMP BX, 9       ; Check if current number is 9
    JE END          ; If yes, end loop
    INC BX          ; Increment BX for next number
    
LOOP NEXT          ; Decrement CX (implicitly) and repeat NEXT

END:
    MOV AX, SI      ; Move final sum into AX
    HLT             ; Stop execution

MAIN ENDP
END MAIN
```

`SI` (Source Index) is a 16-bit general-purpose register used here to **accumulate the sum of squares**. Before starting the additions, we clear SI using `XOR SI, SI`, which sets it to 0. This ensures the register starts from a known value. Using `XOR SI, SI` is preferred over `MOV SI, 0` because it is **shorter, faster, and more efficient**.

To do the same with cubic numbers:
$$
1^3+2^3+3^3+4^3+\dots+9^3
$$
We can simply `MUL BX` a second time to get the result.
```
NEXT:
    MOV AX, BX 
    MUL BX
    MUL BX          ; AX = BX * BX * BX
```
## 3. Two 8 bit Hexadecimal numbers are given as 29H and 41H. Write an assembly language code to measure which number is smaller between two numbers. The smaller number will then move to BL register and bigger number to BH register.

```
.STACK 100H
.DATA
    NUM1 DB 29H      ; First 8-bit number
    NUM2 DB 41H      ; Second 8-bit number
    
.CODE
MAIN PROC
    MOV AX, @DATA    ; Load address of data segment
    MOV DS, AX       ; Initialize DS to access .DATA variables
    
    MOV AL, NUM1     ; Load NUM1 into AL
    MOV AH, NUM2     ; Load NUM2 into AH
    CMP AL, AH       ; Compare AL and AH
    JG GREATER       ; Jump if AL > AH (signed)
    JL SMALLER       ; Jump if AL < AH (signed)
    
GREATER:
    MOV BH, AL       ; Store bigger number in BH
    MOV BL, AH       ; Store smaller number in BL
    HLT              ; Stop execution
    
SMALLER:
    MOV BH, AH       ; Store bigger number in BH
    MOV BL, AL       ; Store smaller number in BL
    HLT              ; Stop execution

MAIN ENDP
END MAIN
```

We do
```
MOV AX, @DATA
MOV DS, AX
```
to **tell the CPU where our data segment starts**. Without this, the CPU wouldn’t know where `VAL1` or `VAL2` are stored, and any access to variables in `.DATA` would fail.
- `@DATA` → address of the data segment.
- `MOV AX, @DATA` → put that address in AX.
- `MOV DS, AX` → load the Data Segment register so we can access `.DATA` variables correctly.
## 4. Write an ASML code to find out the even and odd number among two 8 bit numbers. Store the odd number and the even number in the same register.

$$
\begin{array}{c c c c c c c c}
\text{Number (Decimal)} & \text{Binary (8-bit)} & \text{AND with 1} & \text{Result} & \text{Zero Flag (ZF)} & \text{Odd/Even} \\
\hline
4 & 00000100 & 00000100 \ \& \ 00000001 & 00000000 & 1 & \text{Even} \\
7 & 00000111 & 00000111 \ \& \ 00000001 & 00000001 & 0 & \text{Odd} \\
10 & 00001010 & 00001010 \ \& \ 00000001 & 00000000 & 1 & \text{Even} \\
13 & 00001101 & 00001101 \ \& \ 00000001 & 00000001 & 0 & \text{Odd} \\
\end{array}
$$

In order to find out if a number is even, we need to know if that number's LSB is zero or not. This is where we use the masking. This can be achieved using `TEST` command. Let us consider, 
$$
\text{AL in binary: } AL = 25_{16} = 0010\ 0101_2, \quad 
\text{Mask: } 1_{16} = 0000\ 0001_2.
$$
The instruction `TEST AL, 1` would performs a bitwise AND between AL and 1, but would not store the result. It only affects the flags.  
$$
\underline{0010\ 0101 \ \& \ 0000\ 0001 = 0000\ 0001}
$$
Since the result is nonzero, the Zero Flag (ZF) = 0, meaning AL is odd. Therefore, the jump `JZ EVEN` is not taken. 
Since we're told to put those odd and even numbers in the same register, we can achieve it by putting it in `CX -> CH : CL`
As a result, the registers are updated as follows:  
$$
CL = AL = 25_{16}, \quad CH = BL = 3C_{16}.
$$

$$
\begin{array}{|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|}
\hline
15 & 14 & 13 & 12 & 11 & 10 & 9 & 8 & 7 & 6 & 5 & 4 & 3 & 2 & 1 & 0 \\
\hline
 &  &  &  & OF & DF & IF & TF & SF & \cellcolor{black}{\color{white}ZF} &  & AF &  & PF &  & CF \\
\hline
\end{array}
$$

In the below code, `TEST AL, 1` checks the least significant bit (LSB) of `NUM1` to determine if it’s odd or even. If the LSB is 0 (meaning the number is even), the result of `TEST` is 0 and the **Zero Flag (ZF)** is set. `JZ EVEN` then jumps to the `EVEN` label only when ZF = 1, so the program executes the `EVEN` block for even numbers and continues sequentially for odd numbers.

```
.MODEL SMALL
.STACK 100H
.DATA
    NUM1 DB 25H      ; First 8-bit number
    NUM2 DB 3CH      ; Second 8-bit number
.CODE
MAIN PROC
    MOV AX, @DATA    ; Load address of data segment
    MOV DS, AX       ; Initialize DS to access .DATA variables

    MOV AL, NUM1     ; Load NUM1 into AL
    MOV BL, NUM2     ; Load NUM2 into BL

    TEST AL, 1       ; Check if NUM1 is odd or even (LSB)
    JZ EVEN          ; Jump if NUM1 is even
    MOV CL, AL       ; NUM1 is odd → store in CL
    MOV CH, BL       ; NUM2 (even) → store in CH
    JMP DONE         ; Skip EVEN block

EVEN:
    MOV CL, BL       ; NUM2 is odd → store in CL
    MOV CH, AL       ; NUM1 (even) → store in CH

DONE:
    HLT              ; Stop execution

MAIN ENDP
END MAIN
```



## 5. Write an ASML code to find the factorial of 7. Store the result in a 16 bit register and perform a NOT operation. 

```
.MODEL SMALL
.STACK 100H
.DATA
.CODE
MAIN PROC
    MOV AX, 1       ; Initialize AX = 1 (factorial accumulator)
    MOV CX, 7       ; Counter = 7 for factorial of 7
    
FACT:
    MUL CX          ; Multiply AX by CX (AX = AX * CX)
    LOOP FACT       ; Decrement CX and repeat until CX = 0

    NOT AX          ; Perform bitwise NOT on the result
    HLT             ; Stop execution

MAIN ENDP
END MAIN
```

## 6. Give a logic instruction to do each of the following:
- **Clear the even numbered bits of AX, leaving the other unchanged. (AX = 2341H)**
- **Set the most and least significant bits of BL, leaving other bits unchanged. (BL = 31H)**
$$
\begin{array}{rcl}
\text{AX in binary:} & & 2341_{16} = 0010\ 0011\ 0100\ 0001 \\
\text{Mask (5555H):} & & 5555_{16} = 0101\ 0101\ 0101\ 0101 \\
\\ \text{Bitwise AND:} & &{
\begin{array}{c}
0010\ 0011\ 0100\ 0001 \\ 
0101\ 0101\ 0101\ 0101 \\ 
\hline
0000\ 0001\ 0100\ 0001
\end{array}
} \\
\text{Result:} & & AX = 0141_{16} \\
\\
\text{BL in binary:} & & 31_{16} = 0011\ 0001 \\
\text{Mask (81H):} & & 81_{16} = 1000\ 0001 \\
\\ \text{Bitwise OR:} & &{
\begin{array}{c}
0011\ 0001 \\ 
1000\ 0001 \\ 
\hline
1011\ 0001
\end{array}
} \\
\text{Result:} & & BL = B1_{16} \\
\end{array}
$$


```
.MODEL SMALL
.STACK 100H
.DATA
    VAL1 DW 2341H    ; 16-bit value for bitwise AND operation
    VAL2 DB 31H      ; 8-bit value for bitwise OR operation
.CODE
MAIN PROC
    MOV AX, @DATA    ; Load address of data segment
    MOV DS, AX       ; Initialize DS to access .DATA variables

    ; (a) Clear even-numbered bits of AX
    MOV AX, VAL1     ; Load original value into AX
    AND AX, 5555H    ; Mask: 0101 0101 0101 0101 → clears all even bits

    ; (b) Set most and least significant bits of BL
    MOV BL, VAL2     ; Load original value into BL
    OR BL, 81H       ; Mask: 1000 0001 → sets MSB and LSB, leaves others unchanged

    HLT              ; Stop execution
MAIN ENDP
END MAIN
```
## 7. Suppose DH contains 2AH and CL contains 3. Write the code to shift the value to left and observe the value of CF.

```
;Shift the value in DH left by the count in CL
;CF (Carry Flag) stores the last bit shifted out

.MODEL SMALL
.STACK 100H
.DATA
.CODE
MAIN PROC
    MOV DH, 2AH      ; 2A = 00101010b
    MOV CL, 3        ; Shift left by 3 bits
    SHL DH, CL       ; Shift operation
    ;CF now contains the last bit shifted out
    HLT
MAIN ENDP
END MAIN
```