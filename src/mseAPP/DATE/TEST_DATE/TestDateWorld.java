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
import mseAPP.DATE.DateWorld;
import mseAPI.printClass.printClass;

public class TestDateWorld {
    @Test
    void testMethods() throws Exception{
        printClass.printTestClassName("DateWorld");

        /*
         * TEST 1: Constructor valid date
         * @param String
         */
        DateWorld D1 = new DateWorld("2024/12/25");
        assertNotNull(D1);
        assertEquals(25, D1.day);
        assertEquals(12, D1.month);
        assertEquals(2024, D1.year);
        printClass.printTestPassed("Constructor");

        /*
         * TEST 2: dateSizeTen (YYYY/MM/DD)
         * @param String
         */
        assertTrue(D1.dateSizeTen("2025/01/15"));
        assertEquals(15, D1.day);
        assertEquals(1, D1.month);
        assertEquals(2025, D1.year);
        printClass.printTestPassed("Size 10");

        /*
         * TEST 3: dateSizeEight (YYYYMMDD)
         * @param String
         */
        assertTrue(D1.dateSizeEight("20250305"));
        assertEquals(5, D1.day);
        assertEquals(3, D1.month);
        assertEquals(2025, D1.year);
        printClass.printTestPassed("Size 8");

        /*
         * TEST 4: dateSizeSix (YYYYMD)
         * @param String
         */
        assertTrue(D1.dateSizeSix("202535"));
        assertEquals(5, D1.day);
        assertEquals(3, D1.month);
        assertEquals(2025, D1.year);
        printClass.printTestPassed("Size 6");

        /*
         * TEST 5: leap year
         * @param none
         */
        DateWorld D2 = new DateWorld("2024/02/29");
        assertTrue(D2.leapYear);
        assertEquals(29, D2.maxDay);
        printClass.printTestPassed("Leap year");

        /*
         * TEST 6: invalid date throws exception
         * @param String
         */
        assertThrows(Exception.class, () -> new DateWorld("2025/13/45"));
        printClass.printTestPassed("Invalid date");

        printClass.printEndTest();
    }
}