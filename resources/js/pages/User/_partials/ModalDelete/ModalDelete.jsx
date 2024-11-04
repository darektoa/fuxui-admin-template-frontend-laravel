import './style.css';
import React from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Str from '@/utilities/StringHelper';

function ModalDelete(props) {
    const {
        className,
        onClose,
        onSubmit,
        ...attrs
    } = props;

    return (
        <Modal
            {...attrs}
            onClose={onClose}
            className={Str.joinClassName('affiliator-request-component-modal-sync scrollbar-thin', className)}
        >
            <header className="sticky top-0 flex items-center justify-center bg-white px-6 pt-2 lg:p-6">
                <h2 className="text-center text-xl font-bold">
                    Delete User
                </h2>
                <Button
                    className="absolute right-6 h-8 w-8 rounded-full bg-transparent p-1"
                    onClick={onClose}
                >
                    x
                </Button>
            </header>
            <section className="flex h-full w-full flex-col p-6">
                <h3 className="text-center text-xl font-semibold text-red-500">WARNING!</h3>
                <p className="mb-6 text-center text-base">
                    This will disable this user account permanently! Are you sure?
                </p>
                <form
                    className="flex flex-col"
                    onSubmit={onSubmit}
                >
                    <Button
                        type="submit"
                        className="bg-red-600 text-white"
                    >
                        Delete
                    </Button>
                </form>
            </section>
        </Modal>
    );
}

export default ModalDelete;
