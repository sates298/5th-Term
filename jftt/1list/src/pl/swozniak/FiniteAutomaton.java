package pl.swozniak;

 //todo change library

import java.util.*;

public class FiniteAutomaton {



    private boolean isSuffix (String full, String ending){
        int fl = full.length(), el = ending.length();
        if (fl >= el){
            return full.substring(fl-el, fl).compareTo(ending) == 0;
        }
        return false;
    }

    private Map<Pair<Integer, Character>, Integer> computeTransitionFunction(String pattern, String alphabet) {
        int m = pattern.length();
        Map<Pair<Integer, Character>, Integer> delta = new HashMap<Pair<Integer, Character>, Integer>();

        for (int q = 0; q < m + 1; q++) {
            for (char c : alphabet.toCharArray()){
                int k = Math.min(m+1, q+2);

                do{
                    k--;
                }while (!isSuffix(pattern.substring(0, q) + c, pattern.substring(0, k)));

                delta.put(Pair.of(q, c), k);
            }
        }


        return delta;
    }

    private String getAlphabet(String pattern){
        Set<Character> alphabet = new HashSet<Character>();
        for(Character c: pattern.toCharArray()){
            alphabet.add(c);
        }

        StringBuilder builder = new StringBuilder();
        for(Character c : alphabet){
            builder.append(c);
        }
        return builder.toString();
    }

    public List<Integer> faMatcher(String text, String pattern) {
        List<Integer> result = new ArrayList<Integer>();
        int n = text.length(), m = pattern.length(), q = 0, s;
        Map<Pair<Integer, Character>, Integer> delta = computeTransitionFunction(pattern, getAlphabet(pattern));
        for (int i = 0; i < n; i++){
            q = delta.get(Pair.of(q, text.charAt(i)));

            if (q == m){
                s = i - m + 1;
                result.add(s);
            }
        }
        return result;
    }


}
