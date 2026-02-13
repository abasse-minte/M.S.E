
// Started the 06/02/2026

import mseAPP.DATE.DateEurope;
import mseAPP.DATE.DateWorld;
import mseAPP.USERS.CompaniesUser;
import mseAPP.USERS.CustomerUser;
import mseAPP.USERS.User;
import mseAPI.printClass.printClass;

import java.util.InputMismatchException;
import java.util.Scanner;
import mseAPP.DATE.Date;

public class Main {
    public static void main(String[] args){
        Scanner scannerMain = new Scanner(System.in);
        String command;
        int formatChoice;
        do {
            printClass.software();
            command = scannerMain.nextLine();
            switch(command){

                case "user":
                    User newUser;
                    CustomerUser newCustomer;
                    CompaniesUser newCompany;
                    Date newDate;
                    int userTypeChoice;

                    /*
                     * USER FORMAT
                     */
                    printClass.printMainSentence("ENTER 1: Customer");
                    printClass.printMainSentence("ENTER 2: Companie");
                    try {
                        userTypeChoice = scannerMain.nextInt();
                        scannerMain.nextLine();
                    } catch (InputMismatchException e){
                        printClass.printMainSentence("...INVALID CHOICE...");
                        scannerMain.nextLine();
                        break;
                    }

                    /*
                     * USER
                     */
                    printClass.printMainSentence("Please, enter your username:");
                    command = scannerMain.nextLine();
                    try {
                        newUser = new User(command);

                        if (userTypeChoice == 1) {
                            newCustomer = new CustomerUser(newUser);
                        } else {
                            newCompany = new CompaniesUser(newUser);
                        }

                        newUser.printName();
                    } catch (Exception e){
                        printClass.printMainSentence("...INVALID USERNAME...");
                        break;
                    }

                    /*
                     * DATE FORMAT
                     */
                    printClass.printMainSentence("ENTER 1: DD/MM/YYYY format");
                    printClass.printMainSentence("ENTER 2: YYYY/MM/DD format");
                    try {
                        formatChoice = scannerMain.nextInt();
                        scannerMain.nextLine();
                    } catch (InputMismatchException e){
                        printClass.printMainSentence("...INVALID CHOICE...");
                        scannerMain.nextLine();
                        break;
                    }

                    /*
                     * DATE
                     */
                    printClass.printMainSentence("Please, enter your date of birth:");
                    command = scannerMain.nextLine();
                    try {
                        if (formatChoice == 1) {
                            newDate = new DateEurope(command);
                        } else {
                            newDate = new DateWorld(command);
                        }
                        printClass.printMainSentence("You have " + newDate.day + "/" + newDate.month + "/" + newDate.year);
                    } catch (Exception e){
                        printClass.printMainSentence("...INVALID DATE...");
                        break;
                    }
                    break;

                case "exit":
                    System.out.println("bye");
                    break;
                default:
                    printClass.printMainSentence("...ERROR...");
                    break;
            }
        } while (!"exit".equals(command));
    }
}
// Try catch pour scanner choix aie aie aie
//
// optimiser les pharses du main
// commenter les interfaces
// Calculer l'age de l'utilisateur
// Utilisateur déjà connu, donc je dois faire une liste d'user !ffffffffond fond fond fodn