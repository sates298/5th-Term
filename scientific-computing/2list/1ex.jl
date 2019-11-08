# Stanisław Woźniak

# arytmetyka w której jest liczone zadanie
type = Float32

    # ilość wymiarów wektora
    n = 5
    
    # dane wektory
    x = type[2.718281828, -3.141592654, 1.414213562, 0.577215664, 0.301029995]
    y = type[1486.2497, 878366.9879, -22.37492, 4773714.647, 0.000185049]
    
    
    function algorithm_a()
        sum::type = 0.0
        for i = 1:n
            sum += x[i]*y[i]
        end
        return sum
    end
    
    function algorithm_b()
        sum::type = 0.0
        for i = 1:n
            sum += x[n-i+1]*y[n-i+1]
        end
        return sum
    end
    
    function algorithm_c()
        sums = type[]
        for i = 1:n
            push!(sums, x[i] * y[i])
        end
        sort!(sums)
        max::type = 0.0
        min::type = 0.0
        i = n
        while i > 0 && sums[i] > 0.0
            max += sums[i]
            i -= 1
        end
        j = 1
        while j <= i
            min += sums[j]
            j += 1
        end
    
        return max + min
    end
    
    function algorithm_d()
        sums = type[]
        for i = 1:n
            push!(sums, x[i] * y[i])
        end
        sort!(sums)
        max::type = 0.0
        min::type = 0.0
    
        j = 1
        while j <= n && sums[j] < 0.0
            j += 1
        end
        if j <= n
            if j > 1
                for k = 1:j-1
                    min += sums[j-k]
                end
                for i = j:n
                    max += sums[i]
                end
                return min + max
            else
                for i = 1:n
                    max += sums[i]
                end
                return min + max
            end
        else
            for i = 1:n
                min += sums[n-i+1]
            end
            return min + max
        end
    
        return min + max
    end
    
    println("type = ", type)
    println("algorithm a = ", algorithm_a())
    println("algorithm b = ", algorithm_b())
    println("algorithm c = ", algorithm_c())
    println("algorithm d = ", algorithm_d())    