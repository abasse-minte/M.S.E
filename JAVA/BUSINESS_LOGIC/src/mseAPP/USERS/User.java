package mseAPP.USERS;

import mseAPI.objectBehavior.ObjectModification;
import mseAPI.constantClass.ConstantClass;
import mseAPI.printClass.PrintClass;


/*
* Implements the "IUserInformation" interface
* Implements the "IUserChecksANDCorrects" interface
*/
public class User implements IUserInformation, IUserChecksANDCorrects, IUserTax {
    // ATTRIBUTES:

    /*
    * username String: for the user's name
    * age int: for the user's age
    * sizeAgeMax int: size age max
    * sizeAgeMin int: size age min
    * sizeUsernameMax: size username max
    * sizeUsernameMix: size username min
    */
    String type;
    public String username;
    public String typeUser;
    public float profits;
    public float tax;



    // CONSTRUCTOR:

    /*
     * @param username String: set username
     */

    public User(String username) throws Exception{
        this.typeUser = "unknown";
        this.tax = 0;
        this.profits = 1;
        username = ObjectModification.removeSpace(username);
        if (!usernameSize(username) || !validUsername(username)){
            throw new Exception("Invalid username");
        }
        this.username = username;

    }



    // METHODS:

    /*
     * @param String: set the name
     * return void
     */
    @Override
    public void setName(String username){
        this.username = username;
    }

    /*
     * @param int: set the age
     * return void
     */
    @Override
    public void setTypeUser(String typeUser){
        this.typeUser = typeUser;
    }

    /*
     * Get the name
     * @param none
     * return String
     */
    @Override
    public String getName(){
        return username;
    }

    /*
     * Get the age
     * @param none
     * return int
     */
    @Override
    public String getTypeUser(){
        return typeUser;
    }

    /*
     * Show age
     * @param none
     * return void
     */
    @Override
    public void printAge(){
        System.out.println("You are " + typeUser + " years old\n");
    }

    /*
     * Show name
     * @param none
     * return void
     */
    @Override
    public void printName(){
        PrintClass.printMainSentence(this.username + " ?! It is really you ??");
    }

    /*
     * check size
     * @param String
     * return boolean
     */
    @Override
    public boolean usernameSize(String username){
        return username.length() <= ConstantClass.twenty && username.length() >= ConstantClass.three;
    }

    /*
     * check username
     * @param String
     * return boolean
     */
    @Override
    public boolean validUsername(String username){
        return this.usernameSize(username) && !ObjectModification.containSpace(username) && !username.isEmpty() && !username.matches(".*\\d.*");
    }

    // IUser Tax Interface

    @Override
    public float taxesPayable(){
        return profits;
    }



}
