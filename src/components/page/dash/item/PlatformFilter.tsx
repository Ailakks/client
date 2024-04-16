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

    const property = (item) => {
        const { platform: { id } } = item;

        return id;
    };

    return (
        <DataFilter list={list} property={property} data={data}>
            {children}
        </DataFilter>
    )
}