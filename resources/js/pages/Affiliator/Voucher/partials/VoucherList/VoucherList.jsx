import './style.css';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Divider from '@/components/Divider';
import Icon from '@/components/Icon';
import Visibility from '@/components/Visibility';
import Component from '../../components';
import ModalDetail from '../ModalDetail';

function VoucherList() {
    const { vouchers, user } = usePage().props;
    const [show, setShow] = useState({
        edit: false,
    });

    const [values, setValues] = useState({});

    const currencyFormat = (number) => Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 2,
    }).format(number);

    useEffect(() => {
        if (show.edit) setValues(show.edit);
    }, [show]);

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target?.files?.[0] || e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    return (
        <>
            <Card className="w-full p-5 xl:px-12 xl:py-4">
                <header className="flex w-full items-center py-6">
                    <div>
                        <h3 className="mb-1 text-xl font-bold leading-normal xl:text-2xl">Affiliator Vouchers</h3>
                        <p className="mb-0 text-sm text-gray-400 sm:text-base">List of vouchers</p>
                    </div>
                    <Component.Search className="mx-auto" />
                </header>
                <Divider className="mb-6" />
                <div className="scrollbar-thin mb-4 h-[600px] w-full overflow-auto xl:mb-8 xl:min-h-[25rem]">
                    <table className="w-full">
                        <thead>
                            <tr className="sticky top-0 bg-white">
                                <th className="w-0 px-1">#</th>
                                <Visibility hidden={user?.role?.id !== 2}>
                                    <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">Name</th>
                                </Visibility>
                                <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">Voucher</th>
                                <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">Organization</th>
                                <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">Status</th>
                                <th
                                    colSpan="10"
                                    className="w-0 px-1 py-1 text-center text-xs sm:px-4 sm:py-3 sm:text-base"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&>*:nth-child(odd)]:bg-gray-100/80">
                            {vouchers?.items?.map((voucher, index) => (
                                <tr key={voucher.voucher_id}>
                                    <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                        {index + 1}
                                    </td>
                                    <Visibility hidden={user?.role?.id !== 2}>
                                        <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                            <p className="font-bold">{voucher?.affiliator?.name}</p>
                                            <small>{voucher?.affiliator?.email}</small>
                                        </td>
                                    </Visibility>
                                    <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                        <p className="font-bold">{voucher?.voucher_code}</p>
                                        <Visibility hidden={voucher?.discount_type !== 'Potongan'}>
                                            <small>
                                                Discount:
                                                {' '}
                                                {currencyFormat(voucher?.discount_value)}
                                            </small>
                                        </Visibility>
                                        <Visibility hidden={voucher?.discount_type !== 'Discount'}>
                                            <small>
                                                Discount:
                                                {' '}
                                                {(voucher?.discount_value || 0) * 100}
                                                %
                                            </small>
                                        </Visibility>
                                        <Visibility hidden={voucher?.discount_type !== 'FixedPrice'}>
                                            <small>
                                                Harga Final:
                                                {' '}
                                                {currencyFormat(voucher?.discount_value)}
                                            </small>
                                        </Visibility>
                                    </td>
                                    <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                        <p className="font-bold">{voucher?.organization?.name || '-'}</p>
                                        <small>{voucher?.organization?.type || '-'}</small>
                                    </td>
                                    <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                        <Component.Status code={voucher?.status?.id}>
                                            <p className="font-bold text-inherit">{voucher?.status?.name}</p>
                                            <small className="text-inherit">
                                                {new Date(voucher.created_at).toLocaleString('id-ID')}
                                            </small>
                                        </Component.Status>
                                    </td>
                                    <td className="w-0 p-1 text-center text-xs sm:py-3 sm:text-base">
                                        <Button
                                            className="p-3"
                                            onClick={() => setShow((states) => ({
                                                ...states,
                                                edit: voucher,
                                            }))}
                                        >
                                            <Icon.Eye className="h-4 w-4 stroke-gray-500" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <footer className="flex w-full flex-col items-start xl:flex-row xl:items-baseline xl:text-left">
                    <p className="mb-4 w-full text-center text-xs text-gray-400 xl:mr-2 xl:w-auto">Voucher List</p>
                </footer>
            </Card>

            <ModalDetail
                show={show?.edit}
                data={show?.edit}
                onChange={handleChange}
                onClose={() => setShow((states) => ({
                    ...states,
                    edit: false,
                }))}
            />
        </>
    );
}

export default VoucherList;
