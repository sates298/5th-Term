function recursive(n, c, x0)
    score = Float64(0.0)
    if (n > 0)
        xn = recursive(n-1, c, x0)
        score = xn^2 + Float64(c)
    else
        score = Float64(x0)
    end
    println(score)
    return score
end
n = 40
println("1) ")
recursive(n, -2, 1)
println("2) ")
recursive(n, -2, 2)
println("3) ")
recursive(n, -2, 1.99999999999999)
println("4) ")
recursive(n, -1, 1)
println("5) ")
recursive(n, -1, -1)
println("6) ")
recursive(n, -1, 0.75)
println("7) ")
recursive(n, -1, 0.25)