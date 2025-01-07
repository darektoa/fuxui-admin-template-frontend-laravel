import './style.css'
import {
    Button,
    Chip,
    Listbox,
    ListboxItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
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
import { usePage } from "@inertiajs/react";
import isAuthorized from "@/utilities/isAuthorized";
import Modal from "@/components/Modal";
import React, { useMemo, useState } from "react";
import Section from "@/components/Section";

function MenuPermissionTable(props)
{
    const modalDeleteConfirm = useDisclosure();
    const { selectedKeys, onSelectionChange } = props;
    const { user, permissions, userPermissions } = usePage().props;
    const [page, setPage] = useState(1);
    const [show, setShow] = useState({
        delete: null,
    });

    const rowsPerPage = 10;
    const pages = Math.ceil(permissions.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return permissions.slice(start, end);
    }, [page, permissions]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (show.delete)
            router.delete(`/menus/permissions/${show.delete?.id}`);
    };

    return (
        <Section permissions="01JDKB58YQNTN1HHF0TBKVP67M" className="col-span-12">
            <Table
                isCompact
                isHeaderSticky
                removeWrapper
                aria-label="List table"
                className="w-full"
                color={"primary"}
                // selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={onSelectionChange}
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
            >
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>MENU</TableColumn>
                    <TableColumn>TYPES</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                    {items?.map((permission) => (
                        <TableRow key={permission?.id}>
                            <TableCell>{permission?.id}</TableCell>
                            <TableCell>{permission?.name}</TableCell>
                            <TableCell>{permission?.menu?.name}</TableCell>
                            <TableCell>
                                {permission?.types?.map(type =>
                                    <Chip key={type?.id} className="mx-1" size="sm">
                                        {type?.name}
                                    </Chip>
                                )}
                            </TableCell>
                            <TableCell>
                                <Popover
                                    placement="right"
                                    classNames={{
                                        content:
                                            "p-0 backdrop-blur-sm bg-base-100/80",
                                    }}
                                >
                                    <PopoverTrigger>
                                        <Button
                                            isIconOnly
                                            color="secondary"
                                            variant="light"
                                            className="rounded-full"
                                        >
                                            <FeatherIcon.MoreVertical className="size-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                                            <Listbox
                                                variant="flat"
                                                aria-label="Listbox menu with descriptions"
                                            >
                                                <ListboxItem
                                                    isDisabled={! isAuthorized(userPermissions, "01JDKB58YQNTN1HHF0TBKVP67Q")}
                                                    key="edit"
                                                    href={`/menus/permissions/${permission?.id}/edit`}
                                                    showDivider
                                                    description="Allows you to edit the menu permission"
                                                    startContent={
                                                        <FeatherIcon.Edit className="size-5" />
                                                    }
                                                >
                                                    Edit
                                                </ListboxItem>
                                                <ListboxItem
                                                    isDisabled={! isAuthorized(userPermissions, "01JDKB58YQNTN1HHF0TBKVP67R")}
                                                    key="delete"
                                                    href="#"
                                                    className="text-danger"
                                                    color="danger"
                                                    description="Permanently delete the menu permission"
                                                    startContent={
                                                        <FeatherIcon.Trash className="size-5" />
                                                    }
                                                    onClick={() => {
                                                        modalDeleteConfirm.onOpen();
                                                        setShow(
                                                            (
                                                                states
                                                            ) => ({
                                                                ...states,
                                                                delete: permission,
                                                            })
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </ListboxItem>
                                            </Listbox>
                                        </div>
                                    </PopoverContent>
                                </Popover>
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
                        <span className="font-bold">{show?.delete?.name} ({show?.delete?.menu?.name})</span>{" "}
                        menu permission permanently! Are you sure?
                    </>
                }
            />
        </Section>
    );
}

export default MenuPermissionTable;
