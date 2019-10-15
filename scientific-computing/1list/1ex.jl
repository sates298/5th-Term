# Stanisław Woźniak

function findMacheps(type)
    macheps::type = 1.0
    while type(1.0) + macheps/type(2.0) > type(1.0)
        macheps = macheps/type(2.0)
    end
    return macheps;
end

println("macheps 16 : mine -> ", findMacheps(Float16), ", system's -> ", eps(Float16))
println("macheps 32 : mine -> ", findMacheps(Float32), ", system's -> ", eps(Float32))
println("macheps 64 : mine -> ", findMacheps(Float64), ", system's -> ", eps(Float64))

println()

function findEta(type)
    prev::type = 1.0
    eta::type = prev
    while prev > type(0.0)
        eta = prev
        prev = prev/type(2.0)
    end
    return eta
end

println("eta 16 : mine -> ", findEta(Float16), ", system's -> ", nextfloat(Float16(0.0)))
println("eta 32 : mine -> ", findEta(Float32), ", system's -> ", nextfloat(Float32(0.0)))
println("eta 64 : mine -> ", findEta(Float64), ", system's -> ", nextfloat(Float64(0.0)))

println()

function findMax(type)
    cur::type = 1.0
    max::type = 0.0
    while !isinf(cur*type(2.0))
        cur *= type(2.0)
    end

    while !isinf(max + cur) && cur > type(0.0)
        max += cur
        cur /= type(2.0)
    end

    return max
end

println("max 16 : mine -> ", findMax(Float16), ", system's -> ", floatmax(Float16))
println("max 32 : mine -> ", findMax(Float32), ", system's -> ", floatmax(Float32))
println("max 64 : mine -> ", findMax(Float64), ", system's -> ", floatmax(Float64))
