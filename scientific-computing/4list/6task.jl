# Stanisław Woźniak

push!(LOAD_PATH, ".")
import Functions
using Functions
using Plots

a(x) = abs(x)
a_a = -1.0
a_b = 1.0

rysujNnfx(a, a_a, a_b, 5)
savefig("plots/plot-6_a_n5.png")

rysujNnfx(a, a_a, a_b, 10)
savefig("plots/plot-6_a_n10.png")

rysujNnfx(a, a_a, a_b, 15)
savefig("plots/plot-6_a_n15.png")

b(x) = 1.0/(1 + x^2)
b_a = -5.0
b_b = 5.0

rysujNnfx(b, b_a, b_b, 5)
savefig("plots/plot-6_b_n5.png")

rysujNnfx(b, b_a, b_b, 10)
savefig("plots/plot-6_b_n10.png")

rysujNnfx(b, b_a, b_b, 15)
savefig("plots/plot-6_b_n15.png")