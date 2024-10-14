import { useEffect, useMemo, useState } from 'react';

function useCountdown(initialCountdown, options = {}) {
    const [result, setResult] = useState({
        countdown: initialCountdown,
        isFinish: false,
    });

    const {
        decrement = 1,
        endTo = 0,
        interval = 1000,
        onFinish = null,
    } = options;

    function countdownHandle() {
        setResult((states) => ({
            ...states,
            countdown: states.countdown - decrement,
        }));
    }

    const intervalID = useMemo(() => (
        setInterval(countdownHandle, interval)
    ), [initialCountdown]);

    function onFinishHandle() {
        clearInterval(intervalID);
        onFinish?.();
        setResult((states) => ({
            ...states,
            isFinish: true,
        }));
    }

    useEffect(() => {
        if (result.countdown <= endTo) onFinishHandle();
    }, [result.countdown]);

    return result;
}

export default useCountdown;
