# Stanisław Woźniak

export msiecznych

# f - anonimowa funkcja
# x0, x1 - przybliżenia początkowe
# del - delta - dokładność przedziału
# eps - epsilon - dokładność wartości funkcji

# r - szukany punkt zerowy
# v - wartość funkcji w punkcie r
# it - liczba iteracji
# err - informacja o błędzie {-1,0,1}
    # -1 - dzielenie przez 0
    # 0 - metoda zbieżna
    # 1 - przekroczone maxit
    function msiecznych(f, x0::Float64, x1::Float64, del::Float64, eps::Float64,maxit::Int)
        it = 0
        err = 0
        r = x0
        x = x1
        v = Float64(f(r))
        v1 = Float64(f(x))
    
        while abs(x - r) > del
            it += 1
            if it > maxit
                err = 1
                break;
            end
    
            if abs(v) > abs(v1)
                tmp = r
                r = x
                x = tmp

                tmp = v
                v = v1
                v1 = tmp
            end

            s = (x - r)/(v1 - v)
            x = r
            v1 = v
            r -= v*s
            v = Float64(f(r))

            if isnan(v)
                err = -1
                break;
            end
            if abs(v) < eps
                break
            end
        end

        
        
        return (r, v, it, err)
    end