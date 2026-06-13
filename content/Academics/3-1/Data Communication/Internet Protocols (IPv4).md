---
title: Internet Protocols (IPv4)
draft: true
tags:
  - DataCommunication
---
![[IPinTCPIP.png | 500 center]]

**Internet Protocol Version 4** or the **IPv4**, is responsible for <u>packetizing</u>, <u>forwarding</u>, delivery of packets at the network layer. It's a unreliable datagram protocol (a self contained packet that carries everything needed to deliver independently) as it makes no guarantees.  As IPv4 is connectionless, employs a best-effort datagram protocol - it sends independent packets without establishing a connection. If reliability is important, IPv4 must be paired with a reliable transport-layer protocol such as **TCP**.

>The term ***best-effort*** means that IPv4 packets can be corrupted, be lost, arrive out of order, or be delayed, and may create congestion for the network

The **Internet Control Message Protocol version 4 (ICMPv4)** helps IPv4 to handle some errors that may occur in the network-layer deliver.  The **Internet Group Management Protocol (IGMP)** is used to help IPv4 in multicasting. It is a communication method where one sender sends data to a selected group of receivers simultaneously using multicast address (only to the interested members). 

## Datagram Format
![[DatagramFormat.png | 550 center]]

The first 4 bit - **VER** contains the value 4 as it's a IPv4 protocol. The next 4 bits, is the **Header length** (HLEN) contains the total length of the datagram header. When a device receives a datagram, it needs to know when the header stops and when the data (encapsulated in the packet) starts. 

> To fit the header length into 4-bit, the total length of the header is calculated as 4 byte words, then it's divided by 4 and inserted into the field. To retrieve it, one simply needs to multiply it by 4 to find the total length.

The 16-bit **total length** (header + data) field defines the IP datagram in bytes. This field helps the receiver device to know when the packet has completely arrived. 

> [!note] To find the length of the data do 
> $\text{Length of data} = \text{Total Length}-(\text{HLEN})\times 4$

**Identification, Flags, and Fragmentation Offset** are related to **fragmentation** of IP datagram when the size of the datagram is larger than the underlying network can carry. More on it later.

The **Time-to-Live (TTL)** is used to control the maximum number of hops (routers) that maybe be visited by the datagram. This particularly address the situation where a datagram may be circulating the network over and over again due to malfunctioning of routing protocols - creating extra traffic. 

When IP sends a packet, the **actual data (payload)** belongs to another protocol like **TCP or UDP**. IP uses the **Protocol field** to write a small **8-bit number** that says _which protocol this data belongs to_.

- At the **sender**: IP looks at the data, notes whether it’s TCP, UDP, etc., and **puts the protocol number** in the header $\rightarrow$ this is **multiplexing**.
- At the **receiver**: IP reads the protocol number and **hands the data to the correct protocol** $\rightarrow$ this is **demultiplexing**.

![[ProtocolField.png | 550 center]]

As IP is not a reliable protocol; it doesn't check whether the payload is corrupted during transmission. 

IP does **not check errors in the payload** because IP is **unreliable**; payload error checking is handled by **TCP or UDP**. However, the **IP header is critical** for correct delivery, so **IP itself checks only the header** using the **Header Checksum** field.

If the header is corrupted:
- Wrong **destination IP** $\rightarrow$ packet goes to the wrong host    
- Wrong **protocol field** $\rightarrow$ payload goes to the wrong protocol    
- Wrong **fragmentation fields** $\rightarrow$ packet cannot be reassembled    

Because some header fields (like **TTL**) change at **every router**, the **checksum must be recalculated at each router**. The header checksum is a **16-bit value**, computed as the **1’s complement of the sum of all header fields** (using 1’s complement arithmetic).

**<u>Source and Destination Addresses</u>** : These 32-bit source and destination address fields define the IP address of the source and destination respectively.

>[!note]+
>**Payload**, or data, is the main reason for creating a datagram. Payload is the packet coming from other protocols that use the service of IP. Comparing a datagram to a postal package, payload is the content of the package; the header is only the information written on the package.

>[!example]+ **Example**
>In an IPv4 packet, the value of HLEN is $(1000)_2$. How many bytes of options are being carried by this packet?
**Ans**: Total number of bytes in the header is $8 \times 4 = 32$ bytes. The first $20$ bytes are the base header, the next $12$ bytes are the options.

**An important thing to understand now is why the rest $12$ bytes are the options?** 
If we sum up all the bits in our header we would get $120$ bits, which is equal to $20$ bytes. This is the minimum size of the header. Anything extra is part of the Options. A datagram header can have up to $40$ bytes of options, these are used for network testing and debugging.

>**Example:**
>In an IPv4 packet, the value of HLEN is $5$, and the value of the total length field is $(0028)_{16}$. How many bytes of data are being carried by this packet? 
>**Ans**: The HLEN value is 5, which means the total number of bytes in the header is $5 × 4 =  20$ bytes (no options). The total length is $(0028)_{16}$ or $40$ bytes, which means the packet is carrying 20 bytes of data (40 − 20).

>**Example:**
>An IPv4 packet has arrived with the first few hexadecimal digits as shown.
>$$(45000028000100000102\dots)_{16}$$
>How many hops can this packet travel before being dropped? The data belong to what upper-layer protocol?
## Fragmentation

A datagram can travel through different networks. Each router decapsulates the IP datagram from the frame it receives, processes it, and then encapsulates it in another frame. The format and size of the frames depends on the protocols used by the physical network. Each of them has an **MTU (Maximum Transmission Unit)** - the maximum limit of data a single transmission can have. 

In IPv4, when a packet become larger than the MTU, it needs to be fragmented, i.e. divide the datagram. A fragmented datagram may need to be fragmented again if it encounters a network with even lower MTU. 


