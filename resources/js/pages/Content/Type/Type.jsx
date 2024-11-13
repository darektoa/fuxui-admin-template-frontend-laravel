import "./style.css";
import { usePage } from "@inertiajs/react";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
} from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import React, { useState } from "react";

function Type() {
    const { contentTypes } = usePage().props;
    const [show, setShow] = useState({
        filter: null,
    });

    return (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Breadcrumbs className="col-span-12">
                <BreadcrumbItem>Content Management</BreadcrumbItem>
                <BreadcrumbItem href="/contents">Contents</BreadcrumbItem>
                <BreadcrumbItem>Types</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="col-span-12 shadow-xl">
                <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                    <FeatherIcon.Activity className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg uppercase">Content Types</h3>
                        <p className="text-small text-default-500">List of all content types</p>
                    </div>
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
                            <TableColumn>DESCRIPTION</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {contentTypes?.map((contentType) => (
                                <TableRow key={contentType?.id}>
                                    <TableCell>{contentType?.name}</TableCell>
                                    <TableCell>{contentType?.codename}</TableCell>
                                    <TableCell>{contentType?.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </main>
    );
}

export default Type;
