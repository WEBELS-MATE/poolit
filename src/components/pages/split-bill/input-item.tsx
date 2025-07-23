import MainLayout from '../../layout/MainLayout';
import Button from '../../ui/BillButton';
const user = [
  {
    profile: 'Profile',
    username: 'Username 1',
    amount: 'Amount',
  },
  {
    profile: 'Profile',
    username: 'Username 2',
    amount: 'Amount',
  },
  {
    profile: 'Profile',
    username: 'Username 3',
    amount: 'Amount',
  },
  {
    profile: 'Profile',
    username: 'Username 4',
    amount: 'Amount',
  },
  {
    profile: 'Profile',
    username: 'Username 5',
    amount: 'Amount',
  },
  {
    profile: 'Profile',
    username: 'Username 6',
    amount: 'Amount',
  },
  {
    profile: 'Profile',
    username: 'Username 7',
    amount: 'Amount',
  },
  {
    profile: 'Profile',
    username: 'Username 8',
    amount: 'Amount',
  },
  {
    profile: 'Profile',
    username: 'Username 9',
    amount: 'Amount',
  },
  {
    profile: 'Profile',
    username: 'Username 10',
    amount: 'Amount',
  },
  {
    profile: 'Profile',
    username: 'Username 11',
    amount: 'Amount',
  },
  {
    profile: 'Profile',
    username: 'Username 12',
    amount: 'Amount',
  },
];
export default function InputItem() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 mt-10 lg:grid-cols-2 gap-12">
        <div className="left flex flex-col text-start gap-17">
          <div>
            <h2 className="text-[#BA2685]">Total Amount</h2>
            <p className="mt-3 font-medium text-2xl">Rp 100.000.000,00</p>
          </div>
          <div className="w-full grid grid-cols-1 p-5 border-[#AAAAAA] rounded-lg border-[0.1px]">
            <p className="text-center flex-1 bg-[#BA2685] text-white h-15 w-full flex items-center justify-center rounded-lg">
              Add Participant
            </p>
            <ul className="mt-10 text-[#BA2685] ml-3 flex flex-col gap-10 h-120 overflow-y-auto pr-2 custom-scrollbar">
              <li className="grid grid-cols-5 gap-2">
                <p className="text-start">Profile</p>
                <p className="text-start col-span-3">Username 1</p>
                <p className="text-start">Amount</p>
              </li>
              {user.map((item, index) => (
                <li key={index} className="grid grid-cols-5 gap-2">
                  <p className="text-start">{item.profile}</p>
                  <p className="text-start col-span-3">{item.username}</p>
                  <p className="text-start">{item.amount}</p>
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
            <p>Details</p>
            <div className="mt-5 w-full overflow-x-auto custom-scrollbar">
              <div className="flex flex-row gap-10 mb-3 w-max">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-gray-200 rounded-full"
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-[#AAAAAA] rounded-lg border-[0.1px] p-5">
            <ul className="ml-3 flex flex-col gap-10 h-80 overflow-y-auto pr-7 custom-scrollbar">
              {[...Array(12)].map((_, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">
                      Mie Gacoan Level {index + 1}
                    </p>
                    <p className="text-sm font-semibold">Rp 50.000,00</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#BA2685] rounded-md"
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
