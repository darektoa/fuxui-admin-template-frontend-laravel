import URLHelper from "./URLHelper";

const SWRFetcher = (input, init) => {
    try {
        let url;

        if(input instanceof URL) url = input;
        else url = new URL(input, location.href);

        if(init?.searchParams)
            url.search = URLHelper.search(init?.searchParams);

        return fetch(url, init).then((res) => res.json());
    } catch(err) {
        console.error(err)
    }
};

export default SWRFetcher;
