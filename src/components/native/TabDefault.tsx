import {useContext, useEffect} from "react";
import {TabsContext} from "./Tabs";

export default function TabDefault({ children }) {
    const { setDef } = useContext(TabsContext);

    useEffect(() => {
        setDef(children);
    }, []);
}
