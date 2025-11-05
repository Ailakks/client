import { StickersTrendingTransform, StickerTransform } from "@/api/transform/emoji/stickers.transform";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAxiosClient } from "@/lib/axios";
import { useEffect } from "react";
import { Fragment } from "react/jsx-runtime";

export function GifPicker({ search }: { search: string }) {
    if (search == "") {
        const [{ data, loading }] = useAxiosClient<StickersTrendingTransform>({ url: `gifs/trending`, params: { provider: 'tenor', media_format: 'webm' } }, { useCache: true })

        if (!data) {
            return <p>test</p>
        }

        return (
            <Fragment>
                {data.categories.map((item, key) => {
                    return (
                        <AspectRatio key={key} ratio={16 / 9} className="relative rounded-sm overflow-hidden">
                            <video src={item.src} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-black/80" />
                            <p className="absolute inset-0 flex items-center justify-center text-white">{item.name}</p>
                        </AspectRatio>
                    )
                })}
            </Fragment>
        )
    }

    const [{ data, loading }, refetch] = useAxiosClient<StickerTransform[]>({ url: `gifs/search`, params: { q: search, provider: 'tenor', media_format: 'webm' } }, { manual: true, useCache: true })

    useEffect(() => {
        refetch();
    }, [search])

    if (!data) {
        return <p>test</p>
    }

    return (
        <Fragment>
            {data.map((item, key) => {
                return (
                    <AspectRatio key={key} ratio={16 / 9} className="relative rounded-sm overflow-hidden">
                        <video src={item.src} className="h-full w-full object-cover" />
                    </AspectRatio>
                )
            })}
        </Fragment>
    )
}
