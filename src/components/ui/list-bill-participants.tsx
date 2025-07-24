import React, { useState, useMemo } from 'react';
import AddParticipantsModal, { Participant } from './add-participants-modal'; // Pastikan path impor benar

interface Props {
  type: 'equal' | 'custom';
  totalAmount: number;
  allParticipants: Participant[];
}

const ListBillParticipants: React.FC<Props> = ({ type, totalAmount, allParticipants }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
  const [customAmounts, setCustomAmounts] = useState<{ [key: number]: string }>({});

  const equalAmount = useMemo(() => {
    if (selectedParticipants.length === 0 || totalAmount === 0) return 0;
    return totalAmount / selectedParticipants.length;
  }, [totalAmount, selectedParticipants.length]);

  const handleToggleParticipant = (participant: Participant) => {
    setSelectedParticipants((prev) => {
      const isSelected = prev.some((p) => p.principal === participant.principal);
      if (isSelected) {
        const newCustomAmounts = { ...customAmounts };
        delete newCustomAmounts[participant.principal];
        setCustomAmounts(newCustomAmounts);
        return prev.filter((p) => p.principal !== participant.principal);
      } else {
        return [...prev, participant];
      }
    });
  };

  const handleCustomAmountChange = (principal: number, value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCustomAmounts((prev) => ({
        ...prev,
        [principal]: value,
      }));
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-300 flex flex-col overflow-auto h-full">
      <button
        className="w-full bg-[#BA2685] text-white font-semibold py-3 px-4 rounded-lg mb-4 hover:bg-opacity-90 transition-opacity shadow-md text-lg cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        Add Participant
      </button>

      <AddParticipantsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        allParticipants={allParticipants}
        selectedPrincipals={new Set(selectedParticipants.map(p => p.principal))}
        onToggleParticipant={handleToggleParticipant}
      />

      <div className="flex-grow overflow-y-auto pr-2 space-y-4 scrollbar-track-gray-100" style={{
        scrollbarColor: '#BA2685 #f3f4f6',
        scrollbarWidth: 'thin',
      }}>
        {selectedParticipants.length > 0 ? (
          selectedParticipants.map((p) => (
            <div key={p.principal} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <span className="font-semibold text-gray-700">{p.username}</span>
              </div>

              {type === 'equal' ? (
                <span className="font-semibold text-lg text-[#BA2685]">
                  {equalAmount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                </span>
              ) : (
                <div className="relative w-32">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span>
                  <input
                    type="text"
                    placeholder="0"
                    className="w-full p-2 pl-9 rounded-md border-2 border-gray-300 text-right focus:border-[#BA2685] focus:outline-none"
                    value={customAmounts[p.principal] || ''}
                    onChange={(e) => handleCustomAmountChange(p.principal, e.target.value)}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No participants have been added.
          </div>
        )}
      </div>
    </div>
  );
};

export default ListBillParticipants;