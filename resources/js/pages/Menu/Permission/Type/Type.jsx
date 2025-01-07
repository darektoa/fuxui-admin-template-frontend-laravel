import "./style.css";
import { usePage } from "@inertiajs/react";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    Listbox,
    ListboxItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    useDisclosure,
} from "@nextui-org/react";
import { router } from "@inertiajs/react";
import { FeatherIcon } from "@/components/Icon";
import isAuthorized from "@/utilities/isAuthorized";
import Modal from "@/components/Modal";
import React, { useState } from "react";

function Type() {
    const modalDeleteConfirm = useDisclosure();
    const { permissionTypes, userPermissions } = usePage().props;
    const [show, setShow] = useState({
        delete: null,
        filter: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (show.delete)
            router.delete(`/menus/permissions/types/${show.delete?.id}`);
    };

    return (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Breadcrumbs className="col-span-12">
                <BreadcrumbItem>Menu Management</BreadcrumbItem>
                <BreadcrumbItem>Permission Types</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="col-span-12 shadow-xl">
                <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                    <FeatherIcon.Activity className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg uppercase">
                            Menu Permission Types
                        </h3>
                        <p className="text-small text-default-500">
                            List of all menu permission types
                        </p>
                    </div>
                </CardHeader>
                <CardBody className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible">
                    <Table
                        isHeaderSticky
                        removeWrapper
                        hidden={! isAuthorized(userPermissions, "01JDKB58YQNTN1HHF0TBKVP67C")}
                        aria-label="List table"
                        className="col-span-12"
                        color={"primary"}
                    >
                        <TableHeader>
                            <TableColumn>NO.</TableColumn>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>ACTIONS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {permissionTypes?.map((permissionType, index) => (
                                <TableRow key={permissionType?.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {permissionType?.name}
                                    </TableCell>
                                    <TableCell>
                                        <Popover
                                            placement="right"
                                            classNames={{
                                                content:
                                                    "p-0 backdrop-blur-sm bg-base-100/80",
                                            }}
                                        >
                                            <PopoverTrigger>
                                                <Button
                                                    isIconOnly
                                                    color="secondary"
                                                    variant="light"
                                                    className="rounded-full"
                                                >
                                                    <FeatherIcon.MoreVertical className="size-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                                                    <Listbox
                                                        variant="flat"
                                                        aria-label="Listbox menu with descriptions"
                                                    >
                                                        <ListboxItem
                                                            isDisabled={! isAuthorized(userPermissions, "01JDKB58YQNTN1HHF0TBKVP67F")}
                                                            key="edit"
                                                            href={`/menus/permissions/types/${permissionType?.id}/edit`}
                                                            showDivider
                                                            description="Allows you to edit the permission type"
                                                            startContent={
                                                                <FeatherIcon.Edit className="size-5" />
                                                            }
                                                        >
                                                            Edit
                                                        </ListboxItem>
                                                        <ListboxItem
                                                            isDisabled={! isAuthorized(userPermissions, "01JDKB58YQNTN1HHF0TBKVP67G")}
                                                            key="delete"
                                                            href="#"
                                                            className="text-danger"
                                                            color="danger"
                                                            description="Permanently delete the permission type"
                                                            startContent={
                                                                <FeatherIcon.Trash className="size-5" />
                                                            }
                                                            onClick={() => {
                                                                modalDeleteConfirm.onOpen();
                                                                setShow(
                                                                    (
                                                                        states
                                                                    ) => ({
                                                                        ...states,
                                                                        delete: permissionType,
                                                                    })
                                                                );
                                                            }}
                                                        >
                                                            Delete
                                                        </ListboxItem>
                                                    </Listbox>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>

            <Modal.DeleteConfirm
                isOpen={modalDeleteConfirm.isOpen}
                onOpenChange={modalDeleteConfirm.onOpenChange}
                placement="top-center"
                onSubmit={handleSubmit}
                content={
                    <>
                        This action will disable{" "}
                        <span className="font-bold">{show?.delete?.name}</span>{" "}
                        permission type permanently! Are you sure?
                    </>
                }
            />
        </main>
    );
}

export default Type;
