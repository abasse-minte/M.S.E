package mseAPP.DATE;

import mseAPI.constantClass.constantClass;
import mseAPI.objectBehavior.ObjectModification;

/*
 * Extends the "Date" class
 * Handles World date format (YYYY/MM/DD)
 */
public class DateWorld extends Date{
    // CONSTRUCTOR:

    /*
     * @param date String: date in World format
     */
    public DateWorld(String date) throws Exception{
        super(date);
    }

    // METHODS:

    /*
     * Parse date with 10 characters (YYYY/MM/DD)
     * @param date String
     * return boolean: true if valid and parsed
     */
    @Override
    public boolean dateSizeTen(String date){
        int day, month, year;
        if (date.charAt(constantClass.eight) != '0'){
            day = ObjectModification.convertedToInt(date.substring(constantClass.eight,constantClass.ten));
        } else {
            day = ObjectModification.convertedToInt(date.substring(constantClass.nine, constantClass.ten));
        }
        if (date.charAt(constantClass.five) != '0'){
            month = ObjectModification.convertedToInt(date.substring(constantClass.five,constantClass.seven));
        } else {
            month = ObjectModification.convertedToInt(date.substring(constantClass.six, constantClass.seven));
        }
        year = ObjectModification.convertedToInt(date.substring(constantClass.zero,constantClass.four));
        if (dateFormat(day, month, year)){
            setDate(day, month, year);
            return true;
        }
        return false;
    }

    /*
     * Parse date with 8 characters (YYYYMMDD)
     * @param date String
     * return boolean: true if valid and parsed
     */
    @Override
    public boolean dateSizeEight(String date){
        int day, month, year;
        if (date.charAt(constantClass.six) != '0'){
            day = ObjectModification.convertedToInt(date.substring(constantClass.six,constantClass.eight));
        } else {
            day = ObjectModification.convertedToInt(date.substring(constantClass.seven, constantClass.eight));
        }
        if (date.charAt(constantClass.four) != '0'){
            month = ObjectModification.convertedToInt(date.substring(constantClass.four,constantClass.six));
        } else {
            month = ObjectModification.convertedToInt(date.substring(constantClass.five,constantClass.six));
        }
        year = ObjectModification.convertedToInt(date.substring(constantClass.zero,constantClass.four));
        dateFormat(day,month,year);
        if (dateFormat(day, month, year)){
            setDate(day, month, year);
            return true;
        }
        return false;
    }

    /*
     * Parse date with 6 characters (YYYYMD)
     * @param date String
     * return boolean: true if valid and parsed
     */
    @Override
    public boolean dateSizeSix(String date){
        int day, month, year;
        day = ObjectModification.convertedToInt(date.substring(constantClass.five,constantClass.six));
        month = ObjectModification.convertedToInt(date.substring(constantClass.four, constantClass.five));
        year = ObjectModification.convertedToInt(date.substring(constantClass.zero,constantClass.four));
        dateFormat(day,month,year);
        if (dateFormat(day, month, year)){
            setDate(day, month, year);
            return true;
        }
        return false;
    }
}