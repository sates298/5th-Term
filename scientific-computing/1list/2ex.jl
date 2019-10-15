# Stanisław Woźniak

function macheps(type)
    x1::type = 1.0
    x3::type = 3.0
    x4::type = 4.0
    return x3*(x4/x3 -x1) - x1
end

println("macheps Float16 : mine -> ", macheps(Float16), ", system's -> ", eps(Float16))
println("macheps Float32 : mine -> ", macheps(Float32), ", system's -> ", eps(Float32))
println("macheps Float64 : mine -> ", macheps(Float64), ", system's -> ", eps(Float64))
