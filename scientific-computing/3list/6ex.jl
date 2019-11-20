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
println(mbisekcji(f, 0.5, 2.0, delta, epsilon))
println(mbisekcji(f, -0.1, 2.0, delta, epsilon))
println(mbisekcji(f, 0.0, 2.0, delta, epsilon))
println(mbisekcji(f, -100.0, 100.0, delta, epsilon))
println(mbisekcji(f, 0.99999, 20.0, delta, epsilon))
println()
println(mstycznych(f, fp, 4.0, delta, epsilon, it))
println()
println(msiecznych(f, 0.5, 2.0, delta, epsilon, it))
println(msiecznych(f, -0.1, 2.0, delta, epsilon, it))
println(msiecznych(f, 0.0, 2.0, delta, epsilon, it))
println(msiecznych(f, -100.0, 101.0, delta, epsilon, it))
println(msiecznych(f, 0.99999, 20.0, delta, epsilon, it))

println()
println("Function g(x) = x*e^(-x)")
println(mbisekcji(g, -0.5, 1.0, delta, epsilon))
println(mbisekcji(g, -0.5, 0.5, delta, epsilon))
println(mbisekcji(g, -0.1, 4.0, delta, epsilon))
println(mbisekcji(g, -100.0, 101.0, delta, epsilon))


println()
println(mstycznych(g,gp, -1.0, delta, epsilon, it))
println()
println(msiecznych(g, -1.0, 0.5, delta, epsilon, it))
println(msiecznych(g, -0.5, 0.5, delta, epsilon, it))
println(msiecznych(g, -0.1, 4.0, delta, epsilon, it))
println(msiecznych(g, -100.0, 101.0, delta, epsilon, it))


println()
println("Newton methods testing: ")
println("Function f, x < 0 (=-2) ", mstycznych(f, fp, -2.0, delta, epsilon, it))
println("Function f, x > 1 (=2) ", mstycznych(f, fp, 2.0, delta, epsilon, it))
println("Function f, x > 10 (=11) ", mstycznych(f, fp, 12.0, delta, epsilon, it))
println("Function f, x > 100 (=101) ", mstycznych(f, fp, 101.0, delta, epsilon, it))
println()
println("Function g, x < 0 (=-2) ", mstycznych(g, gp, -2.0, delta, epsilon, it))
println("Function g, x = 1  ", mstycznych(g, gp, 1.0, delta, epsilon, it))
println("Function g, x > 1 (=2) ", mstycznych(g, gp, 2.0, delta, epsilon, it))
println("Function g, x > 10 (=11) ",mstycznych(g, gp, 11.0, delta, epsilon, it))
println("Function g, x > 100 (=101) ", mstycznych(g, gp, 101.0, delta, epsilon, it))

