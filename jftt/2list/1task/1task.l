%{
int num_lines = 0, num_words=0;
%}

WHITESPACES [ \t]+

%%
[^ \t\n]+ {++num_words; ECHO;} /*count number of words*/
^{WHITESPACES} /*ignore whitespaces at the beggining of the line*/
{WHITESPACES}$ /*ignore whitespaces at the end of the line*/
{WHITESPACES} putchar(' '); /*change many whitespaces to one ' '*/
(\n[ \t]*)+     {++num_lines; putchar('\n');} /*count lines and ignore empty lines*/
%%

int yywrap(){}
int main(int argc, char **argv){
    
    ++argv, --argc;  /* skip over program name */
    if ( argc > 0 )
            yyin = fopen( argv[0], "r" );
    else
            yyin = stdin;
    yylex();
    printf("\n# of lines = %d, # of words = %d \n", num_lines, num_words);
    return 0; 
}
