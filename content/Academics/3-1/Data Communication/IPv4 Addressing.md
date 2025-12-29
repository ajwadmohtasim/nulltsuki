---
title: IPv4 Addressing
draft:
tags:
  - DataCommunication
---
>**Problem 1** \
>An organization is granted a block of addresses with the beginning address $14.24.74.0/24$. The organization needs to have $3$ subblocks of addresses to use in its three subnets: one subblock of $10$ addresses, one subblock of $60$ addresses, and one subblock of $120$ addresses. Design the subblocks.

**Ans:** Host bits, $32 - 24 = 8$. So we have total $2^8 = 256$ addresses and our address range is $14.24.74.0$ - $14.24.74.255$
![[Ipaddressingexample18.5a.png | 600 center]]
The general rule is to assign the largest block first to avoid fragmentation.
For the first block, we need to consider the range in which it falls on.
$120$ addresses would require a $7$ bits host (Prefix : $/25$).  So Usable Hosts $128-2 = 126$. This is because, a subnet itself has it's own Broadcast address. 
$14.24.74.0$ is the starting address for both the NET and SUBNET, it's possible. However, the SUBNET/SUBBLOCK's broadcast address would be: 
$$
\begin{aligned}
\text{IP Address}   &: 00001110.00011000.01001010.0\underline{0000000} \\
\text{Subnet Mask}  &: 11111111.11111111.11111111.10000000 \\
\hline
\text{Network address} &: 00001110.00011000.01001010.\underline{0}0000000 \\
& = 14.24.74.0 \\
\text{Broadcast address}&: 00001110.00011000.01001010.0\underline{1111111} \\
& = 14.24.74.127
\end{aligned}
$$
So, the next block will start at $14.24.74.128$ and so on.
Here's the final table:

| Required Hosts | Subblock | Network Address | Prefix | Address Range                 |
| -------------- | -------- | --------------- | ------ | ----------------------------- |
| $120$ (128)    | Subnet 1 | $14.24.74.0$    | $/25$  | $14.24.74.0 –14.24.74.127$    |
| $60$ (64)      | Subnet 2 | $14.24.74.128$  | $/26$  | $14.24.74.128 – 14.24.74.191$ |
| $10$ (16)      | Subnet 3 | $14.24.74.192$  | /$28$  | $14.24.74.192 – 14.24.74.207$ |


