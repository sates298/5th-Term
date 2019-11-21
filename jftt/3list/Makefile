CC=g++
BISON=bison
FLEX=flex

BISONO=task_y.c
FLEXO=task_l.c
MAIN=main

BFLAGS=-d -Wconflicts-sr
CFLAGS=-Wall --pedantic #-std=c11
TASKY=task.y
TASKL=task.l


.PHONY = all clean cleanall

all: bison flex main


main: $(BISONO) $(FLEXO)
	$(CC) $(CFLAGS) -o $(MAIN) $(BISONO) $(FLEXO)

flex:
	$(FLEX) -o $(FLEXO) $(TASKL)

bison:
	$(BISON) -o $(BISONO) $(BFLAGS) $(TASKY)

clean:
	rm -f *.c *.h

cleanall: clean
	rm -f $(MAIN)