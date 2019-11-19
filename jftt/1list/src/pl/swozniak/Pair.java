package pl.swozniak;

public class Pair<A, B> {
    private A fst;
    private B snd;

    public Pair(A fst, B snd) {
        this.fst = fst;
        this.snd = snd;
    }

    public A getFst() {
        return fst;
    }

    public B getSnd() {
        return snd;
    }

     public static <A, B> Pair<A, B> of(A a, B b){
        return new Pair<A, B>(a, b);
     }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Pair<?, ?> pair = (Pair<?, ?>) o;

        if (fst != null ? !fst.equals(pair.fst) : pair.fst != null) return false;
        return snd != null ? snd.equals(pair.snd) : pair.snd == null;
    }

    @Override
    public int hashCode() {
        int result = fst != null ? fst.hashCode() : 0;
        result = 31 * result + (snd != null ? snd.hashCode() : 0);
        return result;
    }
}
