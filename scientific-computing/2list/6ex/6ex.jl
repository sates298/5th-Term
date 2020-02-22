# Stanisław Woźniak

using Plots

y = zeros(0)

function recursive(n, c, x0)
    score = Float64(0.0)
    if (n > 0)
        xn = recursive(n-1, c, x0)
        score = xn^2 + Float64(c)
    else
        score = Float64(x0)
    end
    println(score)
    append!(y, score)
    return score
end
n = 40

println("1) ")
y=zeros(0)
recursive(n, -2, 1)
plot(1:n, y,seriestype=:scatter, title="Dane 1.")
savefig("plot1.png")

println("2) ")
y = zeros(0)
recursive(n, -2, 2)
plot(1:n, y,seriestype=:scatter, title="Dane 2.")
savefig("plot2.png")

println("3) ")
y = zeros(0)
recursive(n, -2, 1.99999999999999)
plot(1:n, y,seriestype=:scatter, title="Dane 3.")
savefig("plot3.png")

println("4) ")
y = zeros(0)
recursive(n, -1, 1)
plot(1:n, y,seriestype=:scatter, title="Dane 4.")
savefig("plot4.png")

println("5) ")
y = zeros(0)
recursive(n, -1, -1)
plot(1:n, y,seriestype=:scatter, title="Dane 5.")
savefig("plot5.png")

println("6) ")
y = zeros(0)
recursive(n, -1, 0.75)
plot(1:n, y,seriestype=:scatter, title="Dane 6.")
savefig("plot6.png")

println("7) ")
y = zeros(0)
recursive(n, -1, 0.25)
plot(1:n, y,seriestype=:scatter, title="Dane 7.")
savefig("plot7.png")