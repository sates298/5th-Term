%option noyywrap
%{
#include "task_y.h"
#include<string>
int yylex();
%}

IGNORE (\\\n)+

%x COMMENT
%%
[ \t]+ 	/*ignore*/;
^\#     { BEGIN(COMMENT); }
<COMMENT>{
    .   /*ignore*/;
    {IGNORE} /*ignore*/;
    \n  BEGIN(INITIAL);
}

0|([1-9][0-9]*)	{ yylval = std::stoi(yytext); return VAL; }
\+	{ return PLUS; }
\- 	{ return MIN; }
\*	{ return MUL; }
\/  { return DIV; }
\%  { return MOD; }
\^  { return POW; }
\(	{ return LPAR; }
\)	{ return RPAR; }
{IGNORE} /*ignore*/;
\n	{ return END; }
.	{ return ERROR; }
%%
