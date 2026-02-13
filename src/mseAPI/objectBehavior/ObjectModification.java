package mseAPI.objectBehavior;
import mseAPI.constantClass.constantClass;

public final class ObjectModification {
    // ATTRIBUTES:

    /*
    * static int Zero: constant
    */




    // CONSTRUCTOR:
    private ObjectModification(){}



    // METHODS:

    /*
    * convert an object to a String
    * @param T
    * return String
    */
    public static <T> String convertedToString(T object){
        return object.toString();
    }

    /*
     * remove the spaces
     * @param T
     * return String
     */
    public static String removeSpace(String object){
        return object.replace(" ","");
    }

    /*
     * check
     * @param String
     * return boolean
     */
    public static boolean containsLetter(String object){
        int objectLength = object.length();
        for(int x = constantClass.zero; x < objectLength; x++){
            if (Character.isLetter(object.charAt(x))){
                return true;
            }
        }
        return false;
    }

    /*
     * convert to int
     * @param String
     * return int
     */
    public static int convertedToInt(String object) throws NumberFormatException{
        try {
            if (!containsLetter(object)){
                return Integer.parseInt(object);
            }
        } catch (NumberFormatException e){
            return constantClass.zero;
        }
        return constantClass.zero;
    }

    /*
     * check the spaces
     * @param none
     * return boolean
     * return true if contain Space
     * return false if don't contain space
     */
    public static boolean containSpace(String name){
        return name.contains(" ");
    }

    // try catch int, corriger toutes les erreurs


}
