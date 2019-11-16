# Stanisław Woźniak

export bisection

# f - anonimowa funkcja
# a,b - przedział początkowy
# del - delta - dokładność przedziału
# eps - epsilon - dokładność wartości funkcji

# r - szukany punkt zerowy
# v - wartość funkcji w punkcie r
# it - liczba iteracji
# err - informacja o błędzie {0,1}
    # 0 - brak błędu
    # 1 - funkcja nie zmienia znaku na przedziale [a,b]
    function bisection(f, a::Float64, b::Float64, del::Float64, eps::Float64)
        err = 0
        it = 0
        r = 0
        v = 0
        while abs(a - b) > del 
            it += 1
            if f(a)*f(b) >= 0
                err = 1
                break    
            end 
    
            r = a + (b-a)/2
    
            if abs(f(r)) < eps
                break
            end
    
            if f(r)*f(a) < 0
                b = r
            elseif f(r)*f(b) < 0
                a = r
            end 
    
        end
    
        v = Float64(f(r))
        return (r, v, it, err)
    end
    