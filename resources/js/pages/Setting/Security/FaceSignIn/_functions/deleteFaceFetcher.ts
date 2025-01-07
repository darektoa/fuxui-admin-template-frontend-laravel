async function deleteFaceFetcher(
    url: string,
    { arg }: { arg: { body: FormData; id: string } }
): Promise<{}> {
    const body = arg.body;
    body.append("_method", "DELETE");

    const response = await fetch(`${url}/${arg?.id}`, {
        method: "POST",
        body: body,
    });

    return response.json();
}

export default deleteFaceFetcher;
