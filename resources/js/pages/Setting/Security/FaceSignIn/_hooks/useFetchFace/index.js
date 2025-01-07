import { useEffect } from "react";
import useSWR from "swr";
import usePageStore from "../../_stores";
import SWRFetcher from "@/utilities/SWRFetcher";

async function useFetchFace() {
    const { filter } = usePageStore((state) => state.table);
    const { setLoading, setDataResponse } = usePageStore(
        (state) => state.table
    );

    const { data, isLoading } = useSWR(
        "/settings/security/face-sign-in",
        (url) => SWRFetcher(url, { searchParams: filter }),
        { keepPreviousData: true }
    );

    useEffect(() => {
        setLoading(isLoading);
        setDataResponse(data);
    }, [data, isLoading]);
}

export default useFetchFace;
