# Stanisław Woźniak

using SparseArrays
export luDecomposition
export luDecompositionPartChoice

# Function to get LU decomposition using gaussian elimination
# input(A,n,l): 
#   A - square matrix (left side)
#   n - size of matrix A
#   l - size of one block of interior matrix
# output(L, U, err):
#   L, U - L and U matrixes
#   err - sign of error of program
#           0 - no error
#           1 - 0 in diagonal A matrix
# 
# function doesn't change original matrix
function luDecomposition(A::SparseMatrixCSC{Float64,Int64}, n::Int64, l::Int64)
    U = dropzeros(copy(A))
    L = spzeros(n,n) 
    for k = 1:n - 1
        column_end = min(l + l * floor((k + 1) / l), n)   # last y with nonzero value
        row_end = min(k + l, n)   # last x with nonzero value

        if abs(U[k,k]) < eps(Float64)
            return (spzeros(n, n), 1)
        end

        for i = k + 1:column_end
            div = U[k, i] / U[k,k]
            U[k, i] = 0
            L[k, i] = div

            for j = k + 1:row_end
                U[j, i] -= div * U[j, k]
            end
        end
    end

    L = dropzeros(L)
    U = dropzeros(U)
    return (L, U, 0)
end

# Function to get LU decomposition using gaussian elimination with part choice of main element
# input(A,n,l): 
#   A - square matrix (left side)
#   n - size of matrix A
#   l - size of one block of interior matrix
# output(L, U, err):
#   L, U - L, U matrixes
#   err - sign of error of program
#           0 - no error
#           1 - max value in column is lesser than epsilon
# 
# function doesn't change original matrix
function luDecompositionPartChoice(A::SparseMatrixCSC{Float64,Int64}, n::Int64, l::Int64)
    U = dropzeros(copy(A))
    L = spzeros(n,n)
    pivots = collect(1:n)

    for k = 1:n - 1
        column_end = min(l + l * floor((k + 1) / l), n)   # last y with nonzero value
        row_end = min(2*l + l * floor((k + 1) / l), n)   # last x with nonzero value

        for i = k + 1:column_end
            max_val_y = k
            max_val = abs(U[k,pivots[max_val_y]])

            for m = k + 1:column_end
                tmp = abs(U[k, pivots[m]])
                if tmp > max_val
                    max_val = tmp
                    max_val_y = m
                end
            end

            if max_val < eps(Float64)
                return (spzeros(n, n), 1)
            end

            pivots[k], pivots[max_val_y] = pivots[max_val_y], pivots[k]

            div = U[k, pivots[i]] / U[k,pivots[k]]
            U[k, pivots[i]] = div
            L[k, pivots[i]] = div

            for j = k + 1:row_end
                U[j, pivots[i]] -= div * U[j, pivots[k]]
            end
        end
    end

    L = dropzeros(L)
    U = dropzeros(U)
    return (L, U, 0)
end