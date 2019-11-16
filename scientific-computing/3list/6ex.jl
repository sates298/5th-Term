# Stanisław Woźniak

push!(LOAD_PATH, ".")
import Methods
using Methods


delta = epsilon = 10^(-5)
it = 10000

f(x) = Base.MathConstants.e^(1-x) - 1
g(x) = x * Base.MathConstants.e^(-x)
fp(x) = -Base.MathConstants.e^(1-x)
gp(x) = Base.MathConstants.e^(-x) * (1-x)

println("Function f(x) = e^(1-x) - 1")
println(bisection(f, 0.5, 2.0, delta, epsilon))
println(tangential(f, fp, 4.0, delta, epsilon, it))
println(secant_lines(f, 0.5, 2.0, delta, epsilon, it))
println()
println("Function g(x) = x*e^(-x)")
println(bisection(g, -0.5, 1.0, delta, epsilon))
println(tangential(g,gp, -1.0, delta, epsilon, it))
println(secant_lines(g, -1.0, 0.5, delta, epsilon, it))


println()
println("Newton methods testing: ")
println("Function f, x > 1  ", tangential(f, fp, 2.0, delta, epsilon, it))
println("Function f, x > 10  ", tangential(f, fp, 11.0, delta, epsilon, it))
println("Function f, x > 100  ", tangential(f, fp, 101.0, delta, epsilon, it))
println()
println("Function g, x = 1  ", tangential(g, gp, 1.0, delta, epsilon, it))
println("Function g, x > 1  ", tangential(g, gp, 2.0, delta, epsilon, it))
println("Function g, x > 10  ", tangential(g, gp, 11.0, delta, epsilon, it))
println("Function g, x > 100  ", tangential(g, gp, 101.0, delta, epsilon, it))

