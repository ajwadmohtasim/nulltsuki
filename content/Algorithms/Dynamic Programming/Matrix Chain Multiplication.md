---
title: Matrix Chain Multiplication
draft: false
tags:
  - DynamicProgramming
---
## Matrix Chain
Consider a chain of Matrices $M_1,M_2, ... Mn$. We wish to compute the product of it. Or in other words, do a **chain multiplication**.
This algorithm aims to optimize the problem in an efficient way to multiply in a specific sequence. 

Matrix Multiplication is **associative**, and thus there are multiple ways to approach this problem yielding the same result. 
The problem lies with the computational complexity. A $X\times Y$ into $Y\times Z$ requires about $X(Y-1)Z$ ordinary additions. 

For example :
Consider Matrices $A,B,C$ with dimensions $10\times100, 100\times5, 5\times50$.
 ![[MatrixChainComplexity.png| 700 center]]%%  %%
For higher chain of matrices and dimensions, computation complexity may increase exponentially. 
Since our aim is to understand the optimized parenthesizing of the expression, one way to solve is applying the brute force approach. But the set of all parenthesizations increases exponentially as the chain gets bigger. The number of ways to fully parenthesize a product of $n$ matrices is given by the $(n-1)-th$ Catalan number: 
$$C_{n-1} = \frac{1}{n} \binom{2(n-1)}{n-1}$$The optimization? **Dynamic programming** comes to clutch. 

We are looking for a **optimal substructure**. An interesting property here is that, if we say $(A\times ((B \times C) \times D))$ is an optimal expression, then $((B \times C) \times D)$ is optimal as well. So does $(B \times C)$.
By minimizing the sub parenthesis expressions, we can move forward to the larger one. Here's where we use the Dynamic Approach. 
## How can we define the Optimal Substructure in Matrix-Chain Parenthesization? 
We define each parenthesis as a split. if $ABCD$ is a matrix chain, a split may be $(A)(BCD)$ or $(AB)(CD)$ or $(ABC)(D)$. This splits needs to be minimum in order to have $ABCD$ minimum as well. By framing the split as a function of $f(i,k)$ we can calculate the minimum number of operations to multiply the sequence of $i,k$. 
For the example $(AB)(CD)$ we get a split of $f(0,1) + f(2,3)$.

Now we can represent the matrices as an Array where $M_i \times ... \times M_j$ is the left split and $M_{j+1} \times ..... \times M_k$ is the right split. 
If we know the optimal way to multiply sub chains $M_i \dots M_j$ and $M_{j+1} \dots M_k$, we can combine them optimally by minimizing:

$$\text{Cost} = \text{Cost of } (M_i \dots M_j) + \text{Cost of } (M_{j+1} \dots M_k) + \text{Cost to multiply the two results}$$

Our Final Result will be $M_{i,j} \times M_{j+1,k}$ , where for each of the split, they require $r_i \times c_j \times c_k$ operations. 
So our final formula stands as 

$$f(i, k) = \begin{cases} 0 & \text{if } i = k \quad \text{(cost of one matrix is zero)} \\ \min\limits_{i \leq j < k} \left( f(i, j) + f(j+1, k) + p_{i-1} \cdot p_j \cdot p_k \right) & \text{if } i < k \end{cases}$$

Note that, we store the dimension as an Array. For $n$ Matrices we have about $(n+1)$ elements in array $p$ . So $r_i$ is by convention is stored as $p_{i-1}$ .
$$
\begin{array}{|c|c|c|}
\hline
\textbf{Matrix} & \textbf{Rows} & \textbf{Columns} \\
\hline
M_1 & p_0 & p_1 \\
M_2 & p_1 & p_2 \\
M_3 & p_2 & p_3 \\
\vdots & \vdots & \vdots \\
M_n & p_{n-1} & p_n \\
\hline
\end{array}
$$
We could implement this recursive formula in **top-down** but that could result in an **exponential runtime**. There are multiple times, the sequence may be called and so, we compute the table $m[i, j]$ **bottom up**, a better approach. 
## Recurrence Relation in a 2D Table - top down or bottom up?

To further visualize the problem, below is visual representation of the split $(AB)(CD)$ : $f(0,1) + f(2,3)$ in a **2D table** - $m[n][n]$. 
The objective of this table is to hold the answer at the top right of the table: $$m[i,j] = A_{ik} \times A_{(k+1)j}$$
![[MatrixChainMulti2DTable.png | center]]
The recursive-call further splits it to the base cases. The next split case where $(ABC)(D)$ : $f(0,2) + f(3,3)$ calls further splits on the base cases. For now the base cases are 0 as self multiplication isn't possible. 

![[MatrixChainMulti2DTable2.png | right ]]**Top Down Tabulation** is always a way to implement the DP approach. However, **Bottom up** does something better. 
We can observe another property here if we flip the table. That is, the diagonals actually maintains the subsequence chain length. 
And those are dependent on the lower diagonals. 

The idea is to fill up all the bases cases equal to zero first. Then, proceed in increasing order of the subsequence length from 1 to $n$ inclusive.
We call this as length $l$. 
We work our way up from the bottom to check for each split. 
## Bottom Up Implementation
```
Input: 
    n         # Number of matrices
    p[0..n]   # Dimensions array where matrix A_i has dimensions p[i-1] x p[i]

# Create a 2D DP table to store minimum multiplication cost
Let m[1..n][1..n] be a new 2D array

# Base case: cost of multiplying one matrix is 0
for i = 1 to n do
    m[i][i] = 0

# l = current chain length (start from 2 up to n)
for l = 2 to n do 
    # i = starting matrix index
    for i = 1 to n - l + 1 do 
        j = i + l - 1    # j = ending matrix index
        m[i][j] = ∞      # Initialize with infinity for min comparison

        # Try all possible split points
        for k = i to j - 1 do
            # Cost of splitting at k: left part + right part + cost of final multiplication
            cost = m[i][k] + m[k+1][j] + p[i-1] * p[k] * p[j]
            
            # Store the minimum cost
            if cost < m[i][j] then
                m[i][j] = cost

# The answer is the minimum cost to multiply the entire chain from matrix 1 to matrix n
return m[1][n]
```

## Complexity
Our table is of $n\times n$  dimension, and we only require $n^2 / 2$ subproblems to be calculated. And as we said before, we also need to try all the possible split points to find the minimum split (our subproblems) which takes around *n* iterations. So our final time complexity stands as: $$O(n^2/2 + n) = O(n^3)$$
Below is a overview table of our algorithm approaches:

| Aspect                | Top-Down (Memoization)                       | Bottom-Up (Tabulation)                  |
| --------------------- | -------------------------------------------- | --------------------------------------- |
| Time Complexity       | $O(n^3)$                                     | $O(n^3)$                                |
| Space Complexity      | $O(n^2)$ (DP table) + recursion stack $O(n)$ | $O(n^2)$                                |
| Overhead              | Recursive calls, function call stack         | Pure iteration                          |
| Subproblem order      | On-demand (non-deterministic order)          | Systematic (smallest subproblems first) |
| Debuggability         | Slightly harder due to recursion             | Easier                                  |
| Practical Performance | Slightly slower due to recursion overhead    | Usually faster                          |
