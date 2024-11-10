import './style.css'
import {
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

function ActivityTable()
{
    const [page, setPage] = useState(1);
    const { activities } = usePage().props;

    const rowsPerPage = 10;
    const pages = Math.ceil(activities.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return activities.slice(start, end);
    }, [page, activities]);

    return (
        <Table
            aria-label="List table"
            className="col-span-12"
            color={"primary"}
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
                <TableColumn>URL</TableColumn>
                <TableColumn>ACCESSED BY</TableColumn>
                <TableColumn>ACCESSED AT</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
                {items?.map((activity) => (
                    <TableRow key={activity?.id}>
                        <TableCell>{activity?.name}</TableCell>
                        <TableCell>{activity?.url}</TableCell>
                        <TableCell>
                            {activity?.user?.email ?? activity?.client?.name ?? 'NULL'}
                        </TableCell>
                        <TableCell>
                            {new Date(activity?.createdAt).toLocaleString(
                                "id"
                            )}
                        </TableCell>
                        <TableCell>
                            <div className="relative flex items-center gap-2">
                                <Tooltip content="Details">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <FeatherIcon.Eye className="size-5 mx-1" />
                                    </span>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ActivityTable;
