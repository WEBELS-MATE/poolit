import React, { useState } from 'react';
import Button from '../ui/BillButton';

type ModalSetItemProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: { id: number; name: string; price: number }) => void;
};

export default function ModalSetItem({
  isOpen,
  onClose,
  onAddItem,
}: ModalSetItemProps) {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setItemName('');
    setItemPrice('');
    setError('');
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!itemName.trim() || !itemPrice) {
      setError('Please fill in all fields.');
      return;
    }

    const newItem = {
      id: Date.now(),
      name: itemName,
      price: parseInt(itemPrice, 10),
    };

    onAddItem(newItem);
    handleClose();
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={handleClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl m-4 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#BA2685]">
          Add New Item
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="itemName"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Item Name
            </label>
            <input
              id="itemName"
              type="text"
              placeholder="e.g., Udang Keju"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA2685] focus:outline-none transition-shadow"
            />
          </div>
          <div>
            <label
              htmlFor="itemPrice"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Price (IDR)
            </label>
            <input
              id="itemPrice"
              type="number"
              placeholder="e.g., 25000"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BA2685] focus:outline-none transition-shadow"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex gap-4 justify-center mt-4">
            <Button text='Add Item' width='500px'/>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
