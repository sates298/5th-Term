#Stanisław Woźniak

using SparseArrays
export solutionUsingLU
export solutionUsingLUwithPartChoice


# Function to solving equations knows LU decomposition
# input(LU,n,l,b): 
#   LU - LU decomposition matrixes
#   n - size of matrix A
#   l - size of one block of interior matrix
#   b - vector (right side of the equations)
# output(solution):
#   solution - vector which is solution of the equations
# 
function solutionUsingLU(LU::SparseMatrixCSC{Float64, Int64}, l::Int64, n::Int64, b::Array{Float64})

    y::Array{Float64} = zeros(n)

    for i = 1 : n
        sum = 0.0
        fcol::Int64 = max(l * floor((i-1) / l) - 1, 1)
        for j in fcol : i-1
            sum += LU[j, i] * y[j]
        end
        y[i] = b[i] - sum
    end

    solution = Array{Float64}(undef, n)

    for i = n : -1 : 1
        sum = 0.0
        lcol::Int64 = min(n, i + l)
        for j in i + 1 : lcol
            sum += LU[j, i] * solution[j]
        end
        solution[i] = (y[i] - sum) / LU[i, i]
    end

    return solution
end

# Function to solving equations knows LU decomposition
# input(LU,pivots,n,l,b): 
#   LU - LU decomposition matrixes
#   pivots - array of row's indexes after changes
#   n - size of matrix A
#   l - size of one block of interior matrix
#   b - vector (right side of the equations)
# output(solution):
#   solution - vector which is solution of the equations
# 
function solutionUsingLUwithPartChoice(LU::SparseMatrixCSC{Float64, Int64}, pivots::Array{Int64}, l::Int64, n::Int64, b::Array{Float64})

    y::Array{Float64} = zeros(n)

    for i = 1 : n
        sum = 0.0
        fcol::Int64 = max(l * floor((pivots[i]-1) / l) - 1, 1)
        for j in fcol : i-1
            sum += LU[j, pivots[i]] * y[j]
        end
        y[i] = b[pivots[i]] - sum
    end

    solution::Array{Float64} = zeros(n)

    for i = n : -1 : 1
        sum = 0.0
        lcol::Int64 =  min(2*l + l*floor((pivots[i]+1)/l), n)
        for j in i + 1 : lcol
            sum += LU[j, pivots[i]] * solution[j]
        end
        solution[i] = (y[i] - sum) / LU[i, pivots[i]]
    end

    return solution
end