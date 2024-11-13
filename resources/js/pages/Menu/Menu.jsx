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
import { useForm } from "@/hooks";
import { useParams } from "react-router-dom";
import Menu from "@/components/Menu";
import React, { useState } from "react";

function MenuPage() {
    const { menus } = usePage().props;
    const { menuId } = useParams();
    const [menu, setMenu] = useState({});
    const [show, setShow] = useState({
        filter: null,
    });

    const { handleChange, values, setValues } = useForm({
        value: null,
    });

    return (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Breadcrumbs className="col-span-12">
                <BreadcrumbItem>Menu Management</BreadcrumbItem>
                <BreadcrumbItem>Menu</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="col-span-12 shadow-xl">
                <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                    <FeatherIcon.Activity className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg uppercase">Menu</h3>
                        <p className="text-small text-default-500">List of all menu</p>
                    </div>
                </CardHeader>
                <CardBody className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible">
                    <Menu className="col-span-4 rounded-md bg-primary/5">
                        <Menu.Folders
                            data={menus}
                            href={(item) => `/menus/${item?.id}`}
                            reload={false}
                            isActive={(item) => {
                                if (item.id != menuId) return;

                                setMenu(item);
                                return true;
                            }}
                            onClick={(event, item) => {
                                setMenu(item);
                            }}
                            attributeMaps={{
                                children: "name",
                                data: "menus",
                                items: "menus",
                            }}
                            itemAttributeMaps={{
                                children: "name",
                            }}
                        />
                    </Menu>
                </CardBody>
            </Card>
        </main>
    );
}

export default MenuPage;
