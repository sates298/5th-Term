using Plots

f(x) = (Base.MathConstants.e^x)*log(1 + Base.MathConstants.e^(-x))

plot(f, -3, 3)
savefig("plot-jl.png")