function useParser() {
    function unicodeParse(string) {
        const parser = new DOMParser();
        return parser.parseFromString(string, 'text/html').body.textContent;
    }

    return {
        unicodeParse,
    };
}

export default useParser;
