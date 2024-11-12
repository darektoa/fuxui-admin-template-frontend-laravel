import "./style.css";
import {
    Button,
    Breadcrumbs,
    BreadcrumbItem,
    Card,
    CardBody,
    CardHeader,
    Input,
} from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import { usePage } from "@inertiajs/react";
import React from "react";

const Create = () => {
    const { CSRF_TOKEN } = usePage().props;

    return (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Breadcrumbs className="col-span-12">
                <BreadcrumbItem>User Management</BreadcrumbItem>
                <BreadcrumbItem href="/users/roles">Roles</BreadcrumbItem>
                <BreadcrumbItem>Create</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="col-span-12 shadow-xl">
                <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                    <FeatherIcon.UserCheck className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg uppercase">User Role Create</h3>
                        <p className="text-small text-default-500">
                            Create a user role
                        </p>
                    </div>
                </CardHeader>
                <CardBody
                    as="form"
                    action="/users/roles"
                    method="POST"
                    className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible"
                >
                    <input type="hidden" name="_token" value={CSRF_TOKEN} />

                    <Input
                        isClearable
                        isRequired
                        required
                        type="text"
                        label="Role Name :"
                        name="name"
                        variant="flat"
                        placeholder="Enter role name . . ."
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
                        isRequired
                        required
                        type="text"
                        label="Codename :"
                        name="codename"
                        variant="flat"
                        placeholder="Enter codename . . ."
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
                    <Button
                        color="primary"
                        type="submit"
                        className="col-span-12"
                    >
                        Create
                    </Button>
                </CardBody>
            </Card>
        </main>
    );
};

export default Create;
