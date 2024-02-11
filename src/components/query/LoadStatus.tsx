import {cloneElement} from "react";

export default function LoadStatus({ loading, children }) {
    if (loading) {
        return (
            cloneElement(children,[], <p>test</p>)
        )
    }

    return children;
}
