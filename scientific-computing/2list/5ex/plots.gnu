set terminal png size 400, 300
set nokey

set output '32.png'
plot '32d.data' with lines

set output 'cut32.png'
plot 'cut32d.data' with lines

set output '64.png'
plot '64d.data' with lines

set output 'cut64.png'
plot 'cut64d.data' with lines