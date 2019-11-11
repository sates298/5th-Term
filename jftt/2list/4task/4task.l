%{
    #include<stack>
    #include<string>
    #include<cmath>
    #include<iostream>

    std::stack<std::string> stack;
    int result;
    
    void reset(){
        while(!stack.empty()){
            stack.pop();
        }
    }

    void empty_stack_err(){
        std::cout << "Error: Too few arguments!" << std::endl;
    }

    bool is_op(std::string s){
        try{
            stoi(s);
            return false;
        }catch(...){
            return true;
        }
    }

    int count_one(int fst, int snd, std::string op){
        if (op == "*")
            return fst*snd;
        if (op == "/")
            return fst/snd;
        if (op == "+")
            return fst+snd;
        if (op == "-")
            return fst-snd;
        if (op == "%")
            return fst%snd;
        if (op == "^")
            return pow(fst,snd);
        return -1;
    }

    void print_result(int result){
        std::cout << "= " << result << std::endl;
    }

    bool only_nums(std::stack<std::string> help){
        std::stack<std::string> tmp;
        std::string s_tmp;
        bool result = false;
        if(help.size()>1) result = true;
        while(!help.empty()){
            s_tmp = help.top();
            help.pop();
            if(is_op(s_tmp)){
                result = false;
            }
            tmp.emplace(s_tmp);
        }
        while(!tmp.empty()){
            help.emplace(tmp.top());
            tmp.pop();
        }

        return result;
    }

    void count(){
        std::stack<std::string> help;
        std::string s_fst, s_snd, symbol="";
        int fst, snd, result;
        if(stack.empty()){
            empty_stack_err();
            return;
        }
        while(stack.size()>1){
            while(!stack.empty()){
                if(symbol == ""){
                    symbol = stack.top();
                    stack.pop();
                }
                if(is_op(symbol)){
                    if(stack.empty()){
                        empty_stack_err();
                        return;
                    }
                    s_snd = stack.top();
                    stack.pop();
                    if(is_op(s_snd)){
                        help.emplace(symbol);
                        symbol = s_snd;
                    }else{
                        if(stack.empty()){
                            empty_stack_err();
                            return;
                        }
                        s_fst = stack.top();
                        stack.pop();
                        if(is_op(s_fst)){
                            help.emplace(symbol);
                            help.emplace(s_snd);
                            
                            symbol = s_fst;
                        }else{
                            fst = stoi(s_fst);
                            snd = stoi(s_snd);
                            if(s_snd == "0" && (symbol == "/" || symbol == "%")){
                                std::cout << "Error: Dividing by zero!" << std::endl;
                                reset();
                                return;
                            }
                            result = count_one(fst, snd, symbol);
                            help.emplace(std::to_string(result));
                            symbol = "";
                        }
                    }
                }else{
                    help.emplace(symbol);
                    symbol = "";
                }
            }
            if(only_nums(help)){
                empty_stack_err();
                reset();
                return;
            }
            while(!help.empty()){
                stack.emplace(help.top());
                help.pop();
            }
        }
        if(is_op(stack.top())){
            empty_stack_err();
        }else{
            std::cout << "= " << stack.top() << std::endl;
        }
        stack.pop();
    }    
%}

NUM -?(0|[1-9][0-9]*)
OP  [\+\*\-\/\%\^]
%%
{NUM}|{OP}    stack.emplace(yytext);
\n      count();
[ \t]   /*ignore*/
.  {
    reset();
    printf("Error: Wrong symbol \"%s\"\n",yytext);
    register int c;
    while( (c = yyinput()) != '\n' && c != EOF){
        /*ignore*/
    }
}

%%



int yywrap(){return 1;}
int main(){
    yyin = stdin;
    yylex();
    return 0;
}