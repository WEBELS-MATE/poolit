import Button from '../../ui/BillButton';
export default function InputItem() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Input Item</h1>
      <p className="text-gray-600 mb-6">
        This is where you can input items for the bill.
      </p>
      <Button text="Create Bill" width={200} />
    </div>
  );
}
