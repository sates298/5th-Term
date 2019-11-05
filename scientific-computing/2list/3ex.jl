using LinearAlgebra

function matcond(n::Int, c::Float64)
    if n < 2
        error("size n should be > 1")
    end
    if c< 1.0
        error("condition number  c of a matrix  should be >= 1.0")
    end
    (U,S,V)=svd(rand(n,n))
    return U*diagm(0 =>[LinRange(1.0,c,n);])*V'
end

function hilb(n::Int)
    if n < 1
        error("size n should be >= 1")
    end
    return [1 / (i + j - 1) for i in 1:n, j in 1:n]
end

function solution(A, n)
    x = ones(Float64, n)
    b = A*x
    gauss = A\b
    invx = inv(A)*b
    return [(abs(norm(x) - norm(gauss)))/norm(x), (abs(norm(x) - norm(invx)))/norm(x)]
end

n = 20
for i = 1:n
    A = hilb(i)
    println("i = ", i, ", score[gauss, inv] = ", solution(A, i))
end

for n = [5, 10, 20], c = Float64[1, 10, 10^3, 10^7, 10^12, 10^16] 
    A = matcond(n, c)
    println("n = ", n, ", c = ", c ,", score[gauss, inv] = ", solution(A, n))
end
