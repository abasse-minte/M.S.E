package mseAPI.printClass.TEST_PRINTCLASS;

// IMPORT:

/*
 * For testing
 * For Assert
 * class that will be tested
 * print the test passed
 */
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import mseAPI.printClass.PrintClass;

public class TestPrintClass {
    @Test
    void testMethods(){
        System.out.println("\n      printClass:        ");

        /*
         * TEST 1: printTestPassed with short name
         * @param String
         */
        PrintClass.printTestPassed("Constructor");
        System.out.println("[    Constructor : OK      ]");

        /*
         * TEST 2: printTestClassName
         * @param String
         */
        PrintClass.printTestClassName("TestClass");
        System.out.println("          End Test          \n");

        /*
         * TEST 3: printMainSentence
         * @param String
         */
        PrintClass.printMainSentence("Hello World");
        System.out.println("          End Test          \n");

        /*
         * TEST 4: modulo even number
         * @param int
         */
        assertEquals(0, PrintClass.modulo(10));
        System.out.println("[    modulo even : OK      ]");

        /*
         * TEST 5: modulo odd number
         * @param int
         */
        assertEquals(1, PrintClass.modulo(11));
        System.out.println("[    modulo odd : OK       ]");

        /*
         * TEST 6: printEndTest
         * @param none
         */
        PrintClass.printEndTest();

        /*
         * TEST 7: software
         * @param none
         */
        PrintClass.software();

        System.out.println("\n          End Test          \n");
    }
}