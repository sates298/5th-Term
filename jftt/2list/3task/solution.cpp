#include "test/*asdf*/header.h"
#include <stdio.h>
#include <foo baz.h>

 
int foo();

int bar();  

 int g_global_var = 1;

 
int baz();
 
 
volatile int g_global;

 int main(int argc, const char* argv)
{
    printf("/* foo bar");
     
          
    foo();
     
/\
 
    foo();
 
    return 1;
}