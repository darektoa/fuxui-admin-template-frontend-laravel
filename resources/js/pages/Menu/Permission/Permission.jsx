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
import isAuthorized from "@/utilities/isAuthorized";
import Partial from "./_partials";
import React, { useState } from "react";

function Permission() {
    const { permissions } = usePage().props;
    const [show, setShow] = useState({
        filter: null,
    });

    return (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Breadcrumbs className="col-span-12">
                <BreadcrumbItem>Menu Management</BreadcrumbItem>
                <BreadcrumbItem>Permissions</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="col-span-12 shadow-xl">
                <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                    <FeatherIcon.Activity className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg uppercase">Menu Permissions</h3>
                        <p className="text-small text-default-500">List of all menu permission types</p>
                    </div>
                </CardHeader>
                <CardBody className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible">
                    <Partial.MenuPermissionTable />
                </CardBody>
            </Card>
        </main>
    );
}

export default Permission;
