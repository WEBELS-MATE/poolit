import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import List "mo:base/List";
import Text "mo:base/Text";

actor class Backend() {

  type SplitBillContractee = {
    principal : Principal;
    amount : Nat;
  };

  type SplitBillContract = {
    contractees : [SplitBillContractee];
  };

  stable var splitBills : List.List<SplitBillContract> = List.nil();
  var usernames = HashMap.HashMap<Principal, Text>(10, Principal.equal, Principal.hash);
  var usernameLookup = HashMap.HashMap<Text, Principal>(10, Text.equal, Text.hash);
  var addressBooks = HashMap.HashMap<Principal, List.List<Principal>>(10, Principal.equal, Principal.hash);

  public shared func createSplitBill(contract : SplitBillContract) : async () {
    if (contract.contractees.size() == 0) {
      return;
    };
    splitBills := List.push<SplitBillContract>(contract, splitBills);
  };

  public shared query (msg) func getSplitBills() : async [SplitBillContract] {
    let caller = msg.caller;
    let filteredList = List.filter<SplitBillContract>(
      splitBills,
      func(contract) {
        let maybeParticipant = Array.find<SplitBillContractee>(
          contract.contractees,
          func(contractee) { contractee.principal == caller },
        );
        return maybeParticipant != null;
      },
    );
    return List.toArray(filteredList);
  };

  public shared(msg) func setUsername(name: Text) : async Text {
    let caller = msg.caller;

    let existing = usernames.get(caller);
    switch (existing) {
      case (?oldName) {
        usernameLookup.delete(oldName);
      };
      case null {};
    };

    usernames.put(caller, name);
    usernameLookup.put(name, caller);

    return "Username saved!";
  };

  public query (message) func getMyUsername() : async ?Text {
    let caller = message.caller;
    return usernames.get(caller);
  };

  public query func getUsername(p: Principal) : async ?Text {
    return usernames.get(p);
  };

  public query func getPrincipal(name: Text) : async ?Principal {
    return usernameLookup.get(name);
  };

  public shared(msg) func addToAddressBook(p: Principal) : async Text {
    let caller = msg.caller;

    let existing = addressBooks.get(caller);
    let updated = switch (existing) {
      case (?list) {
        if (List.find<Principal>(list, func(x: Principal) : Bool { x == p }) != null) {
          return "Contact already exists in address book.";
        } else {
          List.push(p, list)
        }
      };
      case null {
        List.push(p, List.nil<Principal>())
      };
    };

    addressBooks.put(caller, updated);
    return "Contact added to address book.";
  };

  public func addUsernameToAddressBook(username: Text) : async Text {
    switch (usernameLookup.get(username)) {
      case (?p) {
        await addToAddressBook(p);
      };
      case null {
        return "Username not found.";
      };
    }
  };

  public shared(msg) func removeFromAddressBook(p: Principal) : async Text {
    let caller = msg.caller;

    let existing = addressBooks.get(caller);
    switch (existing) {
      case (?list) {
        let updated = List.filter<Principal>(list, func(x: Principal) : Bool { x != p });
        if (List.size(updated) == List.size(list)) {
          return "Contact not found in address book.";
        } else {
          addressBooks.put(caller, updated);
          return "Contact removed from address book.";
        }
      };
      case null {
        return "Address book is empty.";
      };
    }
  };

  public query (msg) func getMyAddressBook() : async [Principal] {
    let caller = msg.caller;
    switch (addressBooks.get(caller)) {
      case (?list) {
        List.toArray(list)
      };
      case null {
        []
      };
    }
  };

};
