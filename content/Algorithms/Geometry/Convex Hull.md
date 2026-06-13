---
title: Convex Hull
draft:
tags:
  - Geometry
  - Convex-Hull
---
TODO - https://hackmd.io/@Matistjati/Hkj7GZpaeg

This will be my primary note to all the things I learn related to Convex Hull. I will try to elaborate it as much as possible and talk about all the different algorithm related to it. 

From the [wiki](https://en.wikipedia.org/wiki/Convex_set) - a set of points is **convex set** if it contains every line segment between two points in the set. The boundary of it is always a [convex curve](https://en.wikipedia.org/wiki/Convex_curve). So when we're given a set of $P$ of $n$ points in the Euclidean space $E^2, E^3$ - $\text{conv}(P)$ is defined to be the smallest convex set containing $P$. 

In simple terms, Convex Hull for a set of points $P$ is the smallest convex polygon, $\text{conv}(P)$ - for which each point belonging to the set $P$ is either on the boundary of the $\text{conv}(P)$ or inside.

![[convex-hull.png | 400]]

There are notably 6 efficient algorithms:


The first algorithm we will be looking into is the **Graham Scan**. With a time complexity of $O(n \log n)$, this algorithm finds the convex following the boundary through maintaining a set. 

It starts from the bottom lowest point with the $y$ value, let's call it pivot $P_{0}$. If there are multiple lowest point, lowest $x$ value get's the priority. We then have to sort all the $n$ points of $P$ in the increasing order of the angle point $p$ makes around the pivot $P_{0}$ with a CCW check. The sorted result will be kept in a temporary set of points $P'$.

![[graham-scan.png | 500]]

The sorting however depends on whether the pivot $P_0$ , point $a, b$ is making a CCW / left turn. If that's true then $a$ comes before $b$. 

For a refresher, **cross product** can be used in determining the relative position of points. Let's consider an orient function $\text{orient}(P_0,A,B)=\vec{P_{0}A}\times \vec{P_{0}B}$. The result will be positive if $B$ is on the left side of $\vec{P_0A}$, negative on the right side, and zero if it's on the line, i.e. collinear. 
$$\vec{P_{0}A}\times \vec{P_{0}B} = (A.x-P_{0}.x)(B.y-P_{0}.y)-(A.y-P_{0}.y)(B.x-P_{0}.x)$$

Once our points are sorted, we would maintain a stack $S$ for the candidate points. Each points of $P$ will be pushed onto $S$ and checked for Convex Hull and popped, if it breaks the formation. Top three items in the stack must maintain a CCW / left turn. 

![[graham-scan-2.png]]

Initially, we consider the $N-1, P_0, 1$ points as they form a CCW / left turn for sure. From there, we keep working our way for each points belonging to $P'$. If we find a CW / Right turn we will try to pop them. Here's how it will work - $\{9,0,1\} \to \{0,1,2\} \to \{1,2,3\}$. Here, $\{1,2,3\}$ is making a CW / Right Turn, so we will pop $\{2\}$.
So again, $\{9,0,1\} \to \{0,1,3\} \to \{1,3,4\} \to \{3,4,5\} \to \{4,5,6\}$. Now, $\{4,5,6\}$ is making a CW / Right turn, pop $\{5\}$ and continue from $\{3,4,6\}$ instead of $\{3,4,5\}$. 

There can be a possibility that, we will have multiple consecutive CCW turns, but a CW / Right turn after that.
![[graham-scan-3.png]]
We may pop that turn but we'd remain wrong still. So it's essential we always keep in check if we're making right convex hull. 
For that, we can use a vector stack to store the points and perform our operations accordingly.

```
vector<pt> ch_graham(vector<pt> &pts) {
	vector<pt> p(pts);
	int n = 
}
```