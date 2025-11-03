---
title: 0-1 Knapsack
draft: true
tags:
  - DynamicProgramming
---

We're presented with $n$ items with $weight$ and $profit$ associated with it. Given a knapsack(A bag) of Capacity $C$, we want to maximize our profit by taking some $x$ amount of items. There's a catch, when selecting an item, we can either take the whole item or not take it at all. Lastly, no items can be selected more than once. 
So, we end up with:
- $\text{P [ ]}$ : Array containing the profit of items
- $\text{W [ ]}$ : Array containing the weight of items
- $n, C$

## The Brute force approach
In a brute force approach, we would generate all the possible subsets of items that can be picked under our capacity. Our solution would be subset having the maximum profit.


**The question arise, how are we going to generate the subset?**
We define the function $\text{kanpsack(P[ ], W[ ], n, C)}$ to find the maximum profit for $n$ items.

**Case 1: Where we include the $n^{th}$ item.**
$$\text{profit} = \begin{cases} \text{P[n-1]} + \text{knapsack(P[ ], W[ ], n-1, C-W[n-1])} & \text{if C >= W[n-1]} \\ dp[i-1][w] & \text{if } w_i > w \\ \max(dp[i-1][w], dp[i-1][w-w_i] + v_i) & \text{if } w_i \leq w \end{cases}$$



$$dp[i][w] = \begin{cases} 0 & \text{if } i = 0 \text{ or } w = 0 \\ dp[i-1][w] & \text{if } w_i > w \\ \max(dp[i-1][w], dp[i-1][w-w_i] + v_i) & \text{if } w_i \leq w \end{cases}$$

# 0/1 Knapsack Problem: Complete Guide with C++ Implementation

## 1. Problem Statement and DP Approach Notation
### Problem Statement
Given a knapsack with capacity **W** and **n** items, where each item **i** has:
- Weight: $w_i$
- Value: $v_i$

Find the maximum value that can be obtained by selecting items such that their total weight doesn't exceed **W**. Each item can be selected at most once (0/1 constraint).

### Mathematical Notation
- **n**: Number of items
- **W**: Knapsack capacity
- $w_i$: Weight of item i (1 ≤ i ≤ n)
- $v_i$: Value of item i (1 ≤ i ≤ n)
- $x_i$: Binary decision variable (1 if item i is selected, 0 otherwise)

### Objective Function
Maximize: $\sum_{i=1}^{n} v_i \cdot x_i$
Subject to: $\sum_{i=1}^{n} w_i \cdot x_i \leq W$ and $x_i \in {0, 1}$

## 2. DP Formulation

### State Definition
Let $dp[i][w]$ represent the maximum value achievable using the first **i** items with knapsack capacity **w**.
### Recurrence Relation

$$dp[i][w] = \begin{cases} 0 & \text{if } i = 0 \text{ or } w = 0 \\ dp[i-1][w] & \text{if } w_i > w \\ \max(dp[i-1][w], dp[i-1][w-w_i] + v_i) & \text{if } w_i \leq w \end{cases}$$

### Base Case
- $dp[0][w] = 0$ for all w (no items selected)
- $dp[i][0] = 0$ for all i (no capacity available)

## 3. Top Down vs Bottom Up Approaches

### 3.1 Top Down (Memoization)
```cpp
#include <iostream>
#include <vector>
#include <cstring>
using namespace std;

class KnapsackTopDown {
private:
    vector<int> weights, values;
    vector<vector<int>> memo;
    int n, W;
    
public:
    KnapsackTopDown(vector<int>& w, vector<int>& v, int capacity) 
        : weights(w), values(v), W(capacity), n(w.size()) {
        memo.assign(n + 1, vector<int>(W + 1, -1));
    }
    
    int solve(int i, int w) {
        // Base case
        if (i == 0 || w == 0) return 0;
        
        // Check memoization
        if (memo[i][w] != -1) return memo[i][w];
        
        // If current item's weight exceeds capacity
        if (weights[i-1] > w) {
            memo[i][w] = solve(i-1, w);
        } else {
            // Choose maximum of including or excluding current item
            int exclude = solve(i-1, w);
            int include = values[i-1] + solve(i-1, w - weights[i-1]);
            memo[i][w] = max(exclude, include);
        }
        
        return memo[i][w];
    }
    
    int knapsack() {
        return solve(n, W);
    }
};
```

**Time Complexity**: $O(n \times W)$ **Space Complexity**: $O(n \times W)$ + $O(n)$ for recursion stack

### 3.2 Bottom Up (Tabulation)
```cpp
class KnapsackBottomUp {
private:
    vector<int> weights, values;
    int n, W;
    
public:
    KnapsackBottomUp(vector<int>& w, vector<int>& v, int capacity) 
        : weights(w), values(v), W(capacity), n(w.size()) {}
    
    int knapsack() {
        vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
        
        // Fill the DP table
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= W; w++) {
                if (weights[i-1] <= w) {
                    dp[i][w] = max(dp[i-1][w], 
                                   dp[i-1][w - weights[i-1]] + values[i-1]);
                } else {
                    dp[i][w] = dp[i-1][w];
                }
            }
        }
        
        return dp[n][W];
    }
};
```

**Time Complexity**: $O(n \times W)$ **Space Complexity**: $O(n \times W)$

### Comparison: Top Down vs Bottom Up

|Aspect|Top Down|Bottom Up|
|---|---|---|
|**Approach**|Recursive with memoization|Iterative table filling|
|**Space**|$O(n \times W)$ + recursion stack|$O(n \times W)$|
|**Implementation**|More intuitive, closer to problem definition|Requires understanding of build order|
|**Performance**|Slightly slower due to function calls|Faster, no recursion overhead|
|**Stack Overflow Risk**|Yes, for large inputs|No|

## 4. Space Optimized 1D Bottom Up Approach

Since $dp[i][w]$ only depends on $dp[i-1][*]$, we can optimize space to $O(W)$.
```cpp
class KnapsackSpaceOptimized {
private:
    vector<int> weights, values;
    int n, W;
    
public:
    KnapsackSpaceOptimized(vector<int>& w, vector<int>& v, int capacity) 
        : weights(w), values(v), W(capacity), n(w.size()) {}
    
    int knapsack() {
        vector<int> dp(W + 1, 0);
        
        for (int i = 0; i < n; i++) {
            // Traverse from right to left to avoid using updated values
            for (int w = W; w >= weights[i]; w--) {
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
        
        return dp[W];
    }
};
```

**Time Complexity**: $O(n \times W)$ **Space Complexity**: $O(W)$

### Why Traverse from Right to Left?

When we update `dp[w]`, we use `dp[w - weights[i]]`. If we traverse left to right, `dp[w - weights[i]]` might already be updated for the current item, leading to incorrect results (using the same item multiple times).

## 5. Backtracking the Item Picked Elements

To track which items were selected, we need to reconstruct the solution from the DP table.

```cpp
class KnapsackWithBacktrack {
private:
    vector<int> weights, values;
    vector<vector<int>> dp;
    int n, W;
    
public:
    KnapsackWithBacktrack(vector<int>& w, vector<int>& v, int capacity) 
        : weights(w), values(v), W(capacity), n(w.size()) {
        dp.assign(n + 1, vector<int>(W + 1, 0));
    }
    
    int knapsack() {
        // Fill DP table
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= W; w++) {
                if (weights[i-1] <= w) {
                    dp[i][w] = max(dp[i-1][w], 
                                   dp[i-1][w - weights[i-1]] + values[i-1]);
                } else {
                    dp[i][w] = dp[i-1][w];
                }
            }
        }
        
        return dp[n][W];
    }
    
    vector<int> getSelectedItems() {
        vector<int> selected;
        int i = n, w = W;
        
        while (i > 0 && w > 0) {
            // If value came from including current item
            if (dp[i][w] != dp[i-1][w]) {
                selected.push_back(i-1); // 0-indexed item
                w -= weights[i-1];
            }
            i--;
        }
        
        reverse(selected.begin(), selected.end());
        return selected;
    }
    
    void printSolution() {
        int maxValue = knapsack();
        vector<int> selected = getSelectedItems();
        
        cout << "Maximum value: " << maxValue << endl;
        cout << "Selected items (0-indexed): ";
        for (int item : selected) {
            cout << item << " ";
        }
        cout << endl;
        
        int totalWeight = 0, totalValue = 0;
        for (int item : selected) {
            totalWeight += weights[item];
            totalValue += values[item];
        }
        cout << "Total weight: " << totalWeight << endl;
        cout << "Total value: " << totalValue << endl;
    }
};
```

**Time Complexity**: $O(n \times W)$ for DP + $O(n)$ for backtracking = $O(n \times W)$ **Space Complexity**: $O(n \times W)$

## 6. Combined Implementation

Here's a comprehensive class that combines all approaches:
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cstring>
using namespace std;

class KnapsackSolver {
private:
    vector<int> weights, values;
    int n, W;
    
public:
    KnapsackSolver(vector<int>& w, vector<int>& v, int capacity) 
        : weights(w), values(v), W(capacity), n(w.size()) {}
    
    // Method 1: Top-down with memoization
    int solveTopDown() {
        vector<vector<int>> memo(n + 1, vector<int>(W + 1, -1));
        return topDownHelper(n, W, memo);
    }
    
    int topDownHelper(int i, int w, vector<vector<int>>& memo) {
        if (i == 0 || w == 0) return 0;
        if (memo[i][w] != -1) return memo[i][w];
        
        if (weights[i-1] > w) {
            memo[i][w] = topDownHelper(i-1, w, memo);
        } else {
            memo[i][w] = max(topDownHelper(i-1, w, memo),
                            values[i-1] + topDownHelper(i-1, w - weights[i-1], memo));
        }
        return memo[i][w];
    }
    
    // Method 2: Bottom-up with full table
    pair<int, vector<int>> solveBottomUpWithItems() {
        vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
        
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= W; w++) {
                if (weights[i-1] <= w) {
                    dp[i][w] = max(dp[i-1][w], 
                                   dp[i-1][w - weights[i-1]] + values[i-1]);
                } else {
                    dp[i][w] = dp[i-1][w];
                }
            }
        }
        
        // Backtrack to find items
        vector<int> selected;
        int i = n, w = W;
        while (i > 0 && w > 0) {
            if (dp[i][w] != dp[i-1][w]) {
                selected.push_back(i-1);
                w -= weights[i-1];
            }
            i--;
        }
        reverse(selected.begin(), selected.end());
        
        return {dp[n][W], selected};
    }
    
    // Method 3: Space optimized
    int solveSpaceOptimized() {
        vector<int> dp(W + 1, 0);
        
        for (int i = 0; i < n; i++) {
            for (int w = W; w >= weights[i]; w--) {
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
        
        return dp[W];
    }
    
    void compareAllMethods() {
        cout << "=== 0/1 Knapsack Results ===" << endl;
        
        // Method 1: Top-down
        int result1 = solveTopDown();
        cout << "Top-down result: " << result1 << endl;
        
        // Method 2: Bottom-up with items
        auto [result2, items] = solveBottomUpWithItems();
        cout << "Bottom-up result: " << result2 << endl;
        cout << "Selected items: ";
        for (int item : items) cout << item << " ";
        cout << endl;
        
        // Method 3: Space optimized
        int result3 = solveSpaceOptimized();
        cout << "Space optimized result: " << result3 << endl;
        
        cout << "All methods consistent: " << 
             (result1 == result2 && result2 == result3 ? "YES" : "NO") << endl;
    }
};
```

## 7. Further Optimizable Approaches

### 7.1 Branch and Bound
For smaller problem instances, branch and bound can be more efficient:

```cpp
class KnapsackBranchBound {
private:
    vector<int> weights, values;
    vector<double> valuePerWeight;
    int n, W, maxValue;
    
    double fractionalKnapsack(int idx, int remainingWeight) {
        double totalValue = 0;
        for (int i = idx; i < n && remainingWeight > 0; i++) {
            if (weights[i] <= remainingWeight) {
                totalValue += values[i];
                remainingWeight -= weights[i];
            } else {
                totalValue += (double)remainingWeight * values[i] / weights[i];
                break;
            }
        }
        return totalValue;
    }
    
    void branchBound(int idx, int currentWeight, int currentValue) {
        if (idx == n || currentWeight == W) {
            maxValue = max(maxValue, currentValue);
            return;
        }
        
        // Upper bound using fractional knapsack
        double upperBound = currentValue + fractionalKnapsack(idx, W - currentWeight);
        if (upperBound <= maxValue) return; // Prune
        
        // Include current item
        if (currentWeight + weights[idx] <= W) {
            branchBound(idx + 1, currentWeight + weights[idx], currentValue + values[idx]);
        }
        
        // Exclude current item
        branchBound(idx + 1, currentWeight, currentValue);
    }
    
public:
    KnapsackBranchBound(vector<int>& w, vector<int>& v, int capacity) 
        : weights(w), values(v), W(capacity), n(w.size()), maxValue(0) {
        
        // Create value per weight ratios and sort
        vector<pair<double, int>> ratios;
        for (int i = 0; i < n; i++) {
            ratios.push_back({(double)values[i] / weights[i], i});
        }
        sort(ratios.rbegin(), ratios.rend());
        
        // Reorder based on ratios
        vector<int> newWeights(n), newValues(n);
        for (int i = 0; i < n; i++) {
            newWeights[i] = weights[ratios[i].second];
            newValues[i] = values[ratios[i].second];
        }
        weights = newWeights;
        values = newValues;
    }
    
    int solve() {
        branchBound(0, 0, 0);
        return maxValue;
    }
};
```

**Time Complexity**: $O(2^n)$ worst case, much better on average with pruning **Space Complexity**: $O(n)$ for recursion stack

### 7.2 Meet-in-the-Middle

For moderate n (up to ~40), we can use meet-in-the-middle:
```cpp
class KnapsackMeetMiddle {
private:
    vector<int> weights, values;
    int n, W;
    
    vector<pair<int, int>> generateSubsets(int start, int end) {
        vector<pair<int, int>> subsets; // {weight, value}
        int size = end - start;
        
        for (int mask = 0; mask < (1 << size); mask++) {
            int w = 0, v = 0;
            for (int i = 0; i < size; i++) {
                if (mask & (1 << i)) {
                    w += weights[start + i];
                    v += values[start + i];
                }
            }
            if (w <= W) subsets.push_back({w, v});
        }
        
        // Keep only non-dominated solutions
        sort(subsets.begin(), subsets.end());
        vector<pair<int, int>> filtered;
        int maxValue = 0;
        for (auto& p : subsets) {
            if (p.second > maxValue) {
                filtered.push_back(p);
                maxValue = p.second;
            }
        }
        
        return filtered;
    }
    
public:
    KnapsackMeetMiddle(vector<int>& w, vector<int>& v, int capacity) 
        : weights(w), values(v), W(capacity), n(w.size()) {}
    
    int solve() {
        int mid = n / 2;
        
        auto left = generateSubsets(0, mid);
        auto right = generateSubsets(mid, n);
        
        int maxValue = 0;
        int j = right.size() - 1;
        
        for (int i = 0; i < left.size(); i++) {
            while (j >= 0 && left[i].first + right[j].first > W) j--;
            if (j >= 0) {
                maxValue = max(maxValue, left[i].second + right[j].second);
            }
        }
        
        return maxValue;
    }
};
```

**Time Complexity**: $O(2^{n/2} \cdot n)$ **Space Complexity**: $O(2^{n/2})$

## 8. Time Complexity Summary

|Approach|Time Complexity|Space Complexity|Best Use Case|
|---|---|---|---|
|**Brute Force**|$O(2^n)$|$O(n)$|Very small n (≤ 20)|
|**Top-down DP**|$O(n \times W)$|$O(n \times W) + O(n)$|Medium n, W|
|**Bottom-up DP**|$O(n \times W)$|$O(n \times W)$|Medium n, W|
|**Space Optimized**|$O(n \times W)$|$O(W)$|Large n, medium W|
|**Branch & Bound**|$O(2^n)$ avg much better|$O(n)$|Small to medium n|
|**Meet-in-Middle**|$O(2^{n/2} \cdot n)$|$O(2^{n/2})$|Medium n (≤ 40)|
