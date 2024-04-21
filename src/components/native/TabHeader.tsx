import {useContext, useEffect} from "react";
import {TabContext} from "./Tab";

export default function TabHeader({ children }) {
    const { setHeader } = useContext(TabContext);

    useEffect(() => {
        setHeader(children);
    }, []);
}
