---
title: THE TCP-IP PROTOCOL ARCHITECTURE
draft:
tags:
---

TCP / IP 
OSI

TCP is old based on ARPANET
OSI is complex and not matured enough yet... TCP widely used. 

Syntax - Format of data block
Semantics - Control information for that data block
Timing - The packets must go on sequence.


layers of TCP
Physical layer • Network access layer • Internet layer • Host-to-host, or transport layer • Application layer

Physical - sends individual data bits from one node to another node
Network Access Layer - 

TCP/IP applications-
SMTP, FTP, TELNET, HTTP, POP

SMTP - send mail to a dedicated server
POP - from the dedicated server, send back the mail (retrieve)
HTTP - web communication
FTP - file upload, download
TELNET - remote login

TCP and UDP

OSI Layers:
Physical -> Sends individual data bits from one node to another node (HUB)
Data Link -> Sends the frames from one node to another node. (Switches)
Network -> Sends packets from source to destination (Router, IP address)
Transport -> Sends messages from one host to another. ( TCP , UDP)
Session -> Dialog Control and Synchronization. 
Presentation -> Translation, Compression and Encryption. 
Application -> Provides services to the users. (SMTP, FTP, TELNET)
![[OSIvsTCP.png]]

OSI Architecture:
![[OSIArchitecture.png]]




# Transmission Media
![[P2P Guided Media.png]]


