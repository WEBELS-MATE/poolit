import { Link } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import Tabs from "../../ui/tabs";
import BillDetail from '../../../assets/bill-detail.png';

const onGoingBillSamples = [{
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
}, {
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
]

const completedBillSamples = [{
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
}, {
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
]

const billView = (samples: typeof onGoingBillSamples) => {
    return samples.map((bill) => (
        <div key={bill.contract_id} className="bg-[#BA2685] p-4 mb-6 rounded-lg flex justify-between rounded text-white">
            <div className='flex flex-col items-start'>
                <p className="font-semibold">{bill.title}</p>
                <p className="text-sm">{bill.date}</p>
            </div>
            <Link to={`/split-bill/detail/${bill.contract_id}`} className="w-fit flex items-center gap-x-1 hover:font-semibold">
                Bill Detail <img src={BillDetail} className="w-5 h-5" />
            </Link>
        </div>
    ));
};

function SplitBill() {
    const tabItems = [
        { title: 'On Going', content: billView(onGoingBillSamples) },
        { title: 'Completed', content: billView(completedBillSamples) },
    ];

    return (
        <MainLayout >
            <div className="p-6 relative">
                <Tabs tabs={tabItems} />
                <Link to={'/split-bill/create'} className="z-10 px-5 fixed bottom-12 right-12 py-3 w-fit flex bg-[#BA2685] rounded-lg items-center gap-x-1 text-white hover:font-semibold">
                    New Bill
                </Link>
            </div>
        </MainLayout>
    );
}
export default SplitBill;