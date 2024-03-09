import React, {useContext, useEffect, useState} from "react";
import {TabsContext} from "./Tabs";

export default function Tab({ children }) {
    const [content, setContent] = useState();

    const { current, setCurrent } = useContext(TabsContext);

    useEffect(() => {
        if (!current) {
            setCurrent(content);
        }
    })

    const update = () => {
        setCurrent(content);
    };

    return (
        <button onClick={update}>
            {children}
        </button>
    )
}
