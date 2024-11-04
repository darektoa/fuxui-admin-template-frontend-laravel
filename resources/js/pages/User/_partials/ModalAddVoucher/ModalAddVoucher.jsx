import './style.css';
import { usePage } from '@inertiajs/react';
import React from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Str from '@/utilities/StringHelper';

function ModalAddVoucher(props) {
    const {
        className,
        onChange,
        onClose,
        onSubmit,
        ...attrs
    } = props;

    const { statics } = usePage().props;

    return (
        <Modal
            {...attrs}
            onClose={onClose}
            className={Str.joinClassName('affiliator-request-component-modal-add-voucher scrollbar-thin', className)}
        >
            <header className="sticky top-0 flex items-center justify-center bg-white px-6 pt-2 lg:p-6">
                <h2 className="text-center text-xl font-bold">Add Vouchers for Organization</h2>
                <Button
                    className="absolute right-6 h-8 w-8 rounded-full bg-transparent p-1"
                    onClick={onClose}
                >
                    x
                </Button>
            </header>
            <section className="flex h-full w-full flex-col p-6">
                <form
                    className="flex flex-col"
                    onSubmit={onSubmit}
                >
                    <p className="mb-2">
                        Voucher Prefix
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="prefix"
                        required
                        placeholder="Enter prefix voucher . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                    />
                    <p className="mb-2">
                        Organization Name
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="organization_name"
                        required
                        placeholder="Enter organization name  . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                    />
                    <p className="mb-2">
                        Organization Type
                        <span className="text-red-600">*</span>
                    </p>
                    <select
                        required
                        name="organization_type_id"
                        className="mb-4 w-full rounded-lg border border-gray-200 px-4 py-2 text-base font-normal"
                        onChange={onChange}
                        defaultValue=""
                    >
                        <option value="">None</option>
                        {statics?.organizationTypes?.map((type) => (
                            <option
                                key={`org-type-${type?.id}`}
                                value={type?.id}
                            >
                                {type?.name}
                            </option>
                        ))}
                    </select>
                    <Button
                        type="submit"
                        className="bg-primary-main text-white"
                    >
                        Submit
                    </Button>
                </form>
            </section>
        </Modal>
    );
}

export default ModalAddVoucher;
