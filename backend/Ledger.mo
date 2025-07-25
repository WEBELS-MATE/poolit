import HashMap "mo:base/HashMap";
import Bool "mo:base/Bool";

module {
  public func getPrincipalBalance(map : HashMap.HashMap<Principal, Nat>, principal : Principal) : Nat {
    let balance = map.get(principal);
    switch (balance) {
      case (?bal) {
        bal;
      };
      case null {
        map.put(principal, 500);
        500;
      };
    };
  };

  public func executeTransaction(map : HashMap.HashMap<Principal, Nat>, principal : Principal, amount : Nat) : Bool {
    let balance = getPrincipalBalance(map, principal);
    if (balance >= amount) {
      map.put(principal, balance - amount);
      return true;
    };

    false;
  };
};
