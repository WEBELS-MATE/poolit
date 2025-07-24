import React, { useState, useMemo } from 'react';
import MainLayout from '../../layout/MainLayout';
import Button from '../../ui/BillButton';
import ModalSetItem from '../../ui/modalSetItem';
import AddParticipantsModal from '../../ui/add-participants-modal';

type ItemType = {
  id: number;
  name: string;
  price: number;
};

type ParticipantType = {
  principal: number;
  username: string;
  profile: React.ReactNode;
};

type AmountsType = {
  [participantId: number]: number;
};

const initialUser: { principal: number; username: string }[] = [
  { principal: 1, username: 'Xeyla' },
  { principal: 2, username: 'ZeroZennn' },
  { principal: 3, username: 'Dnsy' },
  { principal: 4, username: 'rfii' },
  { principal: 5, username: 'Budi' },
  { principal: 6, username: 'Citra' },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function InputItem() {
  const [participants, setParticipants] = useState<ParticipantType[]>([]);
  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedParticipantId, setSelectedParticipantId] = useState<
    number | null
  >(null);
  const [itemAssignments, setItemAssignments] = useState<{
    [itemId: number]: number[];
  }>({});
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);

  const handleToggleParticipant = (participant: {
    principal: number;
    username: string;
  }) => {
    setParticipants((currentParticipants) => {
      const isAlreadyAdded = currentParticipants.some(
        (p) => p.principal === participant.principal,
      );

      if (isAlreadyAdded) {
        return currentParticipants.filter(
          (p) => p.principal !== participant.principal,
        );
      } else {
        const userProfile = (
          <div className="w-10 h-10 bg-gray-200 flex justify-center items-center text-xl rounded-full">
            {participant.username.charAt(0).toUpperCase()}
          </div>
        );
        const newUser: ParticipantType = {
          ...participant,
          profile: userProfile,
        };
        return [...currentParticipants, newUser];
      }
    });
  };

  const handleAddItem = (newItem: { name: string; price: number }) => {
    const itemWithId: ItemType = { ...newItem, id: Date.now() };
    setItems((prevItems) => [...prevItems, itemWithId]);
  };

  const handleSelectParticipant = (participantId: number) => {
    setSelectedParticipantId((prevId) =>
      prevId === participantId ? null : participantId,
    );
  };

  const handleCheckboxChange = (itemId: number) => {
    if (selectedParticipantId === null) {
      alert('Pilih partisipan dulu dong~');
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

      if (assignees.length === 0) {
        delete newAssignments[itemId];
      } else {
        newAssignments[itemId] = assignees;
      }

      return newAssignments;
    });
  };

  const participantsWithAmounts = useMemo(() => {
    const amounts: AmountsType = {};
    participants.forEach((p) => {
      amounts[p.principal] = 0;
    });

    for (const itemId in itemAssignments) {
      const assignees = itemAssignments[itemId];
      const item = items.find((i) => i.id === parseInt(itemId));
      if (item && assignees.length > 0) {
        const costPerPerson = item.price / assignees.length;
        assignees.forEach((participantId) => {
          if (amounts[participantId] !== undefined) {
            amounts[participantId] += costPerPerson;
          }
        });
      }
    }

    return participants.map((p) => ({
      ...p,
      amount: amounts[p.principal] || 0,
    }));
  }, [participants, items, itemAssignments]);

  const totalAmount = useMemo(
    () => items.reduce((total, item) => total + item.price, 0),
    [items],
  );

  const selectedPrincipals = useMemo(
    () => new Set(participants.map((p) => p.principal)),
    [participants],
  );

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
            <button
              onClick={() => setIsParticipantModalOpen(true)}
              className="text-center flex-1 bg-[#BA2685] text-white h-15 w-full flex items-center justify-center rounded-lg cursor-pointer"
            >
              Add Participant
            </button>
            <ul className="mt-10 text-black ml-3 flex flex-col gap-10 h-105 overflow-y-auto pr-2">
              {participantsWithAmounts.map((item) => (
                <li
                  key={item.principal}
                  className="grid grid-cols-5 items-center gap-2"
                >
                  {item.profile}
                  <p className="text-start col-span-3">{item.username}</p>
                  <p className="text-start font-medium">
                    {formatCurrency(item.amount)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="right flex flex-col pr-10 text-start gap-7">
          <button
            onClick={() => setIsItemModalOpen(true)}
            className="flex mt-10 p-5 items-center justify-center border-2 border-[#BA2685]"
          >
            <p className="text-[#BA2685]">+ Add Item</p>
          </button>
          <div className="border-[#AAAAAA] rounded-lg border-[0.1px] p-5">
            <p>Select participant to assign item:</p>
            <div className="mt-5 w-full overflow-x-auto">
              <div className="flex flex-row gap-10 p-4 mb-3 w-max">
                {participants.map((item) => (
                  <div
                    key={item.principal}
                    className={`cursor-pointer rounded-full transition-all ${selectedParticipantId === item.principal ? 'ring-3 ring-offset-1 ring-[#BA2685]' : ''}`}
                    onClick={() => handleSelectParticipant(item.principal)}
                  >
                    {item.profile}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-[#AAAAAA] rounded-lg border-[0.1px] p-5">
            {items.length === 0 ? (
              <p className="text-center text-black">No items added yet.</p>
            ) : (
              <ul className="ml-3 flex flex-col gap-10 h-80 overflow-y-auto pr-7">
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
                      disabled={selectedParticipantId === null}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="">
            <Button text="Create Bill" width="full" />
          </div>
        </div>
      </div>

      <ModalSetItem
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        onAddItem={handleAddItem}
      />
      <AddParticipantsModal
        isOpen={isParticipantModalOpen}
        onClose={() => setIsParticipantModalOpen(false)}
        allParticipants={initialUser}
        selectedPrincipals={selectedPrincipals}
        onToggleParticipant={handleToggleParticipant}
      />
    </MainLayout>
  );
}
