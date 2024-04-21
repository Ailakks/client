import {createContext, useContext, useEffect} from "react";
import {WidgetDataContext} from "../item/Widget";
import {DataFilterContext, FilterContext} from "../item/DataFilter";
import PlatformFilter from "../item/PlatformFilter";
import WidgetSocket, {WidgetSocketContext} from "../item/WidgetSocket";
import List, {ListContext} from "../../../list/List";
import Tab from "../../../native/Tab";
import TabContent from "../../../native/TabContent";
import Tabs from "../../../native/Tabs";
import {LanguageContext} from "../../../../wrapper/lang/LanguageWrapper";
import TabHeader from "../../../native/TabHeader";

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

    return (
        <Tabs>
            <Tab>
                <TabHeader>
                    <p>{translate("widget.feed.tab.messages.name")}</p>
                </TabHeader>
                <TabContent>
                    <View>
                        <MessageViewList />
                    </View>
                </TabContent>
            </Tab>
            <Tab>
                <TabHeader>
                    <p>{translate("widget.feed.tab.tags.name")}</p>
                </TabHeader>
                <TabContent>
                    <View>
                        <TagViewList />
                    </View>
                </TabContent>
            </Tab>
        </Tabs>
    )
}

function View({ children }) {
    const { list } = useContext(WidgetSocketContext);

    return (
        <PlatformFilter data={list}>
            {children}
        </PlatformFilter>
    )
}

function MessageViewList() {
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

export const TagViewContext = createContext();

function TagView() {
    const list = {
        [EventType.SUBSCRIPTION]: {
            tags: [
                {
                    id: "user",
                    icon: "fa-regular fa-user",
                    value: (( { author: { displayName } }) => displayName)
                },
                {
                    id: "plan",
                    icon: "fa-regular fa-star",
                    value: (({ subscription: { plan } }) => plan)
                },
                {
                    id: "history",
                    icon: "fa-regular fa-clock",
                    value: (({ subscription: { period: { history } } }) => history)
                },
                {
                    id: "streak",
                    icon: "fa-regular fa-bolt",
                    value: (({ subscription: { period: { streak } } }) => streak)
                }
            ]
        }
    };

    const { translate } = useContext(LanguageContext);

    const { item } = useContext(ListContext);

    const { meta: { name } } = item;

    const { tags } = list[name];

    return (
        <TagViewContext.Provider value={{ item }}>
            <p>{translate(`widget.feed.tags.data.${name}.name`)}</p>
            <List list={tags}>
                <Tag />
            </List>
        </TagViewContext.Provider>
    )
}

function Tag() {
    const { item: { icon, value } } = useContext(ListContext);

    const { item: { data } } = useContext(TagViewContext);

    return (
        <div>
            <i className={icon} />
            <p>{value(data)}</p>
        </div>
    )
}