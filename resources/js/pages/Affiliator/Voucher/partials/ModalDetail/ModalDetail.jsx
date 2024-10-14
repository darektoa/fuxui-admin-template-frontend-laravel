import './style.css';
import React, { useState } from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Str from '@/utilities/StringHelper';

function ModalDetail(props) {
    const {
        className, data, onChange, onClose, onSubmit, ...attrs
    } = props;

    return (
        <Modal
            {...attrs}
            onClose={onClose}
            className={Str.joinClassName(
                'scrollbar-thin max-h-[90vh] w-[600px] overflow-auto rounded-xl p-0',
                className,
            )}
            wrapperClassName="p-5 items-start lg:items-center"
        >
            <header className="sticky top-0 flex items-center justify-center bg-white px-6 pt-2 lg:p-6">
                <h2 className="text-center text-xl font-bold">Detail Information</h2>
                <Button
                    className="absolute right-6 h-8 w-8 rounded-full bg-transparent p-1"
                    onClick={onClose}
                >
                    x
                </Button>
            </header>
            <section className="flex h-full w-full flex-col p-6">
                <form
                    className="flex w-full flex-col"
                    onSubmit={onSubmit}
                >
                    <p className="mb-2">
                        Voucher Code
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="code"
                        readOnly
                        required
                        placeholder="Please enter new voucher code . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.voucher_code}
                    />
                    <p className="mb-2">
                        Status
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="status"
                        readOnly
                        required
                        placeholder="Please enter new status . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.status?.name}
                    />
                    <p className="mb-2">
                        Valid For
                    </p>
                    <ol
                        type="1"
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                    >
                        {
                            data?.detail?.products?.map((product) => (
                                <li key={data.voucher_code + product.product_code}>
                                    <small>{product.product_code}</small>
                                    <br />
                                    <b dangerouslySetInnerHTML={{ __html: product.product_name }} />
                                </li>
                            ))
                        }
                        {
                            data?.detail?.events?.map((event) => (
                                <li key={data.voucher_code + event.event_code}>
                                    <small>{event.event_code}</small>
                                    <br />
                                    <b dangerouslySetInnerHTML={{ __html: event.event_name }} />
                                </li>
                            ))
                        }
                    </ol>
                </form>
            </section>
        </Modal>
    );
}

export default ModalDetail;
