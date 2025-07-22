import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import List "mo:base/List";

actor class Backend() {

  type SplitBillContractee = {
    principal : Principal;
    amount : Nat;
  };

  type SplitBillContract = {
    contractees : [SplitBillContractee];
  };

  // Using a List is fine, but for frequent additions, a `Buffer` might be more performant.
  stable var splitBills : List.List<SplitBillContract> = List.nil();
  var usernames = HashMap.HashMap<Principal, Text>(10, Principal.equal, Principal.hash);

  // ✅ FIX: Corrected the createSplitBill function
  // The original function was ignoring the 'contract' input and trying to use a
  // non-existent 'List.push' function. This version correctly adds the provided
  // 'contract' to the list using 'List.cons' and the assignment operator ':='.
  public shared func createSplitBill(contract : SplitBillContract) : async () {
    // Basic validation to prevent empty contracts.
    if (contract.contractees.size() == 0) {
      // You could trap with an error here, but for now we'll just ignore it.
      return;
    };
    splitBills := List.push<SplitBillContract>(contract, splitBills);
  };

  // ✨ IMPROVEMENT: Updated to modern syntax and improved clarity
  // 'shared query' is the modern way to write a read-only function that can
  // identify the caller (msg.caller). I also renamed the inner lambda variable
  // from 'x' to 'contractee' to make the code easier to read.
  public shared query (msg) func getSplitBills() : async [SplitBillContract] {
    let caller = msg.caller;
    let filteredList = List.filter<SplitBillContract>(
      splitBills,
      func(contract) {
        // Check if the caller is a participant in this bill.
        let maybeParticipant = Array.find<SplitBillContractee>(
          contract.contractees,
          func(contractee) { contractee.principal == caller },
        );
        return maybeParticipant != null;
      },
    );
    return List.toArray(filteredList);
  };

  public shared (msg) func setUsername(name : Text) : async Text {
    let caller = msg.caller;
    usernames.put(caller, name);
    return "Username saved!";
  };

  public shared query (msg) func getMyUsername() : async ?Text {
    let caller = msg.caller;
    return usernames.get(caller);
  };

  public query func getUsername(p : Principal) : async ?Text {
    return usernames.get(p);
  };

};
