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
import mseAPI.printClass.printClass;

public class TestPrintClass {
    @Test
    void testMethods(){
        System.out.println("\n      printClass:        ");

        /*
         * TEST 1: printTestPassed with short name
         * @param String
         */
        printClass.printTestPassed("Constructor");
        System.out.println("[    Constructor : OK      ]");

        /*
         * TEST 2: printTestClassName
         * @param String
         */
        printClass.printTestClassName("TestClass");
        System.out.println("          End Test          \n");

        /*
         * TEST 3: printMainSentence
         * @param String
         */
        printClass.printMainSentence("Hello World");
        System.out.println("          End Test          \n");

        /*
         * TEST 4: modulo even number
         * @param int
         */
        assertEquals(0, printClass.modulo(10));
        System.out.println("[    modulo even : OK      ]");

        /*
         * TEST 5: modulo odd number
         * @param int
         */
        assertEquals(1, printClass.modulo(11));
        System.out.println("[    modulo odd : OK       ]");

        /*
         * TEST 6: printEndTest
         * @param none
         */
        printClass.printEndTest();

        /*
         * TEST 7: software
         * @param none
         */
        printClass.software();

        System.out.println("\n          End Test          \n");
    }
}