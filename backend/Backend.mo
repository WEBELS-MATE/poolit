import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import List "mo:base/List";
import Text "mo:base/Text";
import Types "Types";
import SplitBill "SplitBill";
import User "User";
import AddressBook "AddressBook";
import IC "ic:aaaaa-aa";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";

actor class Backend() {

  stable var splitBills : List.List<Types.SplitBillContract> = List.nil();

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

  public shared query(msg) func getSplitBills() : async [Types.SplitBillContract] {
    SplitBill.getSplitBills(msg.caller, splitBills);
  };

  public shared(msg) func setUsername(name : Text) : async Text {
    User.setUsername(msg.caller, name, userMaps);
  };

  public query(message) func getMyUsername() : async ?Text {
    User.getMyUsername(message.caller, userMaps);
  };

  public query func getUsername(p : Principal) : async ?Text {
    User.getUsername(p, userMaps);
  };

  public query func getPrincipal(name : Text) : async ?Principal {
    User.getPrincipal(name, userMaps);
  };

  public shared(msg) func addToAddressBook(p : Principal) : async Text {
    AddressBook.addToAddressBook(msg.caller, p, addressBooks);
  };

  public shared(msg) func addUsernameToAddressBook(username : Text) : async Text {
    switch (userMaps.usernameLookup.get(username)) {
      case (?p) { AddressBook.addToAddressBook(msg.caller, p, addressBooks) };
      case null { "Username not found." };
    };
  };

  public shared(msg) func removeFromAddressBook(p : Principal) : async Text {
    AddressBook.removeFromAddressBook(msg.caller, p, addressBooks);
  };

  public query(msg) func getMyAddressBook() : async [Principal] {
    AddressBook.getMyAddressBook(msg.caller, addressBooks);
  };

  public query func transform({
    context : Blob;
    response : IC.http_request_result;
  }) : async IC.http_request_result {
    {
      response with headers = [];
    };
  };

  public func get_price_conversion(
    amount : Nat,
    symbols : Text
  ) : async Text {

    let url = "https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=" # Nat.toText(amount) # "&symbol=" # symbols # "&convert=ICP";

    let request_headers = [
      { name = "User-Agent"; value = "price-feed" },
      { name = "X-CMC_PRO_API_KEY"; value = "91d37a7c-aa31-4bc6-8c5a-1c698200daa6" },
    ];

    let http_request : IC.http_request_args = {
      url = url;
      max_response_bytes = null;
      headers = request_headers;
      body = null;
      method = #get;
      transform = ?{
        function = transform;
        context = Blob.fromArray([]);
      };
      is_replicated = ?false;
    };

    let http_response : IC.http_request_result = await (with cycles = 230_949_972_000) IC.http_request(http_request);

    let decoded_text : Text = switch (Text.decodeUtf8(http_response.body)) {
      case (null) { "No value returned" };
      case (?y) { y };
    };
    decoded_text;
  };
};