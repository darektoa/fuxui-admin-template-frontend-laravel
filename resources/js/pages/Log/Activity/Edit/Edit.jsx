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
import { usePage } from "@inertiajs/react";
import React from "react";

const Edit = () =>
{
    const { CSRF_TOKEN, role } = usePage().props;
    console.log(role);

    return (
        <main className="flex flex-col w-full gap-6 py-6">
            <Breadcrumbs>
                <BreadcrumbItem>User Management</BreadcrumbItem>
                <BreadcrumbItem href="/users/roles">Roles</BreadcrumbItem>
                <BreadcrumbItem>Edit</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="shadow-xl">
                <CardHeader className="px-4 flex gap-3">
                    <FeatherIcon.UserCheck className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-xl">Role Edit</h3>
                        <p className="text-small text-default-500">Edit a role</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className="overflow-visible py-2 ">
                    <form action={`/users/roles/${role.id}`} method="POST" className="w-full p-4 grid grid-cols-12 gap-5">
                        <input type="hidden" name="_method" value="PATCH" />
                        <input type="hidden" name="_token" value={CSRF_TOKEN} />

                        <Input
                            isClearable
                            isRequired
                            required
                            type="text"
                            label="Role Name :"
                            name="name"
                            defaultValue={role?.name}
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
                            defaultValue={role?.codename}
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
                        <Button color="primary" type="submit" className="col-span-12">
                            Edit
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </main>
    );
}

export default Edit;
