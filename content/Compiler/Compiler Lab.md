---
title: Compiler Lab
draft:
tags:
---

# Sample 
bison file (a.y)
```
/*
E -> E + T | T
T -> T * F | F
F -> (E) | id
*/


%{
    #include<stdio.h>
    #include<stdlib.h>
    float result = 0;
    int yylex(void);
    void yyerror(const char* s);
%}

/*

*/
%union {
    float fval;
}
%token <fval> ID
%type <fval> E T F
%start input

/* 3 + 4 <- there are 3 arguments... num op num*/
%%
input : E {result = $1;}
    ;
E : E '+' T {$$ = $1 + $3;}
    | T {$$ = $1;}
    ;
T : T '*' F {$$ = $1 * $3;}
    | F {$$ = $1;}
    ;
F : '(' E ')' {$$ = $2;}
    | ID {$$ = $1;}
    ;
%%

int main() {
    printf("Enter the expression: ");
    if (yyparse() == 0) printf("Valid Expression. Result : %g\n", result);
    else printf("Invalid Expression");
    return 0;
}

void yyerror(const char* s) {
    fprintf(stderr, "Error: %s\n", s);
}
```
flex file (a.l)
```
%{
    #include "a.tab.h"
    #include <stdio.h>
    #include <stdlib.h>
    extern YYSTYPE yylval;
%}

/*Regex Part*/
%%
[0-9]+(\.[0-9]+)? {yylval.fval = atof(yytext); return ID;}
"+" {return '+';}
"*" {return '*';}
"(" {return '(';}
")" {return ')';}
[\n] {return 0;}
%%

int yywrap() {
    return 1;
}
```
Execute
```
 bison -a a.y
 flex a.l 
 gcc -o a a.tab.c lex.yy.c
 ./a
```
# Problem 1
Bison File (.y)
```
/*
CFG:
    E -> TE'
    E' -> +TE' | e
    T -> FT'
    T' -> *FT' | e
    F -> (E) | ID
*/

%{
    #include <stdio.h>
    #include <stdlib.h>
    int yylex(void);
    void yyerror(const char* s);
    float result = 0;
%}

%union {float fval;}
%token <fval> ID
%type <fval> E E1 F T T1

%%
input : input line
    |
    ;
line : E '\n' {result = $1; printf("Valid. %g\n", result);}
    | '\n' 
    ;
E : T E1 {$$ = $1 + $2;}
E1 : '+' T E1 {$$ = $2 + $3;} /* If E1 expands once : + T + T*/
    | {$$ = 0;}
    ;
T : F T1 {$$ = $1 * $2;}
    ;
T1 : '*' F T1 {$$ = $2 * $3;}
    | {$$ = 1;}
    ;
F : '(' E ')' {$$ = $2;}
    | ID {$$ = $1;}
    ;
%%

int main() {
    printf("Enter Expression:");
    if (yyparse() != 0) printf("Invalid.\n");
    return 0;
}

void yyerror(const char *s) {
    fprintf(stderr, "Error: %s\n", s);
}
```
lex file (.l)
```
%{
    #include "c.tab.h"
    extern YYSTYPE yylval;
%}

%%
[0-9]+(\.[0-9]+)? {yylval.fval = atof(yytext); return ID;}
[+*()] {return yytext[0];}
[\n] {return '\n';}
.
%%

int yywrap() {return 1;}
```

# Problem 2
```
/*
Make Calculator :V
expr: expr '+' expr
    | expr '-' expr
    | expr '*' expr
    | expr '/' expr
    | '(' expr ')'
    | ID
    ;
*/

%{
    #include <stdio.h>
    #include <stdlib.h>
    float result = 0;
    int yylex();
    void yyerror(const char* s);
%}

%union {float fval;}
%token <fval> ID
%type <fval> expr

%left '+' '-'
%left '*' '/'
%right UMINUS      

%%
input : input line
    |
    ;
line : expr '\n' {result = $1; printf("Valid. %g\n", result);}
    | '\n'
    ;
expr: expr '+' expr {$$ = $1 + $3;}
    | expr '-' expr {$$ = $1 - $3;}
    | expr '*' expr {$$ = $1 * $3;}
    | expr '/' expr {if ($3 != 0) $$ = $1 / $3; else yyerror("Zero!");}
    | '(' expr ')' {$$ = $2;}
    | '-' expr %prec UMINUS { $$ = -$2; }
    | ID {$$ = $1;}
    ;
%%

int main() {
    printf("Enter expression:");
    if (yyparse() != 0) printf("Invalid.\n");
    return 0;
}

void yyerror(const char* s) {
    fprintf(stderr, "Error : %s\n", s);
}
```

```
%{
    #include "d.tab.h"
    extern YYSTYPE yylval;
%}

%%
[0-9]+(\.[0-9]+)? {yylval.fval = atof(yytext); return ID;}
[+\-*/()] {return yytext[0];}
[\n] {return '\n';}
.
%%

int yywrap() {return 1;}
```