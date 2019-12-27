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
# output(s, A, b, err):
#   s - vector (solution of the equation)
#   A - matrix A after gaussian elimination
#   b - vector b after gaussian elimination
#   err - sign of error of program
#           0 - no error
#           1 - 0 in diagonal of A matrix
# 

function gaussianElimination(A::SparseMatrixCSC{Float64,Int64}, n::Int64, l::Int64, b::Array{Float64})

    # it::Int64 = 0
    # for j in 1 : n - 1
    #     lrow::Int64 = min(l + l * floor((j+1) / l), n)
    #     lcol::Int64 = min(j + l, n)

    #     if abs(A[j,j]) < eps(Float64)
    #         error("Współczynnik na przekątnej równy 0")
    #     end

    #     for i in j + 1 : lrow
    #         z = A[j, i] / A[j, j]
    #         A[j, i] = 0

    #         for k in j + 1 : lcol
    #             it += 1
    #             A[k, i] = A[k, i] - z * A[k, j]
    #         end

    #         b[i] = b[i] - z * b[j]
    #     end
    # end

    # # solutions
    # sol = Array{Float64}(undef, n)

    # for j in n : -1 : 1
    #     prev_total = 0.0
    #     lcol = min(n, j + l)

    #     for i in j + 1 : lcol
    #         it += 1
    #         prev_total += A[i, j] * sol[i]
    #     end
    #     sol[j] = (b[j] - prev_total) / A[j, j]
    # end

    # return sol, it


    for k = 1:n - 1
        column_end::Int64 = min(l + l * floor((k + 1) / l), n)   # last y with nonzero value
        row_end::Int64 = min(k + l, n)   # last x with nonzero value

        if abs(A[k,k]) < eps(Float64)
            return (zeros(n), A, b, 1)
        end

        for i = k + 1:column_end
            div = A[k, i] / A[k,k]
            A[k, i] = 0

            for j = k + 1:row_end
                A[j, i] -= div * A[j, k]
            end
            b[i] -= div * b[k]
        end
    end

    sol::Array{Float64} = zeros(n)

    for j = n:-1:1
        total = 0.0
        row_end::Int64 = min(j + l, n)   # last x with nonzero value

        for i = j + 1:row_end
            total += A[i, j] * sol[i]
        end
        sol[j] = (b[j] - total) / A[j, j]
    end

    return (sol, A, b, 0);
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
function gaussianEliminationPartChoice(A::SparseMatrixCSC{Float64,Int64}, n::Int64, l::Int64, b::Array{Float64})
    pivots = collect(1:n)

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
                return (zeros(n), A, b, 1)
            end

            pivots[k], pivots[max_val_y] = pivots[max_val_y], pivots[k]

            div = A[k, pivots[i]] / A[k,pivots[k]]
            A[k, pivots[i]] = 0

            for j = k + 1:row_end
                A[j, pivots[i]] -= div * A[j, pivots[k]]
            end
            b[pivots[i]] -= div * b[pivots[k]]
        end
    end

    sol::Array{Float64} = zeros(n)

    for j = n:-1:1
        total = 0.0
        row_end::Int64 = min(2*l + l * floor((pivots[j] + 1) / l), n)   # last x with nonzero value

        for i = j + 1:row_end
            total += A[i, pivots[j]] * sol[i]
        end
        sol[j] = (b[pivots[j]] - total) / A[j, pivots[j]]
    end

    return (sol, A, b, 0);
end