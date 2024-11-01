import "./style.css"
import { Button, Breadcrumbs, BreadcrumbItem, Card, CardBody, CardHeader, DateInput, Divider, Input } from "@nextui-org/react"
import { FeatherIcon } from "@/components/Icon";
import React from "react";
import { usePage } from "@inertiajs/react";

const Create = () =>
{
    const { CSRF_TOKEN } = usePage().props;

    return (
        <main className="flex flex-col w-full gap-6 py-6">
            <Breadcrumbs>
                <BreadcrumbItem>Dashboard</BreadcrumbItem>
                <BreadcrumbItem>User Management</BreadcrumbItem>
                <BreadcrumbItem>Create</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="shadow-xl">
                <CardHeader className="px-4 flex gap-3">
                    <FeatherIcon.User className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-xl">User Create</h3>
                        <p className="text-small text-default-500">Create a user</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className="overflow-visible py-2 ">
                    <form action="/users" method="POST" className="w-full p-4 grid grid-cols-12 gap-5">
                        <input type="hidden" name="_token" value={CSRF_TOKEN} />

                        <Input
                            isClearable
                            isRequired
                            required
                            type="email"
                            label="Email :"
                            name="email"
                            variant="flat"
                            placeholder="Enter email . . ."
                            className="col-span-12 md:col-span-6 w-full"
                            labelPlacement="outside"
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
                            variant="flat"
                            placeholder="Enter first name . . ."
                            className="col-span-12 md:col-span-6 w-full"
                            labelPlacement="outside"
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
                            variant="flat"
                            placeholder="Enter last name . . ."
                            className="col-span-12 md:col-span-6 w-full"
                            labelPlacement="outside"
                            startContent={
                                <>
                                    <FeatherIcon.Type className="size-4 mr-2" />
                                    <div className="h-4/5 border-r border-slate-300"></div>
                                </>
                            }
                        />
                        <Input
                            isDisabled
                            disabled
                            type="text"
                            label="Password :"
                            name="lastname"
                            variant="flat"
                            placeholder="Enter last password . . ."
                            value="Password123"
                            className="col-span-12 md:col-span-6 w-full"
                            labelPlacement="outside"
                            classNames={{
                                label: "!text-black",
                             }}
                            startContent={
                                <>
                                    <FeatherIcon.Key className="size-4 mr-2 text-black" />
                                    <div className="h-4/5 border-r border-slate-300"></div>
                                </>
                            }
                        />
                        <Input
                            isClearable
                            type="date"
                            label="Birth Date :"
                            name="birthDate"
                            variant="flat"
                            className="col-span-12 md:col-span-6 w-full"
                            labelPlacement="outside"
                            startContent={
                                <>
                                    <FeatherIcon.Clock className="size-4 mr-2 text-black" />
                                    <div className="h-4/5 border-r border-slate-300"></div>
                                </>
                            }
                        />
                        <Input
                            isClearable
                            type="text"
                            label="Birth Place :"
                            name="birthPlace"
                            variant="flat"
                            placeholder="Enter birth place . . ."
                            className="col-span-12 md:col-span-6 w-full"
                            labelPlacement="outside"
                            startContent={
                                <>
                                    <FeatherIcon.Type className="size-4 mr-2" />
                                    <div className="h-4/5 border-r border-slate-300"></div>
                                </>
                            }
                        />
                        <Button color="primary" type="submit" className="col-span-12">
                            Create
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </main>
    );
}

export default Create;
