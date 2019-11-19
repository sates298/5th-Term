package pl.swozniak;

import java.util.ArrayList;
import java.util.List;

public class KnuthMorrisPratt {

    private int[] computePrefixFunction(String pattern){
        int m = pattern.length();
        int[] pi = new int[m+1];
        pi[1] = 0;
        int k = 0;
        for(int q=2; q<=m; q++){
            while (k > 0 && pattern.charAt(k) != pattern.charAt(q-1)){
                k = pi[k];
            }
            if (pattern.charAt(k) == pattern.charAt(q-1)){
                k++;
            }
            pi[q] = k;
        }

        return pi;
    }

    public List<Integer> kmpMatcher(String text, String pattern){
        List<Integer> result = new ArrayList<Integer>();
        int n = text.length();
        int m = pattern.length();
        int[] pi = computePrefixFunction(pattern);
        int q = 0;

        int a = 0;
        for( int i =1; i<=n; ++i){
            while (q > 0 && pattern.charAt(q) != text.charAt(i-1)){
                q = pi[q];
            }
            if (pattern.charAt(q) == text.charAt(i-1)){
                q = q + 1;
            }
            if( q == m) {
                result.add(i-m);
//                System.out.println("przesuniecie " + (i-m));
                q = pi[q];
            }
        }
        return result;
    }


}
