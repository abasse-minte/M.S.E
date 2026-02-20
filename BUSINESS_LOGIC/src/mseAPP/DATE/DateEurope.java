package mseAPP.DATE;

import mseAPI.constantClass.ConstantClass;
import mseAPI.objectBehavior.ObjectModification;

/*
 * Extends the "Date" class
 * Handles European date format (DD/MM/YYYY)
 */
public class DateEurope extends Date{
    // CONSTRUCTOR:

    /*
     * @param date String: date in European format
     */
    public DateEurope(String date) throws Exception{
        super(date);
    }

    // METHODS:

    /*
     * Parse date with 10 characters (DD/MM/YYYY)
     * @param date String
     * return boolean: true if valid and parsed
     */
    @Override
    public boolean dateSizeTen(String date){
        int day, month, year;
        if (date.charAt(ConstantClass.zero) != '0'){
            day = ObjectModification.convertedToInt(date.substring(ConstantClass.zero, ConstantClass.two));
        } else {
            day = ObjectModification.convertedToInt(date.substring(ConstantClass.one, ConstantClass.two));
        }
        if (date.charAt(ConstantClass.three) != '0'){
            month = ObjectModification.convertedToInt(date.substring(ConstantClass.three, ConstantClass.five));
        } else {
            month = ObjectModification.convertedToInt(date.substring(ConstantClass.four, ConstantClass.five));
        }
        year = ObjectModification.convertedToInt(date.substring(ConstantClass.six, ConstantClass.ten));
        if (dateFormat(day, month, year)){
            setDate(day, month, year);
            return true;
        }
        return false;
    }

    /*
     * Parse date with 8 characters (DDMMYYYY)
     * @param date String
     * return boolean: true if valid and parsed
     */
    @Override
    public boolean dateSizeEight(String date){
        int day, month, year;
        if (date.charAt(ConstantClass.zero) != '0'){
            day = ObjectModification.convertedToInt(date.substring(ConstantClass.zero, ConstantClass.two));
        } else {
            day = ObjectModification.convertedToInt(date.substring(ConstantClass.one, ConstantClass.two));
        }
        if (date.charAt(ConstantClass.two) != '0'){
            month = ObjectModification.convertedToInt(date.substring(ConstantClass.two, ConstantClass.four));
        } else {
            month = ObjectModification.convertedToInt(date.substring(ConstantClass.three, ConstantClass.four));
        }
        year = ObjectModification.convertedToInt(date.substring(ConstantClass.four, ConstantClass.eight));
        dateFormat(day,month,year);
        if (dateFormat(day, month, year)){
            setDate(day, month, year);
            return true;
        }
        return false;
    }

    /*
     * Parse date with 6 characters (DDMMYY)
     * @param date String
     * return boolean: true if valid and parsed
     */
    @Override
    public boolean dateSizeSix(String date){
        int day, month, year;
        day = ObjectModification.convertedToInt(date.substring(ConstantClass.zero, ConstantClass.one));
        month = ObjectModification.convertedToInt(date.substring(ConstantClass.one, ConstantClass.two));
        year = ObjectModification.convertedToInt(date.substring(ConstantClass.two, ConstantClass.six));
        dateFormat(day,month,year);
        if (dateFormat(day, month, year)){
            setDate(day, month, year);
            return true;
        }
        return false;
    }
}