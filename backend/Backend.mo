import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import List "mo:base/List";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Types "Types";
import SplitBill "SplitBill";
import User "User";
import AddressBook "AddressBook";
import Ledger "Ledger";

actor class Backend() {

  stable var splitBills : List.List<Types.SplitBillContract> = List.nil();

  let userBalances = HashMap.HashMap<Principal, Nat>(10, Principal.equal, Principal.hash);
  let usernames = HashMap.HashMap<Principal, Text>(10, Principal.equal, Principal.hash);
  let usernameLookup = HashMap.HashMap<Text, Principal>(10, Text.equal, Text.hash);
  let addressBooks = HashMap.HashMap<Principal, List.List<Principal>>(10, Principal.equal, Principal.hash);

  let userMaps : User.UserMaps = {
    usernames = usernames;
    usernameLookup = usernameLookup;
  };

  public shared func createSplitBill(contract : Types.SplitBillContract) : async () {
    splitBills := SplitBill.createSplitBill(contract, splitBills);
  };

  public shared query (msg) func getSplitBills() : async [Types.SplitBillContract] {
    SplitBill.getSplitBills(msg.caller, splitBills);
  };

  public shared (msg) func setUsername(name : Text) : async Text {
    User.setUsername(msg.caller, name, userMaps);
  };

  public query (message) func getMyUsername() : async ?Text {
    User.getMyUsername(message.caller, userMaps);
  };

  public query func getUsername(p : Principal) : async ?Text {
    User.getUsername(p, userMaps);
  };

  public query func getPrincipal(name : Text) : async ?Principal {
    User.getPrincipal(name, userMaps);
  };

  public shared (msg) func addToAddressBook(p : Principal) : async Text {
    AddressBook.addToAddressBook(msg.caller, p, addressBooks);
  };

  public shared (msg) func addUsernameToAddressBook(username : Text) : async Text {
    switch (userMaps.usernameLookup.get(username)) {
      case (?p) { AddressBook.addToAddressBook(msg.caller, p, addressBooks) };
      case null { "Username not found." };
    };
  };

  public shared (msg) func removeFromAddressBook(p : Principal) : async Text {
    AddressBook.removeFromAddressBook(msg.caller, p, addressBooks);
  };

  public query (msg) func getMyAddressBook() : async [Principal] {
    AddressBook.getMyAddressBook(msg.caller, addressBooks);
  };

  public query (msg) func getBalance() : async Nat {
    Ledger.getPrincipalBalance(userBalances, msg.caller);
  };

  public shared (msg) func payContract(splitBillContractId : Nat) : async Text {
    let contract = SplitBill.getSplitBillById(msg.caller, splitBills, splitBillContractId);
    switch (contract) {
      case (?contract) {
        let myContractee = SplitBill.getSelfContractee(msg.caller, contract);
        switch (myContractee) {
          case (?contractee) {
            if (not Ledger.executeTransaction(userBalances, msg.caller, contractee.amount)) {
              return "Unsufficient balance";
            };

            return "Success";
          };
          case null {
            return "Cannot find payment information based on provided contract";

          };
        };
      };
      case null {
        "Unable to found contract by provided identifier";
      };
    };
  };
};
