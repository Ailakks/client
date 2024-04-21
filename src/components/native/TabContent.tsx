import {useContext} from "react";
import {TabContext} from "./Tab";
import {TabsContext} from "./Tabs";

export default function TabContent({ children }) {
    const { index } = useContext(TabsContext);
    const { id } = useContext(TabContext);

    if (id === index) {
        return children;
    }
}
