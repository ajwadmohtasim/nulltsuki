---
title: Computational Geometry
draft: true
tags:
---

An Introduction to C++ Templates:
```cpp
template <typename T>
```

---

Basic 2D point can be represented by the following way:
```
template <typename T>
struct Point {
	T x, y;
	Point() : x(0), y(0) {}
	Point(T x, T y) : x(x), y(y) {}
	Point operator+ (const Point& p) const {return {x + p.x, y + p.y};}
	Point operator- (const Point& p) const {return {x - p.x, y - p.y};}
	Point operator* (const T& d) const {return {x * d, y * d};}
	Point operator/ (const T& d) const {return {x / d, y / d};}
	T sq() {return x*x + y*y;}
	double abs() const {return sqrt((double)(x*x + y*y));}
};
```


> Given 2 integers which are co-ordinates of a point that does not coincide with the origin. Print the magnitude of the polar angle in radians from the interval $[ 0, 2\pi )$
> input :
> `2 3`
> output :
> `0.982793723`

[Learn more about co-ordinates](https://www.cuemath.com/geometry/polar-coordinates/)

`atan2(y,x)` returns the inverse tan of $(y/x)$ within the range of $[ -\pi, \pi]$ in radians. 
However, if our co-ordinates at lower quadrants, we will get the negative value. 
And to fix that, we can add $2\pi$ to it through `2 * acos(-1.0)` because $\cos(\pi) = -1$ and 
$\cos^{-1}(-1) = \pi$

```cpp
double angle = atan2(y,x);
if (angle < 0) angle += 2 * acos(-1.0);
cout << setprecision(9) << fixed << angle;
```


> Given 4 integers, which are the co-ordinates of two nonzero vectors. Print the number which is the value of the undirected angle between the two vector within the range $[0, \pi]$ - precise up-to to the $6^{th}$ decimal place.
> input : 
> `2 1 3 5`
> output : 
> `0.566729`

The dot product of two vector ($\vec{v}\cdot\vec{w}$) tells use the measure of how similar their directions are. More specifically through this : 
$$
\vec{v}\cdot\vec{w} = \left\|\vec{v}\right\|\left\|\vec{w}\right\|\cos\theta
$$
To calculate the dot product we can use this formula:
$$
\vec{v}\cdot\vec{w} = v_xw_x + v_yw_y
$$
```cpp
T dot(const Point<T>& v, const Point<T>& w) { return v.x * w.x + v.y * w.y; }
```

Since we need to find the angle between two vectors in the range $[0, \pi]$, we can simply follow 
$$
\theta = \cos^{-1}\left( \frac{\vec{v} \cdot \vec{w}}{\|\vec{v}\| \, \|\vec{w}\|} \right)
$$
```cpp
double angle(const Point<T>& v, const Point<T>& w) {
	double cosTheta = dot(v, w) / v.abs() / w.abs();
	return acos(max(-1.0, min(1.0, cosTheta)));
}
```

>  Given N lines $(3 \geq N \geq 100,000)$ of $(x, y)$ pair co-ordinates, each co-ordinates is the sequential vertex point of a polygon in counter-clockwise or clockwise pattern. Find the area of the polygon.
>  input:
>  `3`
>  `1 0`
>  `0 1`
>  `1 1`
>  output:
>  `0.5`

```cpp
template <typename T> double areaPolygon(vector<Point<T>> p) {
	T area = 0;
	for (int i = 0; i < p.size(); i++) {
		area += cross(p[i], p[(i+1)%p.size()]);
	}
	return std::abs((double)area)/2;
}
```

> Given 6 integers, co-ordinates of three vertices of a triangle. Find the area of it.
> input:
> `1 0 2 4 5 2`
> output:
> `7.0`

A triangle is a simple Polygon too. Printing the area for the polygon works just fine. 

---

So, far we've been on dealing with Vertices / Co-ordinates. Now when dealing with lines, we have may have two ways to represent them.
The standard $Ax + By + C = 0$ and the parametric equation $A + t\cdot\vec{AB}$ 
(Learn more about the parametric representation)

For now we will go with the standard approach. 
we will require this:
```cpp

```

> Given 6 integers, which are the co-ordinates of $X, Y, Z$; we need to find the line containing the bisector of the angle between segments $XY$ and $YZ$ ( i.e. the internal bisector of angle $\angle{XYZ}$ ).
> Output the $A, B, C$ which are the co-efficient of the line in standard form, $Ax + By + C = 0$
> input. 
> `1 1 1 0 0 1`
> output:
> `-1.0 1.0 0.0`

