import {useContext, useEffect, useState} from "react";
import {WidgetDataContext} from "../item/Widget";
import {DataFilterContext, FilterContext} from "../item/DataFilter";
import {PlatformContext} from "../../../../wrapper/api/Platform";
import PlatformFilter from "../item/PlatformFilter";
import {WidgetSocketContext} from "../item/WidgetSocket";
import List, {ListContext} from "../../../list/List";

export default function ViewersWidget() {
    const { metadata, setMetadata } = useContext(WidgetDataContext);

    const { filtered } = useContext(DataFilterContext);

    useEffect(() => {
        setMetadata({ id: 'viewers', name: 'Viewers', icon: 'fa-regular fa-wifi', scopes: [{ id: "statistic" }], platforms: ["twitch"] });
    }, []);

    if (metadata) {
        const { list } = useContext(WidgetSocketContext);

        return (
            <PlatformFilter data={list}>
                <Body />
            </PlatformFilter>
        )
    }
}

function Body() {
    const { data: { platformList } } = useContext(PlatformContext);
    const { filter } = useContext(FilterContext);

    const [data, setData] = useState(platformList);

    useEffect(() => {
        if (filter.length < 1) {
            setData(platformList);

            return;
        }

        setData(platformList.filter(({ id }) => filter.find(({ id: target }) => target === id)));
    }, [filter]);

    return (
        <div>
            <List list={data}>
                <Item />
            </List>
        </div>
    )
}

function Item() {
    const [data, setData] = useState();

    const { list } = useContext(FilterContext);
    const { item: { id, displayName, brand: { icon } } } = useContext(ListContext);

    useEffect(() => {
        setData(list.sort(({ data: { timestamp } }) => timestamp).find(({ meta: { platform: { id: target } } }) => target === id));
    }, [list]);

    return (
        <p>{data ? data.data.data.viewers : `—`}</p>
    )
}
