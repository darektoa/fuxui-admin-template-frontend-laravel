async function addFaceFetcher(
    url: string,
    { arg }: { arg: FormData }
): Promise<{}> {
    console.log(Array.from(arg));
    const response = await fetch(url, {
        method: "POST",
        body: arg,
    });

    return response.json();
}

export default addFaceFetcher;
