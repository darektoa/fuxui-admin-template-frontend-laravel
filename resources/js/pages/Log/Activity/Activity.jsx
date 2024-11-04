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

function Activitity() {
    const modalDeleteConfirm = useDisclosure();
    const { activities } = usePage().props;
    const [show, setShow] = useState({
        delete: null,
        filter: null,
        restore: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (show.restore) router.patch(`/users/activities/${show.restore?.id}/restore`);
        if (show.delete) router.delete(`/users/activities/${show.delete?.id}`);
    };

    return (
        <main className="flex flex-col w-full gap-6 py-6">
            <Breadcrumbs>
                <BreadcrumbItem>Log</BreadcrumbItem>
                <BreadcrumbItem>Activities</BreadcrumbItem>
            </Breadcrumbs>

            <div className="w-full flex">
            </div>

            <Table
                color={"primary"}
                aria-label="Example static collection table"
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>URL</TableColumn>
                    <TableColumn>ACCESSED AT</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                    {activities?.map((activity) => (
                        <TableRow key={activity?.id}>
                            <TableCell>{activity?.name}</TableCell>
                            <TableCell>{activity?.url}</TableCell>
                            <TableCell>{activity?.createdAt}</TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip content="Details">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <FeatherIcon.Eye className="size-5 mx-1" />
                                        </span>
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
                        activity permanently! Are you sure?
                    </>
                }
            />
        </main>
    );
}

export default Activitity;
