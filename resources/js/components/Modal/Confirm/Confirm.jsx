import React, { useEffect, useState } from 'react';
import Button from '../../Button';
import Str from '../../../utilities/StringHelper';

function Confirm(props) {
    const {
        children, className, onClose, onShow, onSubmit, show, ...attrs
    } = props;
    const [showMe, setShowMe] = useState(show);

    const closeHandle = () => {
        if (onClose) onClose();
        setShowMe(false);
    };

    const showHandle = () => {
        if (onShow) onShow();
    };

    const submitHandle = () => {
        if (onSubmit) {
            onSubmit();
            setShowMe(false);
        }
    };

    useEffect(() => {
        if (new Boolean(show)) showHandle();
        setShowMe(show);
    }, [show]);

    return (
        <div
            onClick={closeHandle}
            className={Str.joinClassName(
                'fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-slate-900 bg-opacity-10 transition-all duration-200',
                showMe || 'scale-0 opacity-0',
            )}
        >
            <section
                {...attrs}
                className={Str.joinClassName('w-11/12 max-w-lg rounded-xl bg-white p-11', className)}
            >
                <div className="flex w-full flex-col items-center text-center">{children}</div>
                <div className="flex justify-center font-semibold">
                    <Button
                        className="mr-5 bg-[#F4F4F4] px-12 text-[#4A4A4A]"
                        onClick={closeHandle}
                        data-cy="modal-delete-cancel-button"
                    >
                        Batal
                    </Button>
                    <Button
                        className="bg-danger px-12 text-white"
                        onClick={submitHandle}
                        data-cy="modal-delete-confirm-button"
                    >
                        Hapus
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default Confirm;
