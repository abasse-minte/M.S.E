package mseAPP.DATE;

import mseAPI.constantClass.ConstantClass;
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
        if (date.charAt(ConstantClass.eight) != '0'){
            day = ObjectModification.convertedToInt(date.substring(ConstantClass.eight, ConstantClass.ten));
        } else {
            day = ObjectModification.convertedToInt(date.substring(ConstantClass.nine, ConstantClass.ten));
        }
        if (date.charAt(ConstantClass.five) != '0'){
            month = ObjectModification.convertedToInt(date.substring(ConstantClass.five, ConstantClass.seven));
        } else {
            month = ObjectModification.convertedToInt(date.substring(ConstantClass.six, ConstantClass.seven));
        }
        year = ObjectModification.convertedToInt(date.substring(ConstantClass.zero, ConstantClass.four));
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
        if (date.charAt(ConstantClass.six) != '0'){
            day = ObjectModification.convertedToInt(date.substring(ConstantClass.six, ConstantClass.eight));
        } else {
            day = ObjectModification.convertedToInt(date.substring(ConstantClass.seven, ConstantClass.eight));
        }
        if (date.charAt(ConstantClass.four) != '0'){
            month = ObjectModification.convertedToInt(date.substring(ConstantClass.four, ConstantClass.six));
        } else {
            month = ObjectModification.convertedToInt(date.substring(ConstantClass.five, ConstantClass.six));
        }
        year = ObjectModification.convertedToInt(date.substring(ConstantClass.zero, ConstantClass.four));
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
        day = ObjectModification.convertedToInt(date.substring(ConstantClass.five, ConstantClass.six));
        month = ObjectModification.convertedToInt(date.substring(ConstantClass.four, ConstantClass.five));
        year = ObjectModification.convertedToInt(date.substring(ConstantClass.zero, ConstantClass.four));
        dateFormat(day,month,year);
        if (dateFormat(day, month, year)){
            setDate(day, month, year);
            return true;
        }
        return false;
    }
}