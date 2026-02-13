package mseAPP.DATE;

import mseAPI.constantClass.constantClass;
import mseAPI.objectBehavior.ObjectModification;

/*
 * Abstract class implementing date operations
 * Implements the "IDate" interface
 */
public abstract class Date implements IDate{
    // ATTRIBUTES:

    /*
     * day int: day of the month
     * month int: month of the year
     * year int: year
     * maxDay int: maximum days in current month
     * leapYear boolean: true if year is leap year
     */
    public int day;
    public int month;
    public int year;
    public int maxDay = constantClass.thirtyOne;
    public boolean leapYear = false;

    // CONSTRUCTOR:

    /*
     * @param date String: date to parse and validate
     */
    public Date(String date) throws Exception {
        dateCorrect(date);
        if (!dateFormat(day, month, year) || dayPerMonth(month) == constantClass.zero){
            throw new Exception("INVALID DATE");
        }
    }

    // METHODS:

    /*
     * Set the date
     * @param day int
     * @param month int
     * @param year int
     * return void
     */
    @Override
    public void setDate(int day, int month, int year){
        this.day = day;
        this.month = month;
        this.year = year;
    }

    /*
     * Get number of days in a month
     * @param month int
     * return int: number of days or 0 if invalid
     */
    @Override
    public int dayPerMonth(int month){
        if (month == constantClass.one || month == constantClass.three
                || month == constantClass.five || month == constantClass.seven
                || month == constantClass.eight || month == constantClass.ten
                || month == constantClass.twelve){
            return this.maxDay = constantClass.thirtyOne;
        }
        if (month == constantClass.four || month == constantClass.six
                || month == constantClass.nine || month == constantClass.eleven){
            return this.maxDay = constantClass.thirty;
        }
        if (month == constantClass.two){
            if (leapYear()){
                return this.maxDay = constantClass.twentyNine;
            }
            return this.maxDay = constantClass.twentyEight;
        }
        return constantClass.zero;
    }

    /*
     * Check if year is leap year
     * @param none
     * return boolean: true if leap year
     */
    @Override
    public boolean leapYear(){
        if ((this.year % constantClass.four) == constantClass.zero){
            if (this.year % constantClass.hundred == constantClass.zero){
                if (this.year % constantClass.fourHundred == constantClass.zero){
                    return this.leapYear = true;
                }
                return this.leapYear = false;
            }
            return this.leapYear = true;
        }
        return this.leapYear = false;
    }

    /*
     * Check if date format is valid
     * @param day int
     * @param month int
     * @param year int
     * return boolean: true if valid
     */
    @Override
    public boolean dateFormat(int day, int month, int year){
        return day >= constantClass.one && day <= dayPerMonth(month)
                && month >= constantClass.one && month <= constantClass.twelve
                && year <= constantClass.y2026 && year >= constantClass.y1900;
    }

    /*
     * Correct and parse date string
     * @param date String
     * return void
     */
    @Override
    public void dateCorrect(String date){
        if (ObjectModification.containSpace(date)){
            date = ObjectModification.removeSpace(date);
        }
        int dateLenght = date.length();
        if (!ObjectModification.containsLetter(date)){
            if (dateLenght == constantClass.ten){
                dateSizeTen(date);
            }
            else if (dateLenght == constantClass.eight){
                dateSizeEight(date);
            }
            else if (dateLenght == constantClass.six){
                dateSizeSix(date);
            }
        }
    }

    public int ageCalculation(){
        int currentDay = constantClass.one;
        int currentMonth = constantClass.one;
        int currentYear = constantClass.y2026;

        int yearsOld = currentYear - this.year;

        if (currentMonth < this.month ||
                (currentMonth == this.month && currentDay < this.day)) {
            yearsOld--;
        }

        return yearsOld;
    }

    /*
     * Parse date with 6 characters (DDMMYY)
     * @param date String
     * return boolean
     */
    @Override
    public abstract boolean dateSizeSix(String date);

    /*
     * Parse date with 8 characters (DDMMYYYY)
     * @param date String
     * return boolean
     */
    @Override
    public abstract boolean dateSizeEight(String date);

    /*
     * Parse date with 10 characters (DD/MM/YYYY)
     * @param date String
     * return boolean
     */
    @Override
    public abstract boolean dateSizeTen(String date);
}