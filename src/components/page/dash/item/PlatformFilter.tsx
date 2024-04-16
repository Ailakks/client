import {useContext, useEffect, useState} from "react";
import {PlatformContext} from "../../../../wrapper/api/Platform";
import DataFilter from "./DataFilter";
import {WidgetDataContext} from "./Widget";

export default function PlatformFilter({ children }) {
    const [list, setList] = useState([]);

    const { data: { platformList } } = useContext(PlatformContext);

    const { metadata: { platforms } } = useContext(WidgetDataContext);

    useEffect(() => {
        setList(platformList.filter(({ id }) => platforms.includes(id)));
    }, [platformList]);

    const data = [
        {
            name: 'platform',
            list: list
        }
    ];

    return (
        <DataFilter data={data}>
            {children}
        </DataFilter>
    )
}