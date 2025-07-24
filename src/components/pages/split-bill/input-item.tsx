import MainLayout from '../../layout/MainLayout';
import { useState, useMemo } from 'react';
import Button from '../../ui/BillButton';
type ItemAssignmentsType = {
  [itemId: number]: string[];
};
type AmountsType = {
  [participantId: string]: number;
};
const initialUser = [
  {
    id: 'A',
    profile: (
      <div className="w-20 h-20 bg-gray-200 flex justify-center items-center text-3xl rounded-full">
        A
      </div>
    ),
    username: 'Username 1',
    amount: 0,
  },
  {
    id: 'B',
    profile: (
      <div className="w-20 h-20 bg-gray-200 flex justify-center items-center text-3xl rounded-full">
        B
      </div>
    ),
    username: 'Username 2',
    amount: 0,
  },
  {
    id: 'C',
    profile: (
      <div className="w-20 h-20 bg-gray-200 flex justify-center items-center text-3xl rounded-full">
        C
      </div>
    ),
    username: 'Username 3',
    amount: 0,
  },
  {
    id: 'D',
    profile: (
      <div className="w-20 h-20 bg-gray-200 flex justify-center items-center text-3xl rounded-full">
        D
      </div>
    ),
    username: 'Username 4',
    amount: 0,
  },
  {
    id: 'E',
    profile: (
      <div className="w-20 h-20 bg-gray-200 flex justify-center items-center text-3xl rounded-full">
        E
      </div>
    ),
    username: 'Username 5',
    amount: 0,
  },
  {
    id: 'F',
    profile: (
      <div className="w-20 h-20 bg-gray-200 flex justify-center items-center text-3xl rounded-full">
        F
      </div>
    ),
    username: 'Username 6',
    amount: 0,
  },
];

const initialItems = [
  { id: 1, name: 'Mie Gacoan Level 1', price: 50000 },
  { id: 2, name: 'Mie Gacoan Level 2', price: 50000 },
  { id: 3, name: 'Mie Gacoan Level 3', price: 50000 },
  { id: 4, name: 'Mie Gacoan Level 4', price: 50000 },
  { id: 5, name: 'Es Teh Manis', price: 15000 },
  { id: 6, name: 'Udang Keju', price: 25000 },
];

const formatCurrency = (amount:number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
};

export default function InputItem() {
  const [participants, setParticipants] = useState(initialUser);
  const [items, setItems] = useState(initialItems);
  const [selectedParticipantId, setSelectedParticipantId] = useState<
    string | null
  >(null);
  const [itemAssignments, setItemAssignments] = useState<ItemAssignmentsType>(
    {},
  );

  const handleSelectParticipant = (participantId: string) => {
    setSelectedParticipantId(participantId);
  };

  const handleCheckboxChange = (itemId: number) => {
    if (!selectedParticipantId) {
      alert('Please select a participant first.');
      return;
    }
    setItemAssignments((prev) => {
      const newAssignments = { ...prev };
      const assignees = newAssignments[itemId]
        ? [...newAssignments[itemId]]
        : [];
      const userIndex = assignees.indexOf(selectedParticipantId);
      if (userIndex > -1) {
        assignees.splice(userIndex, 1);
      } else {
        assignees.push(selectedParticipantId);
      }
      newAssignments[itemId] = assignees;
      if (newAssignments[itemId].length === 0) {
        delete newAssignments[itemId];
      }
      return newAssignments;
    });
  };

  const participantsWithAmounts = useMemo(() => {
    const amounts: AmountsType = {};
    participants.forEach((p) => {
      amounts[p.id] = 0;
    });

    for (const itemId in itemAssignments) {
      const assignees = itemAssignments[itemId];
      const item = items.find((i) => i.id === parseInt(itemId));

      if (item && assignees.length > 0) {
        const costPerPerson = item.price / assignees.length;
        assignees.forEach((participantId) => {
          amounts[participantId] += costPerPerson;
        });
      }
    }

    return participants.map((p) => ({
      ...p,
      amount: amounts[p.id],
    }));
  }, [participants, items, itemAssignments]);

  const totalAmount = useMemo(() => {
    return items.reduce((total, item) => total + item.price, 0);
  }, [items]);

  return (
    <MainLayout>
      <div className="grid grid-cols-1 mt-10 lg:grid-cols-2 gap-12">
        <div className="left flex flex-col text-start gap-17">
          <div>
            <h2 className="text-[#BA2685]">Total Amount</h2>
            <p className="mt-3 font-medium text-2xl">
              {formatCurrency(totalAmount)}
            </p>
          </div>
          <div className="w-full grid grid-cols-1 p-5 border-[#AAAAAA] rounded-lg border-[0.1px]">
            <p className="text-center flex-1 bg-[#BA2685] text-white h-15 w-full flex items-center justify-center rounded-lg">
              Add Participant
            </p>
            <ul className="mt-10 text-[#BA2685] ml-3 flex flex-col gap-10 h-105 overflow-y-auto pr-2 custom-scrollbar">
              {participantsWithAmounts.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-5 items-center gap-2"
                >
                  <p className="text-start">{item.profile}</p>
                  <p className="text-start col-span-3">{item.username}</p>
                  <p className="text-start font-medium">
                    {formatCurrency(item.amount).replace(',00', '')}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right flex flex-col pr-10  text-start gap-7">
          <div className="flex mt-10 p-5 items-center justify-center border-2 border-[#BA2685]">
            <p className="text-[#BA2685]">+ Add Item</p>
          </div>
          <div className="border-[#AAAAAA] rounded-lg border-[0.1px] p-5">
            <p>Participants</p>
            <div className="mt-5 w-full overflow-x-auto custom-scrollbar">
              <div className="flex flex-row gap-10 p-4 mb-3 w-max">
                {participants.map((item) => (
                  <div
                    key={item.id}
                    className={`cursor-pointer rounded-full transition-all ${selectedParticipantId === item.id ? 'ring-3 ring-offset-1 ring-[#BA2685]' : ''}`}
                    onClick={() => handleSelectParticipant(item.id)}
                  >
                    {item.profile}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-[#AAAAAA] rounded-lg border-[0.1px] p-5">
            <ul className="ml-3 flex flex-col gap-10 h-80 overflow-y-auto pr-7 custom-scrollbar">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm font-semibold">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#BA2685] rounded-md"
                    onChange={() => handleCheckboxChange(item.id)}
                    checked={
                      !!selectedParticipantId &&
                      (itemAssignments[item.id]?.includes(
                        selectedParticipantId,
                      ) ||
                        false)
                    }
                    disabled={!selectedParticipantId}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <Button text="Create Bill" width="full" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
