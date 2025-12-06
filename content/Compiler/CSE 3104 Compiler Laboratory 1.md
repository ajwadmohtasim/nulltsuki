---
title: CSE 3104 Compiler Laboratory Lecture 1
draft: true
tags:
---
A compiler is a translator program that translates a program written in High-Level Language (HLL) - the source program - into an equivalent program in Machine-Level Language (MLL) - the target program.
```terminal
Source Program → [Compiler] → Target Program
                      ↓
                Error messages
```

Structure of a Compiler consists of:
1. **Analysis (Front End)**: Machine Independent / Language Dependent
2. **Synthesis (Back End)**: Machine Dependent / Language Independent

### **Six Phases of a Compiler**
1. **Lexical Analyzer** - Converts character stream to tokens
2. **Syntax Analyzer** - Checks grammatical structure
3. **Semantic Analyzer** - Checks meaning and type consistency
4. **Intermediate Code Generator** - Creates intermediate representation
5. **Code Optimizer** - Improves efficiency
6. **Code Generator** - Produces target machine code
_Symbol table and error handler interact with all phases_

### **Lexical Analysis Phase**
The lexical analyzer (scanner/tokenizer):
- Reads characters from source program
- Groups characters into meaningful sequences called **tokens**
- Each token represents a logically cohesive sequence

**Token Types:**
- Keywords (`int`, `float`, `if`, `while`, etc.)
- Identifiers (variable names, function names)
- Operators (`+`, `-`, `*`, `/`, `=`, etc.)
- Numbers (integer and floating-point literals)
- Punctuation (`(`, `)`, `{`, `}`, `,`, `;`)

**Example:**
```terminal
int x = 10;
```

**Tokens:**

- `int` → KEYWORD (data type)
- `x` → IDENTIFIER (variable name)
- `=` → OPERATOR (assignment)
- `10` → NUMBER (integer literal)
- `;` → PUNCTUATION (statement terminator)

---

## **Task 01: Complete Tokenizer**

Identify all tokens from a C source file: keywords, identifiers, operators, numbers, and punctuation.
### **Input File: `input.txt`**
```terminal
int main() {
    int a = 5, b = 10;
    float result = a + b;
}
```
### **Complete Code: `tokenizer.c`**
```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

// Array of C keywords
char *keywords[] = {
    "int", "float", "return", "if", "else", "while", 
    "for", "main", "void", NULL
};

// Function to check if a word is a keyword
int isKeyword(const char *word) {
    for (int i = 0; keywords[i] != NULL; i++) {
        if (strcmp(word, keywords[i]) == 0)
            return 1;
    }
    return 0;
}

// Function to check if a character is an operator
int isOperator(char ch) {
    return (ch == '+' || ch == '-' || ch == '*' || ch == '/' || 
            ch == '=' || ch == '<' || ch == '>');
}

// Function to check if a character is punctuation
int isPunctuation(char ch) {
    return (ch == '(' || ch == ')' || ch == '{' || ch == '}' || 
            ch == ',' || ch == ';');
}

int main() {
    FILE *fp;
    char ch, word[100];
    int i = 0;
    
    // Open input file
    fp = fopen("input.txt", "r");
    if (!fp) {
        printf("Cannot open file.\n");
        return 1;
    }
    
    printf("Tokens:\n");
    
    // Read file character by character
    while ((ch = fgetc(fp)) != EOF) {
        // If alphanumeric or underscore, build word
        if (isalnum(ch) || ch == '_') {
            word[i++] = ch;
        } else {
            // End of word
            if (i > 0) {
                word[i] = '\0';
                i = 0;
                
                // Classify the word
                if (isKeyword(word))
                    printf("KEYWORD     : %s\n", word);
                else if (isdigit(word[0]))
                    printf("NUMBER      : %s\n", word);
                else
                    printf("IDENTIFIER  : %s\n", word);
            }
            
            // Check current character
            if (isOperator(ch)) {
                printf("OPERATOR    : %c\n", ch);
            } else if (isPunctuation(ch)) {
                printf("PUNCTUATION : %c\n", ch);
            } else if (isspace(ch)) {
                // Ignore whitespace
            } else if (!isalnum(ch) && ch != '\n' && ch != ' ') {
                printf("UNKNOWN     : %c\n", ch);
            }
        }
    }
    
    fclose(fp);
    return 0;
}
```

### **How to Run Task 01**

```terminal
# Step 1: Create input file
cat > input.txt << 'EOF'
int main() {
    int a = 5, b = 10;
    float result = a + b;
}
EOF

# Step 2: Compile the program
gcc tokenizer.c -o tokenizer

# Step 3: Run the program
./tokenizer
```
### **Expected Output**
```terminal
Tokens:
KEYWORD     : int
KEYWORD     : main
PUNCTUATION : (
PUNCTUATION : )
PUNCTUATION : {
KEYWORD     : int
IDENTIFIER  : a
OPERATOR    : =
NUMBER      : 5
PUNCTUATION : ,
IDENTIFIER  : b
OPERATOR    : =
NUMBER      : 10
PUNCTUATION : ;
KEYWORD     : float
IDENTIFIER  : result
OPERATOR    : =
IDENTIFIER  : a
OPERATOR    : +
IDENTIFIER  : b
PUNCTUATION : ;
PUNCTUATION : }
```

---

## **Task 02: Comment Detector**

Detect and classify comments in source code:
- Single-line comments: `//`
- Multi-line comments: `/* ... */`
- Ignore redundant whitespace and tabs

### **Key C++ String Functions**

- **`find_first_not_of()`**: Searches string and returns index of first character not in specified set
- **`substr(start)`**: Returns substring from start index to end
- **`clear()`**: Empties string content
- **`find()`**: Searches for substring and returns position

### **Input File: `input.txt`**

```c
// This is a comment
int main() {
    int a = 5, b = 10;
    /* This is a multiline comment */
    float result = a + b;
}
/* Start of a comment
*/
```

### **Complete Code: `comment_detector.cpp`**

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <algorithm>
#include <cctype>
using namespace std;

// Function to trim leading whitespace
void trimLeading(string &str) {
    size_t start = str.find_first_not_of(" \t\r\n");
    if (start != string::npos) {
        str = str.substr(start);
    } else {
        str.clear(); // All whitespace
    }
}

int main() {
    ifstream file("input.txt");
    
    if (!file) {
        cerr << "Error: Could not open input.txt" << endl;
        return 1;
    }
    
    string line;
    cout << "Analyzing lines from input.txt:\n" << endl;
    
    while (getline(file, line)) {
        trimLeading(line);
        
        // Skip empty lines
        if (line.empty()) continue;
        
        // Check for single-line comment
        if (line.substr(0, 2) == "//") {
            cout << "Line: \"" << line << "\"" << endl;
            cout << " This is a single-line comment.\n" << endl;
        }
        // Check for complete multi-line comment in one line
        else if (line.substr(0, 2) == "/*" && line.find("*/") != string::npos) {
            cout << "Line: \"" << line << "\"" << endl;
            cout << " This is a complete multi-line comment in one line.\n" << endl;
        }
        // Check for start of multi-line comment
        else if (line.substr(0, 2) == "/*") {
            cout << "Line: \"" << line << "\"" << endl;
            cout << " This is the start of a multi-line comment.\n" << endl;
        }
        // Check for end of multi-line comment
        else if (line.find("*/") != string::npos) {
            cout << "Line: \"" << line << "\"" << endl;
            cout << " This is the end of a multi-line comment.\n" << endl;
        }
        // Not a comment
        else {
            cout << "Line: \"" << line << "\"" << endl;
            cout << " This is NOT a comment.\n" << endl;
        }
    }
    
    file.close();
    return 0;
}
```

### **How to Run Task 02**

```terminal
# Step 1: Create input file
cat > input.txt << 'EOF'
// This is a comment
int main() {
    int a = 5, b = 10;
    /* This is a multiline comment */
    float result = a + b;
}
/* Start of a comment
*/
EOF

# Step 2: Compile the program
g++ comment_detector.cpp -o comment_detector

# Step 3: Run the program
./comment_detector
```

### **Expected Output**

```terminal
Analyzing lines from input.txt:

Line: "// This is a comment"
 This is a single-line comment.

Line: "int main() {"
 This is NOT a comment.

Line: "int a = 5, b = 10;"
 This is NOT a comment.

Line: "/* This is a multiline comment */"
 This is a complete multi-line comment in one line.

Line: "float result = a + b;"
 This is NOT a comment.

Line: "}"
 This is NOT a comment.

Line: "/* Start of a comment"
 This is the start of a multi-line comment.

Line: "*/"
 This is the end of a multi-line comment.
```

---

## **Task 03: Identifier Validator**

### **Purpose**

Test whether given identifiers are valid according to C/C++ naming rules.

### **Validation Rules**

1. **First character** must be a letter (a-z, A-Z) or underscore (_)
2. **Remaining characters** can be letters, digits (0-9), or underscores
3. **Cannot be a reserved keyword**

### **Input File: `input.txt`**

```terminal
myVariable
123abc
float
_underscore_var
helloWorld123
for
good_name
3name
```

### **Complete Code: `identifier_check.cpp`**

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <cctype>
#include <vector>
using namespace std;

// Vector of C/C++ keywords
vector<string> keywords = {
    "auto", "break", "case", "char", "const", "continue", "default", "do", "double",
    "else", "enum", "extern", "float", "for", "goto", "if", "inline", "int", "long",
    "register", "restrict", "return", "short", "signed", "sizeof", "static", "struct",
    "switch", "typedef", "union", "unsigned", "void", "volatile", "while", "class",
    "public", "private", "protected", "virtual", "template", "typename", "try", "catch",
    "new", "delete", "namespace", "using", "this", "throw", "bool", "true", "false"
};

// Function to check if a word is a keyword
bool isKeyword(const string &word) {
    for (const string &kw : keywords) {
        if (word == kw) return true;
    }
    return false;
}

// Function to check if a string is a valid identifier
bool isValidIdentifier(const string &id) {
    // Empty string is not valid
    if (id.empty()) return false;
    
    // First character must be a letter or underscore
    if (!isalpha(id[0]) && id[0] != '_') return false;
    
    // Remaining characters can be letters, digits or underscores
    for (size_t i = 1; i < id.length(); i++) {
        if (!isalnum(id[i]) && id[i] != '_') return false;
    }
    
    // It should not be a keyword
    if (isKeyword(id)) return false;
    
    return true;
}

int main() {
    ifstream file("input.txt");
    
    if (!file.is_open()) {
        cerr << "Error: Could not open input.txt\n";
        return 1;
    }
    
    string line;
    cout << "Identifier Check Results:\n";
    cout << "-------------------------\n";
    
    while (getline(file, line)) {
        // Trim leading and trailing whitespace
        size_t start = line.find_first_not_of(" \t\n\r");
        size_t end = line.find_last_not_of(" \t\n\r");
        
        if (start == string::npos) {
            continue; // skip empty lines
        }
        
        string identifier = line.substr(start, end - start + 1);
        
        if (isValidIdentifier(identifier)) {
            cout << identifier << " --> VALID IDENTIFIER\n";
        } else {
            cout << identifier << " --> INVALID IDENTIFIER\n";
        }
    }
    
    file.close();
    return 0;
}
```

### **How to Run Task 03**

```terminal
# Step 1: Create input file
cat > input.txt << 'EOF'
myVariable
123abc
float
_underscore_var
helloWorld123
for
good_name
3name
EOF

# Step 2: Compile the program
g++ identifier_check.cpp -o identifier_check

# Step 3: Run the program
./identifier_check
```

### **Expected Output**

```terminal
Identifier Check Results:
-------------------------
myVariable --> VALID IDENTIFIER
123abc --> INVALID IDENTIFIER
float --> INVALID IDENTIFIER
_underscore_var --> VALID IDENTIFIER
helloWorld123 --> VALID IDENTIFIER
for --> INVALID IDENTIFIER
good_name --> VALID IDENTIFIER
3name --> INVALID IDENTIFIER
```

## Lexical_analyzer.c
```cpp
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

#define MAX_TOKEN_LEN 256

// ------------------- Keyword Checking -------------------
bool isKeyword(const char *str)
{
    const char *keywords[] = {
        "alignas", "alignof", "and", "and_eq", "asm", "auto", "bitand", "bitor",
        "bool", "break", "case", "catch", "char", "char16_t", "char32_t", "class",
        "compl", "const", "constexpr", "const_cast", "continue", "decltype", "default",
        "delete", "do", "double", "dynamic_cast", "else", "enum", "explicit", "export",
        "extern", "false", "float", "for", "friend", "goto", "if", "inline", "int",
        "long", "mutable", "namespace", "new", "noexcept", "not", "not_eq", "nullptr",
        "operator", "or", "or_eq", "private", "protected", "public", "register",
        "reinterpret_cast", "return", "short", "signed", "sizeof", "static", "static_assert",
        "static_cast", "struct", "switch", "template", "this", "thread_local", "throw",
        "true", "try", "typedef", "typeid", "typename", "union", "unsigned", "using",
        "virtual", "void", "volatile", "wchar_t", "while", "xor", "xor_eq"};
    int n = sizeof(keywords) / sizeof(keywords[0]);
    for (int i = 0; i < n; i++)
        if (strcmp(str, keywords[i]) == 0)
            return true;
    return false;
}

// ------------------- Identifier Validation -------------------
bool isValidIdentifier(const char *str)
{
    if (!isalpha(str[0]) && str[0] != '_')
        return false;
    for (int i = 1; str[i]; i++)
        if (!isalnum(str[i]) && str[i] != '_')
            return false;
    return true;
}

// ------------------- Operator and Punctuation -------------------
bool isOperator(int c)
{
    return strchr("+-*/%=^><", c) != NULL;
}

bool isPunctuation(int c)
{
    return strchr(";:,(){}[]", c) != NULL;
}

// ------------------- Comment Detection -------------------
bool isSingleLineComment(char first, char second)
{
    return (first == '/' && second == '/');
}

bool isMultiLineCommentStart(char first, char second)
{
    return (first == '/' && second == '*');
}

bool isMultiLineCommentEnd(char first, char second)
{
    return (first == '*' && second == '/');
}

// ------------------- Parser -------------------
void parser(const char *filename)
{
    FILE *fp = fopen(filename, "r");
    if (!fp)
    {
        perror("File opening failed");
        return;
    }

    char buffer[MAX_TOKEN_LEN];
    int idx = 0, ch;
    int inMultiLineComment = 0;

    while ((ch = fgetc(fp)) != EOF)
    {
        // Inside multi-line comment
        if (inMultiLineComment)
        {
            int next = fgetc(fp);
            if (next == EOF)
                break;
            if (isMultiLineCommentEnd(ch, next))
            {
                inMultiLineComment = 0;
                printf(">> End of Multi-line Comment\n");
            }
            else
                ungetc(next, fp);
            continue;
        }

        // Possible comment
        if (ch == '/')
        {
            int next = fgetc(fp);
            if (next == EOF)
                break;

            if (isSingleLineComment(ch, next))
            {
                printf(">> Single-line Comment ignored\n");
                while ((ch = fgetc(fp)) != EOF && ch != '\n')
                    ;
                continue;
            }
            else if (isMultiLineCommentStart(ch, next))
            {
                inMultiLineComment = 1;
                printf(">> Start of Multi-line Comment\n");
                continue;
            }
            else
            {
                ungetc(next, fp);
                printf("OPERATOR              : /\n");
                continue;
            }
        }

        // Preprocessor Directives
        if (ch == '#')
        {
            idx = 0;
            buffer[idx++] = ch;
            while ((ch = fgetc(fp)) != EOF && !isspace(ch))
                buffer[idx++] = ch;
            buffer[idx] = '\0';
            printf("Preprocessor Directive: %s\n", buffer);

            idx = 0;
            while ((ch = fgetc(fp)) != EOF && ch != '\n')
                buffer[idx++] = ch;
            buffer[idx] = '\0';
            if (strlen(buffer) > 0)
                printf("Preprocessor Argument : %s\n", buffer);

            continue;
        }

        // Skip whitespace
        if (isspace(ch))
            continue;

        // Identifiers, Keywords, Numbers
        if (isalnum(ch) || ch == '_')
        {
            idx = 0;
            buffer[idx++] = ch;
            while ((ch = fgetc(fp)) != EOF && (isalnum(ch) || ch == '_'))
                buffer[idx++] = ch;
            buffer[idx] = '\0';
            ungetc(ch, fp);

            if (isKeyword(buffer))
                printf("KEYWORD               : %s\n", buffer);
            else if (isValidIdentifier(buffer))
                printf("IDENTIFIER            : %s\n", buffer);
            else if (isdigit(buffer[0]))
                printf("CONSTANT              : %s\n", buffer);
            else
                printf("INVALID IDENTIFIER    : %s\n", buffer);

            continue;
        }

        // Operators & Punctuation
        if (isOperator(ch))
            printf("OPERATOR              : %c\n", ch);
        else if (isPunctuation(ch))
            printf("PUNCTUATION           : %c\n", ch);
        else
            printf("UNKNOWN               : %c\n", ch);
    }

    fclose(fp);
}

// ------------------- Main -------------------
int main()
{
    parser("input.txt");
    return 0;
}

```
## **Lab Questions & Answers**

### **Q1: What is a lexical analyzer?**

**Answer:** A lexical analyzer (also called scanner or tokenizer) is the first phase of a compiler that reads the source program as a stream of characters and converts it into a sequence of tokens. It groups characters into meaningful lexical units such as keywords, identifiers, operators, numbers, and punctuation marks. It also removes whitespace and comments as they are not needed in later compilation stages.

### **Q2: Which compiler is used for lexical analysis?**

**Answer:** Lexical analysis is a component present in all compilers, not a separate compiler itself. Every compiler (GCC, Clang, MSVC, Java Compiler, etc.) has a lexical analyzer as its first phase. Tools like **Lex** and **Flex** are specifically designed to generate lexical analyzers automatically from regular expression specifications.

### **Q3: What is the output of Lexical analyzer?**

**Answer:** The output of a lexical analyzer is a **stream (sequence) of tokens**. Each token consists of:

- **Token Type**: Category (keyword, identifier, operator, number, punctuation)
- **Token Value**: The actual lexeme (text) from source code
- **Position Information**: Line number and column (for error reporting)

Example: For `int x = 5;`

- Token: `<KEYWORD, "int">`
- Token: `<IDENTIFIER, "x">`
- Token: `<OPERATOR, "=">`
- Token: `<NUMBER, "5">`
- Token: `<PUNCTUATION, ";">`

### **Q4: Which Finite State Machines are used in lexical analyzer design?**

**Answer:** Two types of Finite State Machines are used:

1. **NFA (Non-deterministic Finite Automaton)**
    
    - Multiple possible transitions for same input
    - Easier to construct from regular expressions
    - Used in initial design phase
2. **DFA (Deterministic Finite Automaton)**
    
    - Exactly one transition for each input symbol
    - More efficient for implementation
    - NFA is converted to DFA for actual implementation

The lexical analyzer typically uses **DFA** for efficient token recognition because it guarantees linear time complexity O(n) where n is the input length.

### **Q5: What is the role of regular expressions and context-free grammars in Lexical Analyzer?**

**Answer:**

**Regular Expressions:**

- Used to **specify patterns** for tokens in the lexical analyzer
- Define structure of identifiers, keywords, numbers, operators
- Example patterns:
    - Identifier: `[a-zA-Z_][a-zA-Z0-9_]*`
    - Integer: `[0-9]+`
    - Float: `[0-9]+\.[0-9]+`
- Regular expressions are converted to finite automata (NFA/DFA) for implementation

**Context-Free Grammars (CFG):**

- **NOT used in lexical analysis** - they are used in the **syntax analysis phase**
- Regular expressions are sufficient for lexical analysis because tokens have simple, regular structure
- CFG handles more complex nested structures like expressions, statements, and program structure
- Example: `if-else` nesting, balanced parentheses, arithmetic expression precedence

**Summary:**

- **Lexical Analysis**: Regular Expressions → Finite Automata
- **Syntax Analysis**: Context-Free Grammars → Pushdown Automata

---

## **Quick Reference**

### **Compilation Commands**

```bash
# For C programs
gcc program.c -o program
./program

# For C++ programs
g++ program.cpp -o program
./program

# Compile with warnings (recommended)
gcc -Wall program.c -o program
g++ -Wall program.cpp -o program
```

### **Common ctype.h Functions (C)**

```c
isalpha(ch)   // Check if alphabetic (a-z, A-Z)
isdigit(ch)   // Check if digit (0-9)
isalnum(ch)   // Check if alphanumeric
isspace(ch)   // Check if whitespace
isupper(ch)   // Check if uppercase
islower(ch)   // Check if lowercase
```

### **Common string Functions (C++)**

```cpp
string.find(substr)              // Find substring position
string.substr(start, length)     // Extract substring
string.find_first_not_of(chars)  // Find first char not in set
string.find_last_not_of(chars)   // Find last char not in set
string.clear()                   // Empty the string
string.empty()                   // Check if string is empty
string.length()                  // Get string length
```

### **File Operations**

```c
// C style
FILE *fp = fopen("file.txt", "r");  // Open for reading
fgetc(fp)                           // Read one character
fclose(fp)                          // Close file
```

```cpp
// C++ style
ifstream file("file.txt");          // Open for reading
getline(file, line)                 // Read one line
file.close()                        // Close file
```

### **Token Classification Summary**

|Token Type|Examples|Pattern|
|---|---|---|
|Keyword|`int`, `float`, `if`, `while`|Fixed set of reserved words|
|Identifier|`x`, `count`, `myVar`|`[a-zA-Z_][a-zA-Z0-9_]*`|
|Number|`42`, `3.14`, `0xFF`|`[0-9]+` or `[0-9]+\.[0-9]+`|
|Operator|`+`, `-`, `*`, `/`, `=`|`+`, `-`, `*`, `/`, `=`, `<`, `>`|
|Punctuation|`(`, `)`, `{`, `}`, `;`|`(`, `)`, `{`, `}`, `,`, `;`|
|Comment|`// text`, `/* text */`|`//.*` or `/*.**/`|
