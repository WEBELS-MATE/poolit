import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
// import Nat "mo:base/Nat";

actor class Backend() {

  var usernames = HashMap.HashMap<Principal, Text>(10, Principal.equal, Principal.hash);

  public shared(msg) func setUsername(name: Text) : async Text {
    let caller = msg.caller;
    usernames.put(caller, name);
    return "Username saved!";
  };

  public query (message) func getMyUsername() : async ?Text {
    let caller = message.caller;
    return usernames.get(caller);
  };

  public query func getUsername(p: Principal) : async ?Text {
    return usernames.get(p);
  };
  
};