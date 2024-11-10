import "./style.css";
import { usePage } from "@inertiajs/react";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Button,
    DateRangePicker,
    Input,
    Link,
    Pagination,
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
import { router } from "@inertiajs/react";
import Modal from "@/components/Modal";
import Partial from "./_partials";
import React, { useMemo, useState } from "react";

function Activitity() {
    const modalDeleteConfirm = useDisclosure();
    const modalFilter = useDisclosure();
    const { CSRF_TOKEN, activities } = usePage().props;
    const [page, setPage] = React.useState(1);
    const [show, setShow] = useState({
        delete: null,
        restore: null,
        filter: {},
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (show.restore)
            router.patch(`/users/activities/${show.restore?.id}/restore`);
        if (show.delete) router.delete(`/users/activities/${show.delete?.id}`);
    };

    const rowsPerPage = 10;
    const pages = Math.ceil(activities.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return activities.slice(start, end);
    }, [page, activities]);

    function dateRangeHandle(param1, param2) {
        console.log(param1.start);
    }

    return (
        <main className="grid w-full gap-6 py-6">
            <Breadcrumbs className="col-span-12">
                <BreadcrumbItem>Log</BreadcrumbItem>
                <BreadcrumbItem>Activities</BreadcrumbItem>
            </Breadcrumbs>

            <div className="col-span-12 flex">
                <Button
                    isIconOnly
                    color="primary"
                    variant="flat"
                    className="p-1"
                    onClick={() => {
                        modalFilter.onOpen();
                    }}
                >
                    <FeatherIcon.Filter className="size-5" />
                </Button>
            </div>

            <Table
                className="col-span-12"
                color={"primary"}
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                aria-label="Example static collection table"
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>URL</TableColumn>
                    <TableColumn>ACCESSED AT</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                    {items?.map((activity) => (
                        <TableRow key={activity?.id}>
                            <TableCell>{activity?.name}</TableCell>
                            <TableCell>{activity?.url}</TableCell>
                            <TableCell>
                                {new Date(activity?.createdAt).toLocaleString(
                                    "id"
                                )}
                            </TableCell>
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
                        <span className="font-bold">{show?.delete?.name}</span>{" "}
                        activity permanently! Are you sure?
                    </>
                }
            />

            <Partial.ModalFilter
                isOpen={modalFilter.isOpen}
                onOpenChange={modalFilter.onOpenChange}
                placement="top-center"
            />
        </main>
    );
}

export default Activitity;
