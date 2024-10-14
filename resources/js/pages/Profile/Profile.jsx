import './style.css';
import { usePage } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import useForm from '@/hooks/useForm';
import Component from './components';
import Partial from './partials';

function Profile() {
    const formRef = useRef();
    const { CSRF_TOKEN, profile } = usePage().props;
    const { handleChange, values } = useForm({
        affiliate_code: null,
    });

    const [show, setShow] = useState({
        affiliateCodeWarning: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            values.affiliate_code !== null
            && show.affiliateCodeWarning === false
        ) {
            setShow((values) => ({
                ...values,
                affiliateCodeWarning: true,
            }));
        } else {
            setShow((values) => ({
                ...values,
                affiliateCodeWarning: false,
            }));
            formRef.current.submit();
        }
    };

    return (
        <main className="scrollbar-thin flex h-full w-full flex-col items-center justify-start overflow-auto p-10">
            <form
                ref={formRef}
                action="/profile"
                method="POST"
                onSubmit={handleSubmit}
                className="w-[600px] max-w-lg"
            >
                <input
                    type="hidden"
                    name="_token"
                    value={CSRF_TOKEN}
                />
                <Component.AlertStatus
                    className="mb-4 flex flex-col"
                    status={profile?.status?.id}
                >
                    <h2 className="text-lg font-bold text-inherit">{profile?.status?.name}</h2>
                    <p className="text-inherit">{profile?.status?.reason}</p>
                </Component.AlertStatus>
                <Card className="mb-4 flex w-full flex-col border-t-4 border-t-primary-main">
                    <h2 className="mb-4 text-lg font-bold">Account Information</h2>
                    <p className="mb-2">
                        Full Name
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Please enter your full name . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        defaultValue={profile?.name}
                    />
                    <p className="mb-2">
                        Affiliate Code
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="affiliate_code"
                        required
                        onInput={handleChange}
                        defaultValue={profile?.affiliate_code}
                        disabled={
                            profile?.affiliate_code
                            && profile?.affiliate_code !== profile?.username?.toLowerCase()
                        }
                        placeholder="Set your unique code . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                    />
                    <small className="d-block mb-4 text-gray-600">
                        Unique code for you to share in your promotions
                    </small>
                    <p className="mb-2">
                        Birth date
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="date"
                        name="detail[birth_date]"
                        required
                        placeholder="Please enter your birth date . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        defaultValue={profile?.detail?.birth_date}
                    />
                    <p className="mb-2">
                        Phone Number (WhatsApp)
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="detail[whatsapp_number]"
                        required
                        placeholder="Please enter your phone number . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        defaultValue={profile?.detail?.whatsapp_number}
                    />
                    <p className="mb-2">
                        Address
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="detail[domicile_address]"
                        required
                        placeholder="Please enter your address . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        defaultValue={profile?.detail?.domicile_address}
                    />
                    <p className="mb-2">
                        City
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="detail[city]"
                        required
                        placeholder="Please enter your city . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        defaultValue={profile?.detail?.city}
                    />
                    <p className="mb-2">
                        Job
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="detail[occupation]"
                        required
                        placeholder="Please enter your job . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        defaultValue={profile?.detail?.occupation}
                    />
                    <p className="mb-2">
                        Work Place
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="detail[instance]"
                        required
                        placeholder="Please enter your work place . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        defaultValue={profile?.detail?.instance}
                    />
                </Card>
                <Card className="mb-4 flex w-full flex-col border-t-4 border-t-primary-main">
                    <h2 className="mb-4 text-lg font-bold">Your Social Media Account</h2>
                    <p className="mb-2">Instagram</p>
                    <input
                        type="text"
                        name="detail[instagram_acc]"
                        // required={true}
                        className="mb-1 w-full rounded-md bg-gray-50 px-4 py-2"
                        defaultValue={profile?.detail?.instagram_acc}
                    />
                    <small className="d-block mb-4 text-gray-600">example: instagram.com/dqlab</small>
                    <p className="mb-2">Tiktok</p>
                    <input
                        type="text"
                        name="detail[tiktok_acc]"
                        // required={true}
                        className="mb-1 w-full rounded-md bg-gray-50 px-4 py-2"
                        defaultValue={profile?.detail?.tiktok_acc}
                    />
                    <small className="d-block mb-4 text-gray-600">example: tiktok.com/@dqlab</small>
                    <p className="mb-2">youtube</p>
                    <input
                        type="text"
                        name="detail[youtube_acc]"
                        // required={true}
                        className="mb-1 w-full rounded-md bg-gray-50 px-4 py-2"
                        defaultValue={profile?.detail?.youtube_acc}
                    />
                    <small className="d-block mb-4 text-gray-600">example: youtube.com/@dqlab</small>
                </Card>
                <Card className="mb-4 flex w-full flex-col border-t-4 border-t-primary-main">
                    <h2 className="mb-1 text-lg font-bold">Bank Account Information</h2>
                    <p className="mb-4 text-sm text-slate-500">For withdrawal purpose</p>
                    <p className="mb-2">
                        Bank Name
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="detail[bank_name]"
                        required
                        placeholder="Please enter your bank name . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        defaultValue={profile?.detail?.bank_name}
                    />
                    <p className="mb-2">
                        Bank Account Number
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        name="detail[bank_account_number]"
                        required
                        placeholder="Please enter you bank account number . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        defaultValue={profile?.detail?.bank_account_number}
                    />
                    <p className="mb-2">NPWP (Optional)</p>
                    <input
                        type="text"
                        name="detail[npwp_number]"
                        placeholder="Please enter your npwp number . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                        defaultValue={profile?.detail?.npwp_number}
                    />
                </Card>
                <Button
                    type="submit"
                    className="bg-primary-accent text-white"
                >
                    Save
                </Button>
            </form>

            <Partial.ModalWarning
                show={show.affiliateCodeWarning}
                data={{
                    title: 'Affiliate Code',
                    message: (
                        <>
                            The
                            <b> Affiliate Code </b>
                            can only be changed once, are you sure you want to change it?
                        </>
                    ),
                }}
                onSubmit={handleSubmit}
                onClose={() => setShow((states) => ({
                    ...states,
                    affiliateCodeWarning: false,
                }))}
            />
        </main>
    );
}

export default Profile;
