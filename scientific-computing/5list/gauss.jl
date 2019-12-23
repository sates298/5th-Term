# Stanisław Woźniak

using SparseArrays
export gaussianElimination
export gaussianEliminationPartChoice

# Function to solve an equation with gaussian elimination method
# input(A,n,l,b): 
#   A - square matrix (left side)
#   n - size of matrix A
#   l - size of one block of interior matrix
#   b - vector (right side of the equation)
# output(s, A', b', err):
#   s - vector (solution of the equation)
#   A' - matrix A after gaussian elimination
#   b' - vector b after gaussian elimination
#   err - sign of error of program
#           0 - no error
#           1 - 0 in diagonal of A matrix
# 
# function doesn't change original matrix or original b-vector

function gaussianElimination(A::SparseMatrixCSC{Float64,Int64}, n::Int64, l::Int64, b::Array{Float64})
    A_prim = dropzeros(copy(A))
    b_prim = copy(b)

    for k = 1:n - 1
        column_end = min(l + l * floor((k + 1) / l), n)   # last y with nonzero value
        row_end = min(k + l, n)   # last x with nonzero value

        if abs(A_prim[k,k]) < eps(Float64)
            return (zeros(n), A, b, 1)
        end

        for i = k + 1:column_end
            div = A_prim[k, i] / A_prim[k,k]
            A_prim[k, i] = 0

            for j = k + 1:row_end
                A_prim[j, i] -= div * A_prim[j, k]
            end
            b_prim[i] -= div * b_prim[k]
        end
    end

    sol::Array(Float64) = zeros(n)

    for j = n:-1:1
        total = 0.0
        row_end = min(j + l, n)   # last x with nonzero value

        for i = j + 1:row_end
            total += A_prim[i, j] * sol[i]
        end
        sol[j] = (b_prim[j] - total) / A_prim[j, j]
    end

    A_prim = dropzeros(A_prim)
    return (sol, A_prim, b_prim, 0);
end

# Function to solve an equation with gaussian elimination method with part choice of main element
# input(A,n,l,b): 
#   A - square matrix (left side)
#   n - size of matrix A
#   l - size of one block of interior matrix
#   b - vector (right side of the equation)
# output(s, A', b', err):
#   s - vector (solution of the equation)
#   A' - matrix A after gaussian elimination
#   b' - vector b after gaussian elimination
#   err - sign of error of program
#           0 - no error
#           1 - max value in column is lesser than epsilon
# 
# function doesn't change original matrix or original b-vector
function gaussianEliminationPartChoice(A::SparseMatrixCSC{Float64,Int64}, n::Int64, l::Int64, b::Array{Float64})
    A_prim = dropzeros(copy(A))
    b_prim = copy(b)
    pivots = collect(1:n)

    for k = 1:n - 1
        column_end = min(l + l * floor((k + 1) / l), n)   # last y with nonzero value
        row_end = min(2*l + l * floor((k + 1) / l), n)   # last x with nonzero value

        for i = k + 1:column_end
            max_val_y = k
            max_val = abs(A_prim[k,pivots[max_val_y]])

            for m = k + 1:column_end
                tmp = abs(A_prim[k, pivots[m]])
                if tmp > max_val
                    max_val = tmp
                    max_val_y = m
                end
            end

            if max_val < eps(Float64)
                return (zeros(n), A, b, 1)
            end

            pivots[k], pivots[max_val_y] = pivots[max_val_y], pivots[k]

            div = A_prim[k, pivots[i]] / A_prim[k,pivots[k]]
            A_prim[k, pivots[i]] = 0

            for j = k + 1:row_end
                A_prim[j, pivots[i]] -= div * A_prim[j, pivots[k]]
            end
            b_prim[pivots[i]] -= div * b_prim[pivots[k]]
        end
    end

    sol::Array(Float64) = zeros(n)

    for j = n:-1:1
        total = 0.0
        row_end = min(2*l + l * floor((pivots[j] + 1) / l), n)   # last x with nonzero value

        for i = j + 1:row_end
            total += A_prim[i, pivots[j]] * sol[i]
        end
        sol[j] = (b_prim[pivots[j]] - total) / A_prim[j, pivots[j]]
    end

    A_prim = dropzeros(A_prim)
    return (sol, A_prim, b_prim, 0);
end