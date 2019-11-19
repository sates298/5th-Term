%{
    #include<iostream>

    bool docMode = false;
    bool multiline = false;
%}

%x STRING
%x ONE_LINE_DOCUMENT
%x MULTILINE_DOCUMENT
%x ONE_LINE_COMMENT
%x MULTILINE_COMMENT

IGNORE \\\n

%%
\" {ECHO; BEGIN(STRING);}
<STRING>{
    .|\n ECHO;
    .\"|\n\"  {ECHO; BEGIN(INITIAL);}
}
{IGNORE}*   /*ignore*/
\/{IGNORE}*\/{IGNORE}*\/  |
\/{IGNORE}*\/{IGNORE}*!   {
    if(docMode){
        ECHO;
        BEGIN(ONE_LINE_DOCUMENT);
    }else{
        BEGIN(ONE_LINE_COMMENT);
    }
}
\/{IGNORE}*\/    BEGIN(ONE_LINE_COMMENT);
<ONE_LINE_COMMENT>{
    {IGNORE}*    /*ignore*/
    .   /*ignore*/
    \n  {BEGIN(INITIAL);}
}
<ONE_LINE_DOCUMENT>{
    .   ECHO;
    \n  {ECHO;BEGIN(INITIAL);}
}
\/{IGNORE}*\*{IGNORE}*\*  |
\/{IGNORE}*\*{IGNORE}*!   {
    if(docMode){
        ECHO;
        BEGIN(MULTILINE_DOCUMENT);
    }else{
        BEGIN(MULTILINE_COMMENT);
    }
}
\/{IGNORE}*\*   BEGIN(MULTILINE_COMMENT);
<MULTILINE_COMMENT>{
    .|\n    /*ignore*/
    \*\/    {BEGIN(INITIAL);}   
}
<MULTILINE_DOCUMENT>{
    .|\n    ECHO;
    \*\/    {ECHO; BEGIN(INITIAL);}
}



%%

int yywrap(){}
int main(int argc, char **argv){
    

    ++argv, --argc;  /* skip over program name */
    if ( argc > 0 ){
            if(argv[0][0] == '-' && argv[0][1] == 'd'){
                docMode = true;
                yyin = fopen( argv[1], "r" );
            }else{
                yyin = fopen( argv[0], "r" );
            }
    }else{
            yyin = stdin;
    }
    yylex();
    return 0; 
}