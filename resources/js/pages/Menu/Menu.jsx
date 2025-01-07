import "./style.css";
import { router, usePage } from "@inertiajs/react";
import {
    Avatar,
    Breadcrumbs,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    Image,
    Input as NextInput,
    Textarea,
    useDisclosure,
    Select,
    SelectItem,
    Switch,
} from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import { useForm } from "@/hooks";
import { useParams } from "react-router";
import Input from "@/components/Input";
import isAuthorized from "@/utilities/isAuthorized";
import Menu from "@/components/Menu";
import Modal from "@/components/Modal";
import Permission from "@/components/Permission";
import React, { useEffect, useState } from "react";
import Section from "@/components/Section";
import SVG from "@/components/SVG";
import Visibility from "@/components/Visibility";
import SWRFetcher from "@/utilities/SWRFetcher.js";
import useSWR from "swr";

function MenuPage() {
    const modalDeleteConfirm = useDisclosure();
    const { dataMenus, menus, menu: currentMenu, userPermissions } = usePage().props;
    const { data: icons } = useSWR("/data/icons", SWRFetcher)
    const { menuId } = useParams();
    const [menu, setMenu] = useState({});
    const [show, setShow] = useState({
        delete: null,
        filter: null,
    });

    const { handleChange, values, setValues } = useForm({
        iconUri: "",
        name: "",
        uri: "",
        menuId: "",
        codename: "",
        tooltip: "",
        description: "",
        isExternalUri: 0,
    });

    useEffect(() => {
        setValues({
            iconUri: menu?.iconUri || '',
            name: menu?.name || '',
            uri: menu?.uri || '',
            menuId: menu?.menuId || '',
            codename: menu?.codename || '',
            tooltip: menu?.tooltip || '',
            description: menu?.description || '',
            order: menu?.order || '',
            isExternalUri: Number(menu?.isExternalUri),
        });
    }, [menu]);

    useEffect(() => {
        if (currentMenu) setMenu(currentMenu);
    }, []);

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        router.patch(`/menus/${menu?.id}`, values);
    };

    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        router.delete(`/menus/${show.delete?.id}`);
    };

    return (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Breadcrumbs className="col-span-12">
                <BreadcrumbItem>Menu Management</BreadcrumbItem>
                <BreadcrumbItem>Menu</BreadcrumbItem>
            </Breadcrumbs>

            <Card
                as={Section}
                permissions="01JDKB58YQNTN1HHF0TBKVP674"
                className="col-span-12 shadow-xl"
            >
                <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                    <FeatherIcon.Activity className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg uppercase">Menu</h3>
                        <p className="text-small text-default-500">
                            List of all menu
                        </p>
                    </div>
                </CardHeader>
                <CardBody
                    as="form"
                    onSubmit={handleUpdateSubmit}
                    className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible"
                >
                    <Menu className="col-span-12 md:col-span-4 md:row-span-8 rounded-md bg-primary/5">
                        <Menu.Folders
                            data={menus}
                            href={(item) => `/menus/${item.data?.id}`}
                            reload={false}
                            isActive={(item) => item.data?.id == menuId}
                            filter={(item) => item.data?.uri === null}
                            onClick={(event, item) => {
                                setMenu(item.data);
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

                    <Visibility
                        hidden={
                            Object.keys(menu).length == 0 ||
                            !isAuthorized(
                                userPermissions,
                                "01JDKB58YQNTN1HHF0TBKVP676"
                            )
                        }
                    >
                        <NextInput
                            isClearable
                            isRequired
                            required
                            type="text"
                            label="Name :"
                            name="name"
                            value={values?.name}
                            onChange={handleChange}
                            variant="flat"
                            placeholder="Enter menu name . . ."
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-4 w-full"
                            classNames={{
                                inputWrapper: "focus-within:ring-2",
                            }}
                            startContent={
                                <>
                                    <FeatherIcon.Type className="size-4 mr-2" />
                                    <div className="h-4/5 border-r border-slate-300"></div>
                                </>
                            }
                        />
                        <NextInput
                            isClearable
                            type="text"
                            label="URI :"
                            name="uri"
                            value={values?.uri}
                            onChange={handleChange}
                            variant="flat"
                            placeholder="Enter menu URI/URL . . ."
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-4 w-full"
                            classNames={{
                                inputWrapper: "focus-within:ring-2",
                            }}
                            startContent={
                                <>
                                    <FeatherIcon.Link className="size-4 mr-2" />
                                    <div className="h-4/5 border-r border-slate-300"></div>
                                </>
                            }
                        />
                        <NextInput
                            isClearable
                            type="text"
                            label="Codename :"
                            name="codename"
                            value={values?.codename}
                            onChange={handleChange}
                            variant="flat"
                            placeholder="Enter menu codename . . ."
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-4 w-full"
                            classNames={{
                                inputWrapper: "focus-within:ring-2",
                            }}
                            startContent={
                                <>
                                    <FeatherIcon.Type className="size-4 mr-2" />
                                    <div className="h-4/5 border-r border-slate-300"></div>
                                </>
                            }
                        />
                        <NextInput
                            isClearable
                            type="text"
                            label="Tooltip :"
                            name="tooltip"
                            value={values?.tooltip}
                            onChange={handleChange}
                            variant="flat"
                            placeholder="Enter menu tooltip . . ."
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-4 w-full"
                            classNames={{
                                inputWrapper: "focus-within:ring-2",
                            }}
                            startContent={
                                <>
                                    <FeatherIcon.Type className="size-4 mr-2" />
                                    <div className="h-4/5 border-r border-slate-300"></div>
                                </>
                            }
                        />
                        <Select
                            isClearable
                            label="Sub-menu Of :"
                            name="menuId"
                            onChange={handleChange}
                            selectedKeys={[values?.menuId]}
                            placeholder="Select a menu . . ."
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-4 w-full"
                            classNames={{
                                trigger: "focus-within:ring-2",
                            }}
                        >
                            {dataMenus?.filter(item => item?.uri === null)?.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </Select>
                        <NextInput
                            isClearable
                            type="number"
                            label="Order :"
                            name="order"
                            value={values?.order}
                            onChange={handleChange}
                            variant="flat"
                            placeholder="Enter menu order . . ."
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-4 w-full"
                            classNames={{
                                inputWrapper: "focus-within:ring-2",
                            }}
                            startContent={
                                <>
                                    <FeatherIcon.Type className="size-4 mr-2" />
                                    <div className="h-4/5 border-r border-slate-300"></div>
                                </>
                            }
                        />
                        <Select
                            isRequired
                            items={icons?.data ?? []}
                            label="Icon :"
                            name="iconUri"
                            onChange={handleChange}
                            selectedKeys={[values?.iconUri]}
                            labelPlacement="outside"
                            placeholder="Select a icon"
                            className="col-span-12 md:col-span-4 w-full"
                            classNames={{
                                popoverContent: "max-w-56 lg:max-w-96"
                            }}
                            renderValue={(items) => {
                                return items.map((item) => (
                                    <div key={item.key} className="flex items-center gap-2">
                                        <SVG
                                            alt={item.data.name}
                                            url={item.data.uri}
                                            className="size-8 text-primary rounded-none"
                                        />
                                        <div className="flex flex-col">
                                            <span>{item.data.name}</span>
                                        </div>
                                    </div>
                                ));
                            }}
                            listboxProps={{
                                classNames: {
                                    list: "flex-row flex-wrap justify-space gap-0",
                                },
                            }}
                        >
                            {(icon) => (
                                <SelectItem
                                    hideSelectedIcon
                                    className="w-auto gap-0"
                                    key={icon?.uri}
                                    textValue={icon?.name}
                                >
                                    <SVG
                                        alt={icon?.name}
                                        url={icon?.uri}
                                        className="size-8 flex justify-center text-primary items-center flex-shrink-0 rounded-none"
                                    />
                                </SelectItem>
                            )}
                        </Select>
                        <Textarea
                            isClearable
                            label="Description :"
                            name="description"
                            value={values?.description}
                            onChange={handleChange}
                            variant="flat"
                            placeholder="Enter menu description . . ."
                            labelPlacement="outside"
                            className="col-span-12 md:col-span-8 w-full"
                            classNames={{
                                inputWrapper: "focus-within:ring-2",
                            }}
                        />
                        <label className="col-span-12 md:col-span-8 row-span-2 mt-8 flex items-center">
                            <span className="mr-2 text-sm">
                                Is External URI/URL ?
                            </span>
                            <Switch
                                size="sm"
                                isSelected={Boolean(values?.isExternalUri)}
                                onValueChange={(value) =>
                                    setValues((states) => ({
                                        ...states,
                                        isExternalUri: Number(value),
                                    }))
                                }
                            />
                        </label>
                        <Permission permissions="01JDKB58YQNTN1HHF0TBKVP677">
                            <Button
                                type="submit"
                                color="primary"
                                className="col-span-12 md:col-span-7 w-full"
                            >
                                Save
                            </Button>
                        </Permission>
                        <Permission permissions="01JDKB58YQNTN1HHF0TBKVP678">
                            <Button
                                isIconOnly
                                color="danger"
                                variant="bordered"
                                className="col-span-12 md:col-span-1 w-full"
                                onClick={() => {
                                    modalDeleteConfirm.onOpen();
                                    setShow((states) => ({
                                        ...states,
                                        delete: menu,
                                    }));
                                }}
                            >
                                <FeatherIcon.Trash className="size-4" />
                            </Button>
                        </Permission>
                    </Visibility>
                </CardBody>
            </Card>

            <Modal.DeleteConfirm
                isOpen={modalDeleteConfirm.isOpen}
                onOpenChange={modalDeleteConfirm.onOpenChange}
                placement="top-center"
                onSubmit={handleDeleteSubmit}
                content={
                    <>
                        This action will disable{" "}
                        <span className="font-bold">{show?.delete?.name}</span>{" "}
                        menu permanently! Are you sure?
                    </>
                }
            />
        </main>
    );
}

export default MenuPage;
