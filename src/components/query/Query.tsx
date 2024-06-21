import {createContext, useEffect} from "react";

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
            <div>

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
            {children}
        </QueryContext.Provider>
    );
}
