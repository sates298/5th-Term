# Stanisław Woźniak

# wartość największej ujemnej potęgi 8 przy wypisywaniu wyniku
n=10


function f(x::Float64)
    return sqrt(x^2 + 1) - 1
end

function g(x::Float64)
    return (x^2)/(sqrt(x^2 + 1) + 1)
end

# pętla licząca wartości odpowiednich funkcji oraz wypisujaca wyniki
for i = 1:n
    pow = -1.0*i
    x = 8^pow
    println("x = ", x)
    println("f(x) = ", f(x))
    println("g(x) = ", g(x))
    println()
end

# wypisanie wartości fukcji floatmin
println(floatmin(Float16))
println(floatmin(Float32))
println(floatmin(Float64))
