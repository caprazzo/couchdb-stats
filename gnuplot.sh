FORMATS='%Y'
FMT = $()
echo '
set terminal png size 750, 500;
set xdata time; set timefmt "%Y-%m-%d-%H";
plot "-" using 1:2 with lines notitle;'
