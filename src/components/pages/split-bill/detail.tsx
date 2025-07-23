import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import Progressbar from "../../ui/progressbar";

// Dummy data, ganti nanti dengan fetch atau props
const dummyBills = [
    {
        'contract_id': 1,
        'title': "Bill From ZeroZennn",
        'status': 'ongoing',
        'bill_maker': 9000,
        'date': '22-07-2025',
        'total_amount': 1000000,
        'type_of_split': 'equal',
        'contractees': [{
            'principal': 12000,
            'description': "",
            'share': 1000,
            'paid': false,
            'amount': 250000,
        },
        {
            'principal': 11000,
            'description': "",
            'share': 1000,
            'paid': true,
            'amount': 250000,
        },
        {
            'principal': 10000,
            'description': "",
            'share': 1000,
            'paid': false,
            'amount': 250000,
        },
        {
            'principal': 9000,
            'description': "",
            'share': 1000,
            'paid': true,
            'amount': 250000,
        }]
    }
    , {
        'contract_id': 2,
        'title': "Gacoan",
        'status': 'ongoing',
        'bill_maker': 10000,
        'date': '18-07-2025',
        'total_amount': 250000,
        'type_of_split': 'custom',
        'contractees': [
            {
                'principal': 11000,
                'description': "",
                'share': 1000,
                'paid': true,
                'amount': 100000,
            },
            {
                'principal': 10000,
                'description': "",
                'share': 1000,
                'paid': false,
                'amount': 50000,
            },
            {
                'principal': 9000,
                'description': "",
                'share': 1000,
                'paid': true,
                'amount': 100000,
            }]
    }
    , {
        'contract_id': 5,
        'title': "Liburan Bareng",
        'status': 'completed',
        'bill_maker': 9000,
        'date': '22-07-2025',
        'total_amount': 2000000,
        'type_of_split': 'equal',
        'contractees': [{
            'principal': 12000,
            'description': "",
            'share': 1000,
            'paid': true,
            'amount': 500000,
        },
        {
            'principal': 11000,
            'description': "",
            'share': 1000,
            'paid': true,
            'amount': 500000,
        },
        {
            'principal': 10000,
            'description': "",
            'share': 1000,
            'paid': true,
            'amount': 500000,
        },
        {
            'principal': 9000,
            'description': "",
            'share': 1000,
            'paid': true,
            'amount': 500000,
        }]
    }
    , {
        'contract_id': 6,
        'title': "Warkop 99",
        'status': 'completed',
        'bill_maker': 10000,
        'date': '18-07-2025',
        'total_amount': 450000,
        'type_of_split': 'custom',
        'contractees': [
            {
                'principal': 11000,
                'description': "",
                'share': 1000,
                'paid': true,
                'amount': 150000,
            },
            {
                'principal': 10000,
                'description': "",
                'share': 1000,
                'paid': true,
                'amount': 150000,
            },
            {
                'principal': 9000,
                'description': "",
                'share': 1000,
                'paid': true,
                'amount': 100000,
            }]
    }
];

const BillDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [bill, setBill] = useState<(typeof dummyBills)[number] | null>(null);

    useEffect(() => {
        // Simulasi pencarian berdasarkan id
        const found = dummyBills.find((item) => item.contract_id === Number(id));
        if (found) {
            setBill(found);
        } else {
            setBill(null);
        }
    }, [id]);

    if (!bill) {
        return <div className="p-4">Bill not found.</div>;
    }

    return (
        <MainLayout >
            <div className="p-6">
                <div className='border-2 border-bg-[#BA2685] p-4 rounded-full bg-transparent text-[#BA2685] text-lg mb-6'>
                    Rp{bill.total_amount.toLocaleString("id-ID")}
                </div>

                {bill.contractees.map((person) => (
                    <div key={person.principal} className="mb-4 flex items-center gap-4">
                        <div className="bg-[#BA2685] rounded-full w-12 h-12"></div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="text-[#BA2685] font-semibold flex justify-between">
                                <p>ID: {person.principal}</p>
                                <p className="text-sm">{person.paid ? "Paid" : "Unpaid"}</p>
                            </div>
                            <Progressbar isPaid={person.paid} amount={person.amount} />
                        </div>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
};

export default BillDetailPage;