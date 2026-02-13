package mseAPP.USERS;

/*
 * Extends the "UserTax" class
 * Implements the "IUserTax" interface
 * Handles tax calculations for customer users
 */
public class CustomerUser extends UserTax implements IUserTax {
    // ATTRIBUTES:

    /*
     * tax float: fixed tax rate for customers (31.4%)
     * user IUserTax: wrapped user instance
     */
    public final float tax = 31.4f;

    // CONSTRUCTOR:

    /*
     * @param user IUserTax: user to apply customer tax rate
     */
    public CustomerUser(IUserTax user){
        super(user);
    }

    // METHODS:

    /*
     * Calculate customer taxes payable
     * Applies 31.4% tax rate
     * @param none
     * return float: amount of taxes to pay
     */
    @Override
    public float taxesPayable(){
        return super.taxesPayable()*(tax/Hundred);
    }
}