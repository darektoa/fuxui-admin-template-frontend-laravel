import { Pagination } from "@nextui-org/react";
import { useEventHandler } from "../../../_hooks";
import { useShallow } from "zustand/shallow";
import isAuthorized from "@/utilities/isAuthorized";
import React, { useMemo } from "react";
import Section from "@/components/Section";
import usePageStore from "../../../_stores";

function TableBottom() {
    const { paginationOnChange } = useEventHandler();
    const { filter, pages } = usePageStore(
        useShallow((state) => ({
            filter: state.table.filter,
            pages: state.table.pages,
        }))
    );

    console.log("Activity Table Card - Table Bottom");

    return useMemo(() => (
        <Section hidden={pages < 1} className="mt-4 flex w-full justify-center">
            <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={filter.page}
                total={pages}
                onChange={paginationOnChange}
            />
        </Section>
    ), [filter, pages]);
}

export default TableBottom;
