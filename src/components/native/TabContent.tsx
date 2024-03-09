import React, {useContext, useEffect} from "react";

export default function TabContent({ children }) {
    const { setContent } = useContext(TabContext);

    useEffect(() => {
        setContent(children);
    }, []);

    return children;
}
