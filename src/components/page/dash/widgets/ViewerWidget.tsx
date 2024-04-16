import {useContext, useEffect, useState} from "react";
import {WidgetDataContext} from "../item/Widget";
import {DataFilterContext, FilterContext} from "../item/DataFilter";
import {PlatformContext} from "../../../../wrapper/api/Platform";
import PlatformFilter from "../item/PlatformFilter";
import WidgetSocket, {WidgetSocketContext} from "../item/WidgetSocket";
import List, {ListContext} from "../../../list/List";

export default function ViewersWidget() {
    const { metadata, setMetadata } = useContext(WidgetDataContext);

    useEffect(() => {
        setMetadata({ id: 'viewers', name: 'Viewers', icon: 'fa-regular fa-wifi', scopes: [{ id: "statistic" }], platforms: ["twitch", "x"] });
    }, []);

    if (metadata) {
        return (
            <WidgetSocket>
                <ViewersList />
            </WidgetSocket>
        )
    }
}

function ViewersList() {
    const { list } = useContext(WidgetSocketContext);

    return (
        <PlatformFilter data={list}>
            <Body />
        </PlatformFilter>
    )
}

function Body() {
    const { list } = useContext(FilterContext);

    return (
        <List list={list}>
            <Platform />
        </List>
    )
}

function Platform() {
    const { item: { list } } = useContext(ListContext);

    const { filter } = useContext(FilterContext);

    return (
        <List list={filter.length > 0 ? filter : list}>
            <Item />
        </List>
    )
}

function Item() {
    const [data, setData] = useState();

    const { filtered } = useContext(DataFilterContext);
    const { item: { id, displayName, brand: { icon } } } = useContext(ListContext);

    useEffect(() => {
        setData(filtered.sort(({ data: { timestamp } }) => timestamp).find(({ meta: { platform: { id: target } } }) => target === id));
    }, [filtered]);

    return (
        <p>{data ? data.data.data.viewers : `—`}</p>
    )
}
