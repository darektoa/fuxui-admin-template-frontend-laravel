import './style.css';
import {
    Button,
    Breadcrumbs,
    BreadcrumbItem,
    Card,
    CardBody,
    CardHeader,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import { router, usePage } from "@inertiajs/react";
import Partial from './partials';
import React, { useEffect, useRef, useState } from 'react';
import toDataURL from "@/utilities/toDataURL";
import useForm from '@/hooks/useForm';

function Profile() {
    const { CSRF_TOKEN, profile } = usePage().props;
    const { handleChange, values, setValues } = useForm({
        _method: 'PATCH',
        profilePicturePreviews: [profile?.profilePictures?.[0]?.uri],
        profilePictures: [],
        email: profile?.email,
        username: profile?.username,
        firstname: profile?.firstname,
        lastname: profile?.lastname,
        birthDate: profile?.birthDate,
        birthPlace: profile?.birthPlace,
        phoneNumber: profile?.phoneNumber,
    });

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const {profilePicturePreviews, ...vals} = values;
        router.post(`/profile`, vals, {
            forceFormData: true,
        });
    };

    useEffect(() => {
        const profilePict = values.profilePictures[0];
        if(profilePict === null || typeof profilePict !== 'object') return;

        toDataURL(profilePict)
            .then((value) => {
                setValues(states => {
                    const previews = [
                        value,
                        ...states.profilePicturePreviews,
                    ];

                    return {
                        ...states,
                        profilePicturePreviews: previews,
                    }
                });
            });
    }, [values?.profilePictures]);

    return (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Breadcrumbs className="col-span-12">
                <BreadcrumbItem>Profile</BreadcrumbItem>
                <BreadcrumbItem>Edit</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="col-span-12 shadow-xl">
                <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                    <FeatherIcon.User className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg uppercase">
                            USER EDIT
                        </h3>
                        <p className="text-small text-default-500">
                            Edit a user
                        </p>
                    </div>
                </CardHeader>
                <CardBody
                    as={"form"}
                    action={`/profile`}
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={handleUpdateSubmit}
                    className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible"
                >
                    <Partial.ProfilePictureInput
                        name="profilePictures[]"
                        onChange={handleChange}
                        className="col-span-4 row-span-4 mx-auto max-w-64"
                        imagePreviewSrc={values.profilePicturePreviews[0]}
                    />

                    <Input
                        isClearable
                        isRequired
                        required
                        type="email"
                        label="Email :"
                        name="email"
                        defaultValue={values?.email}
                        onInput={handleChange}
                        variant="flat"
                        placeholder="Enter email . . ."
                        labelPlacement="outside"
                        className="col-span-12 md:col-span-4 w-full"
                        classNames={{
                            inputWrapper: "focus-within:ring-2",
                        }}
                        startContent={
                            <>
                                <FeatherIcon.Mail className="size-4 mr-2" />
                                <div className="h-4/5 border-r border-slate-300"></div>
                            </>
                        }
                    />
                    <Input
                        isClearable
                        isRequired
                        required
                        type="text"
                        label="First Name :"
                        name="firstname"
                        defaultValue={values?.firstname}
                        onInput={handleChange}
                        variant="flat"
                        placeholder="Enter first name . . ."
                        labelPlacement="outside"
                        className="col-span-12 md:col-span-4 w-full"
                        classNames={{
                            inputWrapper: "focus-within:ring-2",
                        }}
                        startContent={
                            <>
                                <FeatherIcon.Type className="size-4 mr-2" />
                                <div className="h-4/5 border-r border-slate-300"></div>
                            </>
                        }
                    />
                    <Input
                        isClearable
                        type="text"
                        label="Last Name :"
                        name="lastname"
                        defaultValue={values?.lastname}
                        onInput={handleChange}
                        variant="flat"
                        placeholder="Enter last name . . ."
                        labelPlacement="outside"
                        className="col-span-12 md:col-span-4 w-full"
                        classNames={{
                            inputWrapper: "focus-within:ring-2",
                        }}
                        startContent={
                            <>
                                <FeatherIcon.Type className="size-4 mr-2" />
                                <div className="h-4/5 border-r border-slate-300"></div>
                            </>
                        }
                    />
                    <Input
                        isClearable
                        type="date"
                        label="Birth Date :"
                        name="birthDate"
                        defaultValue={values?.birthDate}
                        onInput={handleChange}
                        variant="flat"
                        labelPlacement="outside"
                        className="col-span-12 md:col-span-4 w-full"
                        classNames={{
                            inputWrapper: "focus-within:ring-2",
                        }}
                        startContent={
                            <>
                                <FeatherIcon.Calendar className="size-4 mr-2 text-black" />
                                <div className="h-4/5 border-r border-slate-300"></div>
                            </>
                        }
                    />
                    <Input
                        isClearable
                        type="text"
                        label="Birth Place :"
                        name="birthPlace"
                        defaultValue={values?.birthPlace}
                        onInput={handleChange}
                        variant="flat"
                        placeholder="Enter birth place . . ."
                        labelPlacement="outside"
                        className="col-span-12 md:col-span-4 w-full"
                        classNames={{
                            inputWrapper: "focus-within:ring-2",
                        }}
                        startContent={
                            <>
                                <FeatherIcon.Type className="size-4 mr-2" />
                                <div className="h-4/5 border-r border-slate-300"></div>
                            </>
                        }
                    />
                    <Input
                        isClearable
                        type="tel"
                        label="Phone Number :"
                        name="phoneNumber"
                        defaultValue={values?.phoneNumber}
                        onInput={handleChange}
                        variant="flat"
                        placeholder="Enter phone number . . ."
                        labelPlacement="outside"
                        className="col-span-12 md:col-span-4 w-full"
                        classNames={{
                            inputWrapper: "focus-within:ring-2",
                        }}
                        startContent={
                            <>
                                <FeatherIcon.Phone className="size-4 mr-2" />
                                <div className="h-4/5 border-r border-slate-300"></div>
                            </>
                        }
                    />
                    <Button
                        color="primary"
                        type="submit"
                        className="col-span-12 md:col-span-8"
                    >
                        Edit
                    </Button>
                </CardBody>
            </Card>
        </main>
    );
}

export default Profile;
