import { createContext, useContext, useState } from 'react';
import { ErrorContextType, ErrorProviderProps } from '../interfaces/error-context';

const ERROR_TIME_DISPLAY: number = 5000;
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: ErrorProviderProps) {
    const [error, setError] = useState<string | null>(null);

    const reportError = (message: string) => {
        
        setError(message);
        setTimeout(() => setError(null), ERROR_TIME_DISPLAY);
    }

    return (
        <ErrorContext.Provider value={{ error, reportError }}>
            { children }
        </ErrorContext.Provider>
    );
}

export function useError() {
    const context = useContext(ErrorContext);
    if (!context) throw new Error('useError must be used within an ErrorProvider');
    return context;
}
