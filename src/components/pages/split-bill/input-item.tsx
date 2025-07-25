import React, { useState, useMemo, useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import Button from '../../ui/BillButton';
import ModalSetItem from '../../ui/modalSetItem';
import { createActor, canisterId } from '../../../declarations/backend';
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

const formatIcp = (amount: number) => {
  return (
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(amount) + ' ICP'
  );
};

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

  const [icpRate, setIcpRate] = useState<number | null>(null);
  const [isRateLoading, setIsRateLoading] = useState(true);
  const [rateError, setRateError] = useState<string | null>(null);
  useEffect(() => {
    const fetchIcpRate = async () => {
      try {
        const backend = createActor(canisterId);
        const data = await backend.get_price_conversion(BigInt(1), 'IDR');
        console.log('INTIP ISI DATA DARI BACKEND:', data);
        const parsedData = JSON.parse(data);
        const rate = parsedData.data[0].quote.ICP.price;
        setIcpRate(rate);
      } catch (error: any) {
        setRateError(
          error.message || 'Terjadi kesalahan saat mengambil rate ICP.',
        );
        console.error(error);
      } finally {
        setIsRateLoading(false);
      }
    };

    fetchIcpRate();
  }, []);

  const convertToIcp = (amountInIdr: number): number => {
    if (icpRate === null) return 0;
    return amountInIdr * icpRate;
  };

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
    return participants.map((p) => {
      const amountInIdr = amounts[p.principal] || 0;
      return {
        ...p,
        amount: amountInIdr,
        amountInIcp: convertToIcp(amountInIdr),
      };
    });
  }, [participants, items, itemAssignments, icpRate]);

  const totalAmountInIdr = useMemo(
    () => items.reduce((total, item) => total + item.price, 0),
    [items],
  );
  const totalAmountInIcp = useMemo(
    () => convertToIcp(totalAmountInIdr),
    [totalAmountInIdr, icpRate],
  );
  const selectedPrincipals = useMemo(
    () => new Set(participants.map((p) => p.principal)),
    [participants],
  );

  return (
    <MainLayout>
      <div className="grid grid-cols-1 mt-10 lg:grid-cols-2 gap-12">
        <div className="left flex flex-col text-start gap-12">
          <div>
            <h2 className="text-[#BA2685]">Total Amount</h2>
            {isRateLoading ? (
              <p className="mt-3 font-medium text-2xl">
                Menghitung rate ICP...
              </p>
            ) : rateError ? (
              <p className="mt-3 font-medium text-lg text-red-500">
                {rateError}
              </p>
            ) : (
              <>
                <p className="mt-3 font-medium text-2xl">
                  {formatIcp(totalAmountInIcp)}
                </p>
                <p className="text-sm text-gray-500">
                  ~ {formatCurrency(totalAmountInIdr)}
                </p>
              </>
            )}
          </div>
          <div className="w-full grid grid-cols-1 p-5 border border-gray-200 rounded-lg">
            <button
              onClick={() => setIsParticipantModalOpen(true)}
              className="text-center flex-1 bg-[#BA2685] text-white h-15 w-full flex items-center justify-center rounded-lg cursor-pointer"
            >
              Add Participant
            </button>
            <ul className="mt-10 text-black ml-3 flex flex-col gap-8 h-105 overflow-y-auto pr-2">
              {participantsWithAmounts.map((item) => (
                <li
                  key={item.principal}
                  className="grid grid-cols-5 items-center gap-2"
                >
                  {item.profile}
                  <p className="text-start col-span-3">{item.username}</p>
                  <div className="text-start font-medium text-sm">
                    <p>{formatIcp(item.amountInIcp)}</p>
                    <p className="text-xs text-gray-500">
                      ~{formatCurrency(item.amount)}
                    </p>
                  </div>
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
          <div className="border border-gray-200 rounded-lg p-5">
            <p>Select participant to assign item:</p>
            <div className="mt-5 w-full overflow-x-auto">
              <div className="flex flex-row gap-10 p-4 mb-3 w-max">
                {participants.map((item) => (
                  <div
                    key={item.principal}
                    className={`cursor-pointer rounded-full transition-all ${selectedParticipantId === item.principal ? 'ring-3 ring-offset-2 ring-[#BA2685]' : ''}`}
                    onClick={() => handleSelectParticipant(item.principal)}
                  >
                    {item.profile}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
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
                      disabled={selectedParticipantId === null || isRateLoading}
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
