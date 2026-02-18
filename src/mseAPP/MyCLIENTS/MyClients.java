package mseAPP.MyCLIENTS;

import mseAPP.USERS.User;

import java.util.ArrayList;

public class MyClients {
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

    // créer une liste ajoutant des clients
    // Synchroniser avec l'age
    // finir les méthodes String
}
