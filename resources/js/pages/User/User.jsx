import "./style.css";
import { usePage } from "@inertiajs/react";
import React, { useState } from "react";
import Icon from "@/components/Icon";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue,
    Breadcrumbs,
    BreadcrumbItem,
    Button,
} from "@nextui-org/react";

function User() {
    const { users } = usePage().props;

    return (
        <main className="flex flex-col w-full gap-6 py-6">
            <Breadcrumbs>
                <BreadcrumbItem>Dashboard</BreadcrumbItem>
                <BreadcrumbItem>User Management</BreadcrumbItem>
                <BreadcrumbItem>Users</BreadcrumbItem>
            </Breadcrumbs>

            <div className="w-full flex mb-4">
                <Button color="primary" endContent={<Icon.Plus />}>
                    Add New
                </Button>
            </div>

            <Table
                color={'primary'}
                selectionMode="multiple"
                defaultSelectedKeys={[]}
                aria-label="Example static collection table"
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>EMAIL</TableColumn>
                    <TableColumn>USERNAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                </TableHeader>
                <TableBody>
                    {users?.map(user => (
                        <TableRow key={user?.id}>
                            <TableCell>{user?.firstname} {user?.lastname}</TableCell>
                            <TableCell>{user?.email}</TableCell>
                            <TableCell>{user?.username}</TableCell>
                            <TableCell>{user?.roles?.[0]?.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
}

export default User;
