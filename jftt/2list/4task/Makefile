CC=g++
FLEX=lex

SRC=4task.l

PROD=lex.yy.c
MAIN = main.out

all: $(MAIN) clean

$(MAIN): flex.l 
	$(CC) -o $(MAIN) $(PROD) 

flex.l:
	$(FLEX) $(SRC)


.PHONY: clean

clean:
	rm -f  *.yy.c