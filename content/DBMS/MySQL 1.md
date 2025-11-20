---
title: MySQL Lab Final
draft: true
tags:
---

## Table Creation
```terminal
Create table Customer
(
    Cust_id VARCHAR(12) NOT NULL,
    Cust_name VARCHAR(12),
    Cust_dob DATE,
    Cust_street VARCHAR(12),
    Cust_city VARCHAR(12)
);

Create table Account
(
    Account_id VARCHAR(12) NOT NULL,
    Balance DECIMAL(20,5),
    Type VARCHAR(8)
);

Create table Branch
(
    Branch_name VARCHAR(14) NOT NULL,
    Branch_city VARCHAR(10),
    Assets DECIMAL(20,5)
);

Create table Employee
(
    Employee_id VARCHAR(12),
    Employee_name VARCHAR(20),
    Employee_dob DATE,
    Employee_street VARCHAR(20),
    Employee_city VARCHAR(20),
    Employee_startdate DATE,
    Salary DECIMAL(10,3),
    MGR VARCHAR(12)
);

Create table SALGRADE
(
    GRADE VARCHAR(5) NOT NULL,
    LOSAL DECIMAL(10,3),
    HISAL DECIMAL(10,3)
);

Create table Loan
(
    Loan_id VARCHAR(12) NOT NULL,
    Amount DECIMAL(20,5)
);

Create table Borrower
(
    Cust_id VARCHAR(12) NOT NULL,
    Loan_id VARCHAR(12) NOT NULL
);


Create table Depositor
(
    Cust_id VARCHAR(12) NOT NULL,
    Account_id VARCHAR(12) NOT NULL
);
```

## Data Insertion
```terminal
INSERT INTO customer VALUES('C00000000001','Jones','1982-01-11','Main','Harrison');
INSERT INTO customer VALUES('C00000000002','Smith','1958-01-22','North','Rye');
INSERT INTO customer VALUES('C00000000003','Hayes','1962-02-23','Main','Harrison');
INSERT INTO customer VALUES('C00000000004','Curry','1964-02-24','North','Rye');
INSERT INTO customer VALUES('C00000000005','Lindsay','1956-10-25','Park','Pittsfield');
INSERT INTO customer VALUES('C00000000006','Turner','1982-11-26','Putnam','Stamford');
INSERT INTO customer VALUES('C00000000007','Williams','1975-12-27','Nassau','Princeton');
INSERT INTO customer VALUES('C00000000008','Adams','1978-03-28','Spring','Pittsfield');
INSERT INTO customer VALUES('C00000000009','Johnson','1974-03-27','Alma','Palo alto');
INSERT INTO customer VALUES('C00000000010','Glenn','1956-04-21','Sand Hill','Woodside');
INSERT INTO customer VALUES('C00000000011','Brooks','1974-04-21','Senator','Brooklyn');
INSERT INTO customer VALUES('C00000000012','Green','1979-04-19','Walnut','Stamford');


insert into account values('A-101',500, 'CURRENT');
insert into account values('A-215',700, 'CURRENT');
insert into account values('A-102',400, 'CURRENT');
insert into account values('A-305',350, 'CURRENT');
insert into account values('A-201',900, 'CURRENT');
insert into account values('A-222',700, 'CURRENT');
insert into account values('A-217',750, 'CURRENT');

insert into depositor values('C00000000001','A-101');
insert into depositor values('C00000000002','A-215');
insert into depositor values('C00000000003','A-102');
insert into depositor values('C00000000004','A-305');
insert into depositor values('C00000000001','A-201');
insert into depositor values('C00000000005','A-217');
insert into depositor values('C00000000006','A-222');


insert into loan values('L-17',1000);
insert into loan values('L-23',2000);
insert into loan values('L-15',1500);
insert into loan values('L-14',1500);
insert into loan values('L-93',500);
insert into loan values('L-11',900);
insert into loan values('L-16',1300);


insert into borrower values('C00000000001','L-17');
insert into borrower values('C00000000002','L-23');
insert into borrower values('C00000000003','L-15');
insert into borrower values('C00000000009','L-14');
insert into borrower values('C00000000004','L-93');
insert into borrower values('C00000000002','L-11');
insert into borrower values('C00000000007','L-17');
insert into borrower values('C00000000008','L-16');


insert into branch values('Downtown','Brooklyn',9000000);
insert into branch values('Redwood','Palo Alto',21000000);
insert into branch values('Perryridge','Horseneck',17000000);
insert into branch values('Mianus','Horseneck',400000);
insert into branch values('Round Hill','Horseneck',8000000);
insert into branch values('Pownal','Horseneck',300000);
insert into branch values('North town','Rye',3700000);
insert into branch values('Brighton','Brooklyn',710000);


INSERT INTO Employee VALUES('E00000000001','E_A','1982-01-11','e_street_006','e_city_001','2002-01-11',5000,NULL);
INSERT INTO Employee VALUES('E00000000002','E_B','1958-01-22','e_street_005','e_city_002','1978-01-22',2850,'E00000000001');
INSERT INTO Employee VALUES('E00000000003','E_C','1962-02-23','e_street_007','e_city_003','1982-02-23',2000,'E00000000001');
INSERT INTO Employee VALUES('E00000000004','E_D','1964-02-24','e_street_004','e_city_004','1984-02-24',5300,'E00000000001');
INSERT INTO Employee VALUES('E00000000005','E_E','1956-10-25','e_street_004','e_city_005','1976-10-25',6500,'E00000000001');
INSERT INTO Employee VALUES('E00000000006','E_F','1982-11-26','e_street_003','e_city_006','2002-11-26',1700,'E00000000007');
INSERT INTO Employee VALUES('E00000000007','E_G','1975-12-27','e_street_002','e_city_007','1995-12-27',9000,NULL);
INSERT INTO Employee VALUES('E00000000008','E_H','1978-03-28','e_street_002','e_city_008','1998-03-28',5000,'E00000000007');
INSERT INTO Employee VALUES('E00000000009','E_I','1974-03-27','e_street_001','e_city_009','1994-03-27',4000,'E00000000007');
INSERT INTO Employee VALUES('E00000000010','E_J','1956-04-21','e_street_018','e_city_010','1986-04-21',5600,'E00000000007');
INSERT INTO Employee VALUES('E00000000011','E_K','1974-04-21','e_street_017','e_city_001','1994-04-21',1400,'E00000000007');
INSERT INTO Employee VALUES('E00000000012','E_L','1979-04-19','e_street_016','e_city_002','1999-04-19',5600,'E00000000008');
INSERT INTO Employee VALUES('E00000000013','E_M','1974-04-29','e_street_015','e_city_003','1994-04-29',9900,'E00000000008');
INSERT INTO Employee VALUES('E00000000014','E_N','1976-05-18','e_street_014','e_city_004','1996-05-18',1000,NULL);
INSERT INTO Employee VALUES('E00000000015','E_O','1973-05-17','e_street_013','e_city_005','1993-05-17',5000,'E00000000014');
INSERT INTO Employee VALUES('E00000000016','E_P','1982-05-14','e_street_012','e_city_006','2002-05-14',2200,'E00000000014');
INSERT INTO Employee VALUES('E00000000017','E_Q','1980-05-11','e_street_011','e_city_007','2000-05-11',3500,'E00000000014');
INSERT INTO Employee VALUES('E00000000018','E_R','1982-06-23','e_street_010','e_city_008','2002-06-23',1500,'E00000000014');
INSERT INTO Employee VALUES('E00000000019','E_S','1981-06-26','e_street_009','e_city_009','2001-06-26',4000,'E00000000014');
INSERT INTO Employee VALUES('E00000000020','E_T','1981-06-22','e_street_008','e_city_010','2001-06-22',7900,'E00000000014');
INSERT INTO Employee VALUES('E00000000021','E_U','1981-07-27','e_street_007','e_city_001','2001-07-27',5000,'E00000000014');
INSERT INTO Employee VALUES('E00000000022','E_V','1974-07-24','e_street_006','e_city_002','1994-07-24',5700,'E00000000014');
INSERT INTO Employee VALUES('E00000000023','E_W','1977-08-15','e_street_005','e_city_003','1997-08-15',5400,'E00000000026');
INSERT INTO Employee VALUES('E00000000024','E_X','1978-08-17','e_street_004','e_city_004','1998-08-17',4000,'E00000000014');
INSERT INTO Employee VALUES('E00000000025','E_Y','1979-09-20','e_street_003','e_city_005','1999-09-20',6600,'E00000000026');
INSERT INTO Employee VALUES('E00000000026','E_Z','1972-09-01','e_street_001','e_city_006','1992-09-01',1500,NULL);

Insert into SALGRADE values('A',700,1200);
Insert into SALGRADE values('B',1201,1400);
Insert into SALGRADE values('C',1401,2000);
Insert into SALGRADE values('D',2001,3000);
Insert into SALGRADE values('E',3001,9999);
Insert into SALGRADE values('F',9999,99999);
```



## Basic SQL Operations
### UPDATE Statement
```sql
update customer
set cust_city = 'New York'
where cust_name = 'Jones';
```

This query updates the city of customer 'Jones' to 'New York'. The UPDATE statement modifies existing data, and the WHERE clause ensures only the specified record is changed.
### Column Alias
```sql
select cust_name as "Customer Name" from customer;
```

This query retrieves customer names but displays the column header as "Customer Name" instead of "cust_name". Aliases make output more readable for reports and presentations.

### Removing Duplicates

```sql
select distinct cust_city from customer;
```

The DISTINCT keyword removes duplicate values from the result set. This query shows each unique city only once, even if multiple customers live there.

### String Concatenation

```sql
select concat(cust_id, ' named ', cust_name, ' lives in ', cust_city, ' city') 
as "Living Information" from customer;
```

CONCAT combines multiple columns and text strings into a single formatted output. This creates readable sentences from database columns, useful for generating reports or formatted displays.

### Date Formatting

```sql
select date_format(employee_dob, '%e %M, %Y') from employee;
select date_format(employee_dob, '%D - %M - %Y') from employee;
select concat(employee_id, ' has birthday on', date_format(employee_dob, ' %D of %M')) from employee;
```

DATE_FORMAT converts dates into various readable formats. The format specifiers (%e, %M, %Y, %D) control how the date appears - day, month name, year, etc. This makes dates more user-friendly in reports.

```terminal
+----------------------------------------+
| date_format(employee_dob, '%e %M, %Y') |
+----------------------------------------+
| 11 January, 1982                       |
| 22 January, 1958                       |
| 23 February, 1962                      |
| 24 February, 1964                      |
| 25 October, 1956                       |
| 26 November, 1982                      |
| 27 December, 1975                      |
| 28 March, 1978                         |
| 27 March, 1974                         |
| 21 April, 1956                         |
| 21 April, 1974                         |
| 19 April, 1979                         |
| 29 April, 1974                         |
| 18 May, 1976                           |
| 17 May, 1973                           |
| 14 May, 1982                           |
| 11 May, 1980                           |
| 23 June, 1982                          |
| 26 June, 1981                          |
| 22 June, 1981                          |
| 27 July, 1981                          |
| 24 July, 1974                          |
| 15 August, 1977                        |
| 17 August, 1978                        |
| 20 September, 1979                     |
| 1 September, 1972                      |
+----------------------------------------+
+-------------------------------------------+
| date_format(employee_dob, '%D - %M - %Y') |
+-------------------------------------------+
| 11th - January - 1982                     |
| 22nd - January - 1958                     |
| 23rd - February - 1962                    |
| 24th - February - 1964                    |
| 25th - October - 1956                     |
| 26th - November - 1982                    |
| 27th - December - 1975                    |
| 28th - March - 1978                       |
| 27th - March - 1974                       |
| 21st - April - 1956                       |
| 21st - April - 1974                       |
| 19th - April - 1979                       |
| 29th - April - 1974                       |
| 18th - May - 1976                         |
| 17th - May - 1973                         |
| 14th - May - 1982                         |
| 11th - May - 1980                         |
| 23rd - June - 1982                        |
| 26th - June - 1981                        |
| 22nd - June - 1981                        |
| 27th - July - 1981                        |
| 24th - July - 1974                        |
| 15th - August - 1977                      |
| 17th - August - 1978                      |
| 20th - September - 1979                   |
| 1st - September - 1972                    |
+-------------------------------------------+
+---------------------------------------------------------------------------------+
| concat(employee_id, ' has birthday on', date_format(employee_dob, ' %D of %M')) |
+---------------------------------------------------------------------------------+
| E00000000001 has birthday on 11th of January                                    |
| E00000000002 has birthday on 22nd of January                                    |
| E00000000003 has birthday on 23rd of February                                   |
| E00000000004 has birthday on 24th of February                                   |
| E00000000005 has birthday on 25th of October                                    |
| E00000000006 has birthday on 26th of November                                   |
| E00000000007 has birthday on 27th of December                                   |
| E00000000008 has birthday on 28th of March                                      |
| E00000000009 has birthday on 27th of March                                      |
| E00000000010 has birthday on 21st of April                                      |
| E00000000011 has birthday on 21st of April                                      |
| E00000000012 has birthday on 19th of April                                      |
| E00000000013 has birthday on 29th of April                                      |
| E00000000014 has birthday on 18th of May                                        |
| E00000000015 has birthday on 17th of May                                        |
| E00000000016 has birthday on 14th of May                                        |
| E00000000017 has birthday on 11th of May                                        |
| E00000000018 has birthday on 23rd of June                                       |
| E00000000019 has birthday on 26th of June                                       |
| E00000000020 has birthday on 22nd of June                                       |
| E00000000021 has birthday on 27th of July                                       |
| E00000000022 has birthday on 24th of July                                       |
| E00000000023 has birthday on 15th of August                                     |
| E00000000024 has birthday on 17th of August                                     |
| E00000000025 has birthday on 20th of September                                  |
| E00000000026 has birthday on 1st of September                                   |
+---------------------------------------------------------------------------------+
```
### Logical Operators

```sql
select * from employee where employee_dob > '1970-1-1';
select * from employee where employee_dob < '1970-1-1' and salary > 4000;
```

These queries filter records based on conditions. The first finds employees born after 1970, while the second uses AND to find employees born before 1970 who also earn more than 4000. Multiple conditions can be combined with AND and OR.

### BETWEEN Operator

```sql
select * from employee where employee_dob between '1965-1-1' and '1975-1-1';
```

BETWEEN provides a cleaner way to filter records within a range. This finds employees born between 1965 and 1975 (inclusive). It's equivalent to using >= and <= operators.

### IN Operator

```sql
select * from customer where cust_city in ('Rye','Stamford');
select * from customer where cust_city not in ('Rye','Stamford');
```

The IN operator checks if a value matches any value in a list. The first query finds customers from Rye or Stamford, while NOT IN finds customers from all other cities.

### LIKE Operator (Pattern Matching)

```sql
select * from customer where cust_name like '%th%';
select * from customer where cust_name like 's%';
```

LIKE performs pattern matching. The '%' wildcard represents any sequence of characters. The first query finds names containing "th" anywhere (like Smith), while the second finds names starting with 's'.
```terminal
+--------------+-----------+------------+-------------+-----------+
| Cust_id      | Cust_name | Cust_dob   | Cust_street | Cust_city |
+--------------+-----------+------------+-------------+-----------+
| C00000000002 | Smith     | 1958-01-22 | North       | Rye       |
+--------------+-----------+------------+-------------+-----------+

+--------------+-----------+------------+-------------+-----------+
| Cust_id      | Cust_name | Cust_dob   | Cust_street | Cust_city |
+--------------+-----------+------------+-------------+-----------+
| C00000000002 | Smith     | 1958-01-22 | North       | Rye       |
+--------------+-----------+------------+-------------+-----------+
```
### ORDER BY

```sql
select * from customer order by cust_name desc;
select * from customer order by cust_dob asc;
```

ORDER BY sorts results. DESC sorts in descending order (Z to A), while ASC sorts in ascending order (A to Z, or oldest to newest for dates). Sorting makes data easier to analyze.

---

## ALTER Operations

### Adding Columns

```sql
alter table customer add temp_column varchar(12);
```

This adds a new column to an existing table without deleting existing data. It's used when you need to expand your database schema after creation.

### Dropping Columns

```sql
alter table customer drop column temp_column;
```

This permanently removes a column and all its data from a table. Use carefully as this operation cannot be undone.

---

## JOIN Operations

### CROSS JOIN

```sql
select * from borrower, loan;
```

A cross join creates a Cartesian product - every row from the first table is combined with every row from the second table. This is rarely useful in practice and typically generates large result sets.

### EQUI JOIN (Two Tables)

```sql
select c.cust_name, d.account_id
from customer c, depositor d
where c.cust_id = d.cust_id;
```

This joins two tables based on matching values in the customer ID column. It shows customer names along with their account IDs. The WHERE clause specifies the join condition.

### EQUI JOIN (Three Tables)

```sql
select c.cust_name, a.balance
from customer c, depositor d, account a
where c.cust_id = d.cust_id and d.account_id = a.account_id;
```

This joins three tables to show customer names and their account balances. The depositor table acts as a bridge between customers and accounts. Multiple join conditions are combined with AND.

### Loan Information Join

```sql
select c.cust_name, b.loan_id, l.amount
from customer c, borrower b, loan l
where c.cust_id = b.cust_id and b.loan_id = l.loan_id;
```

This query retrieves customer names, loan IDs, and loan amounts by joining customer, borrower, and loan tables. It shows which customers have which loans and for how much.

### Formatted Join Output

```sql
select concat('Customer: ', c.cust_name, ', DOB: ', date_format(cust_dob, '%D %M %Y'), 
              ', Balance: ', a.balance) as 'Customer Balance Info'
from account a, customer c, depositor d
where a.account_id = d.account_id and d.cust_id = c.cust_id;
```

This combines joining with formatting to create readable sentences. Each result shows customer information and balance in a natural language format, perfect for reports.

### NATURAL JOIN

```sql
select cust_name, balance
from customer natural join depositor natural join account;
```

Natural join automatically joins tables based on columns with the same name. It's cleaner than specifying join conditions but requires careful column naming. Here it joins on cust_id and account_id.

### JOIN ON Syntax

```sql
select c.cust_name, d.account_id
from customer c join depositor d
on c.cust_id = d.cust_id
where c.cust_city = 'Harrison';
```

The JOIN ON syntax is more explicit and modern than the comma notation. This finds accounts for customers from Harrison. The ON clause specifies the join condition, while WHERE filters results.

### Three Table JOIN ON

```sql
select c.cust_name, a.account_id, a.balance
from customer c
join depositor d on c.cust_id = d.cust_id
join account a on d.account_id = a.account_id;
```

This uses the explicit JOIN ON syntax for three tables, making the relationships clearer. It shows customer names with their account IDs and balances.

### JOIN USING

```sql
select cust_name, loan_id, amount
from customer
join borrower using (cust_id)
join loan using (loan_id);
```

USING is a shorthand for joins when columns have identical names. It's cleaner than ON when joining on a single column with the same name in both tables.

---

## Non-Equality Joins

```sql
select e.employee_name, e.salary, s.grade
from employee e, salgrade s
where e.salary between s.losal and s.hisal;
```

This is a non-equality join using BETWEEN instead of equals. It assigns salary grades to employees by checking if their salary falls within a grade's range. This is common for categorization queries.

---

## Outer Joins

### LEFT JOIN

```sql
select c.cust_name, a.account_id, a.balance
from customer c
left outer join depositor d on c.cust_id = d.cust_id
left outer join account a on d.account_id = a.account_id
order by c.cust_name;
```

LEFT JOIN includes all customers, even those without accounts. Customers without accounts will show NULL for account_id and balance. This is crucial for finding customers who don't have certain products.

### RIGHT JOIN

```sql
select c.cust_name, a.account_id, a.balance
from customer c
right join depositor d on c.cust_id = d.cust_id
right join account a on d.account_id = a.account_id;
```

RIGHT JOIN includes all accounts, even if they don't have a matching customer (which shouldn't happen with proper constraints). It prioritizes the right table in the join.

---

## Self Joins

```sql
select e.employee_id as 'Emp ID', e.employee_name as 'Employee', 
       m.employee_id as 'Mgr ID', m.employee_name as 'Manager'
from employee e
join employee m on e.mgr = m.employee_id;
```

Self joins join a table to itself. This query finds each employee's manager by matching the MGR column with employee_id in the same table. It's essential for hierarchical data.

---

## Set Operations

### INTERSECT

```sql
(select cust_id, cust_name from customer natural join depositor)
intersect
(select cust_id, cust_name from customer natural join borrower);
```

INTERSECT finds customers who appear in both result sets - those who have both accounts and loans. It's like finding the overlap between two groups.

### EXCEPT

```sql
(select cust_id, cust_name from customer natural join depositor)
except
(select cust_id, cust_name from customer natural join borrower);
```

EXCEPT finds customers in the first set but not the second - customers with accounts but no loans. It's useful for identifying gaps in product adoption.

---

## Constraints

### PRIMARY KEY

```sql
alter table customer add constraint cust_pk primary key(cust_id);
alter table employee add constraint emp_pk primary key(employee_id);
```

Primary keys ensure each record is unique and cannot be NULL. They're the main identifier for each row and are automatically indexed for faster lookups.

### UNIQUE Constraint

```sql
alter table loan add constraint loan_uni_id unique(loan_id);
```

UNIQUE ensures no duplicate values in a column, but unlike primary keys, multiple columns can be unique and they can be NULL. This guarantees loan IDs are distinct.

### NOT NULL Constraint

```sql
alter table loan modify amount decimal(20,5) not null;
```

NOT NULL prevents empty values in a column. Every loan must have an amount - this ensures data integrity by preventing incomplete records.

### FOREIGN KEY

```sql
alter table borrower add constraint borrower_cust_fk foreign key(cust_id) references customer(cust_id);
alter table depositor add constraint depositor_acc_fk foreign key(account_id) references account(account_id);
```

Foreign keys create relationships between tables and ensure referential integrity. They prevent orphaned records - you can't create a borrower record for a customer that doesn't exist.

### DEFAULT Values

```sql
alter table customer alter cust_city set default 'Dhaka';
alter table customer alter cust_city drop default;
```

DEFAULT specifies a value to use when none is provided during insertion. This ensures columns always have meaningful values and reduces the chance of NULL values.

---

## Views

### Basic View

```sql
create or replace view customer_view as
select cust_name as 'Name',
       date_format(cust_dob,'%D %M of %Y') as 'Date of Birth',
       cust_city as 'City'
from customer
order by cust_city;
```

Views are virtual tables based on queries. They simplify complex queries, provide security by limiting column access, and present data in more readable formats. This view formats customer data for easy viewing.

### Updating Through Views

```sql
update customer_view set City = 'NY' where Name = 'Curry';
```

You can update the underlying table through a view if the view is simple enough. This changes Curry's city in the customer table through the customer_view.

### WITH CHECK OPTION

```sql
create or replace view high_balance_accounts as
select c.cust_name, a.account_id, a.balance
from customer c
join depositor d on c.cust_id = d.cust_id
join account a on d.account_id = a.account_id
where a.balance > 500
with check option;
```

WITH CHECK OPTION prevents updates through the view that would violate the view's WHERE clause. You can't update an account to have a balance <= 500 through this view.

### Complex Views

```sql
create or replace view financial_summary as
select c.cust_name, c.cust_id, d.account_id, a.balance, b.loan_id, l.amount
from customer c
natural join depositor d natural join account a
natural join borrower b natural join loan l
order by a.balance desc;
```

This view combines multiple tables to provide a comprehensive financial summary. It's useful for dashboards and reports where you frequently need this combined information.

---

## Aggregate Functions

### SUM

```sql
select sum(salary) as 'Total Salary'
from employee
where employee_city = 'e_city_001';
```

SUM calculates the total of numeric values. This finds the total payroll for a specific city. Aggregate functions are essential for financial reporting and statistics.

### AVERAGE

```sql
select avg(balance) as 'Average Balance'
from account;
```

AVG calculates the mean of values. This shows the average account balance across all accounts, useful for understanding typical customer behavior.

### MIN and MAX

```sql
select min(salary) as 'Min Salary', max(salary) as 'Max Salary'
from employee;
```

MIN and MAX find the smallest and largest values. This identifies the salary range within the company, important for compensation analysis.

### COUNT

```sql
select count(employee_id) as 'Employee Count'
from employee
where mgr is not null;

select count(distinct employee_city) as 'City Count'
from employee;
```

COUNT counts rows. The first query counts employees with managers (excluding top management). The second uses DISTINCT to count unique cities where employees live.

---

## GROUP BY and HAVING

### GROUP BY Basics

```sql
select employee_city, avg(salary) as 'Average Salary'
from employee
group by employee_city
having employee_city is not null
order by employee_city;
```

GROUP BY divides data into groups and applies aggregate functions to each group. This calculates average salary per city. HAVING filters groups (like WHERE filters rows).

### Complex Grouping

```sql
select c.cust_city, sum(a.balance) as 'Total Balance', a.type
from customer c
join depositor d on c.cust_id = d.cust_id
join account a on d.account_id = a.account_id
group by c.cust_city, a.type
having sum(a.balance) > 1000;
```

This groups by multiple columns (city and account type) and filters to show only combinations with total balance over 1000. It's useful for segmented financial analysis.

---

## Nested Aggregates

```sql
select max(avg_sal) as 'Highest City Average'
from (
    select avg(salary) as avg_sal
    from employee
    group by employee_city
) as subquery;
```

This finds the highest average salary among all cities by first calculating averages per city, then finding the maximum of those averages. Subqueries enable multi-level aggregation.

# Question: 
1. Update the city for Jones to "New York" and print a table showing all the customers with their residing city as - "Customer: Jones Currently resides in New York"
```sql
update customer
set cust_city = "New York"
where cust_name = "Jones";

select concat("Customer: ", cust_name, " Currently resides in ", cust_city) as "Customer City" from customer;
```
Output:
```terminal
+---------------------------------------------------+
| Customer City                                     |
+---------------------------------------------------+
| Customer: Jones Currently resides in New York     |
| Customer: Smith Currently resides in Rye          |
| Customer: Hayes Currently resides in Harrison     |
| Customer: Curry Currently resides in Rye          |
| Customer: Lindsay Currently resides in Pittsfield |
| Customer: Turner Currently resides in Stamford    |
| Customer: Williams Currently resides in Princeton |
| Customer: Adams Currently resides in Pittsfield   |
| Customer: Johnson Currently resides in Palo alto  |
| Customer: Glenn Currently resides in Woodside     |
| Customer: Brooks Currently resides in Brooklyn    |
| Customer: Green Currently resides in Stamford     |
+---------------------------------------------------+
```

2. Create a view for Top 5 High Balance Accounts with balance greater than 1000 and order them in decreasing order.
```sql
create or replace view high_balance_accounts as
select c.cust_name, a.account_id, a.balance
from customer c
join depositor d on c.cust_id = d.cust_id
join account a on d.account_id = a.account_id
where a.balance > 1500
order by a.balance desc
limit 5;
```
output:
```terminal
+-----------+------------+-----------+
| cust_name | account_id | balance   |
+-----------+------------+-----------+
| Jones     | A-201      | 900.00000 |
| Lindsay   | A-217      | 750.00000 |
| Smith     | A-215      | 700.00000 |
| Turner    | A-222      | 700.00000 |
+-----------+------------+-----------+
```
The following view is not updateable. So we cannot insert any values. 

3. Create a financial summary view and create a concat section named summary_info which prints the following - "Jones (C00000000001) has account A-201 with balance 900.00000 and loan L-17 of amount 1000.00000"

```sql
CREATE OR REPLACE VIEW financial_summary AS
SELECT 
    c.cust_name,
    c.cust_id,
    d.account_id,
    a.balance,
    b.loan_id,
    l.amount,
    CONCAT(
        c.cust_name, ' (', c.cust_id, ') ',
        'has Account ', d.account_id, 
        ' with balance ', a.balance,
        ' and Loan ', b.loan_id,
        ' of amount ', l.amount
    ) AS summary_info
FROM customer c
NATURAL JOIN depositor d
NATURAL JOIN account a
NATURAL JOIN borrower b
NATURAL JOIN loan l
ORDER BY a.balance DESC;

SELECT summary_info FROM financial_summary;
```
output:
```terminal
+--------------------------------------------------------------------------------------------------+
| summary_info                                                                                     |
+--------------------------------------------------------------------------------------------------+
| Jones (C00000000001) has Account A-201 with balance 900.00000 and Loan L-17 of amount 1000.00000 |
| Smith (C00000000002) has Account A-215 with balance 700.00000 and Loan L-23 of amount 2000.00000 |
| Smith (C00000000002) has Account A-215 with balance 700.00000 and Loan L-11 of amount 900.00000  |
| Jones (C00000000001) has Account A-101 with balance 500.00000 and Loan L-17 of amount 1000.00000 |
| Hayes (C00000000003) has Account A-102 with balance 400.00000 and Loan L-15 of amount 1500.00000 |
| Curry (C00000000004) has Account A-305 with balance 350.00000 and Loan L-93 of amount 500.00000  |
+--------------------------------------------------------------------------------------------------+
```

4. Show the average salary, maximum salary and minimum salary per city

```sql
select employee_city, min(salary) as 'Min Salary', max(salary) as 'Max Salary', avg(salary) as 'Average Salary'
from employee
group by employee_city
having employee_city is not null
order by employee_city;
```
output:
```terminal
+---------------+------------+------------+----------------+
| employee_city | Min Salary | Max Salary | Average Salary |
+---------------+------------+------------+----------------+
| e_city_001    |   1400.000 |   5000.000 |   3800.0000000 |
| e_city_002    |   2850.000 |   5700.000 |   4716.6666667 |
| e_city_003    |   2000.000 |   9900.000 |   5766.6666667 |
| e_city_004    |   1000.000 |   5300.000 |   3433.3333333 |
| e_city_005    |   5000.000 |   6600.000 |   6033.3333333 |
| e_city_006    |   1500.000 |   2200.000 |   1800.0000000 |
| e_city_007    |   3500.000 |   9000.000 |   6250.0000000 |
| e_city_008    |   1500.000 |   5000.000 |   3250.0000000 |
| e_city_009    |   4000.000 |   4000.000 |   4000.0000000 |
| e_city_010    |   5600.000 |   7900.000 |   6750.0000000 |
+---------------+------------+------------+----------------+
```

5. Show the customer born after 1960 with total balance > 600
```sql
SELECT 
    c.Cust_id,
    c.Cust_name,
    c.Cust_dob,
    SUM(a.balance) AS Total_Balance
FROM Customer c
JOIN Depositor d ON c.Cust_id = d.Cust_id
JOIN Account a ON d.Account_id = a.Account_id
WHERE c.Cust_dob > '1960-01-01'
GROUP BY c.Cust_id, c.Cust_name, c.Cust_dob
HAVING SUM(a.balance) > 600;
```
output:
```terminal
+--------------+-----------+------------+---------------+
| Cust_id      | Cust_name | Cust_dob   | Total_Balance |
+--------------+-----------+------------+---------------+
| C00000000001 | Jones     | 1982-01-11 |    1400.00000 |
| C00000000006 | Turner    | 1982-11-26 |     700.00000 |
+--------------+-----------+------------+---------------+
```