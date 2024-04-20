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
                <FeedList />
            </WidgetSocket>
        )
    }
}

function FeedList() {
    const { translate } = useContext(LanguageContext);

    const { list } = useContext(WidgetSocketContext);

    return (
        <Tabs>
            <Tab>
                <p>{translate("widget.feed.tab.messages.name")}</p>
                <TabContent>
                    <PlatformFilter data={list}>
                        <MessagesViewList />
                    </PlatformFilter>
                </TabContent>
            </Tab>
            <Tab>
                <p>{translate("widget.feed.tab.tags.name")}</p>
                <TabContent>
                    <PlatformFilter data={list}>
                        <TagViewList />
                    </PlatformFilter>
                </TabContent>
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
    const { item: { system } } = useContext(FilterContext);

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
                    value: (({ data: { author: { displayName } } }) => displayName)
                },
                {
                    id: "plan",
                    value: (({ data: { subscription: { plan } } }) => plan)
                },
                {
                    id: "history",
                    value: (({ data: { subscription: { period: { history } } } }) => history)
                },
                {
                    id: "streak",
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