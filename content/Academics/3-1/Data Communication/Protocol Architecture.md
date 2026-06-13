---
title: Protocol Architecture
draft: true
tags:
---

**TCP / IP** is an framework for developing a complete range of computer communications standards. This is widely supported, almost all the computers now. **OSI** or Open System Interconnection is another model that is often used to describe the communication function but is rarely implemented. 

**TCP/IP** has 5 layers.
1. Physical Layer
2. Network Access Layer
3. Internet Layer
4. Transport layer
5. Application Layer

A number of applications have been standardized to operate on top of TCP. 
![[TCP-IP suite.png | 600 center]]

**Simple Mail Transfer Protocol (SMTP)** this provides a mechanism to transfer messages among separate hosts through features like mailing lists, return receipts and forwarding. **File Transfer Protocol (FTP)** allows transfer of files between one system to another upon the user's command. **TELNET** allows the remote login capability. **POP** is another application that helps in retrieving mails from a dedicated server. 

**UDP** is a lightweight, connectionless transport protocol used for sending data quickly without establishing a dedicated connection between sender and receiver. It does not guarantee reliable delivery, ordering or error correction. Real-time application such as online gaming, live streaming are ideal for this type of model.

**OSI** protocol was designed to replace the **TCP/IP** but that didn't happen. The design is complex and within fewer layers TCP/IP was able to get it's job done. 

![[OSI layer.png | 350 right]]In summary:
1. **Physical Layer:** Sends **raw bits** across the medium (e.g., Hubs).
2. **Data Link Layer:** Sends **frames** between nodes. (e.g., Switches).
3. **Network Layer:** Sends **packets** from **source to destination** using **IP & routing** (e.g., Routers).
4. **Transport Layer:** Sends **end-to-end messages**, ensures reliability (TCP/UDP).
5. **Session Layer:** Manages **dialog control** and **session synchronization**.
6. **Presentation Layer:** Handles **data translation, compression, encryption**.
7. **Application Layer:** Provides **network services to users/apps** (HTTP, FTP, SMTP).

The layers in the TCP/IP protocol suite do not exactly match those in the OSI model. The below shows the differences between the layers:
![[OSIvsTCP.png | center|175]]

The OSI model is designed as a strict layered architecture where each layer has a specific function, and the boundaries between services, interfaces, and protocols are clearly defined. This makes the model protocol-independent, meaning it is not tied to any specific technology or network standard. In contrast, the TCP/IP model uses fewer, loosely defined layers and its standards depend heavily on specific protocols like IP, TCP, and UDP. The OSI model theoretically ensures reliable packet delivery and a clean separation of networking tasks, but it was created as a reference model rather than a practical implementation. It does not directly define how real networks interconnect, while TCP/IP was built alongside the development of the Internet itself. For this reason, TCP/IP became more credible and widely accepted in real-world networking, while OSI is mainly used for understanding and teaching the layered approach.

**OSI Architecture**:
![[OSIArchitecture.png | 600 center]]




