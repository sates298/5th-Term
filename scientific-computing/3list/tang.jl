# Stanisław Woźniak

export tangential

# f - anonimowa funkcja
# pf - pochodna funkcji 1 stopnia (także anonimowa funkcja)
# x0 - przybliżenie początkowe
# del - delta - dokładność przedziału
# eps - epsilon - dokładność wartości funkcji
# maxit - maksymalna liczba iteracji

# r - szukany punkt zerowy
# v - wartość funkcji w punkcie r
# it - liczba iteracji
# err - informacja o błędzie {0,1,2}
    # 0 - metoda zbieżna
    # 1 - przekroczone maxit
    # 2 - pochodna bliska 0
    function tangential(f,pf,x0::Float64, del::Float64, eps::Float64, maxit::Int)
        r = x0
        x = r - 1.0
        v = Float64(f(r))
        err = 0
        it = 0
        
    
        while abs(x - r) > del
            it += 1
            if it > maxit
                err = 1
                break
            end
            if abs(pf(r)) < eps
                err = 2
                break
            end
            
    
            x = r
            r -= v/pf(r)
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