import Principal "mo:base/Principal";
import Nat "mo:base/Nat";

module {

  public type SplitBillContractee = {
    principal : Principal;
    amount : Nat;
  };

  public type SplitBillContract = {
    contractees : [SplitBillContractee];
  };
  
}