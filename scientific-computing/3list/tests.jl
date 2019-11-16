# Stanisław Woźniak

push!(LOAD_PATH, ".")
import Methods
using Methods


delta = epsilon = 10^(-5)
it = 10000

f(x) = Base.MathConstants.e^(1-x) - 1
g(x) = x * Base.MathConstants.e^(-x)
f_(x) = -Base.MathConstants.e^(1-x)
g_(x) = Base.MathConstants.e^(-x) * (1-x)


println(bisection(f, 0.0, 2.0, delta, epsilon))
println(tangential(f, f_, 5.0, delta, epsilon, it))
println(secant_lines(f, -2.0, 4.0, delta, epsilon, it))
println()
println(bisection(g, -0.5, 1.0, delta, epsilon))
println(tangential(g,g_, 2.0, delta, epsilon, it))
println(secant_lines(g, -1.0, 0.5, delta, epsilon, it))