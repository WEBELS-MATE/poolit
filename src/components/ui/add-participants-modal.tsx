import React, { useState } from 'react';

// Impor atau definisikan Participant di sini jika belum
export interface Participant {
  principal: number;
  username: string;
}

// SVG untuk ikon checkmark agar tidak perlu impor gambar
const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="white" className="w-4 h-4">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
  </svg>
);

interface AddParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  allParticipants: Participant[];
  selectedPrincipals: Set<number>;
  onToggleParticipant: (participant: Participant) => void;
}

const AddParticipantsModal: React.FC<AddParticipantsModalProps> = ({
  isOpen,
  onClose,
  allParticipants,
  selectedPrincipals,
  onToggleParticipant,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredParticipants = allParticipants.filter(p =>
    p.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={onClose}>
      {/* Modal Content */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add Participant</h2>
        <input
          type="text"
          placeholder="Search by username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#BA2685]"
        />

        <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
          {filteredParticipants.map((user) => {
            const isSelected = selectedPrincipals.has(user.principal);
            return (
              <div key={user.principal} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <span>{user.username}</span>
                </div>
                <button
                  onClick={() => onToggleParticipant(user)}
                  className={`w-6 h-6 flex items-center justify-center rounded-md border-2 transition-all duration-200 ${isSelected ? 'bg-[#BA2685] border-[#BA2685]' : 'bg-white border-gray-400'
                    }`}
                >
                  {isSelected && <CheckIcon />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddParticipantsModal;