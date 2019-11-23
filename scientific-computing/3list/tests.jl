# Stanisław Woźniak

push!(LOAD_PATH, ".")
import Methods
using Methods
using Test


delta = epsilon = 10^(-10)
it = 1000

f(x) = x^2 + 3*x
f_(x) = 2*x + 3
g(x) = log(x)/x
g_(x) = (1 - log(x))/(x^2)
h(x) = Base.MathConstants.e^x - 5
h_(x) = Base.MathConstants.e^x

@testset "bisekcja" begin
    @test isapprox(mbisekcji(f, -4.0, -1.0, delta, epsilon)[1],-3)
    @test isapprox(mbisekcji(g, 0.5, 2.0, delta, epsilon)[1],1)
    @test isapprox(mbisekcji(h, 1.0, 2.0, delta, epsilon)[1],1.6094379)
end

@testset "Newton" begin
    @test isapprox(mstycznych(f, f_, -4.0, delta, epsilon, it)[1],-3)
    @test isapprox(mstycznych(g, g_, 0.5, delta, epsilon, it)[1],1)
    @test isapprox(mstycznych(h, h_, 1.0, delta, epsilon, it)[1],1.6094379)
end

@testset "Sieczne" begin
    @test isapprox(msiecznych(f, -3.5, -2.0, delta, epsilon, it)[1],-3)
    @test isapprox(msiecznych(g, 0.6, 1.7, delta, epsilon, it)[1],1)
    @test isapprox(msiecznych(h, 1.0, 2.0, delta, epsilon, it)[1],1.6094379)
end
