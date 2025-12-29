---
title: Syntax Analysis
draft: true
tags:
---
## Notation for a Shift-Reduce Execution

**Grammar Productions:**

$$
\begin{array}{rl}
\mathbf{1.} & E \rightarrow E + T \\
\mathbf{2.} & E \rightarrow T \\
\mathbf{3.} & T \rightarrow T * F \\
\mathbf{4.} & T \rightarrow F \\
\mathbf{5.} & F \rightarrow (E) \\
\mathbf{6.} & F \rightarrow id \\
\end{array}
$$

---

**Parsing Trace:**

$$
\begin{array}{|l|l|l|}
\hline
\textbf{STACK} & \textbf{INPUT} & \textbf{ACTION} \\
\hline
\$ & (id+id)*id\$ & \\
\$( & id+id)*id\$ & \text{Shift} \\
\$(id & +id)*id\$ & \text{Shift} \\
\$(F & +id)*id\$ & \text{Reduce by } F \rightarrow id \\
\$(T & +id)*id\$ & \text{Reduce by } T \rightarrow F \\
\$(E & +id)*id\$ & \text{Reduce by } E \rightarrow T \\
\$(E+ & id)*id\$ & \text{Shift} \\
\$(E+id & )*id\$ & \text{Shift} \\
\$(E+F & )*id\$ & \text{Reduce by } F \rightarrow id \\
\$(E+T & )*id\$ & \text{Reduce by } T \rightarrow F \\
\$(E & )*id\$ & \text{Reduce by } E \rightarrow E + T \\
\$(E) & *id\$ & \text{Shift} \\
\$F & *id\$ & \text{Reduce by } F \rightarrow (E) \\
\$T & *id\$ & \text{Reduce by } T \rightarrow F \\
\$T* & id\$ & \text{Shift} \\
\$T*id & \$ & \text{Shift} \\
\$T*F & \$ & \text{Reduce by } F \rightarrow id \\
\$T & \$ & \text{Reduce by } T \rightarrow T * F \\
\$E & \$ & \text{Reduce by } E \rightarrow T \\
\$E & \$ & \text{Accept} \\
\hline
\end{array}
$$