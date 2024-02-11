import React, {useContext, useEffect} from "react";
import LoadSpinner from "../load/spinner/LoadSpinner";
import {KeyContext} from "../../wrapper/logged/Key";
import {useNavigate} from "react-router-dom";

export default function KeyRestricted({ children }) {
    const navigate = useNavigate();

    const { loading, data } = useContext(KeyContext);

    useEffect(() => {
        if (!data) {
            navigate('/auth/key')
        }
    }, [data]);

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <LoadSpinner />
                <p>Decrypting...</p>
            </div>
        );
    }

    return children;
}
