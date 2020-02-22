# Stanisław Woźniak

export ilorazyRoznicowe
# Input
# x – wektor długości n + 1 zawierający węzły x0, . . . , xn
# x[1]=x0,..., x[n+1]=xn
# f – wektor długości n + 1 zawierający wartości interpolowanej
# funkcji w węzłach f(x0), . . . , f(xn)
# Output
# fx – wektor długości n + 1 zawierający obliczone ilorazy różnicowe
# fx[1]=f[x0],
# fx[2]=f[x0, x1],..., fx[n]=f[x0, . . . , xn−1], fx[n+1]=f[x0, . . . , xn].

function ilorazyRoznicowe(x::Vector{Float64}, f::Vector{Float64})
    n = length(x)
    tmp = zeros(Float64, n)
    fx = zeros(Float64, n)

    for i = 1:n
        tmp[i] = f[i]
        for k = 1:i-1
            tmp[i-k] = (tmp[i-k+1] - tmp[i-k])/(x[i] - x[i-k])
        end
        fx[i] = tmp[1]
    end

    return fx
end
