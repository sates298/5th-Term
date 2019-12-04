# Stanisław Woźniak
push!(LOAD_PATH, ".")
import Functions
using Functions
using Plots

a(x) = Base.MathConstants.e^x
a_a = 0.0
a_b = 1.0

rysujNnfx(a, a_a, a_b, 5)
savefig("plots/plot-5_a_n5.png")

rysujNnfx(a, a_a, a_b, 10)
savefig("plots/plot-5_a_n10.png")

rysujNnfx(a, a_a, a_b, 15)
savefig("plots/plot-5_a_n15.png")

b(x) = sin(x) * x^2
b_a = -1.0
b_b = 1.0

rysujNnfx(b, b_a, b_b, 5)
savefig("plots/plot-5_b_n5.png")

rysujNnfx(b, b_a, b_b, 10)
savefig("plots/plot-5_b_n10.png")

rysujNnfx(b, b_a, b_b, 15)
savefig("plots/plot-5_b_n15.png")