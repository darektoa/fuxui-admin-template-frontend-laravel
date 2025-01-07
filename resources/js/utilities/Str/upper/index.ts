const upper = (text: string | null | undefined) => {
    if(!text) return '';
    return text?.toString()?.toUpperCase();
}

export default upper;
