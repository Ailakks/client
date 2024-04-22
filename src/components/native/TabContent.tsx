import {useContext, useEffect} from "react";
import {TabContext} from "./Tab";
import {TabsContext} from "./Tabs";

export default function TabContent({ isDefault, children }) {
    const { setContent } = useContext(TabContext);
    const { setCurrent } = useContext(TabsContext);

    useEffect(() => {
        setContent(children);

        if (isDefault) {
            setCurrent(children);
        }
    }, []);
}
