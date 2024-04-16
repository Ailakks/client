import {useContext} from "react";

export default function PlatformFilter({ children }) {
    const { data: { platformList: list } } = useContext(PlatformContext);

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