package mseAPP.MyCLIENTS;

import mseAPP.USERS.User;

import java.util.ArrayList;

public class MyClients {
    //private admin??
    private ArrayList<User> myClients;

    public MyClients(){
        myClients = new ArrayList<>();
    }
    public void addNewClient(User User){
        myClients.add(User);
    }
    public void deleteClient(String name){
        myClients.removeIf(User -> User.getName().equals(name));
    }

    /** créer une liste ajoutant des clients
    Synchroniser avec l'age
    finir les méthodes String
    associer les clients à un porte monnaie aussi, donc les mettre à null
     faire ma classe en tant qu'usine à liste, car il me faut une liste pour mes utilisateurs
     , une liste pour mes entreprises...
     une liste pour mes admin
     supprimer la classe calcul??? useless Iguess
     les **/
}
