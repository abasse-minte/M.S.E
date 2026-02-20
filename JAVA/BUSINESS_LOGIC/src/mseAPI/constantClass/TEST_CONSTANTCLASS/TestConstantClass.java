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
import mseAPI.constantClass.ConstantClass;
import mseAPI.printClass.PrintClass;

public class TestConstantClass {
    @Test
    void testConstants(){
        PrintClass.printTestClassName("constantClass");

        /*
         * TEST 1: Basic numbers (0-12)
         * @param none
         */
        assertEquals(0, ConstantClass.zero);
        assertEquals(1, ConstantClass.one);
        assertEquals(2, ConstantClass.two);
        assertEquals(3, ConstantClass.three);
        assertEquals(4, ConstantClass.four);
        assertEquals(5, ConstantClass.five);
        assertEquals(6, ConstantClass.six);
        assertEquals(7, ConstantClass.seven);
        assertEquals(8, ConstantClass.eight);
        assertEquals(9, ConstantClass.nine);
        assertEquals(10, ConstantClass.ten);
        assertEquals(11, ConstantClass.eleven);
        assertEquals(12, ConstantClass.twelve);
        PrintClass.printTestPassed("Basic numbers");

        /*
         * TEST 2: Special numbers
         * @param none
         */
        assertEquals(15, ConstantClass.fifteen);
        assertEquals(25, ConstantClass.twentyFive);
        assertEquals(28, ConstantClass.twentyEight);
        assertEquals(29, ConstantClass.twentyNine);
        assertEquals(30, ConstantClass.thirty);
        assertEquals(31, ConstantClass.thirtyOne);
        assertEquals(50, ConstantClass.fifty);
        assertEquals(100, ConstantClass.hundred);
        assertEquals(400, ConstantClass.fourHundred);
        PrintClass.printTestPassed("Special numbers");

        /*
         * TEST 3: Year constants
         * @param none
         */
        assertEquals(1900, ConstantClass.y1900);
        assertEquals(2026, ConstantClass.y2026);
        PrintClass.printTestPassed("Years");

        /*
         * TEST 4: Tax threshold
         * @param none
         */
        assertEquals(42500, ConstantClass.youAreSoRich42500$);
        PrintClass.printTestPassed("Tax threshold");

        PrintClass.printEndTest();
    }
}