%{
#define YYSTYPE int
#include<iostream>
#include<cmath>
#include<string>
#include<vector>
int yylex();
int yyerror(const char*);
void print_out();
extern int yylval;
std::vector<std::string> out;
int err = 0;
%}
%token VAL
%token PLUS
%token MIN
%token MUL
%token DIV
%token MOD
%token POW
%token LPAR
%token RPAR
%token END
%token ERROR
%%
input:
    | input line
;
line: exp END 	{ 
        if(err){
            out.clear();
            err = 0;
        }else{
            print_out();
            std::cout << "\nScore: " << $$ << '\n';
        } 
    }
    | error END	{ out.clear(); yyerror("ERROR"); }
;
exp: expl		        { $$ = $1; }
    | exp PLUS expl	{$$ = $1 + $3; out.emplace_back("+");}
    | exp MIN expl     {$$ = $1 - $3; out.emplace_back("-");}
;
expl: exps              {$$ = $1;}
    | expl MUL exps     {$$ = $1 * $3; out.emplace_back("*");}
    | expl DIV exps     {
            if($3 == 0){
                yyerror("Dividing by zero");
                err = 1;
            }else if($3*$1 <0 && $1%$3 != 0){
                $$ =($1 / $3) - 1;
            }else{
                $$ = $1 / $3;
            }
            out.emplace_back("/");
        }
    | expl MOD exps     {
            if($3 == 0){
                yyerror("Dividing by zero");
                err = 1;
            }else if($3*$1 < 0 && $1%$3 != 0){
                $$ = ($1 % $3) + $3;
            }else{
                $$ = $1 % $3;
            }
            out.emplace_back("%");
        }
;
exps: expf              {$$ = $1;}
    | expf POW exps     {$$ = pow($1, $3); out.emplace_back("^");}
;
expf: VAL	            {out.emplace_back(std::to_string(yylval));}
    | MIN expf          {$$ = -$2; out.emplace_back("~");}
    | LPAR exp RPAR	    {$$ = $2;}
;
%%
int yyerror(const char *s)
{
    std::cout << s << '\n';	
    return 0;
}
void print_out(){
    int i = 0;
    while(i < out.size()){
        std::cout << out[i] << " ";
        i++;
    }
    out.clear();
}
int main()
{
    yyparse();
    return 0;
}
