package mseAPP.DATE;

/*
 * Interface for date operations
 */
public interface IDate {
    /*
     * Set the date
     * @param day int
     * @param month int
     * @param year int
     * return void
     */
    void setDate(int day, int month, int year) throws Exception;

    /*
     * Get number of days in a month
     * @param maxDay int
     * return int
     */
    int dayPerMonth(int maxDay);

    /*
     * Check if date format is valid
     * @param day int
     * @param month int
     * @param year int
     * return boolean
     */
    boolean dateFormat(int day, int month, int year);

    /*
     * Check if year is leap year
     * @param none
     * return boolean
     */
    boolean leapYear();

    /*
     * Correct and parse date string
     * @param date String
     * return void
     */
    void dateCorrect(String date);

    /*
     * Parse date with 6 characters (DDMMYY)
     * @param date String
     * return boolean
     */
    boolean dateSizeSix(String date);

    /*
     * Parse date with 8 characters (DDMMYYYY)
     * @param date String
     * return boolean
     */
    boolean dateSizeEight(String date);

    /*
     * Parse date with 10 characters (DD/MM/YYYY)
     * @param date String
     * return boolean
     */
    boolean dateSizeTen(String date);
}