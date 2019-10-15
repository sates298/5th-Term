# Stanisław Woźniak

function find_number()
    min::Float64 = nextfloat(Float64(1.0))
    max::Float64 = prevfloat(Float64(2.0))
    while min*(1.0/min) == 1 && min < 2.0
        min = nextfloat(min)
    end
    while max*(1.0/max) == 1 && max > 1.0
        max = prevfloat(max)
    end
    min, max
end


println("(min, max) result = ", find_number())
