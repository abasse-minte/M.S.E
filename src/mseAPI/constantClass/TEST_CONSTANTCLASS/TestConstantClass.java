package mseAPI.constantClass.TEST_CONSTANTCLASS;

// IMPORT:

/*
 * For testing
 * For Assert
 * class that will be tested
 * print the test passed
 */
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import mseAPI.constantClass.constantClass;
import mseAPI.printClass.printClass;

public class TestConstantClass {
    @Test
    void testConstants(){
        printClass.printTestClassName("constantClass");

        /*
         * TEST 1: Basic numbers (0-12)
         * @param none
         */
        assertEquals(0, constantClass.zero);
        assertEquals(1, constantClass.one);
        assertEquals(2, constantClass.two);
        assertEquals(3, constantClass.three);
        assertEquals(4, constantClass.four);
        assertEquals(5, constantClass.five);
        assertEquals(6, constantClass.six);
        assertEquals(7, constantClass.seven);
        assertEquals(8, constantClass.eight);
        assertEquals(9, constantClass.nine);
        assertEquals(10, constantClass.ten);
        assertEquals(11, constantClass.eleven);
        assertEquals(12, constantClass.twelve);
        printClass.printTestPassed("Basic numbers");

        /*
         * TEST 2: Special numbers
         * @param none
         */
        assertEquals(15, constantClass.fifteen);
        assertEquals(25, constantClass.twentyFive);
        assertEquals(28, constantClass.twentyEight);
        assertEquals(29, constantClass.twentyNine);
        assertEquals(30, constantClass.thirty);
        assertEquals(31, constantClass.thirtyOne);
        assertEquals(50, constantClass.fifty);
        assertEquals(100, constantClass.hundred);
        assertEquals(400, constantClass.fourHundred);
        printClass.printTestPassed("Special numbers");

        /*
         * TEST 3: Year constants
         * @param none
         */
        assertEquals(1900, constantClass.y1900);
        assertEquals(2026, constantClass.y2026);
        printClass.printTestPassed("Years");

        /*
         * TEST 4: Tax threshold
         * @param none
         */
        assertEquals(42500, constantClass.youAreSoRich42500$);
        printClass.printTestPassed("Tax threshold");

        printClass.printEndTest();
    }
}