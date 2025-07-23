import List "mo:base/List";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

module {
  public func addToAddressBook(
    caller : Principal,
    p : Principal,
    books : HashMap.HashMap<Principal, List.List<Principal>>
  ) : Text {
    let existing = books.get(caller);
    let updated = switch (existing) {
      case (?list) {
        if (List.find<Principal>(list, func(x: Principal) : Bool { x == p }) != null) {
          return "Contact already exists in address book.";
        } else {
          List.push(p, list);
        };
      };
      case null {
        List.push(p, List.nil<Principal>());
      };
    };
    books.put(caller, updated);
    "Contact added to address book.";
  };

  public func removeFromAddressBook(
    caller : Principal,
    p : Principal,
    books : HashMap.HashMap<Principal, List.List<Principal>>
  ) : Text {
    let existing = books.get(caller);
    switch (existing) {
      case (?list) {
        let updated = List.filter<Principal>(list, func(x: Principal) : Bool { x != p });
        if (List.size(updated) == List.size(list)) {
          return "Contact not found in address book.";
        } else {
          books.put(caller, updated);
          return "Contact removed from address book.";
        };
      };
      case null {
        return "Address book is empty.";
      };
    };
  };

  public func getMyAddressBook(
    caller : Principal,
    books : HashMap.HashMap<Principal, List.List<Principal>>
  ) : [Principal] {
    switch (books.get(caller)) {
      case (?list) { List.toArray(list) };
      case null { [] };
    };
  };
}
