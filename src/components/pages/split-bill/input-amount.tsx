import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import ListBillParticipants from '../../ui/list-bill-participants';
import BillButton from '../../ui/bill-button';

const listParticipants = [
  { principal: 12000, username: "ZeroZennn" },
  { principal: 11000, username: "Xeyy" },
  { principal: 10000, username: "Dnsy" },
  { principal: 9000, username: "rfii" },
  { principal: 8000, username: "Kluftein21" },
  { principal: 7000, username: "Rizky" },
  { principal: 6000, username: "Rizal" },
  { principal: 5000, username: "Fathur" },
];

function InputAmount() {
  const [activeTab, setActiveTab] = useState<'equal' | 'custom'>('equal');
  const [totalAmount, setTotalAmount] = useState<string>('');

  const handleTotalAmountChange = (value: string) => {
    // Izinkan hanya angka atau string kosong
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setTotalAmount(value);
    }
  };

  const numericTotalAmount = Number(totalAmount) || 0;
  return (
    <MainLayout>
      <div className="w-full h-full p-6 pb-0">
        {/* Tabs */}
        <div className="w-full border-2 border-[#BA2685] rounded-lg flex p-4 mb-8">
          <button
            onClick={() => setActiveTab('equal')}
            className={`w-1/2 rounded-md text-center px-4 py-2 text-sm font-medium transition-colors duration-300 ${activeTab === 'equal'
              ? 'bg-gradient-to-r from-[#BA2685] to-[#F36BAB] text-white'
              : 'bg-transparent text-[#BA2685]'
              }`}
          >
            Divide equally
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`w-1/2 rounded-md text-center px-4 py-2 text-sm font-medium transition-colors duration-300 ${activeTab === 'custom'
              ? 'bg-gradient-to-r from-[#BA2685] to-[#F36BAB] text-white'
              : 'bg-transparent text-[#BA2685]'
              }`}
          >
            Custom
          </button>
        </div>

        <main className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8 pb-6">
          <div className="lg:col-span-3 h-[65vh] max-h-[65vh]">
            <ListBillParticipants
              type={activeTab}
              totalAmount={numericTotalAmount}
              allParticipants={listParticipants}
            />
          </div>

          <div className="lg:col-span-2 flex flex-col justify-between">
            <div className="w-full">
              <label htmlFor="totalAmount" className="font-semibold text-lg text-[#BA2685]">
                Total Amount
              </label>
              <input
                id="totalAmount"
                type="text"
                placeholder="0"
                value={totalAmount}
                onChange={(e) => handleTotalAmountChange(e.target.value)}
                className="w-full mt-2 p-4 text-xl rounded-lg border-2 border-gray-300 focus:border-[#BA2685] focus:outline-none text-right"
              />
            </div>
            <div className="mt-6">
              <BillButton onClick={() => alert('Bill Created!')}>
                Create Bill
              </BillButton>
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}

export default InputAmount;
