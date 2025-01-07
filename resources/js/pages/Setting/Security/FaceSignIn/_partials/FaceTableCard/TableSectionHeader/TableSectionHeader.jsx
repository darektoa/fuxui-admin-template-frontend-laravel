import { useEventHandler } from "../../../_hooks";
import { useShallow } from "zustand/shallow";
import React, { useMemo } from "react";
import usePageStore from "../../../_stores";

function TableSectionHeader() {
    const { rowsPerPageOnChange } = useEventHandler();
    const { dataResponse, filter } = usePageStore(
        useShallow((state) => ({
            dataResponse: state.table.dataResponse,
            filter: state.table.filter,
        }))
    );

    console.log("Face Table Card - Table Section Header");

    return useMemo(
        () => (
            <div className="flex justify-between items-center mb-2">
                <span className="text-default-400 text-small">
                    Total: {dataResponse?.total}
                </span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={rowsPerPageOnChange}
                        value={filter.perPage}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="1000">1000</option>
                    </select>
                </label>
            </div>
        ),
        [dataResponse, filter]
    );
}

export default TableSectionHeader;
