---
title: Nulltsuki
draft: true
tags:
---

# PART B: Constraint Specification (10 Marks)

## Summarized Constraint Table - Four Required Relations

---

## Comprehensive Constraint Specification Table

| Relation                            | Constraint Type | Attributes                                                    | Specification         | ON DELETE    | ON UPDATE   | Justification                                                                                                                                            |
| ----------------------------------- | --------------- | ------------------------------------------------------------- | --------------------- | ------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DOCTOR**                          | PRIMARY KEY     | DoctorID                                                      | Unique identifier     | N/A          | N/A         | Ensures no duplicate doctors                                                                                                                             |
|                                     | CHECK           | Salary                                                        | `Salary > 0`          | N/A          | N/A         | Business rule: positive salary only, prevents invalid entries                                                                                            |
|                                     | NOT NULL        | DoctorID, Salary, DeptID                                      | All required          | N/A          | N/A         | Salary mandatory for payroll, DeptID ensures total participation                                                                                         |
|                                     | FOREIGN KEY     | DeptID → Department(DeptID)                                   | References department | **RESTRICT** | **CASCADE** | RESTRICT: Must reassign doctors before dept deletion, maintains org structure<br>CASCADE: Auto-update during dept ID changes                             |
| **APPOINTMENT**                     | PRIMARY KEY     | AppointmentID                                                 | Unique identifier     | N/A          | N/A         | Surrogate key for easier reference                                                                                                                       |
|                                     | NOT NULL        | AppointmentID, PatientID, DoctorID, Diagnosis, Fee, StartDate | All required          | N/A          | N/A         | Medical documentation and billing requirements                                                                                                           |
|                                     | FOREIGN KEY 1   | PatientID → Patient(PatientID)                                | References patient    | **CASCADE**  | **CASCADE** | CASCADE: Appointments meaningless without patient context<br>CASCADE: Maintain patient-appointment link                                                  |
|                                     | FOREIGN KEY 2   | DoctorID → Doctor(DoctorID)                                   | References doctor     | **RESTRICT** | **CASCADE** | RESTRICT: Preserve medical history and accountability<br>CASCADE: Maintain doctor-appointment link                                                       |
| **DEPARTMENT**                      | PRIMARY KEY     | DeptID                                                        | Unique identifier     | N/A          | N/A         | Ensures no duplicate departments                                                                                                                         |
|                                     | NOT NULL        | DeptID, DeptName, HeadDoctorID                                | All required          | N/A          | N/A         | Every dept must have name and head doctor                                                                                                                |
|                                     | UNIQUE          | DeptName                                                      | No duplicate names    | N/A          | N/A         | Prevents confusion in identification                                                                                                                     |
|                                     | FOREIGN KEY     | HeadDoctorID → Doctor(DoctorID)                               | References doctor     | **RESTRICT** | **CASCADE** | RESTRICT: Must assign new head before deletion<br>CASCADE: Maintain leadership link during ID changes<br>**Note:** Circular dependency with Doctor table |
| **PATIENT_ADMISSION (Admitted_To)** | PRIMARY KEY     | PatientID                                                     | Unique identifier     | N/A          | N/A         | One active admission per patient                                                                                                                         |
|                                     | NOT NULL        | PatientID, WardID, BedNo                                      | All required          | N/A          | N/A         | Admission must have patient, ward, and bed assignment                                                                                                    |
|                                     | FOREIGN KEY 1   | PatientID → Patient(PatientID)                                | References patient    | **RESTRICT** | **CASCADE** | RESTRICT: Must discharge before deletion, preserves history<br>CASCADE: Maintain patient-admission link                                                  |
|                                     | FOREIGN KEY 2   | WardID → Ward(WardID)                                         | References ward       | **RESTRICT** | **CASCADE** | RESTRICT: Must transfer patients before ward closure<br>CASCADE: Maintain ward assignment tracking                                                       |
|                                     | FOREIGN KEY 3   | (WardID, BedNo) → Bed(WardID, BedNo)                          | Composite FK to bed   | **RESTRICT** | **CASCADE** | RESTRICT: Must transfer patient before bed removal<br>CASCADE: Keep admission synced with bed numbering                                                  |

---

## Quick Reference: ON DELETE/UPDATE Actions

|Relation|Foreign Key|ON DELETE|ON UPDATE|Rationale|
|---|---|---|---|---|
|**Doctor**|DeptID → Department|RESTRICT|CASCADE|Cannot delete dept with doctors; Auto-update maintains integrity|
|**Appointment**|PatientID → Patient|CASCADE|CASCADE|Appointments meaningless without patient|
||DoctorID → Doctor|RESTRICT|CASCADE|Preserve medical history; Cannot delete doctor with appointments|
|**Department**|HeadDoctorID → Doctor|RESTRICT|CASCADE|Must assign new head first; Maintain leadership link|
|**Patient_Admission**|PatientID → Patient|RESTRICT|CASCADE|Must discharge first; Preserve admission history|
||WardID → Ward|RESTRICT|CASCADE|Must transfer patients first; Patient safety|
||(WardID, BedNo) → Bed|RESTRICT|CASCADE|Must transfer patient first; Maintain location tracking|

---

## Key Design Principles

|Action|When Used|Purpose|
|---|---|---|
|**RESTRICT (DELETE)**|Preserve history, maintain integrity|Requires manual intervention, prevents accidental data loss|
|**CASCADE (DELETE)**|Child meaningless without parent|Automatic cleanup (e.g., appointments without patients)|
|**CASCADE (UPDATE)**|All foreign keys|Maintains referential integrity during ID changes|

---

## SQL Implementation Summary

```sql
-- 1. DOCTOR
CREATE TABLE Doctor (
    DoctorID INT PRIMARY KEY,
    Salary DECIMAL(10,2) NOT NULL CHECK (Salary > 0),
    DeptID INT NOT NULL,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 2. APPOINTMENT
CREATE TABLE Appointment (
    AppointmentID INT PRIMARY KEY,
    PatientID INT NOT NULL,
    DoctorID INT NOT NULL,
    Diagnosis VARCHAR(200) NOT NULL,
    Fee DECIMAL(10,2) NOT NULL CHECK (Fee >= 0),
    StartDate DATE NOT NULL,
    EndDate DATE,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 3. DEPARTMENT
CREATE TABLE Department (
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(100) NOT NULL UNIQUE,
    HeadDoctorID INT NOT NULL,
    FOREIGN KEY (HeadDoctorID) REFERENCES Doctor(DoctorID)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 4. ADMITTED_TO
CREATE TABLE Admitted_To (
    PatientID INT PRIMARY KEY,
    WardID INT NOT NULL,
    BedNo INT NOT NULL,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (WardID) REFERENCES Ward(WardID)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (WardID, BedNo) REFERENCES Bed(WardID, BedNo)
        ON DELETE RESTRICT ON UPDATE CASCADE
);
```

---

## Constraint Count Summary

|Relation|PK|FK|CHECK|NOT NULL|UNIQUE|Total|
|---|---|---|---|---|---|---|
|Doctor|1|1|1|3|0|6|
|Appointment|1|2|1|6|0|10|
|Department|1|1|0|3|1|6|
|Patient_Admission|1|3|0|3|0|7|

---

**End of Constraint Specification** 


