# Stanisław Woźniak

export warNewton

#Inpput
# x – wektor długości n + 1 zawierający węzły x0, . . . , xn
# x[1]=x0,..., x[n+1]=xn
# fx – wektor długości n + 1 zawierający ilorazy różnicowe
# fx[1]=f[x0],
# fx[2]=f[x0, x1],..., fx[n]=f[x0, . . . , xn−1], fx[n+1]=f[x0, . . . , xn]
# t – punkt, w którym należy obliczyć wartość wielomianu
# Output
# nt – wartość wielomianu w punkcie t.

function warNewton(x::Vector{Float64}, fx::Vector{Float64}, t::Float64)
    n = length(x)
    wn = fx[n]
    wk = wn
    for k = n-1:-1:1
        wk = fx[k] + (t - x[k])*wk  
    end

    nt = wk
    return nt
end
