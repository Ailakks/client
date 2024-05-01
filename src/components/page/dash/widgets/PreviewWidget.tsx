import {useContext, useEffect} from "react";
import {WidgetDataContext} from "../item/Widget";
import List, {ListContext} from "../../../list/List";
import {gql, useQuery} from "@apollo/client";
import Query, {QueryContext} from "../../../query/Query";
import PlatformFilter from "../item/PlatformFilter";
import {DataFilterContext} from "../item/DataFilter";
import NoContentFallback from "../../fallback/NoContentFallback";

export default function PreviewWidget() {
    const {metadata, setMetadata} = useContext(WidgetDataContext);

    useEffect(() => {
        setMetadata({
            id: 'preview',
            name: 'Preview',
            icon: 'fa-regular fa-video',
            scopes: [{id: "message"}],
            platforms: ["youtube", "twitch", "tiktok", "x", "kick"]
        });
    }, []);

    if (metadata) {
        const request = useQuery(gql`
            query {
                channelDataList {
                    meta {
                        platform {
                            id
                        }
                    }
                    data {
                        id
                        stream {
                            source {
                                url
                                __typename
                            }
                            __typename
                        }
                        __typename
                        __typename
                    }
                    __typename
                }
            }`
        );

        return (
            <Query request={request}>
                <Body />
            </Query>
        )
    }
}

function Body() {
    const { data: { channelDataList } } = useContext(QueryContext);

    return (
        <div className="flex space-y-2 overflow-y-hidden">
            <PlatformFilter data={channelDataList}>
                <FrameList />
            </PlatformFilter>
        </div>
    )
}

function FrameList() {
    const { filtered } = useContext(DataFilterContext);

    return (
        <div className="grow space-y-2">
            <List list={filtered} fallback={<NoContentFallback />}>
                <Item />
            </List>
        </div>
    )
}

function Item() {
    const { item: { data: { stream: { source: { url } } } } } = useContext(ListContext);

    if (!url) {
        return;
    }

    return (
        <iframe className="rounded" src={url} />
    )
}
