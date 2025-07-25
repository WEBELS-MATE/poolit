import { IconBell, IconPlus, IconUser, IconX } from '@tabler/icons-react';
import React, { useState, useMemo, useCallback } from 'react';

// --- TYPESCRIPT INTERFACES ---
// Defines the structure for a participant in the bill
interface Participant {
    id: string;
    name: string;
    amount: number;
    avatar: string; // URL to an avatar image
}

// Defines the structure for a user found in the search
interface SearchUser {
    id: string;
    name: string;
    avatar: string;
}

// --- MOCK DATA ---
// Mock data for user search simulation. In a real app, this would come from an API.
const MOCK_USERS: SearchUser[] = [
    { id: 'user1', name: 'Alice', avatar: 'https://placehold.co/100x100/f871b1/ffffff?text=A' },
    { id: 'user2', name: 'Bob', avatar: 'https://placehold.co/100x100/ec4899/ffffff?text=B' },
    { id: 'user3', name: 'Charlie', avatar: 'https://placehold.co/100x100/db2777/ffffff?text=C' },
    { id: 'user4', name: 'Diana', avatar: 'https://placehold.co/100x100/be185d/ffffff?text=D' },
    { id: 'user5', name: 'Eve', avatar: 'https://placehold.co/100x100/9d174d/ffffff?text=E' },
];

// --- HELPER COMPONENTS ---

/**
 * AddParticipantModal Component
 * A modal that allows searching for users and adding them as participants.
 */
const AddParticipantModal = ({
    isOpen,
    onClose,
    onAddParticipant,
    existingParticipants,
}: {
    isOpen: boolean;
    onClose: () => void;
    onAddParticipant: (user: SearchUser) => void;
    existingParticipants: Participant[];
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter users based on the search query
    const searchResults = useMemo(() => {
        if (!searchQuery) return [];
        return MOCK_USERS.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // Memoize existing participant IDs for quick lookup
    const existingParticipantIds = useMemo(() =>
        new Set(existingParticipants.map(p => p.id)),
        [existingParticipants]
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Add Participant</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <IconX size={24} />
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Search for user..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {searchResults.map((user) => {
                        const isAdded = existingParticipantIds.has(user.id);
                        return (
                            <div
                                key={user.id}
                                className={`flex items-center justify-between p-3 rounded-lg ${isAdded ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                                    <span className="font-medium text-gray-700">{user.name}</span>
                                </div>
                                <button
                                    onClick={() => !isAdded && onAddParticipant(user)}
                                    disabled={isAdded}
                                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${isAdded
                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                        : 'bg-pink-600 text-white hover:bg-pink-700'
                                        }`}
                                >
                                    {isAdded ? 'Added' : 'Add'}
                                </button>
                            </div>
                        );
                    })}
                    {searchQuery && searchResults.length === 0 && (
                        <p className="text-center text-gray-500 py-4">No users found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function SplitBillCreate() {
    // --- STATE MANAGEMENT ---
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [splitMode, setSplitMode] = useState<'equally' | 'custom'>('equally');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- DERIVED STATE & CALCULATIONS ---
    // Recalculates participant amounts whenever dependencies change
    const processedParticipants = useMemo(() => {
        if (splitMode === 'equally' && participants.length > 0 && totalAmount > 0) {
            const equalAmount = totalAmount / participants.length;
            return participants.map(p => ({ ...p, amount: equalAmount }));
        }
        return participants;
    }, [participants, totalAmount, splitMode]);

    // --- EVENT HANDLERS ---
    const handleAddParticipant = useCallback((user: SearchUser) => {
        setParticipants(prev => [...prev, { ...user, amount: 0 }]);
    }, []);

    const handleRemoveParticipant = useCallback((id: string) => {
        setParticipants(prev => prev.filter(p => p.id !== id));
    }, []);

    const handleAmountChange = useCallback((id: string, newAmount: number) => {
        // This only works in 'custom' mode
        if (splitMode !== 'custom') return;

        setParticipants(prev =>
            prev.map(p => (p.id === id ? { ...p, amount: newAmount } : p))
        );
    }, [splitMode]);

    const handleTotalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setTotalAmount(isNaN(value) ? 0 : value);
    };

    const handleCreateBill = () => {
        // In a real app, you would send this data to a backend.
        if (totalAmount <= 0) {
            alert("Please enter a total amount.");
            return;
        }
        if (processedParticipants.length === 0) {
            alert("Please add at least one participant.");
            return;
        }

        const sumOfShares = processedParticipants.reduce((sum, p) => sum + p.amount, 0);

        // Use a small epsilon for floating point comparison
        if (splitMode === 'custom' && Math.abs(sumOfShares - totalAmount) > 0.01) {
            alert(`The sum of custom amounts ($${sumOfShares.toFixed(2)}) does not match the total amount ($${totalAmount.toFixed(2)}).`);
            return;
        }

        console.log('Creating Bill:', {
            totalAmount,
            splitMode,
            participants: processedParticipants,
        });
        alert('Bill created successfully! Check the console for the data.');
    };


    // --- RENDER ---
    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">

                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Create Bill</h1>
                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-pink-600">
                            <IconBell size={24} />
                        </button>
                        <button className="text-gray-500 hover:text-pink-600">
                            <IconUser size={24} />
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto">
                    {/* Split Mode Toggle */}
                    <div className="bg-white p-2 rounded-full shadow-md mb-8 flex">
                        <button
                            onClick={() => setSplitMode('equally')}
                            className={`w-1/2 py-3 rounded-full text-center font-semibold transition-all duration-300 ${splitMode === 'equally'
                                ? 'bg-gradient-to-r from-[#BA2685] to-[#F36BAB] text-white shadow-lg'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Divide equally
                        </button>
                        <button
                            onClick={() => setSplitMode('custom')}
                            className={`w-1/2 py-3 rounded-full text-center font-semibold transition-all duration-300 ${splitMode === 'custom'
                                ? 'bg-gradient-to-r from-[#BA2685] to-[#F36BAB] text-white shadow-lg'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Custom
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column: Participants */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-gradient-to-r from-[#BA2685] to-[#F36BAB] text-white font-bold py-4 rounded-xl mb-6 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <IconPlus size={20} />
                                Add Participant
                            </button>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {processedParticipants.length > 0 ? (
                                    processedParticipants.map((p) => (
                                        <div
                                            key={p.id}
                                            className="flex items-center justify-between bg-gray-50 p-3 rounded-xl"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full" />
                                                <span className="font-semibold">{p.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {splitMode === 'custom' ? (
                                                    <input
                                                        type="number"
                                                        value={p.amount.toFixed(2)}
                                                        onChange={(e) => handleAmountChange(p.id, parseFloat(e.target.value) || 0)}
                                                        className="w-24 text-right font-mono bg-gray-100 p-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-pink-500"
                                                    />
                                                ) : (
                                                    <span className="font-mono text-lg text-pink-600 font-semibold">
                                                        ${p.amount.toFixed(2)}
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() => handleRemoveParticipant(p.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <IconX size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-gray-500">
                                        <IconUser size={48} className="mx-auto mb-2" />
                                        <p>No participants yet.</p>
                                        <p>Click "Add Participant" to start.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Total & Action */}
                        <div className="flex flex-col justify-between">
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <label
                                    htmlFor="totalAmount"
                                    className="block text-lg font-semibold mb-2 text-gray-700"
                                >
                                    Total Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-400">$</span>
                                    <input
                                        id="totalAmount"
                                        type="number"
                                        placeholder="0.00"
                                        value={totalAmount || ''}
                                        onChange={handleTotalAmountChange}
                                        className="w-full text-4xl font-bold p-3 pl-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleCreateBill}
                                className="w-full bg-gradient-to-r from-[#BA2685] to-[#F36BAB] text-white font-bold py-5 rounded-xl mt-8 text-xl hover:opacity-90 transition-opacity shadow-lg"
                            >
                                Create Bill
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Portal */}
            <AddParticipantModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddParticipant={handleAddParticipant}
                existingParticipants={participants}
            />
        </div>
    );
}
