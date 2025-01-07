import {
    Button,
    Spinner,
    Table as NextTable,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from "@nextui-org/react";
import { FeatherIcon } from "@/components/Icon";
import { useEventHandler } from "../../../_hooks";
import { useShallow } from "zustand/shallow";
import isAuthorized from "@/utilities/isAuthorized";
import React, { useMemo } from "react";
import usePageStore from "../../../_stores";
import TableBottom from "../TableBottom";

function Table() {
    const { btnDeleteOnClick, btnDeleteOnClose } = useEventHandler();
    const { data, loadingState } = usePageStore(
        useShallow((state) => ({
            data: state.table.data,
            loadingState: state.table.loadingState,
        }))
    );

    console.log("Face Table Card - Table");

    return useMemo(
        () => (
            <>
                <NextTable
                    isHeaderSticky
                    isVirtualized
                    removeWrapper
                    aria-label="List table"
                    className="w-full md:min-h-96 max-h-md overflow-auto"
                    color={"primary"}
                    classNames={{
                        loadingWrapper: "items-start pt-28",
                    }}
                >
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                        <TableColumn>CREATED AT</TableColumn>
                        <TableColumn>ACTION</TableColumn>
                    </TableHeader>
                    <TableBody
                        loadingState={loadingState}
                        loadingContent={<Spinner />}
                    >
                        {data?.map((face) => (
                            <TableRow key={face?.id}>
                                <TableCell>{face?.name}</TableCell>
                                <TableCell>
                                    {face?.isActive ? "Active" : "Inactive"}
                                </TableCell>
                                <TableCell>
                                    {new Date(
                                        face?.createdAt
                                    ).toLocaleString("id")}
                                </TableCell>
                                <TableCell>
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip
                                            color="danger"
                                            content="Delete Face"
                                        >
                                            <Button
                                                isIconOnly
                                                // isDisabled={
                                                //     !isAuthorized(
                                                //         userPermissions,
                                                //         "01JDKB58YQNTN1HHF0TBKVP681"
                                                //     )
                                                // }
                                                color="secondary"
                                                variant="light"
                                                className="text-lg text-danger cursor-pointer active:opacity-50"
                                                onClick={() => btnDeleteOnClick(face)}
                                            >
                                                <FeatherIcon.Trash className="size-5 mx-1" />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </NextTable>

                <TableBottom />
            </>
        ),
        [data, loadingState]
    );
}

export default Table;
