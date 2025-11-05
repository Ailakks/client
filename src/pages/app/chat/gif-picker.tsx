import { StickersTrendingTransform, StickerTransform } from "@/api/transform/emoji/stickers.transform"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useAxiosClient } from "@/lib/axios"
import { useEffect, Fragment } from "react"

function TrendingGifs() {
    const [{ data }] = useAxiosClient<StickersTrendingTransform>(
        { url: "gifs/trending", params: { provider: "tenor", media_format: "webm" } },
        { useCache: true }
    )

    if (!data) return <p>test</p>

    return (
        <Fragment>
            {data.categories.map((item, key) => (
                <AspectRatio key={key} ratio={16 / 9} className="relative rounded-sm overflow-hidden">
                    <video src={item.src} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/80" />
                    <p className="absolute inset-0 flex items-center justify-center text-white">{item.name}</p>
                </AspectRatio>
            ))}
        </Fragment>
    )
}

function SearchGifs({ search }: { search: string }) {
    const [{ data }, refetch] = useAxiosClient<StickerTransform[]>(
        { url: "gifs/search", params: { q: search, provider: "tenor", media_format: "webm" } },
        { manual: true, useCache: true }
    )

    useEffect(() => {
        refetch()
    }, [search, refetch])

    if (!data) return <p>test</p>

    return (
        <Fragment>
            {data.map((item, key) => (
                <AspectRatio key={key} ratio={16 / 9} className="relative rounded-sm overflow-hidden">
                    <video src={item.src} className="h-full w-full object-cover" />
                </AspectRatio>
            ))}
        </Fragment>
    )
}

export function GifPicker({ search }: { search: string }) {
    return (
        <div className="p-2 grid grid-cols-2 gap-2 overflow-auto overflow-x-hidden">
            {search ? <SearchGifs search={search} /> : <TrendingGifs />}
        </div>
    )
}
