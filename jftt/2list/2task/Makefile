CC=g++
FLEX=lex

SRC=2task.l

PROD=lex.yy.c
MAIN = main.out

all: $(MAIN)

$(MAIN): flex.l 
	$(CC) -o $(MAIN) $(PROD) 

flex.l:
	$(FLEX) $(SRC)


.PHONY: clean

clean:
	rm -f  *.yy.c
