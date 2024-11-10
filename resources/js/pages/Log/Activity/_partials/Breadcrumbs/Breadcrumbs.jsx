import "./style.css";
import {
    Breadcrumbs as NextBreadcrumbs,
    BreadcrumbItem,
} from "@nextui-org/react";
import React from "react";

function Breadcrumbs() {
    return (
        <NextBreadcrumbs className="col-span-12">
            <BreadcrumbItem>Log</BreadcrumbItem>
            <BreadcrumbItem>Activities</BreadcrumbItem>
        </NextBreadcrumbs>
    );
}

export default Breadcrumbs;
