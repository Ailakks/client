import {useContext, useEffect} from "react";
import {WidgetDataContext} from "../item/Widget";
import {DataFilterContext, FilterContext} from "../item/DataFilter";
import PlatformFilter from "../item/PlatformFilter";
import WidgetSocket, {WidgetSocketContext} from "../item/WidgetSocket";
import List, {ListContext} from "../../../list/List";
import Tab from "../../../native/Tab";
import TabContent from "../../../native/TabContent";
import Tabs from "../../../native/Tabs";
import {LanguageContext} from "../../../../wrapper/lang/LanguageWrapper";

enum EventType {
    SUBSCRIPTION = 'subscription',
    GIFT = 'gift'
}

export default function FeedWidget() {
    const { metadata, setMetadata } = useContext(WidgetDataContext);

    useEffect(() => {
        setMetadata({ id: 'feed', name: 'Feed', icon: 'fa-regular fa-bell', scopes: [
                { id: 'donation' }, { id: 'gift' }, { id: 'subscription' }], platforms: ["twitch"] });
    }, []);

    if (metadata) {
        return (
            <WidgetSocket>
                <Body />
            </WidgetSocket>
        )
    }
}

function Body() {
    const { translate } = useContext(LanguageContext);

    const { list } = useContext(WidgetSocketContext);

    return (
        <Tabs>
            <Tab id={0} tab={<p>{translate("widget.feed.tab.messages.name")}</p>}>
                <PlatformFilter data={list}>
                    <MessagesViewList />
                </PlatformFilter>
            </Tab>
            <Tab id={1} tab={<p>{translate("widget.feed.tab.tags.name")}</p>}>
                <PlatformFilter data={list}>
                    <p>test</p>
                </PlatformFilter>
            </Tab>
        </Tabs>
    )
}

function MessagesViewList() {
    const { filtered } = useContext(DataFilterContext);

    return (
        <List list={filtered}>
            <MessageView />
        </List>
    )
}

function TagViewList() {
    const { filtered } = useContext(DataFilterContext);

    return (
        <List list={filtered}>
            <TagView />
        </List>
    )
}

function MessageView() {
    const { item: { system } } = useContext(ListContext);

    if (!system) {
        return;
    }

    const { message: { message } } = system;

    return (
        <div>
            <p>{message}</p>
        </div>
    )
}

function TagView() {
    const list = {
        [EventType.SUBSCRIPTION]: {
            tags: [
                {
                    id: "user",
                    icon: "fa-regular fa-user",
                    value: (({ data: { author: { displayName } } }) => displayName)
                },
                {
                    id: "plan",
                    icon: "fa-regular fa-star",
                    value: (({ data: { subscription: { plan } } }) => plan)
                },
                {
                    id: "history",
                    icon: "fa-regular fa-clock",
                    value: (({ data: { subscription: { period: { history } } } }) => history)
                },
                {
                    id: "streak",
                    icon: "fa-regular fa-bolt",
                    value: (({ data: { subscription: { period: { streak } } } }) => streak)
                }
            ]
        }
    };

    const { item: { meta: { name } } } = useContext(FilterContext);

    const { tags } = list[name];

    return (
        <div>
            <p>{translate(`widget.feed.tags.data.${name}.name`)}</p>
            <List list={tags}>
                <Tag />
            </List>
        </div>
    )
}

function Tag() {
    const { item: { icon, value } } = useContext(ListContext);

    const { item: { data } } = useContext(FilterContext);

    return (
        <div>
            <i className={icon} />
            <p>{value(data)}</p>
        </div>
    )
}