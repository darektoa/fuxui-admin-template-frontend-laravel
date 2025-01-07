import { useRef } from "react";

function useDebounce(callback, delay, normalCallback) {
    const timeoutID = useRef(undefined);
    const func = useRef();

    func.current = function (...args) {
        clearTimeout(timeoutID.current);

        if (typeof normalCallback === "function") {
            normalCallback(...args);
        }

        timeoutID.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return func.current;
}

export default useDebounce;
