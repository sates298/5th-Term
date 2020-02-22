# Stanisław Woźniak

using SparseArrays
export luDecomposition
export luDecompositionPartChoice

# Function to get A decomposition using gaussian elimination
# input(A,n,l): 
#   A - square matrix (left side)
#   n - size of matrix A
#   l - size of one block of interior matrix
# output(A, err):
#   A - L and A matrixes
#   err - sign of error of program
#           0 - no error
#           1 - 0 in diagonal A matrix
# 
function luDecomposition(A::SparseMatrixCSC{Float64,Int64}, n::Int64, l::Int64)
    for k = 1:n - 1
        column_end::Int64 = min(l + l * floor((k + 1) / l), n)   # last y with nonzero value
        row_end::Int64 = min(k + l, n)   # last x with nonzero value

        if abs(A[k,k]) < eps(Float64)
            return (spzeros(n, n), 1)
        end

        for i = k + 1:column_end
            div = A[k, i] / A[k,k]
            A[k, i] = div

            for j = k + 1:row_end
                A[j, i] -= div * A[j, k]
            end
        end
    end

    return (A, 0)
end

# Function to get A decomposition using gaussian elimination with part choice of main element
# input(A,n,l): 
#   A - square matrix (left side)
#   n - size of matrix A
#   l - size of one block of interior matrix
# output(A, pivots, err):
#   A - L, U matrixes
#   pivots - array of changes rows
#   err - sign of error of program
#           0 - no error
#           1 - max value in column is lesser than epsilon
# 
function luDecompositionPartChoice(A::SparseMatrixCSC{Float64,Int64}, n::Int64, l::Int64)
    pivots::Array = collect(1:n)

    for k = 1:n - 1
        column_end::Int64 = min(l + l * floor((k + 1) / l), n)   # last y with nonzero value
        row_end::Int64 = min(2*l + l * floor((k + 1) / l), n)   # last x with nonzero value

        for i = k + 1:column_end
            max_val_y = k
            max_val = abs(A[k,pivots[max_val_y]])

            for m = k + 1:column_end
                tmp = abs(A[k, pivots[m]])
                if tmp > max_val
                    max_val = tmp
                    max_val_y = m
                end
            end

            if max_val < eps(Float64)
                return (spzeros(n, n),zeros(n), 1)
            end

            pivots[k], pivots[max_val_y] = pivots[max_val_y], pivots[k]

            div = A[k, pivots[i]] / A[k,pivots[k]]
            A[k, pivots[i]] = div

            for j = k + 1:row_end
                A[j, pivots[i]] -= div * A[j, pivots[k]]
            end
        end
    end

    return (A,pivots, 0)
end