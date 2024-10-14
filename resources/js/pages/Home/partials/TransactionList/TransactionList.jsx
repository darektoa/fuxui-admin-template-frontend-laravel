import './style.css';
import { usePage } from '@inertiajs/react';
import React from 'react';
import Card from '@/components/Card';
import Divider from '@/components/Divider';
import Component from '../../components';

function TransactionList() {
    const { transactions, user } = usePage().props;

    const currencyFormat = (number) => Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 2,
    }).format(number);

    function sensorEmail(value) {
        return value
            ?.replace(/(.{1,3})(.+)(.+@.+)/, '$1***$3');
    }

    return (
        <Card className="w-full p-5 xl:px-12 xl:py-4">
            <header className="flex w-full items-center py-6">
                <div>
                    <h3 className="mb-1 text-xl font-bold leading-normal xl:text-2xl">Transactions</h3>
                    <p className="mb-0 text-sm text-gray-400 sm:text-base">
                        List of transactions of your affiliator codes
                    </p>
                </div>
                <Component.Search className="mx-auto" />
            </header>
            <Divider className="mb-6" />
            <div className="scrollbar-thin mb-4 h-[600px] w-full overflow-auto xl:mb-8 xl:min-h-[25rem]">
                <table className="w-full">
                    <thead>
                        <tr className="sticky top-0 bg-white">
                            <th className="w-0 px-1">#</th>
                            <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">Name</th>
                            <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">Affiliate</th>
                            <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">Voucher</th>
                            <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">Price</th>
                        </tr>
                    </thead>
                    <tbody className="[&>*:nth-child(odd)]:bg-gray-100/80">
                        {transactions?.items?.map((transaction, index) => (
                            <tr key={transaction?.id}>
                                <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                    {index + 1}
                                </td>
                                <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                    <p className="font-bold">
                                        {
                                            transaction?.name 
                                                ?? (transaction.is_redeem_voucher ? '[ Redeem ]' : '[ Unknown ]')
                                        }
                                    </p>
                                    <small>
                                        {user?.role?.id === 2
                                            ? (transaction?.email ?? '[ Unknown ]')
                                            : (sensorEmail(transaction?.email) ?? '[ Unknown ]')}
                                    </small>
                                </td>
                                <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                    <p className="font-bold">
                                        { transaction?.affiliator?.name ?? '[ Unknown ]' }
                                    </p>
                                    <small>
                                        { transaction?.affiliator?.email ?? '[ Unknown ]' }
                                    </small>
                                </td>
                                <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                    <p className="font-bold">{transaction?.voucher_code}</p>
                                    <small>
                                        {
                                            transaction?.detail?.products?.[0]?.product_code
                                            ?? transaction?.detail?.events?.[0]?.event_code
                                        }
                                        {' | '}
                                        {
                                            transaction?.detail?.products?.[0]?.product_name
                                            ?? transaction?.detail?.events?.[0]?.event_name
                                        }
                                    </small>
                                </td>
                                <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                    <p className="font-bold text-green-600">
                                        {currencyFormat(transaction?.paid) ?? '-'}
                                    </p>
                                    <small className="text-inherit">
                                        {new Date(transaction?.date).toLocaleString('id-ID')}
                                    </small>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <footer className="flex w-full flex-col items-start xl:flex-row xl:items-baseline xl:text-left">
                <p className="mb-4 w-full text-center text-xs text-gray-400 xl:mr-2 xl:w-auto">
                    List of transactions using vouchers
                </p>
            </footer>
        </Card>
    );
}

export default TransactionList;
