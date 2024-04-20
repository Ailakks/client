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
                        <MessagesView />
                    </PlatformFilter>
                </TabContent>
            </Tab>
            <Tab>
                <p>{translate("widget.feed.tab.tags.name")}</p>
                <TabContent>
                    <PlatformFilter data={list}>
                        <TagsView />
                    </PlatformFilter>
                </TabContent>
            </Tab>
        </Tabs>
    )
}

function MessagesView() {
    const { filtered } = useContext(DataFilterContext);

    return (
        <List list={filtered}>
            <Message />
        </List>
    )
}

function TagsView() {
    const { filtered } = useContext(DataFilterContext);

    return (
        <List list={filtered}>
            <Tag />
        </List>
    )
}

function Message() {
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

function Tag() {
    const tags = {
        [EventType.SUBSCRIPTION]: {
            message: "",
            tags: [
                {
                    name: "user",
                    value: (({ data: { author: { displayName } } }) => displayName)
                },
                {
                    name: "plan",
                    value: (({ data: { subscription: { plan } } }) => plan)
                },
                {
                    name: "history",
                    value: (({ data: { subscription: { period: { history } } } }) => history)
                },
                {
                    name: "streak",
                    value: (({ data: { subscription: { period: { streak } } } }) => streak)
                }
            ]
        }
    };

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