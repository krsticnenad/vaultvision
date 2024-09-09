import { ReactNode } from "react";

export interface ErrorProviderProps {
    children: ReactNode
}

export interface ErrorContextType {
    error: string | null;
    reportError: (message: string) => void;
}