import List "mo:base/List";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Types "Types";

module {
  public func createSplitBill(
    contract : Types.SplitBillContract,
    existing : List.List<Types.SplitBillContract>
  ) : List.List<Types.SplitBillContract> {
    if (contract.contractees.size() == 0) {
      return existing;
    };
    List.push(contract, existing);
  };

  public func getSplitBills(
    caller : Principal,
    splitBills : List.List<Types.SplitBillContract>
  ) : [Types.SplitBillContract] {
    let filtered = List.filter<Types.SplitBillContract>(
      splitBills,
      func(contract) {
        let maybeParticipant = Array.find<Types.SplitBillContractee>(
          contract.contractees,
          func(contractee) { contractee.principal == caller }
        );
        return maybeParticipant != null;
      }
    );
    List.toArray(filtered);
  };
}