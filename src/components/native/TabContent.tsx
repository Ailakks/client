import {useContext, useEffect} from "react";
import {TabContext} from "./Tab";

export default function TabContent(props) {
    const { setContent } = useContext(TabContext);

    useEffect(() => {
        setContent(props);
    }, []);
}
