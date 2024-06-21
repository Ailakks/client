import {createContext, useEffect} from "react";
import LoadSpinner from "../load/spinner/LoadSpinner";

export const QueryContext = createContext(null);

export default function Query({ request, action, fallback, children }) {
    const [{ data: response, loading, error }, refetch] = request;

    useEffect(() => {
        if (action && !loading && !error) {
            action();
        }
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <LoadSpinner />
            </div>
        )
    }

    if (error) {
        if (fallback) {
            return fallback;
        }
    }

    return (
        <QueryContext.Provider value={{ response, refetch }}>
            {children(response, refetch)}
        </QueryContext.Provider>
    );
}
