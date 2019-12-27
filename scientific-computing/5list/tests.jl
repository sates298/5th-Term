#Stanisław Woźniak

push!(LOAD_PATH, ".")
import blocksys
using blocksys
import matrixgen
using matrixgen


function testGaussianElimination(A, n, l, b)
    println("gauss el")
    A1 = copy(A)
    b1 = copy(b)
    gauss = @time gaussianElimination(A1, n, l, b1)
    A2 = copy(A)
    b2 = copy(b)
    println("  alloc ", @allocated gaussianElimination(A2, n, l, b2))

    println("gauss el pivots")
    A3 = copy(A)
    b3 = copy(b)
    gauss = @time gaussianEliminationPartChoice(A3, n, l, b3)
    A4 = copy(A)
    b4 = copy(b)
    println("  alloc ", @allocated gaussianEliminationPartChoice(A4, n, l, b4))
end

function solutionLU(A, n, l, b)
    println("  matrix to LU")
    A1 = copy(A)
    b1 = copy(b)
    lu = @time luDecomposition(A1, n, l)
    A2 = copy(A)
    b2 = copy(b)
    println("  alloc ", @allocated luDecomposition(A2, n, l))

    println("  sol")
    luu = @time solutionUsingLU(A1, n, l, b1)
    println("  alloc ", @allocated solutionUsingLU(A2, n, l, b2))
end

function solutionLUWithPivots(A, n, l, b)
    println("  matrix to LU")
    A1 = copy(A)
    b1 = copy(b)
    lu = @time luDecompositionPartChoice(A1, n, l)
    
    A2 = copy(A)
    b2 = copy(b)
    println("  alloc ", @allocated luDecompositionPartChoice(A2, n, l))


    println("  sol")

    println("  alloc ", @allocated solutionUsingLUwithPartChoice(A2, lu[2], n, l, b2))
    @time solutionUsingLUwithPartChoice(A1, lu[2], n, l, b1)



end

function testLU(A, n, l, b)
    println("LU")
    solutionLU(A, n, l, b)

    println("LU Pivots")
    solutionLUWithPivots(A, n, l, b)
end

function testLib(A, b)
    println("StdLib")
    At = reverse(rotr90(Matrix(A)), dims=2)
    @time At \ b
    println("  alloc ", @allocated At \ b)
end

# function blockmat(n::Int, l::Int, ck::Float64, outputfile::String)

blockmat(1000, 4, 2.0, "./dane/A20.txt")
mat20 = loadMatrix("./dane/A20.txt")
b20 = [rightSide(mat20...)]


mat16 = loadMatrix("./dane/Dane16_1_1/A.txt")
matTest = copy(mat16[1])
mat10k = loadMatrix("./dane/Dane10000_1_1/A.txt")
mat50k = loadMatrix("./dane/Dane50000_1_1/A.txt")

#println(varInfo(mat10k))
#println(varInfo(mat50k))

b16 = loadVector("./dane/Dane16_1_1/b.txt")
b10k = loadVector("./dane/Dane10000_1_1/b.txt")
b50k = loadVector("./dane/Dane50000_1_1/b.txt")

#myb16 = [rightSide(mat[1], mat[2], mat[3])]
#myb10k = [rightSide(mat1[1], mat1[2], mat1[3])]
#myb50k = [rightSide(mat2[1], mat2[2], mat2[3])]

testGaussianElimination(mat20..., b20[1])
testLU(mat20..., b20[1])
testLib(mat20[1], b20[1])

#println(gauss(mat20..., b20[1]))

#mat20 = loadMatrix("A20.txt")
#b20 = [rightSide(mat20...)]
#p = mat2luPivots(mat20...)
#println(luPivotsSol(mat20..., b20[1], p[1]))

#mat20 = loadMatrix("A20.txt")
#b20 = [rightSide(mat20...)]

#mat3 = reverse(rotr90(Matrix(mat20[1])), dims=2)
#println(mat3\b20[1])
