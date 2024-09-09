import { useError } from "../contexts/error-context";

export function useErrorFactory() {
    const { reportError } = useError();

    return {
        createError: (message: string) => reportError(message)
    }

}