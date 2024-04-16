import {useContext, useEffect, useState} from "react";
import {PlatformContext} from "../../../../wrapper/api/Platform";
import DataFilter from "./DataFilter";
import {WidgetDataContext} from "./Widget";

export default function PlatformFilter({ data, children }) {
    const [filtered, setFiltered] = useState([]);

    const { data: { platformList } } = useContext(PlatformContext);
    const { metadata: { platforms } } = useContext(WidgetDataContext);

    useEffect(() => {
        setFiltered(platformList.filter(({ id }) => platforms.includes(id)));
    }, [platformList]);

    const list = [
        {
            name: 'platform',
            list: filtered
        }
    ];

    const filter = (item) => {
        const { platform: { id } } = item;

        return filtered.map(({ id }) => id).includes(id);
    };

    return (
        <DataFilter list={list} validator={filter} data={data}>
            {children}
        </DataFilter>
    )
}