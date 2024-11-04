import "./style.css";
import { usePage } from "@inertiajs/react";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Button,
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
        <main className="flex flex-col w-full gap-6 py-6">
            <Breadcrumbs>
                <BreadcrumbItem>User Management</BreadcrumbItem>
                <BreadcrumbItem>Roles</BreadcrumbItem>
            </Breadcrumbs>

            <div className="w-full flex">
                <Button
                    as={Link}
                    href="roles/create"
                    color="primary"
                    endContent={<FeatherIcon.Plus />}
                >
                    Add New
                </Button>
            </div>

            <Table
                color={"primary"}
                aria-label="Example static collection table"
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
                                    <Tooltip content="Details">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <FeatherIcon.Eye className="size-5 mx-1" />
                                        </span>
                                    </Tooltip>
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
