const lower = (text: string | null | undefined) => {
    if(!text) return '';
    text?.toString()?.toLowerCase()
};

export default lower;
