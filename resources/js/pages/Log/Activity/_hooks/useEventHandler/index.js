import { useCallback } from "react";
import { useShallow } from "zustand/shallow";
import debounce from "@/utilities/debounce";
import Excel from "@/utilities/Excel";
import PDF from "@/utilities/PDF";
import usePageStore from "../../_stores";

function useEventHandler() {
    const tableState = usePageStore(
        useShallow((state) => ({
            data: state.table.data,
        }))
    );

    const tableAction = usePageStore(
        useShallow((state) => ({
            set: state.table.set,
            setShow: state.table.setShow,
            setFilter: state.table.setFilter,
            setLoading: state.table.setLoading,
        }))
    );

    return {
        btnExportExcelOnClick: useCallback(async () => {
            Excel.export("Export Data.xlsx", [
                {
                    sheetName: "Sheet 1",
                    columns: [
                        { header: "Name", key: "name", width: 30 },
                        { header: "URL", key: "url", width: 30 },
                        { header: "IP Address", key: "ip", width: 20 },
                        { header: "Accessed By", key: "accessedBy", width: 20 },
                        { header: "Accessed At", key: "createdAt", width: 20 },
                    ],
                    rows: tableState.data,
                    maps: {
                        accessedBy: (row) =>
                            row?.user?.email ?? row?.client?.name ?? "NULL",
                    },
                },
            ]);
        }, [tableState]),

        btnExportPDFOnClick: useCallback(async () => {
            PDF.exportTable("Export Data.pdf", [
                {
                    sectionName: "Activity Log",
                    columns: [
                        { header: "Name", key: "name", width: 30 },
                        { header: "URL", key: "url", width: 30 },
                        { header: "IP Address", key: "ip", width: 20 },
                        { header: "Accessed By", key: "accessedBy", width: 20 },
                        { header: "Accessed At", key: "createdAt", width: 20 },
                    ],
                    rows: tableState.data,
                    maps: {
                        accessedBy: (row) =>
                            row?.user?.email ?? row?.client?.name ?? "NULL",
                    },
                },
            ]);
        }, [tableState, PDF]),


        btnFilterOnClick: useCallback(() => {
            tableAction.setShow({ filterModal: true });
        }, []),


        filterOnClose: useCallback(() => {
            tableAction.setShow({ filterModal: false });
        }, []),


        filterOnSubmit: useCallback((data) => {
            tableAction.setFilter({
                startDate: data?.startDate,
                endDate: data?.endDate,
            });
        }, []),


        paginationOnChange: useCallback((page) => {
            tableAction.setFilter({ page: page });
        }, []),


        searchOnChange: useCallback(debounce(
            (e) => tableAction.setFilter({ search: e.target.value }),
            1500,
            () => tableAction.setLoading(true)
        ), []),


        rowsPerPageOnChange: useCallback((e) => {
            tableAction.setFilter({
                perPage: Number(e.target.value),
            });
        }, []),
    };
}

export default useEventHandler;
