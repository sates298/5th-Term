# Stanisław Woźniak

# dana delta
delta = Float64(2.0)^-52

# ilość wypisanych kolejnych liczb
n = 10

function check()
    cur::Float64 = 1.0
    count::Float64 = 1.0
    for i = 1:n
        cur = nextfloat(cur)
        println("nexfloat -> ", cur, " bitstring -> ", bitstring(cur))
        count = Float64(1.0) + i*delta
        println("computed -> ", count, " bitstring -> ", bitstring(count))
    end
end

check()
