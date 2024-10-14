import './style.css';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { useParser } from '@/hooks';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Divider from '@/components/Divider';
import Icon from '@/components/Icon';
import Toast from '@/components/Toast';
import Visibility from '@/components/Visibility';

function PromotedProductList() {
    const { promotedProducts } = usePage().props;
    const { unicodeParse } = useParser();
    const [show, setShow] = useState({
        copy: null,
    });

    const currencyFormat = (number) => Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 2,
    }).format(number);

    useEffect(() => {
        if (show?.copy?.promotedUrl) {
            navigator.clipboard.writeText(show?.copy?.promotedUrl);
        }
    }, [show.copy]);

    return (
        <>
            <Card className="w-full p-5 xl:px-12 xl:py-4">
                <header className="flex w-full items-center py-6">
                    <div>
                        <h3 className="mb-1 text-xl font-bold leading-normal xl:text-2xl">Promoted Products</h3>
                        <p className="mb-0 text-sm text-gray-400 sm:text-base">
                            List of promoted products can you share
                        </p>
                    </div>
                    {/* <Component.Search className="mx-auto" /> */}
                </header>
                <Divider className="mb-6" />
                <div className="scrollbar-thin mb-4 h-[600px] w-full overflow-auto xl:mb-8 xl:min-h-[25rem]">
                    <table className="w-full">
                        <thead>
                            <tr className="sticky top-0 bg-white">
                                <th className="w-0 px-1">#</th>
                                <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">Product</th>
                                <th className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">Voucher</th>
                                <th
                                    colSpan="10"
                                    className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&>*:nth-child(odd)]:bg-gray-100/80">
                            {promotedProducts?.map((promotedProduct, index) => (
                                <tr key={promotedProduct?.id}>
                                    <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                        {index + 1}
                                    </td>
                                    <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                        <p className="font-bold">{ unicodeParse(promotedProduct?.name) }</p>
                                        <small>
                                            { promotedProduct?.type }
                                            { ' | ' }
                                            { promotedProduct?.code }
                                        </small>
                                    </td>
                                    <td className="px-2 py-1 text-left text-xs sm:px-4 sm:py-3 sm:text-base">
                                        <p className="font-bold">{ promotedProduct?.voucher?.code }</p>
                                        <Visibility hidden={promotedProduct?.voucher?.type !== 'Potongan'}>
                                            <small>
                                                Discount:
                                                {' '}
                                                <span className="text-green-500">
                                                    {currencyFormat(promotedProduct?.voucher?.amount)}
                                                </span>
                                            </small>
                                        </Visibility>
                                        <Visibility hidden={promotedProduct?.voucher?.type !== 'Discount'}>
                                            <small>
                                                Discount:
                                                {' '}
                                                <span className="text-green-500">
                                                    {(promotedProduct?.voucher?.amount || 0) * 100}
                                                    %
                                                </span>
                                            </small>
                                        </Visibility>
                                        <Visibility hidden={promotedProduct?.voucher?.type !== 'FixedPrice'}>
                                            <small>
                                                Harga Final:
                                                {' '}
                                                <span className="text-green-500">
                                                    {currencyFormat(promotedProduct?.voucher?.amount)}
                                                </span>
                                            </small>
                                        </Visibility>
                                    </td>
                                    <td className="w-0 p-1 text-center text-xs sm:py-3 sm:text-base">
                                        <Button
                                            className="p-3"
                                            onClick={() => setShow((states) => ({
                                                ...states,
                                                copy: {
                                                    promotedUrl: promotedProduct?.promoted_url,
                                                    message: 'Success copied link to clipboard',
                                                },
                                            }))}
                                        >
                                            <Icon.Copy className="h-4 w-4 stroke-gray-500" />
                                        </Button>
                                    </td>
                                    <td className="w-0 p-1 text-center text-xs sm:py-3 sm:text-base">
                                        <p className="font-bold">
                                            <a
                                                href={promotedProduct?.promoted_url}
                                                target="__blank"
                                                className="flex"
                                            >
                                                <Button className="p-3">
                                                    <Icon.ExternalLink className="h-4 w-4 stroke-blue-500" />
                                                </Button>
                                            </a>
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <footer className="flex w-full flex-col items-start xl:flex-row xl:items-baseline xl:text-left">
                    <p className="mb-4 w-full text-center text-xs text-gray-400 xl:mr-2 xl:w-auto">
                        List of promoted products
                    </p>
                </footer>
            </Card>

            <Toast
                show={show?.copy}
                value={show?.copy?.message}
                duration={2000}
                className="bg-green-100 text-green-500"
                onHide={() => setShow((states) => ({
                    ...states,
                    copy: null,
                }))}
            />
        </>
    );
}

export default PromotedProductList;
