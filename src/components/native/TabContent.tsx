import {useContext} from "react";
import {TabContext} from "./Tab";

export default function TabContent({ children }) {
    const { index, current } = useContext(TabContext);

    if (index === current) {
        return children;
    }
}
