import Principal "mo:base/Principal";
import Nat "mo:base/Nat";

module {

  public type SplitBillContractee = {
    principal : Principal;
    description : Text;
    share : Nat;
    amount : Nat;
    paid : Bool;
  };

  public type SplitBillContract = {
    contract_id : Nat;
    title : Text;
    status: Text;
    date : Text;
    bill_maker : Principal;
    total_amount : Nat;
    type_of_split : Text;
    contractees : [SplitBillContractee];
  };
  
}