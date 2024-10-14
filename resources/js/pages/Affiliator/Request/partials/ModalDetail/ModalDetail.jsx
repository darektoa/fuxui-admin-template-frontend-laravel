import './style.css';
import React from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Str from '@/utilities/StringHelper';

function ModalDetail(props) {
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
            className={Str.joinClassName(
                'affiliator-request-component-modal-detail scrollbar-thin',
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
                        Full Name
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Please enter the full name . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.name}
                        data-isedited={Boolean(data?.updated_fields?.name)}
                    />
                    <p className="mb-2">Username</p>
                    <input
                        readOnly
                        type="text"
                        name="username"
                        placeholder="Enter new username . . ."
                        className="mb-4 mr-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.username?.toUpperCase()}
                        data-isedited={Boolean(data?.updated_fields?.username)}
                    />
                    <p className="mb-2">
                        Birth date
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="date"
                        name="birth_date"
                        required
                        placeholder="Please enter your birth date . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.detail?.birth_date}
                        data-isedited={Boolean(data?.updated_fields?.birth_date)}
                    />
                    <p className="mb-2">
                        Phone Number (WhatsApp)
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="whatsapp_number"
                        required
                        placeholder="Please enter your phone number . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.detail?.whatsapp_number}
                        data-isedited={Boolean(data?.updated_fields?.whatsapp_number)}
                    />
                    <p className="mb-2">
                        Address
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="domicile_address"
                        required
                        placeholder="Please enter your address . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.detail?.domicile_address}
                        data-isedited={Boolean(data?.updated_fields?.domicile_address)}
                    />
                    <p className="mb-2">
                        City
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="city"
                        required
                        placeholder="Please enter your city . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.detail?.city}
                        data-isedited={Boolean(data?.updated_fields?.city)}
                    />
                    <p className="mb-2">
                        Job
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="occupation"
                        required
                        placeholder="Please enter your job . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.detail?.occupation}
                        data-isedited={Boolean(data?.updated_fields?.occupation)}
                    />
                    <p className="mb-2">
                        Work Place
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="instance"
                        required
                        placeholder="Please enter your work place . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.detail?.instance}
                        data-isedited={Boolean(data?.updated_fields?.instance)}
                    />
                    <hr className="mb-4" />
                    <h2 className="mb-4 text-lg font-bold">Affiliator Social Media Account</h2>
                    <p className="mb-2">Instagram</p>
                    <input
                        type="text"
                        name="instagram_acc"
                        className="mb-1 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.detail?.instagram_acc}
                        data-isedited={Boolean(data?.updated_fields?.instagram_acc)}
                    />
                    <small className="d-block mb-4 text-gray-600">example: instagram.com/dqlab</small>
                    <p className="mb-2">Tiktok</p>
                    <input
                        type="text"
                        name="tiktok_acc"
                        className="mb-1 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.detail?.tiktok_acc}
                        data-isedited={Boolean(data?.updated_fields?.tiktok_acc)}
                    />
                    <small className="d-block mb-4 text-gray-600">example: tiktok.com/@dqlab</small>
                    <p className="mb-2">youtube</p>
                    <input
                        type="text"
                        name="youtube_acc"
                        className="mb-1 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.detail?.youtube_acc}
                        data-isedited={Boolean(data?.updated_fields?.youtube_acc)}
                    />
                    <small className="d-block mb-4 text-gray-600">example: youtube.com/@dqlab</small>
                    <hr className="mb-4" />
                    <h2 className="mb-1 text-lg font-bold">Bank Account Information</h2>
                    <p className="mb-4 text-sm text-slate-500">For withdrawal purpose</p>
                    <p className="mb-2">
                        Bank Name
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="bank_name"
                        required
                        placeholder="Please enter your bank name . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.detail?.bank_name}
                        data-isedited={Boolean(data?.updated_fields?.bank_name)}
                    />
                    <p className="mb-2">
                        Bank Account Number
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="bank_account_number"
                        required
                        placeholder="Please enter you bank account number . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.detail?.bank_account_number}
                        data-isedited={Boolean(data?.updated_fields?.bank_account_number)}
                    />
                    <p className="mb-2">NPWP (Optional)</p>
                    <input
                        type="text"
                        name="npwp_number"
                        required={false}
                        placeholder="Please enter your npwp number . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        onChange={onChange}
                        defaultValue={data?.detail?.npwp_number}
                        data-isedited={Boolean(data?.updated_fields?.npwp_number)}
                    />
                    <div className="sticky bottom-0 p-6 bg-white">
                        <Button
                            type="submit"
                            className="w-full bg-primary-main text-white"
                        >
                            Edit
                        </Button>
                    </div>
                </form>
            </section>
        </Modal>
    );
}

export default ModalDetail;
