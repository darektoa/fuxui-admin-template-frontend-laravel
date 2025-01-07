import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useShallow } from "zustand/shallow";
import { parseDate, now } from "@internationalized/date";
import usePageStore from "../../_stores";

function usePageLoaded() {
    const [searchParams] = useSearchParams();
    const { setFilter } = usePageStore(
        useShallow((state) => ({
            setFilter: state.setFilter,
        }))
    );

    useEffect(() => {
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        setFilter({
            startDate: startDate ? parseDate(startDate) : now(),
            endDate: endDate ? parseDate(endDate) : now(),
        });
    }, [searchParams]);
}

export default usePageLoaded;
