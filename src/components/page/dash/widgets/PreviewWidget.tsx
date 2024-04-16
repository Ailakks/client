import {useContext, useEffect} from "react";
import {WidgetDataContext} from "../item/Widget";
import {ListContext} from "../../../list/List";
import {gql, useQuery} from "@apollo/client";
import Query from "../../../query/Query";
import PlatformFilter from "../item/PlatformFilter";

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
    const { response: { channelDataList } } = useContext(QueryContext);

    return (
        <div className="space-y-2">
            <PlatformFilter data={channelDataList}>
                <Item />
            </PlatformFilter>
        </div>
    )
}

function Item() {
    const { item: { data: { stream: { source: { url } } } } } = useContext(ListContext);

    if (!url) {
        return;
    }

    return (
        <iframe src={url} />
    )
}
