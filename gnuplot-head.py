import sys

group_level = int(sys.argv[1])

desc = ['year','month','day','hour','5-minutes','minute'][group_level-1]
timefmt = '-'.join(['%Y','%m','%d','%H','%M'][:group_level])

print """set terminal png size 750, 500;
set xdata time;
set timefmt "%s";
plot "-" using 1:2 with lines notitle;
""" % (timefmt),