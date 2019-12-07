# Stanisław Woźniak
push!(LOAD_PATH, ".")
import Functions
using Functions
using Test


f(x::Float64) = x^2 + 3*x
g(x::Float64) = Base.MathConstants.e^x
h(x::Float64) = sin(x)*x^2


@testset "ilorazyRóoznicowe" begin
    @test isapprox(ilorazyRoznicowe([0.0, 1.0, 3],[f(0.0), f(1.0), f(3.0)]),[0.0, 4.0, 1.0])
    @test isapprox(ilorazyRoznicowe([0.0, 1.0, 3],[g(0.0), g(1.0), g(3.0)]),[1.0, 1.718281828459045, 2.3217819063017555])
    @test isapprox(ilorazyRoznicowe([0.0, 1.0, 3],[h(0.0), h(1.0), h(3.0)]),[0.0, 0.8414709848078965, -0.20905548031414745])
end

@testset "warNewton" begin
    @test isapprox(warNewton([0.0, 1.0, 3],[0.0, 4.0, 1.0],5.0),40.0)
    @test isapprox(warNewton([0.0, 1.0, 3],[1.0, 1.718281828459045, 2.3217819063017555],5.0),56.027047268330335)
    @test isapprox(warNewton([0.0, 1.0, 3],[0.0, 0.8414709848078965, -0.20905548031414745], 5.0),0.026245317756533604)
end


@testset "naturalna" begin
    @test isapprox(naturalna([0.0, 1.0, 3],[0.0, 4.0, 1.0]),[0.0, 3.0, 1.0])
    @test isapprox(naturalna([0.0, 1.0, 3],[1.0, 1.718281828459045, 2.3217819063017555]),[1.0, -0.6035000778427104, 2.3217819063017555])
    @test isapprox(naturalna([0.0, 1.0, 3],[0.0, 0.8414709848078965, -0.20905548031414745]),[0.0, 1.050526465122044, -0.20905548031414745])
end