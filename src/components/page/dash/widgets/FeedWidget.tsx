import {useContext, useEffect} from "react";
import {WidgetDataContext} from "../item/Widget";
import {FilterContext} from "../item/DataFilter";
import PlatformFilter from "../item/PlatformFilter";
import WidgetSocket, {WidgetSocketContext} from "../item/WidgetSocket";
import List, {ListContext} from "../../../list/List";
import Tab from "../../../native/Tab";
import TabContent from "../../../native/TabContent";
import Tabs from "../../../native/Tabs";
import {LanguageContext} from "../../../../wrapper/lang/LanguageWrapper";

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
                        <TagsView/>
                    </PlatformFilter>
                </TabContent>
            </Tab>
            <Tab>
                <p>{translate("widget.feed.tab.tags.name")}</p>
                <TabContent>
                    <PlatformFilter data={list}>
                        <MessagesView />
                    </PlatformFilter>
                </TabContent>
            </Tab>
        </Tabs>
    )
}

function MessagesView() {
    const { list } = useContext(FilterContext);

    return (
        <List list={list}>
            <Message />
        </List>
    )
}

function TagsView() {
    const { list } = useContext(FilterContext);

    return (
        <List list={list}>
            <Tag />
        </List>
    )
}

function Message() {
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

function Tag() {
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