# Stanisław Woźniak

push!(LOAD_PATH, ".")
import Methods
using Methods

delta = epsilon = 10^(-4)
f(x) = 3*x
g(x) = Base.MathConstants.e^x

h(x) = f(x) - g(x)

println("Score (bisection method [-1, 1]): ", bisection(h, -1.0, 1.0, delta, epsilon))
println("Score (bisection method [1, 2]): ", bisection(h, 1.0, 2.0, delta, epsilon))