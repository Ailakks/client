import {createContext} from "react";
import LoadSpinner from "../load/spinner/LoadSpinner";

export const RequestContext = createContext(null);

export default function Request({ request, fallback, children }) {
    const [{ data, loading, error }, refetch] = request;

    if (loading) {
        return (
            <div className="flex items-center justify-center">
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
        <RequestContext.Provider value={{ loading, data, refetch }}>
            {children}
        </RequestContext.Provider>
    );
}
