package mseAPP.USERS;
import mseAPI.constantClass.constantClass;

/*
 * Extends the "UserTax" class
 * Implements the "IUserTax" interface
 * Handles tax calculations for company users
 */
public class CompaniesUser extends UserTax implements IUserTax {
    // CONSTRUCTOR:

    /*
     * @param user IUserTax: user to apply company tax rates
     */
    public CompaniesUser(IUserTax user){
        super(user);// return class mere, puis on edit la méthode
    }

    // METHODS:

    /*
     * Calculate company taxes payable
     * 15% tax rate if profits > $42,500
     * 25% tax rate otherwise
     * @param none
     * return float: amount of taxes to pay
     */
    @Override
    public float taxesPayable(){
        if (super.taxesPayable() > constantClass.youAreSoRich42500$){
            return (super.taxesPayable()*((float) constantClass.fifteen/Hundred));
        }
        return (super.taxesPayable()*((float) constantClass.twentyFive/Hundred));
    }
}