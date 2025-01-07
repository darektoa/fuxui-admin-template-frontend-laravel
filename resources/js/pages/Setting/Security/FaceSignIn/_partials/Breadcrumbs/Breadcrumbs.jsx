import "./style.css";
import {
    Breadcrumbs as NextBreadcrumbs,
    BreadcrumbItem,
} from "@nextui-org/react";
import React from "react";

function Breadcrumbs() {
    return (
        <NextBreadcrumbs className="col-span-12">
            <BreadcrumbItem href="/settings">Setting</BreadcrumbItem>
            <BreadcrumbItem href="/settings/security">Security</BreadcrumbItem>
            <BreadcrumbItem>Face Sign In</BreadcrumbItem>
        </NextBreadcrumbs>
    );
}

export default Breadcrumbs;
