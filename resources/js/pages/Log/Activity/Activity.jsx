import "./style.css";
import { parseDate } from "@internationalized/date";
import { useEventHandler, usePageLoaded } from "./_hooks";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import Partial from "./_partials";
import React, { useMemo } from "react";
import usePageStore from "./_stores";

function Activitity() {
    usePageLoaded();

    const { filterOnClose, filterOnSubmit } = useEventHandler();
    const { control, handleSubmit, setValue } = useForm();
    const { filter, show } = usePageStore(
        useShallow((state) => ({
            filter: state.table.filter,
            show: state.table.show,
        }))
    );

    console.log('Activity Page');

    return useMemo(() => (
        <main className="grid grid-cols-12 w-full gap-6 py-6">
            <Partial.Breadcrumbs />

            <Partial.ActivityTableCard />

            <Partial.ModalFilter
                isOpen={Boolean(show.filterModal)}
                placement="top-center"
                onClose={filterOnClose}
                form={{
                    action: "",
                    method: "",
                    onSubmit: handleSubmit(filterOnSubmit),
                }}
                fields={{
                    dateRange: {
                        control: control,
                        name: "startDate",
                        label: "Tanggal",
                        defaultValue: {
                            start: filter.startDate
                                ? parseDate(filter.startDate)
                                : null,
                            end: filter.endDate
                                ? parseDate(filter.endDate)
                                : null,
                        },
                        onChange: ({ start, end }) => {
                            setValue(
                                "startDate",
                                start.toString().split("T")[0]
                            );
                            setValue(
                                "endDate",
                                end.toString().split("T")[0]
                            );
                        },
                    },
                }}
            />
        </main>
    ), [control, filter, show]);
}

export default Activitity;
