import {useContext, useEffect} from "react";
import {IntegrationContext} from "./FilePopup";

export default function Integration({ name, children }) {
    const meta = useContext(IntegrationContext);

    useEffect(() => {
        if (meta) {
            const { setMeta } = meta;

            setMeta({ name });
        }
    }, []);

    return children;
}
