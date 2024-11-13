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
import { router, usePage } from "@inertiajs/react";
import Menu from "@/components/Menu";
import Partial from "../_partials";
import React, { useEffect, useState } from "react";
import useForm from "@/hooks/useForm";

const Edit = () => {
    const { CSRF_TOKEN, menuPermissions, role, user } = usePage().props;
    const { values, setValues, handleChange } = useForm({
        name: role.name,
        codename: role.codename,
        menuPermissions: role.permissions?.map(
            (permission) => permission?.id
        ),
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(`users/roles/${role.id}`)
        router.put(`/users/roles/${role.id}`, values);
    };

    useEffect(() => {
        console.log(values);
    }, [values]);

    return (
        <main className="flex flex-col w-full gap-6 py-6">
            <Breadcrumbs>
                <BreadcrumbItem>User Management</BreadcrumbItem>
                <BreadcrumbItem href="/users/roles">Roles</BreadcrumbItem>
                <BreadcrumbItem>Edit</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="col-span-12 shadow-xl">
                <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                    <FeatherIcon.UserCheck className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-xl">Role Edit</h3>
                        <p className="text-small text-default-500">
                            Edit a role
                        </p>
                    </div>
                </CardHeader>
                <CardBody
                    as={"form"}
                    className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible"
                    onSubmit={handleUpdate}
                >
                    <Input
                        isClearable
                        isRequired
                        required
                        type="text"
                        label="Role Name :"
                        name="name"
                        defaultValue={values?.name}
                        onChange={handleChange}
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
                        defaultValue={values?.codename}
                        onChange={handleChange}
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

                    {/* <Menu className="col-span-12">
                        <Menu.Folders
                            data={menuPermissions}
                            // filter={(item) => console.log(item)}
                            // itemFilter={(item) => item?.uri != null}
                            reload={false}
                            attributeMaps={{
                                children: 'name',
                                data: 'menus',
                                items: 'permissions',
                            }}
                            itemAttributeMaps={{
                                children: 'name',
                                href: 'uri',
                            }}
                        />
                    </Menu> */}

                    <Partial.MenuPermissionTable
                        selectedKeys={values.menuPermissions}
                        onSelectionChange={(selectedKeys) => {
                            let permissionKeys = null;

                            if (selectedKeys === "all")
                                permissionKeys = menuPermissions.map(
                                    (item) => item.id
                                );
                            else permissionKeys = [...selectedKeys];

                            setValues((states) => ({
                                ...states,
                                menuPermissions: permissionKeys,
                            }));
                        }}
                    />

                    <Button
                        color="primary"
                        type="submit"
                        className="col-span-12"
                    >
                        Edit
                    </Button>
                </CardBody>
            </Card>
        </main>
    );
};

export default Edit;
