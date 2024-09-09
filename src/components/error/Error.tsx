import { useError } from "../../contexts/error-context";

export function ErrorDisplay() {
    const { error } = useError();

    if (!error) return null;

    return (
        <div className="bg-red-800 text-gray-50" style={{ position: 'fixed', bottom: '20px', right: '20px', color: 'white', padding: '10px', borderRadius: '5px' }}>
            {error}
        </div>
    );
}