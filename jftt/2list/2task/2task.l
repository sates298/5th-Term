%{
    #include <vector>
    #include <string>
    #include <iostream>

    std::vector<std::string> comment;
    bool error = false;
%}

%x COMMENT
%x TAG
%x DATA
%%
\<!\[CDATA\[    {ECHO; BEGIN(DATA);}
\<!--   {comment.emplace_back(yytext);BEGIN(COMMENT);}
\<      {ECHO; BEGIN(TAG);}
<DATA>{
            .|\n    ECHO;
            ]]\>    {ECHO;BEGIN(INITIAL);}
        }
<TAG>{
            \".*\"  ECHO;
            .|\n    ECHO;
            .>      {ECHO;BEGIN(INITIAL);}    
        }
<COMMENT>{
            --      {error = true;comment.emplace_back(yytext);}
            .|\n    comment.emplace_back(yytext);
            --\>    {   comment.emplace_back(yytext);
                        if(error){
                            for(std::string s: comment){
                                std::cout << s;
                            }
                        }
                        comment.clear();
                        error = false;
                        BEGIN(INITIAL);
                    }
                    
        }

%%

int yywrap(){}
int main(int argc, char **argv){
    
    ++argv, --argc;  /* skip over program name */
    if ( argc > 0 )
            yyin = fopen( argv[0], "r" );
    else
            yyin = stdin;
    yylex();
    return 0; 
}