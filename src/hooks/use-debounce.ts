import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay: number = 800) => {
    const [ val, setVal ] = useState<T>(value);
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setVal(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [ value, delay ]);

    return val;
}