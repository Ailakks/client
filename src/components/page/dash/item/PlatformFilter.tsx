import {useContext, useEffect, useState} from "react";
import {PlatformContext} from "../../../../wrapper/api/Platform";
import DataFilter from "./DataFilter";
import {WidgetDataContext} from "./Widget";

export default function PlatformFilter({ data, children }) {
    const [filter, setFilter] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const { data: { platformList } } = useContext(PlatformContext);
    const { metadata: { platforms } } = useContext(WidgetDataContext);

    useEffect(() => {
        setFilter(platformList.filter(({ id }) => platforms.includes(id)));
    }, [platformList]);

    useEffect(() => {
        setFiltered(data.filter(({ platform: { id } }) => platforms.includes(id)));
    }, [data]);

    const list = [
        {
            name: 'platform',
            list: filter
        }
    ];

    return (
        <DataFilter list={list} data={filtered}>
            {children}
        </DataFilter>
    )
}