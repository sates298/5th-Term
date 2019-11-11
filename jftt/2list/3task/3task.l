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

%%
\" {ECHO; BEGIN(STRING);}
<STRING>{
    .|\n ECHO;
    .\"|\n\"  {ECHO; BEGIN(INITIAL);}
}
\/\/\/  |
\/\/!   {
    if(docMode){
        ECHO;
        BEGIN(ONE_LINE_DOCUMENT);
    }else{
        BEGIN(ONE_LINE_COMMENT);
    }
}
\/\/    BEGIN(ONE_LINE_COMMENT);
<ONE_LINE_COMMENT>{
    .   /*ignore*/
    \n  {putchar(' ');BEGIN(INITIAL);}
}
<ONE_LINE_DOCUMENT>{
    .   ECHO;
    \n  {ECHO;BEGIN(INITIAL);}
}
\/\*\*  |
\/\*!   {
    if(docMode){
        ECHO;
        BEGIN(MULTILINE_DOCUMENT);
    }else{
        BEGIN(MULTILINE_COMMENT);
    }
}
\/\*   BEGIN(MULTILINE_COMMENT);
<MULTILINE_COMMENT>{
    .|\n    /*ignore*/
    \*\/    {putchar(' ');BEGIN(INITIAL);}   
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