import './style.css';
import React from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import Str from '@/utilities/StringHelper';

function ModalSuccess(props) {
    const {
        className, data, onClose, ...attrs
    } = props;

    return (
        <Modal
            {...attrs}
            onClose={onClose}
            className={Str.joinClassName('affiliator-request-component-modal-success scrollbar-thin', className)}
        >
            <Card className="scrollbar-thin max-h-[72vh] w-full overflow-auto p-5 pt-0">
                <header
                    className="relative flex w-full items-center justify-center border-b
                    border-gray-200 bg-white p-6"
                >
                    <h2 className="text-center text-xl font-bold">Success</h2>
                    <Button
                        className="ml-auto h-8 w-8 rounded-full bg-white/20 p-1"
                        onClick={onClose}
                    >
                        x
                    </Button>
                </header>
                <section className="flex     w-auto flex-col justify-center p-6 text-green-600 lg:flex-row">
                    {typeof data === 'string' ? (
                        <p
                            className="text-inherit"
                            dangerouslySetInnerHTML={{ __html: data }}
                        />
                    ) : (
                        Object.values(data || {})?.map((error, index) => (
                            <p
                                className="text-inherit"
                                key={`err-${index}`}
                                dangerouslySetInnerHTML={{ __html: error }}
                            />
                        ))
                    )}
                </section>
            </Card>
        </Modal>
    );
}

export default ModalSuccess;
