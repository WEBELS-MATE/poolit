import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

module {
  public type UserMaps = {
    usernames : HashMap.HashMap<Principal, Text>;
    usernameLookup : HashMap.HashMap<Text, Principal>;
  };

  public func setUsername(
    caller : Principal,
    name : Text,
    maps : UserMaps
  ) : Text {
    switch (maps.usernames.get(caller)) {
      case (?oldName) { maps.usernameLookup.delete(oldName) };
      case null {};
    };
    maps.usernames.put(caller, name);
    maps.usernameLookup.put(name, caller);
    "Username saved!";
  };

  public func getMyUsername(
    caller : Principal,
    maps : UserMaps
  ) : ?Text {
    maps.usernames.get(caller);
  };

  public func getUsername(p : Principal, maps : UserMaps) : ?Text {
    maps.usernames.get(p);
  };

  public func getPrincipal(name : Text, maps : UserMaps) : ?Principal {
    maps.usernameLookup.get(name);
  };
}
