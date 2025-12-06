---
title: Cyclic Redundancy Check (CRC)
draft:
tags:
---
![[CRC.png]]
A CRC is constructed to generate a 4-bit FCS for an 11-bit message. The generator polynomial is X4 + X3 + 1. a. Draw the shift register circuit that would perform this task (see Figure 6.6). b. Encode the data bit sequence 10011011100 (leftmost bit is the least significant) using the generator polynomial and give the codeword. c. Now assume that bit 7 (counting from the LSB) in the codeword is in error and show that the detection algorithm detects the error.

a. In a CRC error-detecting scheme, choose 10010011011. P1x2 = x4 + x + 1. Encode the bits b. Suppose the channel introduces an error pattern 100010000000000 (i.e., a flip from 1 to 0 or from 0 to 1 in position 1 and 5).What is received? Can the error be detected? c. Repeat part (b) with error pattern 100110000000000