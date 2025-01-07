import {
    Spinner,
    Table as NextTable,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { useShallow } from "zustand/shallow";
import isAuthorized from "@/utilities/isAuthorized";
import React, { useMemo } from "react";
import TableBottom from "../TableBottom";
import usePageStore from "../../../_stores";

function Table() {
    const { data, loadingState } = usePageStore(
        useShallow((state) => ({
            data: state.table.data,
            loadingState: state.table.loadingState,
        }))
    );

    console.log("Activity Table Card - Table");

    return useMemo(() => (
        <>
            <NextTable
                isHeaderSticky
                isVirtualized
                removeWrapper
                aria-label="List table"
                className="w-full  max-h-md overflow-auto"
                color={"primary"}
                classNames={{
                    "loadingWrapper": "items-start pt-28"
                }}
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    {/*<TableColumn>URL</TableColumn>*/}
                    <TableColumn>DEVICE</TableColumn>
                    <TableColumn>PLATFORM</TableColumn>
                    <TableColumn>BROWSER</TableColumn>
                    <TableColumn>USER AGENT</TableColumn>
                    <TableColumn>IP ADDRESS</TableColumn>
                    <TableColumn>ACCESSED BY</TableColumn>
                    <TableColumn>ACCESSED AT</TableColumn>
                </TableHeader>
                <TableBody
                    loadingState={loadingState}
                    loadingContent={<Spinner />}
                >
                    {data?.map((activity) => (
                        <TableRow key={activity?.id}>
                            <TableCell className="min-w-40">{activity?.name}</TableCell>
                            {/*<TableCell>{activity?.url}</TableCell>*/}
                            <TableCell>{activity?.device}</TableCell>
                            <TableCell>{activity?.platform}</TableCell>
                            <TableCell>{activity?.browser}</TableCell>
                            <TableCell>{activity?.userAgent}</TableCell>
                            <TableCell>{activity?.ip}</TableCell>
                            <TableCell>
                                {activity?.user?.email ??
                                    activity?.client?.name ??
                                    "NULL"}
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
            </NextTable>

            <TableBottom />
        </>
    ), [data, loadingState]);
}

export default Table;
