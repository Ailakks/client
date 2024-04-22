import {useContext, useEffect} from "react";
import {TabContext} from "./Tab";
import {TabsContext} from "./Tabs";

export default function TabContent({ isDefault, children }) {
    const { setContent } = useContext(TabContext);
    const { setFallback } = useContext(TabsContext);

    useEffect(() => {
        setContent(children);

        if (isDefault) {
            setFallback(children);
        }
    }, []);
}
