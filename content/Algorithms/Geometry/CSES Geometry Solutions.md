---
title: CSES Geometry Solutions
draft:
tags:
  - CSES
  - Geometry
---


## [CSES - Polygon Lattice Points](https://cses.fi/problemset/task/2193)

The problem statement states that, our task is to calculate the number of lattice points inside the polygon and on it's boundary. A lattice point is defined as a point whose coordinates are **integers**.

We need to print two integers : the number of lattice points inside the polygon, and on it's boundary. 

We may solve this with [Pick's theorem](https://en.wikipedia.org/wiki/Pick%27s_theorem). It states that - 
$$ A = i + \frac{b}{2} - 1$$
where, $A$ is the area of the polygon, $i$ is the number of lattice points inside the polygon and $b$ is the number of lattice points on the boundary. 

The question arise how can we calculate the lattice points? We can calculate the area of the polygon using the [Shoelace Theorem](https://en.wikipedia.org/wiki/Shoelace_formula). But it's hard to know how many lattice points are on the boundary, let alone inside the polygon. Counting lattice points on the boundary seems more logical and I found a really good explanation from this [question](https://math.stackexchange.com/questions/301890/how-many-points-between-two-points/301895#301895). I will try to break down the whole thing here. 

We can consider any line segment $(a,b)$ and $(c,d)$. The standard equation of the line passing through the points is 
$$\frac{y-b}{d-b}=\frac{x-a}{c-a}$$
If we're to count the lattice points between these two points, we may take advantage of it's slope.
$$\text{slope} = \frac{d-b}{c-a}$$
This can be further simplified, if we can translate $(a,b)$ to origin $(0,0)$ and $(c,d)$ to $(m,n) = (c-a, d-b)$. Then our equation get's simplified down to :
$$y=\frac{n}{m}x$$
There's another interesting thing with slope, which is we can find other lattice points using the slope itself. Consider the following graph:

![[lattice-point.png | 500 center]]

Let our line segment be $(2,3)$ and $(4,6)$. The slope is $\frac{3}{2}$. The next lattice point on the extended line segment would be $(4+2,6+3) \to (6,9)$ and $(6+2,9+3) \to (8,12)$ so on. So, whatever it is, $\frac{n}{m}$ needs to be in it's lowest form. That is, $\frac{n}{m} = \frac{q}{r}$ where $\text{gcd}(q,r)=1$.  This means, $m=kr, n=kq$ and $k = gcd(m,n)$.

Now, our equation now reduces to:
$$y=\frac{q}{r}x$$
And since we're dealing with lattice points - $x$ needs to be a multiple of $r$ so that $y$ can also be a integer too. In short, we're looking for $0 \leq x \leq m;  r | x$. So, the number of such $x$ is $\left\lfloor  \frac{m}{r}  \right\rfloor + 1 = \text{gcd}(m,n)+1$. Because all the valid $x$ values are between $0, r, 2r, 3r, \dots, kr = m$. Total $k+1$ values. 

The lattice points on the boundary can now be calculated with this, all that is left is the number of lattice points inside the polygon. We can find the area of the polygon and so this simplifies our solution.

We've previously seen how we can find the area of the polygon. Pretty easy :
```
long long areaPolygon(vector<pt> p) {
	long long area = 0;
	for (int i = 0; i < p.size(); i++) {
		area += cross(p[i], p[(i+1)%p.size()]);
	}
	return abs(area)/2;
}
```

Now all we have to do is print. Right?$$i = A + 1 - \frac{1}{2}\sum\limits_{i=0}^{n-1} (\text{gcd}(\left| x_{i+1} - x_{i}\right|,\left| y_{i+1} - y_{i}\right|) + 1)$$ If we did this, we'd be very much wrong. Boundary values also is counting their own vertexes. For a line segment $\text{gcd}(m,n)+1$ remains true. But for a Polygon, we'd be counting them twice. So it's better we do - 
$$i = A + 1 - \frac{1}{2}\sum\limits_{i=0}^{n-1} (\text{gcd}(\left| x_{i+1} - x_{i}\right|,\left| y_{i+1} - y_{i}\right|) - 1) + \text{n}$$
I'll leave the explanation for $-1$ as a way to prove it practically. 
So my boundary function looked like this:
```
long long boundary(vector<pt> p) {
    long long b = 0;
    for (int i = 0; i < p.size(); i++) {
        long long dx = abs(p[(i+1)%p.size()].x - p[i].x);
        long long dy = abs(p[(i+1)%p.size()].y - p[i].y);
        b += __gcd(dx, dy)-1;
    }
    return b;
```

And my main function:
```
int main() {
	int n; cin >> n;
	vector<pt> polygon(n);
	for (int i = 0; i < n; i++) {
		cin >> polygon[i].x >> polygon[i].y;
	}
    long long b = boundary(polygon) + n;
    long long i = areaPolygon(polygon) + 1 - b/2;
	cout << i << " " << b;
	return 0;
}
```

There's also a very clean implementation by [mrsac7](https://github.com/mrsac7/CSES-Solutions/blob/master/src/2193%20-%20Polygon%20Lattice%20Points.cpp). It uses the complex approach. 

## [CSES - Minimum Euclidean Distance](https://cses.fi/problemset/task/2194)

We're given a set of points in a 2D plane and our task it to find the minimum Euclidean distance between two distinct points. 

This becomes a [Closest pair of points problem](https://en.wikipedia.org/wiki/Closest_pair_of_points_problem). The real issue here is, the brute force approach is very slow $O(n^2)$. For that we will be using the [Sweep Line algorithm](https://en.wikipedia.org/wiki/Sweep_line_algorithm) to solve this problem. I was reading this amazing blog from [Rossano Venturini](https://pages.di.unipi.it/rossano/blog/2023/sweepline/), explaining the whole concept. But still, I would like to explain it from my point of view.

I'll be discussing in somewhat details about this algorithm. However, there's lot of other use cases which I might discuss separately. 

The Sweep line algorithm works in $O(N \log N)$ time. Here, we keep a track of the minimum distance variable $\delta$. First, we sort the points based on their $x$-coordinates. Our goal is to improve $\delta$ as we sweep from left to right. If we're going to improve it, it doesn't make sense to compare it from the beginning. The points are sorted, and so if we're going to see any improvement it must exist between the interval of $[x-\delta, x]$. Right? $\delta$ is the minimum distance, anything other than that existing is just waste of time for us to compare when we're standing at $x$. 

With the same concept ($\delta$ is the maximum stretch we care), we take the $y$-coordinates into the following interval : $[y-\delta, y + \delta]$. If there's anything to improve than the current one, it needs to be there.

Now that we know our sweeping line (rectangle kind of), we are going to maintain a BST with the points sorted by their $y$-coordinates. That is - when we're processing any point $p(x,y)$, we will also iterate over $[y-\delta, y + \delta]$. 

So two things - we would be iterating in the interval $[y-\delta, y + \delta]$ and remove any $x$-coords that is less than $x-\delta$, while comparing it's distance with $p(x,y)$ and update $\delta$. 

![[closet_pair_sweep_line.png | 500 center]]

I would be adapting this algorithm according to what we've been following so far:
```
long long dist2(pt a, pt b) {
	long long dx = a.x - b.x;
	long long dy = a.y - b.y;
	return dx*dx + dy*dy;
}

long long closestPair(vector<pt> pts) {
	int n = pts.size();
	sort(pts.begin(), pts.end(), [](pt a, pt b) 
		{return a.x < b.x;});
	
	set<pair<T,T>> s;
	long long dist = LLONG_MAX;
	int j = 0;
	for (int i = 0; i < n; i++) {
		long long d = ceil(sqrt(dist));
		while(pts[i].x - pts[j].x >= d) {
			s.erase({pts[j].y, pts[j].x});
			j++;
		}
		auto it1 = s.lower_bound({pts[i].y-d, LLONG_MAX});
		auto it2 = s.upper_bound({pts[i].y+d, LLONG_MAX});

		for (auto it = it1; it != it2; it++) {
			pt p = {it->second, it->first};
			dist = min(dist, dist2(pts[i], p));
		}
		s.insert({pts[i].y, pts[i].x});
	}
	return dist;
}
```

Notice that `set<pair<T,T>> s;` was used to present the points in the form of ${y,x}$ as it was easier to sort the $y$-coords. Or else we would've to write it's comparator. Since this is a BST sorted by $y$-coords,  $\text{lower\_bound}(\{y - \delta, \infty\})$ and $\text{upper\_bound}(\{y + \delta, \infty\})$ gives the first points of our intervals. 

Again, [mrsac7](https://github.com/mrsac7/CSES-Solutions/blob/master/src/2194%20-%20Minimum%20Euclidean%20Distance.cpp) great solution.
Extra references 
1. https://codeforces.com/blog/entry/58747
2. https://www.jn.ethz.ch/education/script/P6_C26.pdf
3. [Handout](https://saco-evaluator.org.za/presentations/2009%20Camp%201/Line%20Sweep%20(Schalk-Willem%20Kruger)%20Handout.pdf)
4. 

## [CSES - Convex Hull](https://cses.fi/problemset/task/2195)
We're given a set of $n$ points in a 2D plane, we need to determine the convex hull of the points. 

