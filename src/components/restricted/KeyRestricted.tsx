import React, {useContext} from "react";
import LoadSpinner from "../load/spinner/LoadSpinner";
import {KeyContext} from "../../wrapper/logged/Key";

export default function KeyRestricted({ children }) {
    const { data } = useContext(KeyContext);

    if (!data) {
        return (
            <div className="flex justify-center items-center">
                <LoadSpinner />
                <p>Decrypting...</p>
            </div>
        );
    }

    return children;
}
