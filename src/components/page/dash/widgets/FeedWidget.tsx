import {createContext, useContext, useEffect} from "react";
import {WidgetDataContext} from "../item/Widget";
import {DataFilterContext} from "../item/DataFilter";
import PlatformFilter from "../item/PlatformFilter";
import WidgetSocket, {WidgetSocketContext} from "../item/WidgetSocket";
import List, {ListContext} from "../../../list/List";
import Tab from "../../../native/Tab";
import TabContent from "../../../native/TabContent";
import Tabs from "../../../native/Tabs";
import {LanguageContext} from "../../../../wrapper/lang/LanguageWrapper";
import NoContentFallback from "../../fallback/NoContentFallback";

enum EventType {
    SUBSCRIPTION = 'subscription',
    GIFT = 'gift'
}

export default function FeedWidget() {
    const { metadata, setMetadata } = useContext(WidgetDataContext);

    useEffect(() => {
        setMetadata({ id: 'feed', name: 'Feed', icon: 'fa-regular fa-bell', scopes: [
                { id: 'donation' }, { id: 'gift' }, { id: 'subscription' }], platforms: ["youtube", "twitch"] });
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
                <p>{translate("widget.feed.tab.messages.name")}</p>
                <TabContent isDefault={true}>
                    <View>
                        <MessageViewList />
                    </View>
                </TabContent>
            </Tab>
            <Tab>
                <p>{translate("widget.feed.tab.tags.name")}</p>
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
        <div className="flex flex-col grow divide-y-1 divide-gray-300">
            <List list={filtered} fallback={<NoContentFallback />}>
                <MessageView/>
            </List>
        </div>
    )
}

function TagViewList() {
    const { filtered } = useContext(DataFilterContext);

    return (
        <div className="flex flex-col grow divide-y-1 divide-gray-300">
            <List list={filtered} fallback={<NoContentFallback />}>
                <TagView />
            </List>
        </div>
    )
}

function MessageView() {
    const { item: { system } } = useContext(ListContext);

    if (!system) {
        return;
    }

    const { message: { message } } = system;

    return (
        <div className="py-2">
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
                    value: (({ subscription: { plan } }) => !isNaN(plan) ? plan / 1000 : plan)
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
            <div className="space-y-2 py-2">
                <p>{translate(`widget.feed.tags.event.${name}.title`)}</p>
                <div className="flex items-center space-x-4">
                    <List list={tags}>
                        <Tag/>
                    </List>
                </div>
            </div>
        </TagViewContext.Provider>
    )
}

function Tag() {
    const { item: { icon, value } } = useContext(ListContext);

    const { item: { data} } = useContext(TagViewContext);

    return (
        <div className="flex items-center space-x-2">
            <i className={icon} />
            <p>{value(data)}</p>
        </div>
    )
}