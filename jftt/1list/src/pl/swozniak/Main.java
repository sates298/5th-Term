package pl.swozniak;

public class Main {

    private static String text = "łąłąłąłą";
    private static String pattern = "łą";

    public static void main(String[] args) {
        System.out.println("text = " + text);
        System.out.println("pattern = " + pattern);
        KnuthMorrisPratt kmp = new KnuthMorrisPratt();
        System.out.println("Knuth-Morris-Pratt result = " + kmp.kmpMatcher(text, pattern));
    }
}
