---
title: University Schema
draft:
tags:
  - DatabaseManagementSystem
---
![[University Schema Diagram.png | center]]

<b><u>Relational Schema:</u></b>
> **classroom**(<u>building</u>, <u>room number</u>, capacity)
> **department**(<u>dept name</u>, building, budget)
> **course**(<u>course id</u>, title, dept name, credits)
> **instructor**(<u>ID</u>, name, dept name, salary)
> **section**(<u>course id</u>, <u>sec id</u>, <u>semester</u>, <u>year</u>, building, room number, time slot id)
> **teaches**(<u>ID</u>, <u>course id</u>, <u>sec id</u>, <u>semester</u>, <u>year</u>)
> **student**(<u>ID</u>, name, dept name, tot cred)
> **takes**(<u>ID</u>, <u>course id</u>, <u>sec id</u>, <u>semester</u>, <u>year</u>, grade)
> **advisor**(<u>s ID</u>, i ID)
> **time slot**(<u>time slot id</u>, <u>day</u>, <u>start time</u>, end time)
> **prereq**(<u>course id</u>, <u>prereq id</u>)