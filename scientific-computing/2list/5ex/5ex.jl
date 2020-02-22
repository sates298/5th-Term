# Stanisław Woźniak

function populate(r, n, p0, type)
    if (n <= 0)
        println(n , " ", p0)
        return type(p0)
    end
    
    pn = populate(r, n-1, p0, type)
    score = pn + type(r)*pn*(type(1.0) - pn)
    println(n , " ", score)
    return score
end

function populate_3(r, n, p0, type)
    if (n <= 0)
        println(n, " ", p0)
        return type(p0)
    end
    pn = populate_3(r, n-1, p0, type)

    if (n == 10)
        score = type(trunc((pn + type(r)*pn*(type(1.0) - pn))*1000)/1000)
        println(n, " ", score)
        return score
    end
    score = pn + type(r)*pn*(type(1.0) - pn)
    println(n, " ", score)
    return score
end


p0 = 0.01
r = 3.0
n = 40

populate_3(r,n,p0,Float32)
# println(populate(r, n, p0, Float32))
# println(populate_3(r, n, p0, Float32))
# println(populate(r, n, p0, Float64))
# println(populate_3(r, n, p0, Float64))
