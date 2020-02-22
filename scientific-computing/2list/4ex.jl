# Stanisław Woźniak

using Polynomials

p=[1, -210.0, 20615.0,-1256850.0,
      53327946.0,-1672280820.0, 40171771630.0, -756111184500.0,          
      11310276995381.0, -135585182899530.0,
      1307535010540395.0,     -10142299865511450.0,
      63030812099294896.0,     -311333643161390640.0,
      1206647803780373360.0,     -3599979517947607200.0,
      8037811822645051776.0,      -12870931245150988800.0,
      13803759753640704000.0,      -8752948036761600000.0,
      2432902008176640000.0]

wilkinsonP = Poly(reverse(p))
wilkinsonp = poly(Float64[1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.])
root = roots(wilkinsonP)

p[2] = -210-2^(-23)
wilkinsonP2 = Poly(reverse(p))
wilkinsonp2 = poly(Float64[1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.])
root2 = roots(wilkinsonP2)

println("wilkinson (P(x))")
for i = 1:20
    println(i, " & ", abs(polyval(wilkinsonP, root[i])), " & ",  abs(polyval(wilkinsonP2, root2[i])), " & ", abs(polyval(wilkinsonp, root[i])) , " & ", abs(polyval(wilkinsonp2, root2[i])))
end

println("wilkinson (p(x))")
for i = 1:20
    println(abs(polyval(wilkinsonp, root[i])))
end


println("zk - k")
for i = 1:20
    println("z", i, " = ", abs(root[i] - i))
end


p[2] = -210-2^(-23)
wilkinsonP2 = Poly(reverse(p))
wilkinsonp2 = poly(Float64[1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.])
root2 = roots(wilkinsonP2)

println("changed wilkinson (P(x))")
for i = 1:20
    println(abs(polyval(wilkinsonP2, root2[i])))
end

println("changed wilkinson (p(x))")
for i = 1:20
    println(abs(polyval(wilkinsonp2, root2[i])))
end


println("changed zk - k")
for i = 1:20
    println("z", i, " = ", abs(root2[i] - i))
end

