package mseAPP.USERS;

public interface IUserInformation {
    /*
     * Get the name
     * @param none
     */
    String getName();
    /*
     * @param String: set the name
     */
    void setName(String name);
    /*
     * Get the user type
     * @param none
     */
    String getTypeUser();
    /*
     * @param String: set typeUser
     */
    void setTypeUser(String typeUser);
    /*
     * Show name
     * @param none
     */
    void printName();
    /*
     * Show age
     * @param none
     */
    void printAge();
}
