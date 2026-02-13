package mseAPP.DATE.TEST_DATE;

// IMPORT:

/*
 * For testing
 * For Assert
 * class that will be tested
 * print the test passed
 */
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import mseAPP.DATE.DateEurope;
import mseAPI.printClass.printClass;

public class TestDateEurope {
    @Test
    void testMethods() throws Exception{
        printClass.printTestClassName("DateEurope");

        /*
         * TEST 1: Constructor valid date
         * @param String
         */
        DateEurope D1 = new DateEurope("25/12/2024");
        assertNotNull(D1);
        assertEquals(25, D1.day);
        assertEquals(12, D1.month);
        assertEquals(2024, D1.year);
        printClass.printTestPassed("Constructor");

        /*
         * TEST 2: dateSizeTen (DD/MM/YYYY)
         * @param String
         */
        assertTrue(D1.dateSizeTen("15/01/2025"));
        assertEquals(15, D1.day);
        assertEquals(1, D1.month);
        assertEquals(2025, D1.year);
        printClass.printTestPassed("Size 10");

        /*
         * TEST 3: dateSizeEight (DDMMYYYY)
         * @param String
         */
        assertTrue(D1.dateSizeEight("05032025"));
        assertEquals(5, D1.day);
        assertEquals(3, D1.month);
        assertEquals(2025, D1.year);
        printClass.printTestPassed("Size 8");

        /*
         * TEST 4: dateSizeSix (DMYYYY)
         * @param String
         */
        assertTrue(D1.dateSizeSix("532025"));
        assertEquals(5, D1.day);
        assertEquals(3, D1.month);
        assertEquals(2025, D1.year);
        printClass.printTestPassed("Size 6");

        /*
         * TEST 5: leap year
         * @param none
         */
        DateEurope D2 = new DateEurope("29/02/2024");
        assertTrue(D2.leapYear);
        assertEquals(29, D2.maxDay);
        printClass.printTestPassed("Leap year");

        /*
         * TEST 6: invalid date throws exception
         * @param String
         */
        assertThrows(Exception.class, () -> new DateEurope("45/13/2025"));
        printClass.printTestPassed("Invalid date");

        printClass.printEndTest();
    }
}