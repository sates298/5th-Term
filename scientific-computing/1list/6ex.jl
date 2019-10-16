# Stanisław Woźniak

n=10

function f(x::Float64)
    return sqrt(x^2 + 1) - 1
end

function g(x::Float64)
    return (x^2)/(sqrt(x^2 + 1) + 1)
end

for i = 1:n
    pow = -1.0*i
    x = 8^pow
    println("x = ", x)
    println("f(x) = ", f(x))
    println("g(x) = ", g(x))
    println()
end
