package mseAPP.USERS;

/*
 * Abstract decorator class for user tax calculations
 * Implements the "IUserTax" interface
 */
public abstract class UserTax implements IUserTax {
    // ATTRIBUTES:

    /*
     * user IUserTax: wrapped user instance
     * Hundred int: constant for percentage calculations
     */
    private final IUserTax user;
    public final int Hundred = 100;

    // CONSTRUCTOR:

    /*
     * @param user IUserTax: user to decorate with tax calculations
     */
    public UserTax(IUserTax user){
        this.user = user;
    }

    // METHODS:

    /*
     * Calculate taxes payable (delegates to wrapped user)
     * @param none
     * return float: amount of taxes to pay
     */
    @Override
    public float taxesPayable(){
        return user.taxesPayable();
    }
}