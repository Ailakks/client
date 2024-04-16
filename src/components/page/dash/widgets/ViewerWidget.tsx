import {useContext, useEffect, useState} from "react";
import {WidgetDataContext} from "../item/Widget";
import {DataFilterContext, FilterContext} from "../item/DataFilter";
import {PlatformContext} from "../../../../wrapper/api/Platform";
import PlatformFilter from "../item/PlatformFilter";
import WidgetSocket, {WidgetSocketContext} from "../item/WidgetSocket";
import List, {ListContext} from "../../../list/List";
import {clsx} from "clsx";

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
        <List list={filter.length ? filter : list}>
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

    const [count, setCount] = useState();

    useEffect(() => {
        if (!data) {
            return;
        }

        const { data: { data: { viewers } } } = data;

        setCount(viewers);
    }, [data]);

    return (
        <div className="flex justify-between items-center py-4">
            <div className="flex space-x-2 items-center">
                <i className={clsx(icon.id, "w-5")}/>
                <p>{displayName}</p>
            </div>
            <p>{count ?? `—`}</p>
        </div>
    )
}
