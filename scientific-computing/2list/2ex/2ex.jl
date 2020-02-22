# Stanisław Woźniak

using Plots

f(x) = Float32(Base.MathConstants.e^x)*Float32(log(1 + Float32(Base.MathConstants.e^(-x))))

plot(f, -10, 40)
savefig("plot-jl32.png")