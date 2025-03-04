# Stanisław Woźniak

push!(LOAD_PATH, ".")
import Methods
using Methods


f(x) = sin(x) - (0.5*x)^2
fp(x) = cos(x) - x

delta = epsilon = 0.5 * 10^(-5)

maxit = 100

println("Bisection: ", mbisekcji(f, 1.5, 2.0, delta, epsilon))
println("Newton: ", mstycznych(f, fp, 1.5, delta, epsilon, maxit))
println("Secant: ", msiecznych(f, 1.0, 2.0, delta, epsilon, maxit))