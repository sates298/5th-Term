using Plots

f(x) = (Base.MathConstants.e^x)*log(1 + Base.MathConstants.e^(-x))

<<<<<<< HEAD
plot(f, -10, 40)
=======
plot(f, -3, 3)
>>>>>>> f33cba0de07926a9577e69861b5f83d2f24471d5
savefig("plot-jl.png")