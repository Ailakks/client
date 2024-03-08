import {createContext} from "react";
import LoadSpinner from "../load/spinner/LoadSpinner";

export const QueryContext = createContext(null);

export default function Query({ request, fallback, children }) {
    const { loading, error, data, refetch } = request;

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
        <QueryContext.Provider value={{ loading, data, refetch }}>
            {children}
        </QueryContext.Provider>
    );
}
