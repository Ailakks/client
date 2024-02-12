import React, {useContext, useEffect} from "react";
import LoadSpinner from "../load/spinner/LoadSpinner";
import {KeyContext} from "../../wrapper/logged/Key";
import {useNavigate} from "react-router-dom";

export default function KeyRestricted({ children }) {
    const navigate = useNavigate();

    const { data, loading } = useContext(KeyContext);

    useEffect(() => {
        if (!data) {
            navigate('/key')
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
