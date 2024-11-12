import "./style.css";
import { usePage } from "@inertiajs/react";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Input,
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
import { useLocation } from "react-router-dom";

function User() {
    const modalDeleteConfirm = useDisclosure();
    const { search } = useLocation();
    const searches = new URLSearchParams(search)
    const { CSRF_TOKEN, users } = usePage().props;
    const [show, setShow] = useState({
        delete: null,
        filter: null,
        restore: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (show.restore) router.patch(`/users/${show.restore?.id}/restore`);
        if (show.delete) router.delete(`/users/${show.delete?.id}`);
    };

    return (
        <main className="flex flex-col w-full gap-6 py-6">
            <Breadcrumbs>
                <BreadcrumbItem>User Management</BreadcrumbItem>
                <BreadcrumbItem>Users</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="col-span-12 shadow-xl">
                <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                    <FeatherIcon.Users className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg uppercase">Users</h3>
                        <p className="text-small text-default-500">
                            Create a user role
                        </p>
                    </div>
                    <form action="" method="GET" className="mx-auto flex gap-2">
                        <Input
                            isClearable
                            type="text"
                            placeholder="Search . . ."
                            name="search"
                            variant="flat"
                            defaultValue={searches.get('search')}
                            className=""
                            classNames={{
                                inputWrapper: "focus-within:ring-2",
                            }}
                        />
                        <Button
                            isIconOnly
                            color="primary"
                            type="submit"
                            className=""
                        >
                            <FeatherIcon.Search className="size-5" />
                        </Button>
                    </form>
                    <Button
                        as={Link}
                        href="users/create"
                        color="primary"
                        endContent={<FeatherIcon.Plus />}
                        className="ml-auto"
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
                            <TableColumn>EMAIL</TableColumn>
                            <TableColumn>USERNAME</TableColumn>
                            <TableColumn>ROLES</TableColumn>
                            <TableColumn>ACTIONS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {users?.map((user) => (
                                <TableRow key={user?.id}>
                                    <TableCell>
                                        {user?.firstname} {user?.lastname}
                                    </TableCell>
                                    <TableCell>{user?.email}</TableCell>
                                    <TableCell>{user?.username}</TableCell>
                                    <TableCell>
                                        {user?.roles?.map((role) => (
                                            <Chip
                                                key={role.id}
                                                size="sm"
                                                className="m-0.5"
                                            >
                                                {role.name}
                                            </Chip>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        <div className="relative flex items-center gap-2">
                                            {/* <Tooltip content="Details">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <FeatherIcon.Eye className="size-5 mx-1" />
                                                </span>
                                            </Tooltip> */}
                                            <Tooltip content="Edit user">
                                                <a href={`users/${user?.id}/edit`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <FeatherIcon.Edit className="size-5 mx-1" />
                                                </a>
                                            </Tooltip>
                                            <Tooltip
                                                color="danger"
                                                content="Delete user"
                                            >
                                                <button
                                                    className="text-lg text-danger cursor-pointer active:opacity-50"
                                                    onClick={() => {
                                                        modalDeleteConfirm.onOpen();
                                                        setShow((states) => ({
                                                            ...states,
                                                            delete: user,
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
                            {show?.delete?.firstname}{" "}
                            {show?.delete?.lastname}
                        </span>{" "}
                        user account permanently! Are you sure?
                    </>
                }
            />
        </main>
    );
}

export default User;
