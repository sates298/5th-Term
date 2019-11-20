# Stanisław Woźniak

push!(LOAD_PATH, ".")
import Methods
using Methods


delta = epsilon = 10^(-5)
it = 10000

f(x) = x^2 + 2*x + 1
f_(x) = 2*x + 2

a = 0.0
b = 2.0

x0 = 5.0

x01 = -2.0
x1 = 4.0


println("bisekcja a=", a, " b=", b, " wynik=",mbisekcji(f, a, b, delta, epsilon))

println("\nnewton x0=", x0, " wynik=",mstycznych(f, f_, x0, delta, epsilon, it))

println("\nsieczne x0=", x01, " x1=", x1, " wynik=",msiecznych(f, x01, x1, delta, epsilon, it))
