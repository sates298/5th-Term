# Stanisław Woźniak

using Plots
export rysujNnfx

# Input
# f – funkcja f(x) zadana jako anonimowa funkcja,
# a,b – przedział interpolacji
# n – stopień wielomianu interpolacyjnego
# Output
# – funkcja rysuje wielomian interpolacyjny i interpolowaną
# funkcję w przedziale [a, b].
function rysujNnfx(f, a::Float64, b::Float64, n::Int)
    x = zeros(0)
    fv = zeros(0)
    h = (b-a)/n
    for k=0:n
        xk = a + k*h;
        append!(x, xk)
        append!(fv, f(xk))
    end

    fx = ilorazyRoznicowe(x, fv)
    Nnfx(t) = warNewton(x, fx, t)

    # todo dodać punkty dla dokłądnego wykresu


    plot(Nnfx, a, b)
end
