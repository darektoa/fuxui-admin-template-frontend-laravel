const search = (object) => {
    if(object == null || object == undefined) return '';

    for(const property in object) {
        if(object[property] == null || undefined)
            delete object[property];
    }

    return (new URLSearchParams(object)).toString();
}

export default search;
