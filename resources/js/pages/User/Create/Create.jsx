import "./style.css"
import {
    Button,
    Breadcrumbs,
    BreadcrumbItem,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react"
import { FeatherIcon } from "@/components/Icon";
import React from "react";
import { usePage } from "@inertiajs/react";

const Create = () =>
{
    const { CSRF_TOKEN, roles } = usePage().props;

    return (
        <main className="flex flex-col w-full gap-6 py-6">
            <Breadcrumbs>
                <BreadcrumbItem>User Management</BreadcrumbItem>
                <BreadcrumbItem href="/users">Users</BreadcrumbItem>
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
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-6 w-full"
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
                            variant="flat"
                            placeholder="Enter first name . . ."
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-6 w-full"
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
                            variant="flat"
                            placeholder="Enter last name . . ."
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-6 w-full"
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
                        <Select
                            isClearable
                            isRequired
                            required
                            label="Roles :"
                            name="roleId[]"
                            selectionMode="multiple"
                            placeholder="Select a role . . ."
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-6 w-full"
                            classNames={{
                                trigger: "focus-within:ring-2",
                            }}
                        >
                            {roles?.map((role) => (
                                <SelectItem key={role.id} value={role.id}>
                                    {role.name}
                                </SelectItem>
                            ))}
                        </Select>
                        <Input
                            isClearable
                            type="date"
                            label="Birth Date :"
                            name="birthDate"
                            variant="flat"
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-6 w-full"
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
                            variant="flat"
                            placeholder="Enter birth place . . ."
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-6 w-full"
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
                            variant="flat"
                            placeholder="Enter phone number . . ."
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-6 w-full"
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
                        <Input
                            isDisabled
                            disabled
                            type="text"
                            label="Password :"
                            name="password"
                            variant="flat"
                            placeholder="Enter last password . . ."
                            value="Password123#"
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-6 w-full"
                            classNames={{
                                inputWrapper: "focus-within:ring-2",
                                label: "!text-black",
                             }}
                            startContent={
                                <>
                                    <FeatherIcon.Key className="size-4 mr-2 text-black" />
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
