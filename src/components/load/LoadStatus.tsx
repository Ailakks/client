import {cloneElement} from "react";
import LoadSpinner from "./spinner/LoadSpinner";

export default function LoadStatus({ loading, children }) {
    if (!loading) {
        return (
            cloneElement(children,[], <LoadSpinner />)
        )
    }

    return children;
}
