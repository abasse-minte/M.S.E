package mseAPP.USERS.TEST_USER;

// IMPORT:

/*
 * For testing
 * For Assert
 * class that will be tested
 * print the test passed
 */
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import mseAPP.USERS.User;
import mseAPP.USERS.CompaniesUser;
import mseAPI.printClass.printClass;
import mseAPI.constantClass.constantClass;

public class TestCompaniesUser {
    @Test
    void testMethods() throws Exception{
        printClass.printTestClassName("CompaniesUser");

        /*
         * TEST 1: Constructor
         * @param IUserTax
         */
        User U1 = new User("CompanyTest");
        CompaniesUser C1 = new CompaniesUser(U1);
        assertNotNull(C1);
        printClass.printTestPassed("Constructor");

        /*
         * TEST 2: taxesPayable low profits (25% rate)
         * @param none
         */
        U1.profits = 40000f;
        assertEquals(10000f, C1.taxesPayable(), 0.01f);
        printClass.printTestPassed("Tax 25%");

        /*
         * TEST 3: taxesPayable high profits (15% rate)
         * @param none
         */
        U1.profits = 50000f;
        assertEquals(7500f, C1.taxesPayable(), 0.01f);
        printClass.printTestPassed("Tax 15%");

        /*
         * TEST 4: taxesPayable at threshold
         * @param none
         */
        U1.profits = constantClass.youAreSoRich42500$;
        assertEquals(10625f, C1.taxesPayable(), 0.01f);
        printClass.printTestPassed("Tax threshold");

        /*
         * TEST 5: taxesPayable zero profits
         * @param none
         */
        U1.profits = 0f;
        assertEquals(0f, C1.taxesPayable(), 0.01f);
        printClass.printTestPassed("Tax zero");

        printClass.printEndTest();
    }
}