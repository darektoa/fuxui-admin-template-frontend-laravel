import './style.css'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Input,
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
        <Card className="col-span-12 shadow-xl">
            <CardHeader className="w-full pt-6 px-6 pb-3 flex gap-3">
                <FeatherIcon.Activity className="size-10 p-1 text-white rounded-md bg-gradient-primary bg-opacity-90 shrink-0" />
                <div className="flex flex-col">
                    <h3 className="font-bold text-lg uppercase">Activity Log</h3>
                    <p className="text-small text-default-500">List of all activity log</p>
                </div>
                {/* <Input
                    isClearable
                    className="w-full sm:max-w-xs"
                    placeholder="Search here . . ."
                    startContent={<FeatherIcon.Search className="size-5 shrink-0" />}
                    // value={values.search}
                    // onValueChange={handleChange}
                />
                <Button
                    isIconOnly
                    color="primary"
                    variant="flat"
                    className="p-1"
                    // onClick={() => {
                    //     modalFilter.onOpen();
                    // }}
                >
                    <FeatherIcon.Filter className="size-5" />
                </Button> */}
            </CardHeader>
            <CardBody className="w-full pt-3 px-6 pb-6 grid grid-cols-12 gap-5 overflow-visible">
                <Table
                    isHeaderSticky
                    removeWrapper
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
                        <TableColumn>IP ADDRESS</TableColumn>
                        <TableColumn>ACCESSED BY</TableColumn>
                        <TableColumn>ACCESSED AT</TableColumn>
                        {/* <TableColumn>ACTIONS</TableColumn> */}
                    </TableHeader>
                    <TableBody>
                        {items?.map((activity) => (
                            <TableRow key={activity?.id}>
                                <TableCell>{activity?.name}</TableCell>
                                <TableCell>{activity?.url}</TableCell>
                                <TableCell>{activity?.ip}</TableCell>
                                <TableCell>
                                    {activity?.user?.email ?? activity?.client?.name ?? 'NULL'}
                                </TableCell>
                                <TableCell>
                                    {new Date(activity?.createdAt).toLocaleString(
                                        "id"
                                    )}
                                </TableCell>
                                {/* <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip content="Details">
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <FeatherIcon.Eye className="size-5 mx-1" />
                                            </span>
                                        </Tooltip>
                                    </div>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    );
}

export default ActivityTable;
