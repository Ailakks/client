import {useContext} from "react";
import {PlatformContext} from "../../../../wrapper/api/Platform";
import DataFilter from "./DataFilter";

export default function PlatformFilter({ children }) {
    const { data: { platformList } } = useContext(PlatformContext);

    const data = [
        {
            name: 'platform',
            list: platformList
        }
    ];

    return (
        <DataFilter data={data}>
            {children}
        </DataFilter>
    )
}