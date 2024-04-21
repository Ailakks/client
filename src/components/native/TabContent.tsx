import {useContext, useEffect} from "react";
import {TabContext} from "./Tab";

export default function TabContent({ children }) {
    const { setContent } = useContext(TabContext);

    useEffect(() => {
        setContent(children);
    }, []);
}
