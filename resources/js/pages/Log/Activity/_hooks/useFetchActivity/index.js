import { useEffect } from "react";
import useSWR from "swr";
import usePageStore from "../../_stores";
import SWRFetcher from "@/utilities/SWRFetcher";

async function useFetchActivity() {
    const { filter } = usePageStore((state) => state.table);
    const { setLoading, setDataResponse } = usePageStore((state) => state.table);

    const {data, isLoading} = useSWR(
        ["/logs/activities", { searchParams: filter }],
        ([url, init]) => SWRFetcher(url, init),
        { keepPreviousData: true }
    );

    useEffect(() => {
        setLoading(isLoading);
        setDataResponse(data);
    }, [data, isLoading]);
};

export default useFetchActivity;
