import {cloneElement} from "react";

export default function LoadStatus({ loading, loader, children }) {
    if (loading) {
        return (
            cloneElement(children,[], loader)
        )
    }

    return children;
}
