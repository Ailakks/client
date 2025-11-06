import {useContext, useEffect} from "react";
import {IntegrationContext} from "./Integration";

export default function IntegrationMeta({ name, children }) {
    const meta = useContext(IntegrationContext);

    useEffect(() => {
        if (meta) {
            const { setMeta } = meta;

            setMeta({ name });
        }
    }, []);

    return children;
}
