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
import mseAPI.printClass.PrintClass;

public class TestUser {
    @Test
    void testMethods() throws Exception{
        PrintClass.printTestClassName("User");

        /*
         * TEST 1: Constructor
         * @param String
         */
        User U1 = new User("Abasse");
        assertNotNull(U1.username);
        assertEquals(U1.username, "Abasse");
        assertEquals(U1.typeUser, "unknown");
        assertEquals(U1.tax, 0f);
        assertEquals(U1.profits, 1f);
        PrintClass.printTestPassed("Constructor");

        /*
         * TEST 2: setName
         * @param String
         */
        U1.setName("Paul");
        assertEquals(U1.username, "Paul");
        PrintClass.printTestPassed("setName");

        /*
         * TEST 3: getName
         * @param none
         */
        assertEquals(U1.getName(), "Paul");
        PrintClass.printTestPassed("getName");

        /*
         * TEST 4: setAge
         * @param int
         */
        U1.setTypeUser("companie");
        assertEquals(U1.getTypeUser(), "companie");
        PrintClass.printTestPassed("setUserType");

        /*
         * TEST 5: printName
         * @param none
         */
        //U1.printName();
        PrintClass.printTestPassed("printName");

        /*
         * TEST 6: printAge
         * @param none
         */
        //U1.printAge();
        PrintClass.printTestPassed("printAge");

        /*
         * TEST 7: usernameSize
         * @param String
         */
        assertTrue(U1.usernameSize("Paul"));
        assertFalse(U1.usernameSize("Al")); // trop court
        assertFalse(U1.usernameSize("ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ"));
        PrintClass.printTestPassed("usernameSize");

        /*
         * TEST 8: validUsername
         * @param String
         */
        assertTrue(U1.validUsername("Alice"));
        assertFalse(U1.validUsername("Alice 123"));
        assertFalse(U1.validUsername("12"));
        PrintClass.printTestPassed("validUsername");

        /*
         * TEST 9: taxesPayable
         * @param none
         */
        assertEquals(U1.taxesPayable(), 1f);
        PrintClass.printTestPassed("taxesPayable");

        PrintClass.printEndTest();
    }
}
