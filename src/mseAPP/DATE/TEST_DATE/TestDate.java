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
import mseAPP.DATE.Date;
import mseAPP.DATE.DateEurope;
import mseAPI.printClass.printClass;

public class TestDate {
    @Test
    void testMethods() throws Exception{
        printClass.printTestClassName("Date");

        /*
         * TEST 1: setDate
         * @param int, int, int
         */
        Date D1 = new DateEurope("01/01/2024");
        D1.setDate(15, 6, 2025);
        assertEquals(15, D1.day);
        assertEquals(6, D1.month);
        assertEquals(2025, D1.year);
        printClass.printTestPassed("setDate");

        /*
         * TEST 2: dayPerMonth 31 days
         * @param int
         */
        assertEquals(31, D1.dayPerMonth(1));
        assertEquals(31, D1.dayPerMonth(3));
        assertEquals(31, D1.dayPerMonth(7));
        printClass.printTestPassed("31 days");

        /*
         * TEST 3: dayPerMonth 30 days
         * @param int
         */
        assertEquals(30, D1.dayPerMonth(4));
        assertEquals(30, D1.dayPerMonth(6));
        assertEquals(30, D1.dayPerMonth(9));
        printClass.printTestPassed("30 days");

        /*
         * TEST 4: dayPerMonth February non-leap
         * @param int
         */
        D1.year = 2025;
        assertEquals(28, D1.dayPerMonth(2));
        printClass.printTestPassed("Feb 28");

        /*
         * TEST 5: dayPerMonth February leap year
         * @param int
         */
        D1.year = 2024;
        D1.leapYear();
        assertEquals(29, D1.dayPerMonth(2));
        printClass.printTestPassed("Feb 29");

        /*
         * TEST 6: leapYear true (divisible by 4)
         * @param none
         */
        D1.year = 2024;
        assertTrue(D1.leapYear());
        printClass.printTestPassed("Leap 2024");

        /*
         * TEST 7: leapYear false (not divisible by 4)
         * @param none
         */
        D1.year = 2023;
        assertFalse(D1.leapYear());
        printClass.printTestPassed("Not leap");

        /*
         * TEST 8: leapYear false (divisible by 100)
         * @param none
         */
        D1.year = 1900;
        assertFalse(D1.leapYear());
        printClass.printTestPassed("1900");

        /*
         * TEST 9: leapYear true (divisible by 400)
         * @param none
         */
        D1.year = 2000;
        assertTrue(D1.leapYear());
        printClass.printTestPassed("2000");

        /*
         * TEST 10: dateFormat valid
         * @param int, int, int
         */
        assertTrue(D1.dateFormat(15, 6, 2025));
        printClass.printTestPassed("Valid format");

        /*
         * TEST 11: dateFormat invalid day
         * @param int, int, int
         */
        assertFalse(D1.dateFormat(32, 1, 2025));
        printClass.printTestPassed("Invalid day");

        /*
         * TEST 12: dateFormat invalid month
         * @param int, int, int
         */
        assertFalse(D1.dateFormat(15, 13, 2025));
        printClass.printTestPassed("Invalid month");

        printClass.printEndTest();
    }
}