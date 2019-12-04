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
    

    plotx = zeros(0)
    plotfx = zeros(0)
    points_no = 100
    h = (b-a)/(points_no - 1)
    for k=0:(points_no - 1)
        xk = a + k*h;
        append!(plotx, xk)
        append!(plotfx, warNewton(x, fx, xk))
    end
    
    plot(plotx, plotfx)
    plot!(f, a, b)
end
