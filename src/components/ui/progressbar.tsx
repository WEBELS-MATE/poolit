interface ProgressBarProps {
  isPaid: boolean;
  amount: number;
}

export default function ProgressBar({ isPaid, amount }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
      <div
        className={`h-6 text-xs text-white items-center text-center leading-4 ${isPaid ? 'bg-[#BA2685] w-full' : ''
          }`}
      >
        <p className={`text-sm font-semibold m-0 ${isPaid ? 'text-white' : 'text-[#BA2685]'}`}>Rp{amount.toLocaleString("id-ID")}</p>
      </div>
    </div >
  );
}
