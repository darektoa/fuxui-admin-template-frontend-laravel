import { useEffect, useRef, useState } from 'react';

const useSize = () => {
    const [result, setResult] = useState([{}, useRef()]);

    useEffect(() => {
        if (result[1].current) {
            new ResizeObserver((entries) => {
                setResult([
                    {
                        height: entries[0].target.clientHeight,
                        width: entries[0].target.clientWidth,
                    },
                    result[1],
                ]);
            }).observe(result[1].current);
        }
    }, []);

    return result;
};

export default useSize;
