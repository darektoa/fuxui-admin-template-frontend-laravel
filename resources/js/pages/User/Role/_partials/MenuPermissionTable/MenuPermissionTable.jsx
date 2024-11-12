import './style.css'
import {
    Chip,
    Pagination,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
} from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import { usePage } from "@inertiajs/react";
import React, { useMemo, useState } from "react";

function MenuPermissionTable(props)
{
    const { selectedKeys, onSelectionChange } = props;
    const { user, menuPermissions } = usePage().props;
    const [page, setPage] = useState(1);

    const rowsPerPage = 10;
    const pages = Math.ceil(menuPermissions.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return menuPermissions.slice(start, end);
    }, [page, menuPermissions]);

    return (
        <Table
            isHeaderSticky
            removeWrapper
            aria-label="List table"
            className="col-span-12"
            color={"primary"}
            selectionMode="multiple"
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
                <TableColumn>NAME</TableColumn>
                <TableColumn>MENU</TableColumn>
                <TableColumn>TYPES</TableColumn>
            </TableHeader>
            <TableBody>
                {items?.map((permission) => (
                    <TableRow key={permission?.id}>
                        <TableCell>{permission?.name}</TableCell>
                        <TableCell>{permission?.menu?.name}</TableCell>
                        <TableCell>
                            {permission?.types?.map(type =>
                                <Chip key={type?.id} className="mx-1" size="sm">
                                    {type?.name}
                                </Chip>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default MenuPermissionTable;
