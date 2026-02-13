package mseAPI.objectBehavior.testObjectModification;

import mseAPI.objectBehavior.*;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import mseAPI.printClass.printClass;
import mseAPP.USERS.User;

public class TestObjectModification {
    @Test
    public void testObjectModification() throws Exception {
        printClass.printTestClassName("Test Object Modification");

        /*
         * TEST 3: Valid user creation
         */
        User U3 = new User("Chocolat");
        assertNotNull(U3);
        assertEquals("Chocolat", U3.getName());

        /*
         * TEST 4: convertedToString
         */
        assertNotNull(ObjectModification.convertedToString(U3.username));
        assertInstanceOf(String.class, ObjectModification.convertedToString(U3.username));
        assertEquals("Chocolat", ObjectModification.convertedToString(U3.username));
        printClass.printTestPassed("convertedToString");

        /*
         * TEST 5: removeSpace
         */
        assertEquals("Chocolat", ObjectModification.removeSpace(" Choc olat "));
        assertEquals("test", ObjectModification.removeSpace("te st"));
        assertNotNull(ObjectModification.removeSpace(U3.username));
        printClass.printTestPassed("removeSpace");

        /*
         * TEST 6: containsLetter
         */
        assertTrue(ObjectModification.containsLetter(U3.username));
        assertTrue(ObjectModification.containsLetter("abc123"));
        assertFalse(ObjectModification.containsLetter("123"));
        printClass.printTestPassed("containsLetter");

        /*
         * TEST 7: convertedToInt
         */
        assertEquals(0, ObjectModification.convertedToInt(U3.username));
        assertEquals(123, ObjectModification.convertedToInt("123"));
        assertEquals(0, ObjectModification.convertedToInt("abc"));
        printClass.printTestPassed("convertedToInt");

        printClass.printEndTest();
    }
}