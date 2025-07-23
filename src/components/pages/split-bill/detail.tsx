import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";

// Dummy data, ganti nanti dengan fetch atau props
const dummyBills = [
 {
    'bill_id': 1,
    'title': "Bill From ZeroZennn",
    'status': 'ongoing',
    'bill_maker': 9000,
    'date': '22-07-2025',
    'details': {
        'total_amount': 1000000,
        'type_of_bill': 'equal',
        'participants': [{
            'id': 12000, 
            'amount': 250000,
        },
        {
            'id': 11000, 
            'amount': 250000,
        },
        {
            'id': 10000, 
            'amount': 250000,
        },
        {
            'id': 9000, 
            'amount': 250000,
        }]
    }
}, {
    'bill_id': 2,
    'title': "Gacoan",
    'status': 'ongoing',
    'bill_maker': 10000,
    'date': '18-07-2025',
    'details': {
        'total_amount': 250000,
        'type_of_bill': 'custom',
        'participants': [
        {
            'id': 11000, 
            'amount': 100000,
        },
        {
            'id': 10000, 
            'amount': 50000,
        },
        {
            'id': 9000, 
            'amount': 100000,
        }]
    }
}, {
    'bill_id': 5,
    'title': "Liburan Bareng",
    'status': 'completed',
    'bill_maker': 9000,
    'date': '22-07-2025',
    'details': {
        'total_amount': 1000000,
        'type_of_bill': 'equal',
        'participants': [{
            'id': 12000, 
            'amount': 250000,
        },
        {
            'id': 11000, 
            'amount': 250000,
        },
        {
            'id': 10000, 
            'amount': 250000,
        },
        {
            'id': 9000, 
            'amount': 250000,
        }]
    }
}, {
    'bill_id': 6,
    'title': "Warkop 99",
    'status': 'completed',
    'bill_maker': 10000,
    'date': '18-07-2025',
    'details': {
        'total_amount': 250000,
        'type_of_bill': 'custom',
        'participants': [
        {
            'id': 11000, 
            'amount': 100000,
        },
        {
            'id': 10000, 
            'amount': 50000,
        },
        {
            'id': 9000, 
            'amount': 100000,
        }]
    }
}
];

const BillDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [bill, setBill] = useState<{ bill_id: number; title: string; date: string; total_amount: number } | null>(null);

  useEffect(() => {
    // Simulasi pencarian berdasarkan id
    const found = dummyBills.find((item) => item.bill_id === Number(id));
    setBill(found || null);
  }, [id]);

  if (!bill) {
    return <div className="p-4">Bill not found.</div>;
  }

  return (
     <MainLayout >
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Detail Tagihan</h1>
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <p className="text-lg font-semibold">Judul: {bill.title}</p>
        <p className="text-md mt-2">Tanggal: {bill.date}</p>
        <p className="text-md mt-2">Total: Rp{bill.details.total_amount.toLocaleString("id-ID")}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={() => window.history.back()}
        >
          Kembali
        </button>
      </div>
    </div>
     </MainLayout>
  );
};

export default BillDetailPage;