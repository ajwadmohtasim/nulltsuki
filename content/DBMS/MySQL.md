*This note uses XAMPP for MySQL and assumes, it's already set up.*
Before starting, here are the SQL commands at a glance:

<div align="center">

| SQL Command       | Description                      |
| ----------------- | -------------------------------- |
| `SELECT`          | Extracts data from a database    |
| `UPDATE`          | Updates data in a database       |
| `DELETE`          | Deletes data from a database     |
| `INSERT INTO`     | Inserts new data into a database |
| `CREATE DATABASE` | Creates a new database           |
| `ALTER DATABASE`  | Modifies a database              |
| `CREATE TABLE`    | Creates a new table              |
| `ALTER TABLE`     | Modifies a table                 |
| `DROP TABLE`      | Deletes a table                  |
| `CREATE INDEX`    | Creates an index (search key)    |
| `DROP INDEX`      | Deletes an index                 |
</div>

### Introduction to the basics
This section will walkthrough all the SQL basics and commands.

To create a new user with all the permissions:
```
mysql -u root -p -e "GRANT ALL ON *.* TO 'username'@'localhost' IDENTIFIED BY '1234';"
mysql -u username -p
```
The following example will create a user `username` with the password `1234`.

```terminal
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 36
Server version: 10.4.32-MariaDB mariadb.org binary distribution

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]>
```

To show existing databases:
```sql
SHOW DATABASES;
```
This pulls up:
```terminal
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| phpmyadmin         |
| test               |
+--------------------+
```

We need a new database to work with:
```sql
CREATE DATABASE testdb;
USE testdb;
```
To delete a database we use
```sql
DROP DATABASE testdb;
```

For now our table is empty and we need new table:
```sql
CREATE TABLE Customer (
Cust_id VARCHAR(12) NOT NULL,
Cust_name VARCHAR(20),
Cust_dob DATE,
Cust_street VARCHAR(12),
Cust_city VARCHAR(12) DEFAULT 'ABC'
);
```
We can see what tables we have and describe that table to us:
```sql
SHOW TABLES;
DESCRIBE Customer;
```

```terminal
+------------------+
| Tables_in_testdb |
+------------------+
| customer         |
+------------------+

+-------------+-------------+------+-----+---------+-------+
| Field       | Type        | Null | Key | Default | Extra |
+-------------+-------------+------+-----+---------+-------+
| Cust_id     | varchar(12) | NO   |     | NULL    |       |
| Cust_name   | varchar(20) | YES  |     | NULL    |       |
| Cust_dob    | date        | YES  |     | NULL    |       |
| Cust_street | varchar(12) | YES  |     | NULL    |       |
| Cust_city   | varchar(12) | YES  |     | ABC     |       |
+-------------+-------------+------+-----+---------+-------+
```

To insert data we use the `INSERT`command. 
```sql
INSERT INTO
Customer (Cust_id, Cust_name, Cust_dob, Cust_street, Cust_city) VALUES
('C01', 'MAX', '1952-12-23', 'Avenue 01', 'Riverea'),
('C02', 'JOHN', '1964-05-21', 'Block 5A', 'Maver');
```
It can also be written without explicitly mentioning the columns.
```sql
INSERT INTO Customer VALUES
('C01', 'MAX', '1952-12-23', 'Avenue 01', 'Riverea'),
('C02', 'JOHN', '1964-05-21', 'Block 5A', 'Maver');
```
If any  specific column is to be added that can be done by specifying that column.
```sql
INSERT INTO Customer (Cust_name) VALUES ('HARRY');
```
Doing so, will fill the rest of the columns with default values or `NULL`.

To check the contents of the table:
```sql
SELECT * FROM Customer;
```
*note - Customer isn't case sensitive, `customer` works too.*
```terminal
+---------+-----------+------------+-------------+-----------+
| Cust_id | Cust_name | Cust_dob   | Cust_street | Cust_city |
+---------+-----------+------------+-------------+-----------+
| C01     | MAX       | 1952-12-23 | Avenue 01   | Riverea   |
| C02     | JOHN      | 1964-05-21 | Block 5A    | Maver     |
|         | HARRY     | NULL       | NULL        | ABC       |
+---------+-----------+------------+-------------+-----------+
```
The `Cust_id` for *Harry* remained empty as it's originally defined `NOT NULL` and wasn't provided a `DEFAULT` value like `Cust_city`.

To Update this, we can do:
```sql
UPDATE customer
SET
Cust_id = 'C03',
Cust_city = 'Vanden'
WHERE
Cust_name = 'HARRY';
```

This will look for the Condition `WHERE Cust_name = HARRY;` and update the entry. 

```sql
SELECT Cust_name as 'Customer Name' FROM customer;
```
This is **column aliasing** and this displays the `Cust_name` as `'Customer Name'`.
```sql
SELECT 
Cust_id AS "Customer ID",
Cust_name AS "Customer Name",
Cust_city AS "City"
FROM customer;
```

Some columns will have multiple same entries and to filter them: 
```sql
SELECT DISTINCT Cust_city from customer;
```
This will just display the unique entries for that specific column.

```sql
SELECT CONCAT('ID#', Cust_id, ': ' ,Cust_name, ' lives in ', Cust_city) FROM customer;
```
Concatenation can be done to display multiple column.
```terminal
+------------------------------------------------------------------+
| CONCAT('ID#', Cust_id, ': ' ,Cust_name, ' lives in ', Cust_city) |
+------------------------------------------------------------------+
| ID#C01: MAX lives in Riverea                                     |
| ID#C02: JOHN lives in Maver                                      |
| ID#C03: HARRY lives in Vanden                                    |
| ID#C04: KEN lives in Riverea                                     |
+------------------------------------------------------------------+
```
Dates can be formatted as well.
```sql
SELECT DATE_FORMAT(Cust_dob, '%M %e, %Y') FROM customer;
```

Entries can be deleted, we use `DELETE` for that.
```sql
DELETE FROM customer WHERE Cust_id = 'C03';
```
If condition is not set, it will delete all the rows (all the entries) from the TABLE;
To delete the entire table, use `DROP`.
```sql
DROP TABLE customer;
```



