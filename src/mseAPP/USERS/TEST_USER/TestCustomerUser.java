package mseAPP.USERS.TEST_USER;

// IMPORT:

/*
 * For testing framework
 * For assertions in tests
 * Base User class to be wrapped
 * CustomerUser class that will be tested
 * Interface for user tax calculations
 * Class for printing test messages and results
 */
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import mseAPP.USERS.User;
import mseAPP.USERS.CustomerUser;
import mseAPI.printClass.printClass;

public class TestCustomerUser {
    @Test
    void testMethods() throws Exception{
        printClass.printTestClassName("CustomerUser");

        /*
         * TEST 1: Constructor with valid user
         * Validates CustomerUser initialization wraps User instance
         * @param IUserTax: base user instance
         */
        User baseUser = new User("Alice");
        CustomerUser customer = new CustomerUser(baseUser);
        assertNotNull(customer);
        printClass.printTestPassed("Constructor");

        /*
         * TEST 2: taxesPayable method
         * Validates customer tax calculation (31.4% of base profits)
         * Expected: base profits * 31.4%
         * @param none
         */
        float expectedTax = baseUser.taxesPayable() * (31.4f / 100f);
        assertEquals(expectedTax, customer.taxesPayable(), 0.01);
        printClass.printTestPassed("taxesPayable");

        printClass.printEndTest();
    }
}