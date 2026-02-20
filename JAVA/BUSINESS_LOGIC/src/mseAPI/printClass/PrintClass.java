package mseAPI.printClass;
import mseAPI.constantClass.ConstantClass;
public final class PrintClass{



    // CONSTRUCTOR:

    /*
    * @param none
    */
    private PrintClass(){}



    // METHODS:

    /*
    * Print the name of a method, if it has passed the test
    * @param name String
    * return void
    */
    public static void printTestPassed(String name){
        /*
        * hook: StringBuilder
        * ok: String
        * nameLength: int
        * okLength: int
        */
        StringBuilder hook = new StringBuilder("[                          ]");
        String ok = ": OK";
        int nameLength = name.length();
        int okLength = ok.length();

        /*
        * Replace hook spaces from index 5 with the method name
         */
        for(int x = ConstantClass.five; x < (ConstantClass.five + nameLength); x++){
            hook.setCharAt(x,name.charAt((x - ConstantClass.five)));
        }

        // Add ": OK"
        for(int y = ConstantClass.zero; y < okLength; y++){
            hook.setCharAt((ConstantClass.five + nameLength++ + ConstantClass.one),ok.charAt(y));
        }

        // print
        System.out.println(hook);
    }

    /*
     * Utility method: centers a text inside a hook
     * @param hook StringBuilder
     * @param text String
     * @param addColon boolean - whether to add a ":" after the text
     * return void
     */
    public static StringBuilder centerTextInHook(StringBuilder hook, String text, boolean addColon){
        /*
         * hookLength: int
         * textLength: int
         * middleHook: int
         * middleText: int
         * start: int
         */
        int hookLength = hook.length();
        int textLength = text.length();
        int middleHook, middleText, start;

        /*
         * find the center of the hook
         */
        if (modulo(hookLength)== ConstantClass.zero){
            middleHook = hookLength/2;
        } else {
            middleHook = hookLength/2 + ConstantClass.one;
        }

        /*
         * find the center of the text
         */
        if (modulo(textLength)== ConstantClass.zero){
            middleText = textLength/2;
        } else {
            middleText = textLength/2 + ConstantClass.one;
        }

        start = middleHook - middleText;
        if (addColon) start -= ConstantClass.one;

        /*
         * Replace hook spaces from index "start" with the text
         */
        for(int x = ConstantClass.zero; x < textLength; x++){
            hook.setCharAt(start, text.charAt(x));
            start += ConstantClass.one;
        }

        // add ":" if requested
        if(addColon){
            String colon = ":";
            hook.setCharAt(start, colon.charAt(ConstantClass.zero));
        }

        return hook;
    }

    /*
     * write the class title, centered
     */
    public static void printTestClassName(String name){
        /*
         * hook: StringBuilder
         */
        StringBuilder hook = new StringBuilder("                            ");
        System.out.println(centerTextInHook(hook, name, true));
    }

    /*
     * write the main title, centered
     */
    public static void printMainSentence(String name){
        /*
         * hook: StringBuilder
         */
        StringBuilder hook = new StringBuilder("[                                                   ]");
        System.out.println(centerTextInHook(hook, name, false));
    }

    public static StringBuilder printMyClient(String name){
        /*
         * hook: StringBuilder
         */
        StringBuilder hook = new StringBuilder("[                    ]");
        return centerTextInHook(hook, name, false);
    }


    /*
     * modulo calculation
     * @param number int
     * return int
     */
    public static int modulo(int number){
        return number%2;
    }

    /*
     * print the end of the testing
     * @param none
     * return void
     */
    public static void printEndTest(){
        System.out.println("          End Test          \n");
    }

    public static void software(){
        PrintClass.printMainSentence("Welcome to the M.S.E.");
        PrintClass.printMainSentence("Please, enter your choice:");
        PrintClass.printMainSentence("user");
        PrintClass.printMainSentence("exit");
    }

    public static void printMyClients(){
        StringBuilder block = new StringBuilder();
        block.append(printMyClient("USERNAME"));
        block.append(printMyClient("AGE"));
        block.append(printMyClient("CASH"));
        block.append(printMyClient("CASH AVAILABLE"));
        block.append(printMyClient("NUMBER OF SHARES"));
        System.out.println(block);
    }

    /** Le problème : Dans printTestPassed, tu initialises un StringBuilder de 28 caractères. Si le paramètre name est long (ex: 25 caractères), ConstantClass.five + nameLength dépassera la taille du buffer, et ton programme plantera immédiatement.

    L'image du buffer :



    Supprime l'interface IPrintClass si tu veux garder tes méthodes static. Ensuite, utilise la méthode .replace() de StringBuilder au lieu de faire des boucles for avec setCharAt, c'est beaucoup plus sûr :

    // Exemple simplifié et robuste
    int start = middleHook - middleText;
hook.replace(start, start + text.length(), text);**/

}
