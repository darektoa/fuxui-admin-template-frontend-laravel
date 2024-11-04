import './style.css';
import { useSearchParams } from 'react-router-dom';
import React, { useMemo } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import Str from '@/utilities/StringHelper';

function ModalFilter(props) {
    const { className, onClose, ...attrs } = props;
    const [searchParams, setSearchParams] = useSearchParams(
        new URLSearchParams({
            orderBy: '',
        }),
    );

    const orderBy = useMemo(() => searchParams.get('orderBy'), [searchParams]);

    const resetClickandle = (e) => {
        searchParams.delete('search');
        searchParams.delete('orderBy');
        setSearchParams(searchParams);
        window.location.reload();
    };

    const orderByChangeHandle = (e) => {
        searchParams.set('orderBy', e.target.value);
        setSearchParams(searchParams);
        window.location.reload();
    };

    return (
        <Modal
            {...attrs}
            onClose={onClose}
            className={Str.joinClassName('affiliator-request-component-modal-filter scrollbar-thin', className)}
        >
            <Card className="scrollbar-thin max-h-[72vh] w-full overflow-auto p-5 pt-0">
                <header className="sticky top-0 mb-6 flex w-full items-end border-b border-gray-200 bg-white pt-5 pb-4">
                    <h2 className="text-xl font-bold">Filter</h2>
                    <Button
                        className="ml-auto py-1 px-4"
                        onClick={resetClickandle}
                    >
                        Hapus Filter
                    </Button>
                </header>
                <section>
                    <h3 className="text-base font-semibold">Order By:</h3>
                    <ul className="mb-6">
                        <li className="border-b p-2">
                            <label className="mb-6 text-sm font-bold uppercase">
                                <select
                                    required
                                    name="orderBy"
                                    className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 text-base font-normal"
                                    value={orderBy}
                                    onChange={orderByChangeHandle}
                                >
                                    <option value="">None</option>
                                    {['Latest', 'Oldest']?.map((education, index) => (
                                        <option
                                            key={`education-option-${index}`}
                                            value={education}
                                        >
                                            {education}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </li>
                    </ul>
                </section>
            </Card>
        </Modal>
    );
}

export default ModalFilter;
