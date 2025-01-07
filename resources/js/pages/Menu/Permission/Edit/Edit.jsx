import "./style.css";
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
import { usePage } from "@inertiajs/react";
import React from "react";

const Edit = () => {
    const { CSRF_TOKEN, menus, permission, permissionTypes } = usePage().props;

    return (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Breadcrumbs className="col-span-12">
                <BreadcrumbItem>Menu Management</BreadcrumbItem>
                <BreadcrumbItem href="/menus/permissions">
                    Permission
                </BreadcrumbItem>
                <BreadcrumbItem>Edit</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="col-span-12 shadow-xl">
                <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                    <FeatherIcon.User className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg uppercase">
                            PERMISSION EDIT
                        </h3>
                        <p className="text-small text-default-500">
                            Edit a menu permission
                        </p>
                    </div>
                </CardHeader>
                <CardBody
                    as={"form"}
                    action={`/menus/permissions/${permission?.id}`}
                    method="POST"
                    className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible"
                >
                    <input type="hidden" name="_method" value="PATCH" />
                    <input type="hidden" name="_token" value={CSRF_TOKEN} />

                    <Input
                        isClearable
                        isRequired
                        required
                        type="text"
                        label="Name :"
                        name="name"
                        defaultValue={permission?.name}
                        variant="flat"
                        placeholder="Enter content type name . . ."
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
                        label="Menu :"
                        name="menuId"
                        defaultSelectedKeys={[permission?.menu?.id]}
                        placeholder="Select a permission types . . ."
                        labelPlacement="outside"
                        className="col-span-12 md:col-span-6 w-full"
                        classNames={{
                            trigger: "focus-within:ring-2",
                        }}
                    >
                        {menus.map((menu) => (
                            <SelectItem key={menu.id} value={menu.id}>
                                {menu.name}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        isClearable
                        isRequired
                        required
                        label="Permission Types :"
                        name="permissionTypeId[]"
                        defaultSelectedKeys={permission?.types?.map((type) =>
                            String(type.id)
                        )}
                        selectionMode="multiple"
                        placeholder="Select a permission types . . ."
                        labelPlacement="outside"
                        className="col-span-12 md:col-span-6 w-full"
                        classNames={{
                            trigger: "focus-within:ring-2",
                        }}
                    >
                        {permissionTypes.map((permissionType) => (
                            <SelectItem
                                key={permissionType.id}
                                value={permissionType.id}
                            >
                                {permissionType.name}
                            </SelectItem>
                        ))}
                    </Select>
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
