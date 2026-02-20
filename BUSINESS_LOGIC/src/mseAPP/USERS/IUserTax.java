package mseAPP.USERS;

/*
 * Interface for user tax calculations
 */
public interface IUserTax {

    /*
     * Calculate taxes payable
     * @param none
     * return float: amount of taxes to pay
     */
    public float taxesPayable();

}