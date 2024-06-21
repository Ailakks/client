import {cloneElement} from "react";

export function LoadStatus({ loading, loader, children }) {
    if (loading) {
        return (
            cloneElement(children,[], loader)
        )
    }

    return children;
}
