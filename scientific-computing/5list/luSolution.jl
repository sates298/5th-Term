#Stanisław Woźniak

using SparseArrays
export solutionUsingLU
export solutionUsingLUwithPartChoice


# Function to solving equations knows LU decomposition
# input(L,U,n,l,b): 
#   L,U - LU decomposition matrixes
#   n - size of matrix A
#   l - size of one block of interior matrix
#   b - vector (right side of the equations)
# output(x):
#   x - vector which is solution of the equations
# 
# function doesn't change original matrix
function solutionUsingLU(L::SparseMatrixCSC{Float64, Inf64}, U::SparseMatrixCSC{Float64, Inf64}, l::Int64, n::Int64, b::Array{Float64})
    L_prim = dropzeros(copy(L))
    U_prim = dropzeros(copy(U))
    b_prim = copy(b)
    y::Array(Float64) = zeros(n)

    for j = 1:n
        total = 0.0
        row_end = min(j + l, n)   # last x with nonzero value

        for i = j + 1:row_end
            total += L_prim[i, j] * y[i]
        end
        y[j] = (b_prim[j] - total) /L_prim[j, j]
    end

    x::Array(Float64) = zeros(n)

    for j = n:-1:1
        total = 0.0
        row_end = min(j + l, n)   # last x with nonzero value

        for i = j + 1:row_end
            total += U_prim[i, j] * x[i]
        end
        x[j] = (y[j] - total) / U_prim[j, j]
    end

    return x
end

# Function to solving equations knows LU decomposition
# input(L,U,n,l,b): 
#   L,U - LU decomposition matrixes
#   n - size of matrix A
#   l - size of one block of interior matrix
#   b - vector (right side of the equations)
# output(solution):
#   solution - vector which is solution of the equations
# 
# function doesn't change original matrix
function solutionUsingLUwithPartChoice(L::SparseMatrixCSC{Float64, Inf64}, U::SparseMatrixCSC{Float64, Inf64}, l::Int64, n::Int64, b::Array{Float64})
end