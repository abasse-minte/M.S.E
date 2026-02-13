package mseAPI.printClass;
import mseAPI.constantClass.constantClass;

public final class printClass {



    // CONSTRUCTOR:

    /*
    * @param none
    */
    private printClass(){}



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
        for(int x = constantClass.five; x < (constantClass.five + nameLength); x++){
            hook.setCharAt(x,name.charAt((x - constantClass.five)));
        }

        // Add ": OK"
        for(int y = constantClass.zero; y < okLength; y++){
            hook.setCharAt((constantClass.five + nameLength++ + constantClass.one),ok.charAt(y));
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
    public static void centerTextInHook(StringBuilder hook, String text, boolean addColon){
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
        if (modulo(hookLength)==constantClass.zero){
            middleHook = hookLength/2;
        } else {
            middleHook = hookLength/2 + constantClass.one;
        }

        /*
         * find the center of the text
         */
        if (modulo(textLength)==constantClass.zero){
            middleText = textLength/2;
        } else {
            middleText = textLength/2 + constantClass.one;
        }

        start = middleHook - middleText;
        if (addColon) start -= constantClass.one;

        /*
         * Replace hook spaces from index "start" with the text
         */
        for(int x = constantClass.zero; x < textLength; x++){
            hook.setCharAt(start, text.charAt(x));
            start += constantClass.one;
        }

        // add ":" if requested
        if(addColon){
            String colon = ":";
            hook.setCharAt(start, colon.charAt(constantClass.zero));
        }

        System.out.println(hook);
    }

    /*
     * write the class title, centered
     */
    public static void printTestClassName(String name){
        /*
         * hook: StringBuilder
         */
        StringBuilder hook = new StringBuilder("                            ");
        centerTextInHook(hook, name, true);
    }

    /*
     * write the main title, centered
     */
    public static void printMainSentence(String name){
        /*
         * hook: StringBuilder
         */
        StringBuilder hook = new StringBuilder("[                                                   ]");
        centerTextInHook(hook, name, false);
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
        printClass.printMainSentence("Welcome to the M.S.E.");
        printClass.printMainSentence("Please, enter your choice:");
        printClass.printMainSentence("user");
        printClass.printMainSentence("exit");
    }

}
