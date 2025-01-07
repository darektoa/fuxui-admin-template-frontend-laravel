function debounce(callback, delay, normalCallback) {
    let timeout;

    return function (...args) {
        clearTimeout(timeout);

        if (typeof normalCallback === "function") {
            normalCallback(...args);
        }

        timeout = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

export default debounce;
