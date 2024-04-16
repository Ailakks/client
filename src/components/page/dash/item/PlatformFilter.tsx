import {useContext, useEffect, useState} from "react";
import {PlatformContext} from "../../../../wrapper/api/Platform";
import DataFilter from "./DataFilter";
import {WidgetDataContext} from "./Widget";
import {WidgetSocketContext} from "./WidgetSocket";

export default function PlatformFilter({ children }) {
    const [filter, setFilter] = useState([]);

    const { data: { platformList } } = useContext(PlatformContext);
    const { metadata: { platforms } } = useContext(WidgetDataContext);

    useEffect(() => {
        setFilter(platformList.filter(({ id }) => platforms.includes(id)));
    }, [platformList]);

    const list = [
        {
            name: 'platform',
            list: filter
        }
    ];

    return (
        <DataFilter list={list} data={data}>
            {children}
        </DataFilter>
    )
}