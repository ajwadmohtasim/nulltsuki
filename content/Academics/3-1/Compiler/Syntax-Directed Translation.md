---
title: Syntax-Directed Translation
draft: false
tags:
  - Compiler
---
## The General Idea
**Syntax Directed Translation (SDT)** is the framework that lets you attach _meaning_ and _actions_ to your grammar rules, so translation happens _alongside_ parsing. It's how we go from "recognizing syntax" to "doing something useful with it."

Consider the following:
$$
\text{a = b + 3;}
$$
The compiler must be able to check if `b` exists, is it a `int` or `float` type? Compute expression structure, Generate intermediate code, assign memory locations. 
We have **grammars**
$$
\begin{aligned}
&E \rightarrow E + T \\
&T \rightarrow \text{num}
\end{aligned}
$$
But grammars cannot alone solve this problem. Grammars can describe how a valid sentences are formed. A **production** ($E \rightarrow E + T$) can tell us how a non-terminal can be replaced by other symbols, but it doesn't hold the meaning. It defines the structure. **Grammar symbols** is anything that appears in a production. So in order to assign a value to a grammar symbol that can carry semantic information - we have the **Attributes**. 
$$
\begin{aligned}
&\text{E.val} &&\rightarrow \text{value of expression} \\
&\text{E.type} &&\rightarrow \text{data type} \\
&\text{E.code} &&\rightarrow \text{generated code} \\
&\text{id.entry} &&\rightarrow \text{symbol table entry}
\end{aligned}
$$
If $X$ is a symbol and $a$ is one of its attributes, then we write $X.a$ to denote the value of $a$ at a particular parse-tree node labeled $X$. Attributes maybe of any kind: *numbers, types, table references, or strings*, for instance. These attributes can be either **Synthesized** (Computed from children) or **Inherited** (Passed from parent to siblings. More on it later.

We then have the **semantic rules**. Because attributes are alone useless unless we can define how to compute them. 
$$
\begin{aligned}
&E \rightarrow E1 + T \dots [\text{Production}]\\
&E.\text{val} = E1.\text{val} + T.\text{val} \dots [\text{Semantic Rules}]
\end{aligned}
$$
This only describes the relations but it does not specify when to compute.

**Syntax Directed Definition (SDD)** specifies the values of <u>attributes</u> by associating semantic rules with the grammar productions. 

$$
\begin{array}{ll}
\textbf{Production} && \textbf{Semantic Rules} \\ 
\ E \rightarrow E_{1} + T && E.code = E_{1}.code \| T.code \| '+'
\end{array}
$$

**SDT** is the implementation of SDD by embedding semantic actions into grammar productions so that translation happens during parsing. 
![[ParserSDT.png | 550 center]]
This happens with **Syntax-Directed Translation scheme**, it embeds semantic actions within production:
$$
E \rightarrow E + T \{\text{print '+'}\}
$$
Between these two notations (SDD and SDT) - SDD are more readable, useful for specifications. However, translation schemes are more efficient, hence making it suitable for implementations.
$$
\begin{array}{|ccc|}
\hline
E & \longrightarrow & E * E \\
E & \longrightarrow & E + E \\
E & \longrightarrow & \text{tok\_int} \\ \hline
\end{array}
$$
$$
\begin{array}{lcll}
E & \longrightarrow & E_1 * E_2 & \{E.val := E_1.val * E_2.val\} \\
E & \longrightarrow & E_1 + E_2 & \{E.val := E_1.val + E_2.val\} \\
E & \longrightarrow & \text{tok\_int} & \{E.val := \text{atoi(tok\_int.lexeme\_val)}\}
\end{array}
$$
## Attributes
Now that we have a general Idea, we will look into **Attributes**. When dealing with non-terminals, we deal with two types of attributes.
1. Synthesized Attributes
2. Inherited Attributes

**A synthesized attribute** for a nonterminal **A** at a <u>parse-tree</u> node **N** is defined by a semantic rule associated with the production at N. For example - if the production at node N is

$$
E \rightarrow E1 + T
$$
Then the semantic rule would be:
$$
E.val = E1.val + T.val
$$
Note that the production must have A as its ***head***. Meaning, for the above example, we can only define $E.val$ in a rule like $E \rightarrow E1 + T$ but not in a rule like $T \rightarrow T + F$.
A synthesized attribute at node N is defined only in terms of attribute values at the children of N and at N itself.

**An inherited attribute** for a nonterminal **B** at a <u>parse-tree</u> node **N** is defined by a semantic rule associated with the production with <u>the production at parent of N</u>. 
$$
E \rightarrow TE'
$$
The semantic rule would be
$$
E'.inh = T.val
$$
The production must have **B** in it's body (right hand side). Note - we cannot write an inherited rule for $E$ here, because $E$ is the head, not in the body. An inherited attribute at node N is defined only in terms of attribute values at **N**'s parent, **N** itself, and **N**'s siblings
$$
E'.inh=E.inh+T.val
$$
Here, $E.inh$ comes from the parent and $T.val$ comes from a sibling. <u>An inherited attribute cannot use a node’s children, but a synthesized attribute can use the node’s inherited values to compute its result.</u>
**Terminals** can have <u>synthesized attributes, but not inherited attributes</u>. Attributes for terminals have lexical values that are supplied by the lexical analyzer and there are no semantic rules in the SDD itself for computing the value of an attribute for a terminal.

## Annotated Parse Tree
To visualize the translation specified by an SDD, a parse tree can help but a translator need not to actually build it. A parse tree, showing the values of the attributes is called an **annotated parse tree**.

#### **Example - 1**
Consider the following SDD:
$$
\begin{array}{l|l}
\textbf{Production} & \textbf{Semantic Rules} \\ \hline
1)\ L \rightarrow E n & L.val = E.val \\ 
2)\ E \rightarrow E_1 + T & E.val = E_1.val + T.val \\ 
3)\ E \rightarrow T & E.val = T.val \\ 
4)\ T \rightarrow T_1 * F & T.val = T_1.val \times F.val \\ 
5)\ T \rightarrow F & T.val = F.val \\ 
6)\ F \rightarrow ( E ) & F.val = E.val \\ 
7)\ F \rightarrow \textbf{digit} & F.val = \textbf{digit}.\text{lexval} \\ 
\end{array}
$$
It's a familiar grammar for arithmetic expression with operators $+$ and $*$. It evaluates expressions terminated by an end marker $n$. 

Now a annotated parse tree for the input string $3 * 5 + 4n$ would be:

![[3multiply5plus4n.png | 500 center]]
An SDD that involves only synthesized attributes is called **S-attributed**. An S-attributed SDD can be implemented naturally in conjunction with an LR parser. A synthesized attribute can be evaluated using a **post-order traversal**, where the parser first visits all child nodes (leftmost leaf first) and then computes the value at the parent node while moving up to the root.

#### **Example - 2**
$$
\begin{array}{l|l}
\textbf{Production} & \textbf{Semantic Rules} \\ \hline
1)\ T \rightarrow FT' & T'.inh = F.val \\ & T.val = T'.syn \\ 
2)\ T' \rightarrow *FT_{1}' & T_{1}'.inh = T'.inh \times F.val \\ & T'.syn = T_1'.syn \\ 
3)\ T' \rightarrow \epsilon & T'.syn = T'.inh \\ 
4)\ F \rightarrow \textbf{digit} & F.val = \textbf{digit}.\text{lexval} \\
\end{array}
$$
Annotated parse tree for $3 * 5$:
![[3times5sdt.png | 500 center]]


