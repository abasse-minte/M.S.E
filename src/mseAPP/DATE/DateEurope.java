package mseAPP.DATE;

import mseAPI.constantClass.constantClass;
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
        if (date.charAt(constantClass.zero) != '0'){
            day = ObjectModification.convertedToInt(date.substring(constantClass.zero,constantClass.two));
        } else {
            day = ObjectModification.convertedToInt(date.substring(constantClass.one, constantClass.two));
        }
        if (date.charAt(constantClass.three) != '0'){
            month = ObjectModification.convertedToInt(date.substring(constantClass.three,constantClass.five));
        } else {
            month = ObjectModification.convertedToInt(date.substring(constantClass.four, constantClass.five));
        }
        year = ObjectModification.convertedToInt(date.substring(constantClass.six,constantClass.ten));
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
        if (date.charAt(constantClass.zero) != '0'){
            day = ObjectModification.convertedToInt(date.substring(constantClass.zero,constantClass.two));
        } else {
            day = ObjectModification.convertedToInt(date.substring(constantClass.one, constantClass.two));
        }
        if (date.charAt(constantClass.two) != '0'){
            month = ObjectModification.convertedToInt(date.substring(constantClass.two,constantClass.four));
        } else {
            month = ObjectModification.convertedToInt(date.substring(constantClass.three,constantClass.four));
        }
        year = ObjectModification.convertedToInt(date.substring(constantClass.four,constantClass.eight));
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
        day = ObjectModification.convertedToInt(date.substring(constantClass.zero,constantClass.one));
        month = ObjectModification.convertedToInt(date.substring(constantClass.one, constantClass.two));
        year = ObjectModification.convertedToInt(date.substring(constantClass.two,constantClass.six));
        dateFormat(day,month,year);
        if (dateFormat(day, month, year)){
            setDate(day, month, year);
            return true;
        }
        return false;
    }
}