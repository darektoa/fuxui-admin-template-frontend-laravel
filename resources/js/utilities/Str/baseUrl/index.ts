const baseUrl = (url: string | null | undefined) => {
    if (!url) return '';
    return String(url)?.match(/^([a-z]+:\/\/[^\s\/]+)/)?.[0] || '';
};

export default baseUrl;
