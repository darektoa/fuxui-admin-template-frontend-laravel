import { useEffect } from "react";
import useSWR from "swr";
import usePageStore from "../../_stores";
import SWRFetcher from "@/utilities/SWRFetcher";

async function useFetchFaces() {
    const { filter } = usePageStore();
    const { setLoading, setFaces } = usePageStore();

    const {data, isLoading} = useSWR(
        ["/users/faces", { searchParams: filter }],
        ([url, init]) => SWRFetcher(url, init),
        { keepPreviousData: true }
    );

    useEffect(() => {
        console.log(data);
        setLoading(isLoading);
        setFaces(data?.data);
    }, [data, isLoading]);
};

export default useFetchFaces;
