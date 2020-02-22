# Stanisław Woźniak
using SparseArrays

export loadMatrix
export loadVector
export rightSide
#Function to load matrix from file
# input (path)
#   path - path to file
# output (A, n, l):
#   A - load matrix 
#   n - size of matrix A
#   l - blocks' size of interior matrixes
function loadMatrix(path::String)
    open(path) do file
        line = split(readline(file))
        n = parse(Int64, line[1])
        l = parse(Int64, line[2])
        J = Vector{Int64}()
        I = Vector{Int64}()
        V = Vector{Float64}()

        while !eof(file)
            line = split(readline(file))
            push!(J, parse(Int64, line[1]))
            push!(I, parse(Int64, line[2]))
            push!(V, parse(Float64, line[3]))
        end

        A = sparse(I, J, V)
        return (A, n, l)
    end
end

#Function to load vector from file
# input (path)
#   path - path to file
# output (b, n):
#   b - load vector 
#   n - size of b
function loadVector(path::String)
    open(path) do file
        n = parse(Int64, readline(file))
        b = Vector{Float64}()

        while !eof(file)
            push!(b, parse(Float64, readline(file)))
        end

        return (b, n)
    end
end



function rightSide(A::SparseMatrixCSC{Float64, Int64}, n::Int64, l::Int64)
    b = zeros(Float64, n)
    nonzero = nonzeros(A)

    for i in 1 : n
        for j in nzrange(A, i)
            b[i] += nonzero[j]
        end
    end

    return b
end
