import './style.css';
import React from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Str from '@/utilities/StringHelper';

function ModalAddVoucher(props) {
    const {
        className,
        data,
        onChange,
        onClose,
        onSubmit,
        ...attrs
    } = props;

    return (
        <Modal
            {...attrs}
            onClose={onClose}
            className={Str.joinClassName('affiliator-request-component-modal-approve scrollbar-thin', className)}
        >
            <header className="bg-gradient-primary relative flex items-center justify-center px-6 pt-2 lg:p-6">
                <h2 className="text-center text-xl font-bold">
                    Sure to approve?
                </h2>
                <Button
                    className="absolute right-6 h-8 w-8 rounded-full bg-transparent p-1"
                    onClick={onClose}
                >
                    x
                </Button>
            </header>
            <section className="flex w-full flex-col p-6 lg:flex-row">
                <form
                    className="flex w-full flex-col"
                    onSubmit={onSubmit}
                >
                    <label className="mb-6">
                        <p className="mb-2">
                            Reason
                            <span className="text-slate-400"> (Optional)</span>
                        </p>
                        <textarea
                            required={false}
                            name="statusReason"
                            rows="4"
                            placeholder="Ketikan alasannya"
                            defaultValue={data?.statusReason}
                            className="mt-1 w-full resize-none rounded-lg border border-gray-200 px-4 py-2"
                            onChange={onChange}
                        />
                    </label>
                    <Button
                        type="submit"
                        className="bg-green-500 text-white"
                    >
                        Approve
                    </Button>
                </form>
            </section>
        </Modal>
    );
}

export default ModalAddVoucher;
