const searchToObject = (string) => {
    const searchString = string?.replaceAll('?', '');
    const searchParams = new URLSearchParams(searchString);
    const paramsObject = {};

    searchParams.forEach((value, key) => {
        if(value == null || value == undefined) return;
        paramsObject[key] = value;
    });

    return paramsObject;
}

export default searchToObject
