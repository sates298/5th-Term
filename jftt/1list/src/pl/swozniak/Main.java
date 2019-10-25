package pl.swozniak;

public class Main {

    private static String text = "bababaaababa";
    private static String pattern = "aba";

    public static void main(String[] args) {
        System.out.println("text = " + text);
        System.out.println("pattern = " + pattern);
        FiniteAutomaton fa = new FiniteAutomaton();
        System.out.println("Finite Automaton Matcher result = " + fa.faMatcher(text, pattern));
        KnuthMorrisPratt kmp = new KnuthMorrisPratt();
        System.out.println("Knuth-Morris-Pratt Matcher result = " + kmp.kmpMatcher(text, pattern));
    }
}
