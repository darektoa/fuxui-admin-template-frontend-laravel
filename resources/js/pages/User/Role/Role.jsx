import "./style.css";
import { usePage } from "@inertiajs/react";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    Link,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    useDisclosure,
} from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import { router } from '@inertiajs/react'
import Modal from "@/components/Modal";
import React, { useState } from "react";

function Role() {
    const modalDeleteConfirm = useDisclosure();
    const { roles } = usePage().props;
    const [show, setShow] = useState({
        delete: null,
        filter: null,
        restore: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (show.restore) router.patch(`/users/roles/${show.restore?.id}/restore`);
        if (show.delete) router.delete(`/users/roles/${show.delete?.id}`);
    };

    return (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Breadcrumbs className="col-span-12">
                <BreadcrumbItem>User Management</BreadcrumbItem>
                <BreadcrumbItem>Roles</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="col-span-12 shadow-xl">
                <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                    <FeatherIcon.Activity className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg uppercase">Roles</h3>
                        <p className="text-small text-default-500">List of all activity log</p>
                    </div>
                    <Button
                        as={Link}
                        href="roles/create"
                        color="primary"
                        className="ml-auto"
                        endContent={<FeatherIcon.Plus />}
                    >
                        Add New
                    </Button>
                </CardHeader>
                <CardBody className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible">
                    <Table
                        isHeaderSticky
                        removeWrapper
                        aria-label="List table"
                        className="col-span-12"
                        color={"primary"}
                    >
                        <TableHeader>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>CODENAME</TableColumn>
                            <TableColumn>ACTIONS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {roles?.map((role) => (
                                <TableRow key={role?.id}>
                                    <TableCell>{role?.name}</TableCell>
                                    <TableCell>{role?.codename}</TableCell>
                                    <TableCell>
                                        <div className="relative flex items-center gap-2">
                                            {/* <Tooltip content="Details">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <FeatherIcon.Eye className="size-5 mx-1" />
                                                </span>
                                            </Tooltip> */}
                                            <Tooltip content="Edit role">
                                                <a href={`roles/${role?.id}/edit`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <FeatherIcon.Edit className="size-5 mx-1" />
                                                </a>
                                            </Tooltip>
                                            <Tooltip
                                                color="danger"
                                                content="Delete role"
                                            >
                                                <button
                                                    className="text-lg text-danger cursor-pointer active:opacity-50"
                                                    onClick={() => {
                                                        modalDeleteConfirm.onOpen();
                                                        setShow((states) => ({
                                                            ...states,
                                                            delete: role,
                                                        }));
                                                    }}
                                                >
                                                    <FeatherIcon.Trash className="size-5 mx-1" />
                                                </button>
                                            </Tooltip>
                                        </div>
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
                        <span className="font-bold">
                            {show?.delete?.name}
                        </span>{" "}
                        role permanently! Are you sure?
                    </>
                }
            />
        </main>
    );
}

export default Role;
