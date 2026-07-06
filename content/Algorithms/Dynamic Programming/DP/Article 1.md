---
title: Introduction to DP
draft:
tags:
---
> Author : Zunayed Iqbal Shahed
# Introduction
Dynamic Programming or DP approach is a clever way to avoid doing repetitive calculations. The core idea is to store the calculations for single time and use them multiple times to make way in order to solve the whole problem. To do so the general concept will be to visualize the problem *in overlapping smaller sub problems*.  This line is written in every website and articles on DP and it is the first thing a beginner gets confused. Thus let's understand it by a simple example:
We are all aware about the Fibonacci number, where we start from 0 and 1 and next numbers are just the sum of previous two numbers giving a sequence like: 0, 1, 1, 2, 3, 5, 8, 13, ..... so on. 

**Question:** What is the n$^{th}$ Fibonacci number?
**Answer:** To solve this problem (suppose n = 5), our first intuition tells us to look what is the answer of n - 1 = 4 and n - 2 = 3, because the sum of f(3) and f (4) is our desired solution f(5). Then again to know what is f(4) we need to look out for f(3) and f(2) and to know what is f(3) we need f(2) and f(1). Formula:
$$
f(n) = f(n - 1) + f(n - 2)
$$
Our problem requires us to answer f(5), but to do so we need to look for the smaller portions f(4), f(3), f(2), f(1) and f(0) right? Let's look it more visually.
![[recursiveTree_Fibb.png]]
Therefore you can notice that to address our problem we are required to address smaller ones first, another thing is also noticeable that smaller problems are called multiple times. f(2) is called 3 times, f(3) 2 times. Why don't we just compute f(2) and f(3) single time, store it somewhere and use call them when asked with just O(1) Time complexity. Saves a lot of computation right? This is DP.
To sum it up, **DP = recognizing that a big problem is made of repeating smaller problems, then refusing to solve those smaller problems more than once.**

# Types of DP
There are two ways to write a DP solution:
1. **Top-Down Approach:** also known as the recursive approach. The above figure is a recursive approach. Why is it top-down? Because we start with the initial value and dig deeper to find it's value. The basic idea is to: write the formula, then come up with a recursive solution. The recursive solution will be:
	```
	long long fib(int n) {
		 if (n <= 1) 
			 return n;
		return fib(n - 1) + fib(n - 2); 
	}
	```
	Then next step is to store those smaller subproblems in a memoization table (typically an array) that we may have to calculate more than once. Here is how you can do this:
	```
	vector<long long int> memo(n + 1, - 1);
	long long fib(int n) {
		 if (n <= 1) 
			 return n;
		if (memo[n] != -1) 
			return memo[n];
		return memo[n] = fib(n - 1) + fib(n - 2); 
	}
	```
	Easy right? We initiate an array named memo with every value being -1, then we check if memo[n] is pre-calculated (if so the result wouldn't be -1) and use it immediately. If not, then we go to the typical recursive approach. This way we avoid doing any repetitive calculations. 
	In a nutshell:
	- Find the recursive formula for your problem
	- Write down the recursive solution
	- Add memoization table or lookup table to avoid repetitive calculations.
	That's it!!! you have a top-down DP solution.

2. **Bottom-Up Approach:** also known as the iterative approach. Here we do the opposite of top-down. We start by determining our base case or smallest possible solution and then build our way all the way to desired position and extract the value. This approach is considered more efficient then the recursive one and many problems like [Grid Paths I](https://cses.fi/problemset/task/1638)  and [Coin Combinations I](https://cses.fi/problemset/task/1635/) can be answered efficiently with this whereas the recursion fails. But bottom-up approach requires extensive thinking and harder to come up with. Now let us solve the Fibonacci problem in bottom-up approach:
	```
	long long fib(int n) {
		if (n <= 1) 
			return n;
		vector<long long> dp(n + 1);
		dp[0] = 0;                    // Base case
		dp[1] = 1;                    // Base case
		for (int i = 2; i <= n; i++) 
			dp[i] = dp[i - 1] + dp[i - 2];
		return dp[n];
	}
	```
	See!! how are we building solution in incremental order from the bottom and to our desired result `n`? 
	To answer in bottom-up approach we need to follow these steps:
	- Define what is are we storing in dp array
	- Define the based cases
	- Define the upper bound up to which we need to calculate
	- Define the formula or logic that will build the ladder to solution
	- Increment step by step towards the desired result.

For more info - [Recursion vs Iteration](https://www.geeksforgeeks.org/dsa/difference-between-recursion-and-iteration/)
For the rest of this article we will solely **focus on the bottom-up or iterative approach** to address our problems.

# How to identify a DP problem?
Look for the below hints in given problems:
- count something (often the number of ways to find something) [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/description/)
- optimization (minimize or maximize) a certain value [Minimizing Coins](https://cses.fi/problemset/task/1634)
- check if something is possible or not [Money Sums](https://cses.fi/problemset/task/1745)
`Note: Just check the question statements. `

# Climbing Stairs Problem Analysis

>[!question] Problem Statement - 1:
>You are climbing a staircase. It takes n steps to reach the top. Each time you climb either 1 or 2 steps at a time. In how many distinct ways can you climb to the top? [ref](https://leetcode.com/problems/climbing-stairs/description/)

**Idea:** The problem at first looks very confusing. Even if we correctly interpret that this is a DP problem, we will most likely get lost about how and what to do right at the beginning? Anyway let us break down step by step on how to address this problem:
- first we decide that we are going for bottom-up solution
- then we define what we will store in dp\[] array.
- The dp\[`i`] array will indicate number of distinct ways to reach i$^{th}$ stair
- Now let's think what is the Base case. If we are on 1$^{st}$ stair there is only one way so dp\[1] = 1; again if we climb no stair then we have only one way, just take no stairs so dp\[0] = 1 also.
- Now comes the main concept, suppose we are on i$^{th}$ stair, then we can say that to find the number of distinct ways it is not important that on which stair we are on, rather how we got there. We can reach i$^{th}$ stair in two distinct way, either from i - 1 $^{th}$ or i - 2 $^{th}$ stair. If we look at a small example, let's say i = 2, then we can reach the 2$^{nd}$ stair by either taking two steps at once or one steps two times which makes dp\[2] = 2. More precisely, we can interpret this as:
$$
\begin{aligned}
dp[2] = dp[2 - 1] + dp[2 - 2]\\
\implies dp[2] = dp[1] + dp[0]\\
\implies dp[2] = 1 + 1\\
\implies dp[2] = 2\\
\end{aligned}
$$
  Thus the answer solely depends on the previous two answers. Now does it sound familiar? Yes, it's the same concept as Fibonacci. The problem is same as the Fibonacci one.
- Formula breaks downs as:
$$
dp[i] = dp[i - 1] + dp[i - 2]
$$
**Solution:**
```
	long long climbStair(int n) {
		if (n <= 1) 
			return n;
		vector<long long> dp(n + 1);
		dp[0] = dp[1] = 0;                 // Base case unlnlike the Fibb
		for (int i = 2; i <= n; i++) 
			dp[i] = dp[i - 1] + dp[i - 2];
		return dp[n];
	}
```

>[!question] Problem Statement - 2: 
>Let us increase the difficulty and add another constraint. Now the query is, in how many distinct ways can you reach n with at most k moves?

**Idea:** In previous question what mattered was from which position you got to stair `i` which could be either from `i - 1` or `i - 2`. But additionally the number of moves we made to reach stair `i` will also matter. Thus we need to make dp array a two dimensional  array where dp\[i]\[j] will denote, the number of distinct ways we can reach to stair `i (0 <= i <= n)` with exactly `j (0 <= j <= k)` moves.
Formula:
$$
dp[i][j] = dp[i - 1][j - 1] + dp[i - 2][j - 1]
$$
You can figure out clearly what is happening here. `j - 1` denotes that we are considering the previous step and to do `j`$^{th}$ move and reach the `i`$^{th}$ stair we can either come from `i - 1`$^{th}$ or `i - 2`$^{th}$ stair. Pretty cool right?
Now before diving into the solution let us consider couple of things first, the Base case would be dp\[0]\[0] = 1 (it implies that with 0 moves and without taking any stairs there is only one distinct way). 
Another important factor to consider is what is the answer? is it dp\[n]\[k]?
The answer is no! Let us consider the example when n = 4 and k = 3:
Possible ways are:

| Path    | Moves |
| ------- | ----- |
| 1+1+1+1 | 4     |
| 1+1+2   | 3     |
| 1+2+1   | 3     |
| 2+1+1   | 3     |
| 2+2     | 2     |

The question asked us *at most K moves are valid*, So dp\[4]\[3] will only give us the answer for number of distinct ways to reach 4$^{th}$ stair with exactly `3` moves. Keep in mind that we are getting the answer for *exactly* `3` moves and not *at most* `3` moves.
What we desire is: 
$$
dp[4][0] + dp[4][1] + dp[4][2] + dp[4][3] \implies 0 + 0 + 1 + 3 \implies 4
$$
Thus the answer becomes:
$$
ans = \sum_{m = \lceil n/2 \rceil}^{k} \binom{m}{n-m}
$$
To put it simply, we need to iterate over `0` to less than or equal to `k` and sum all **dp\[n]\[0...k]**.

**Solution:**
```
	long long climbStair(int n, int k) {
		if (n <= 1) 
			return n;
		vector<vector<long long int>> dp(n + 1, vector<long long>(k + 1, 0));
		dp[0][0] = 1;                 // Base case
		for (int i = 1; i <= n; i++)
			for (int j = 1; j <= k; j++) {
				dp[i][j] += dp[i - 1][j - 1];
				if (i >= 2)  
					dp[i][j] += dp[i - 2][j - 1];
			}
		long long ans = 0;
		for (int j = 0; j <= k; j++)
			ans += dp[n][j];
		cout << ans << '\n';
	}
```
>[!todo] Other Variants
>This two problems can have multiple variants such as instead of asking you how many distinct ways to climb the stairs, it may ask to maximum or minimum number of ways to reach n$^{th}$ stair, it may say you can climb 1, 2 or 3... steps at a time, and even ask of you if it is possible to reach the top with given moves.
>The answer's are quite easy if you understood the above concept's. Try them yourself.

>[!question] One last variant
>There are n stairs. In one move, you may climb 1, 2, 3, ... k stairs. How many ways are there to reach stair n?

# Reference
1. [Errichto Algorithms](https://www.youtube.com/@Errichto)
2. [CP Algorithms](https://cp-algorithms.com/dynamic_programming/intro-to-dp.html)

# Exercise Problems
1. [Frog 1](https://atcoder.jp/contests/dp/tasks/dp_a)
2. [Dice Combinations](https://cses.fi/problemset/task/1633)
3. [Minimizing Coins](https://cses.fi/problemset/task/1634)
4. [Removing Digits](https://cses.fi/problemset/task/1637)