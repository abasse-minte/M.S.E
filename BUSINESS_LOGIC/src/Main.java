
// Started the 06/02/2026

import mseAPP.DATE.DateEurope;
import mseAPP.DATE.DateWorld;
import mseAPP.USERS.CompanieUser;
import mseAPP.USERS.CustomerUser;
import mseAPP.USERS.User;
import mseAPI.printClass.PrintClass;

import java.util.InputMismatchException;
import java.util.Scanner;
import mseAPP.DATE.Date;

public class Main {
    public static void main(String[] args){
        Scanner scannerMain = new Scanner(System.in);
        String command;
        int formatChoice;
        do {
            PrintClass.software();
            command = scannerMain.nextLine();
            switch(command){

                case "user":
                    User newUser;
                    CustomerUser newCustomer;
                    CompanieUser newCompany;
                    Date newDate;
                    int userTypeChoice;

                    /*
                     * USER FORMAT
                     */
                    PrintClass.printMainSentence("ENTER 1: Customer");
                    PrintClass.printMainSentence("ENTER 2: Companie");
                    try {
                        userTypeChoice = scannerMain.nextInt();
                        scannerMain.nextLine();
                    } catch (InputMismatchException e){
                        PrintClass.printMainSentence("...INVALID CHOICE...");
                        scannerMain.nextLine();
                        break;
                    }

                    /*
                     * USER
                     */
                    PrintClass.printMainSentence("Please, enter your username:");
                    command = scannerMain.nextLine();
                    try {
                        newUser = new User(command);
                        if (userTypeChoice == 1) {
                            newUser.setTypeUser("customer");
                            newCustomer = new CustomerUser(newUser);
                        } else {
                            newCompany = new CompanieUser(newUser);
                            newUser.setTypeUser("companie");
                        }

                        newUser.printName();
                    } catch (Exception e){
                        PrintClass.printMainSentence("...INVALID USERNAME...");
                        break;
                    }

                    /*
                     * DATE FORMAT
                     */
                    PrintClass.printMainSentence("ENTER 1: DD/MM/YYYY format");
                    PrintClass.printMainSentence("ENTER 2: YYYY/MM/DD format");
                    try {
                        formatChoice = scannerMain.nextInt();
                        scannerMain.nextLine();
                    } catch (InputMismatchException e){
                        PrintClass.printMainSentence("...INVALID CHOICE...");
                        scannerMain.nextLine();
                        break;
                    }

                    /*
                     * DATE
                     */
                    PrintClass.printMainSentence("Please, enter your date of birth:");
                    command = scannerMain.nextLine();
                    try {
                        if (formatChoice == 1) {
                            newDate = new DateEurope(command);
                        } else {
                            newDate = new DateWorld(command);
                        }
                        PrintClass.printMainSentence("You have " + newDate.day + "/" + newDate.month + "/" + newDate.year);
                    } catch (Exception e){
                        PrintClass.printMainSentence("...INVALID DATE...");
                        break;
                    }



                    /*
                    * ajouter l'utilisateur dans la liste
                    * */

                    break;
                case "exit":
                    System.out.println("bye");
                    break;
                default:
                    PrintClass.printMainSentence("...ERROR...");
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