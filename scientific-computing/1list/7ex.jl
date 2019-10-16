# Stanisław Woźniak

function f(x::Float64)
    return sin(x) + cos(Float64(3.0) * x)
end

# przybliżona wartość pochodnej
function dx(func, h::Float64, x0::Float64)
    println("h = ", h)
    return (func(x0 + h) - func(x0))/h
end

# prawidłowa wartość pochodnej
derivative = cos(Float64(1.0)) - Float64(3.0)*sin(Float64(3.0))

h = Float64(2.0)

# obliczanie w pętli dla każdej wartości różnicy obu pochodnych
for n in 0:54
    result = abs(derivative - dx(f, h^(Float64(-1.0)*n), Float64(1.0)))
    println("for n = ", n, " |f'(x) - f~'(x)| = ", result, " for x = 1")
    println()
end
