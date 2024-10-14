import './style.css';
import { usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { NavLink } from 'react-router-dom';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import Partial from './partials';

function SignUp() {
    const {
        CSRF_TOKEN, RECAPTCHA_SITE_KEY, errors, inputs, flash,
    } = usePage().props;

    const [show, setShow] = useState({
        error: flash.message || (Object.values(errors).length && flash.errors),
    });

    const [values, setValues] = useState({
        recaptcha: '',
    });

    const handleRecaptchaChange = (value) => {
        setValues((values) => ({
            ...values,
            recaptcha: value || '',
        }));
    };

    return (
        <main className="flex h-full w-full flex-col items-center justify-start overflow-auto bg-sky-50 px-4 py-10 sm:p-10">
            <Partial.ModalError
                show={show.error}
                data={errors}
                onClose={() => setShow((states) => ({ ...states, error: false }))}
            />

            <form
                action="/sign-up"
                method="POST"
                className="w-full max-w-lg"
            >
                <input
                    type="hidden"
                    name="_token"
                    defaultValue={CSRF_TOKEN}
                />

                <Card className="mb-4 flex w-full flex-col border-t-4 border-t-primary-main">
                    <h2 className="mb-4 text-lg font-bold">Account Credential</h2>

                    <p className="mb-2">
                        Email
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="email"
                        name="email"
                        required
                        defaultValue={inputs?.email}
                        placeholder="Please enter your email . . ."
                        className="mb-2 w-full rounded-md bg-gray-50 px-4 py-2"
                        autoFocus
                    />
                    <small className="d-block mb-4 text-gray-600">You must be member of academy.dqlab.id</small>
                    <p className="mb-2">
                        Password
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Please enter your password . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                    />
                    <p className="mb-2">
                        Confirm Password
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="password"
                        name="confirm_password"
                        required
                        placeholder="Please enter your confirmation password . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                    />
                </Card>
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
                        defaultValue={inputs?.name}
                        placeholder="Please enter your full name . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
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
                        defaultValue={inputs?.affiliate_code}
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
                        defaultValue={inputs?.detail?.birth_date}
                        placeholder="Please enter your birth date . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
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
                        defaultValue={inputs?.detail?.whatsapp_number}
                        placeholder="Please enter your phone number . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
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
                        defaultValue={inputs?.detail?.domicile_address}
                        placeholder="Please enter your address . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                    />
                    <p className="mb-2">
                        City
                        {' '}
                        <span className="text-red-600">*</span>
                    </p>
                    <input
                        type="text"
                        required
                        defaultValue={inputs?.detail?.city}
                        name="detail[city]"
                        placeholder="Please enter your city . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
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
                        defaultValue={inputs?.detail?.occupation}
                        placeholder="Please enter your job . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
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
                        defaultValue={inputs?.detail?.instance}
                        placeholder="Please enter your work place . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                    />
                </Card>
                <Card className="mb-4 flex w-full flex-col border-t-4 border-t-primary-main">
                    <h2 className="mb-4 text-lg font-bold">Your Social Media Account</h2>
                    <p className="mb-2">Instagram</p>
                    <input
                        type="text"
                        name="detail[instagram_acc]"
                        defaultValue={inputs?.detail?.instagram_acc || 'instagram.com/'}
                        className="mb-1 w-full rounded-md bg-gray-50 px-4 py-2"
                    />
                    <small className="d-block mb-4 text-gray-600">example: instagram.com/dqlab</small>
                    <p className="mb-2">Tiktok</p>
                    <input
                        type="text"
                        name="detail[tiktok_acc]"
                        defaultValue={inputs?.detail?.tiktok_acc || 'tiktok.com/@'}
                        className="mb-1 w-full rounded-md bg-gray-50 px-4 py-2"
                    />
                    <small className="d-block mb-4 text-gray-600">example: tiktok.com/@dqlab</small>
                    <p className="mb-2">youtube</p>
                    <input
                        type="text"
                        name="detail[youtube_acc]"
                        defaultValue={inputs?.detail?.youtube_acc || 'youtube.com/@'}
                        className="mb-1 w-full rounded-md bg-gray-50 px-4 py-2"
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
                        defaultValue={inputs?.detail?.bank_name}
                        placeholder="Please enter your bank name . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
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
                        defaultValue={inputs?.detail?.bank_account_number}
                        placeholder="Please enter you bank account number . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                    />
                    <p className="mb-2">NPWP (Optional)</p>
                    <input
                        type="text"
                        name="detail[npwp_number]"
                        required={false}
                        defaultValue={inputs?.detail?.npwp_number}
                        placeholder="Please enter your npwp number . . ."
                        className="mb-4 w-full rounded-md bg-gray-50 px-4 py-2"
                    />
                </Card>
                <Card className="mb-4 flex w-full flex-col border-t-4 border-t-primary-main">
                    <h2 className="mb-1 text-2xl font-bold">Question</h2>
                    <p className="mb-4 text-sm text-slate-500">Other questions for help us</p>
                    <p className="mb-2">How did you know DQLab Affiliate Program ?</p>
                    <div className="mb-2 flex items-center">
                        <input
                            id="question-1-answer-1"
                            type="radio"
                            defaultValue="Website DQLab.id"
                            name="detail[question]-1"
                            className="h-4 w-4"
                        />
                        <label
                            htmlFor="question-1-answer-1"
                            className="ml-2"
                        >
                            Website DQLab.id
                        </label>
                    </div>
                    <div className="mb-2 flex items-center">
                        <input
                            id="question-1-answer-2"
                            type="radio"
                            defaultValue="Broadcast from DQLab"
                            name="detail[question]-1"
                            className="h-4 w-4"
                        />
                        <label
                            htmlFor="question-1-answer-2"
                            className="ml-2"
                        >
                            Broadcast from DQLab
                        </label>
                    </div>
                    <div className="mb-2 flex items-center">
                        <input
                            id="question-1-answer-3"
                            type="radio"
                            defaultValue="Instagram DQLab"
                            name="detail[question]-1"
                            className="h-4 w-4"
                        />
                        <label
                            htmlFor="question-1-answer-3"
                            className="ml-2"
                        >
                            Instagram DQLab
                        </label>
                    </div>
                    <div className="mb-2 flex items-center">
                        <input
                            id="question-1-answer-4"
                            type="radio"
                            defaultValue="Tiktok DQLab"
                            name="detail[question]-1"
                            className="h-4 w-4"
                        />
                        <label
                            htmlFor="question-1-answer-4"
                            className="ml-2"
                        >
                            Tiktok DQLab
                        </label>
                    </div>
                    <div className="mb-2 flex items-center">
                        <input
                            id="question-1-answer-5"
                            type="radio"
                            defaultValue="Relatives/Friend/Colleague<"
                            name="detail[question]-1"
                            className="h-4 w-4"
                        />
                        <label
                            htmlFor="question-1-answer-5"
                            className="ml-2"
                        >
                            Relatives/Friend/Colleague
                        </label>
                    </div>
                </Card>
                <Card className="mb-4 flex w-full flex-col border-t-4 border-t-primary-main">
                    <h2 className="mb-1 text-2xl font-bold">Human Verification</h2>
                    <p className="mb-4 text-sm text-slate-500">Just click the checkbox, and complete the questions</p>
                    <div className="relative flex w-full items-center">
                        <input
                            type="checkbox"
                            name="recaptcha"
                            required
                            checked={Boolean(values.recaptcha)}
                            onChange={() => {}}
                            value={values.recaptcha}
                            className="absolute left-3 z-0 opacity-0"
                        />

                        <ReCAPTCHA
                            hl="id"
                            theme="light"
                            className="relative z-10 flex w-full"
                            sitekey={RECAPTCHA_SITE_KEY}
                            onChange={handleRecaptchaChange}
                        />
                    </div>
                </Card>

                <div className="flex items-center justify-between">
                    <Button
                        type="submit"
                        className="mr-4 bg-primary-accent text-white"
                    >
                        Submit
                    </Button>
                    <span>
                        Already have an account ?
                        {' '}
                        <NavLink
                            to="/sign-in"
                            className="underline"
                        >
                            sign in here
                        </NavLink>
                    </span>
                </div>
            </form>
        </main>
    );
}

export default SignUp;
