import {useContext, useEffect} from "react";
import {WidgetDataContext} from "../item/Widget";
import List, {ListContext} from "../../../list/List";
import {gql, useQuery} from "@apollo/client";
import Query, {QueryContext} from "../../../query/Query";
import PlatformFilter from "../item/PlatformFilter";
import {DataFilterContext} from "../item/DataFilter";

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
                    platform {
                        id
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
        <div className="space-y-2">
            <PlatformFilter data={channelDataList}>
                <FrameList />
            </PlatformFilter>
        </div>
    )
}

function FrameList() {
    const { data } = useContext(DataFilterContext);

    return (
        <List list={data}>
            <Frame />
        </List>
    )
}

function Frame() {
    const { item: { data: { stream: { source: { url } } } } } = useContext(ListContext);

    if (!url) {
        return;
    }

    return (
        <iframe src={url} />
    )
}
