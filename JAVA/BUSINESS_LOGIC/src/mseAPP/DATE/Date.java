package mseAPP.DATE;

import mseAPI.constantClass.ConstantClass;
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
    public int maxDay = ConstantClass.thirtyOne;
    public boolean leapYear = false;

    // CONSTRUCTOR:

    /*
     * @param date String: date to parse and validate
     */
    public Date(String date) throws Exception {
        dateCorrect(date);
        if (!dateFormat(day, month, year) || dayPerMonth(month) == ConstantClass.zero){
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
        if (month == ConstantClass.one || month == ConstantClass.three
                || month == ConstantClass.five || month == ConstantClass.seven
                || month == ConstantClass.eight || month == ConstantClass.ten
                || month == ConstantClass.twelve){
            return this.maxDay = ConstantClass.thirtyOne;
        }
        if (month == ConstantClass.four || month == ConstantClass.six
                || month == ConstantClass.nine || month == ConstantClass.eleven){
            return this.maxDay = ConstantClass.thirty;
        }
        if (month == ConstantClass.two){
            if (leapYear()){
                return this.maxDay = ConstantClass.twentyNine;
            }
            return this.maxDay = ConstantClass.twentyEight;
        }
        return ConstantClass.zero;
    }

    /*
     * Check if year is leap year
     * @param none
     * return boolean: true if leap year
     */
    @Override
    public boolean leapYear(){
        if ((this.year % ConstantClass.four) == ConstantClass.zero){
            if (this.year % ConstantClass.hundred == ConstantClass.zero){
                if (this.year % ConstantClass.fourHundred == ConstantClass.zero){
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
        return day >= ConstantClass.one && day <= dayPerMonth(month)
                && month >= ConstantClass.one && month <= ConstantClass.twelve
                && year <= ConstantClass.y2026 && year >= ConstantClass.y1900;
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
            if (dateLenght == ConstantClass.ten){
                dateSizeTen(date);
            }
            else if (dateLenght == ConstantClass.eight){
                dateSizeEight(date);
            }
            else if (dateLenght == ConstantClass.six){
                dateSizeSix(date);
            }
        }
    }

    public int ageCalculation(){
        int currentDay = ConstantClass.one;
        int currentMonth = ConstantClass.one;
        int currentYear = ConstantClass.y2026;

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