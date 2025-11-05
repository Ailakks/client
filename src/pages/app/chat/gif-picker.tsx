import { StickersListTransform } from "@/api/transform/emoji/stickers.transform";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAxiosClient } from "@/lib/axios";
import { Fragment } from "react/jsx-runtime";

export function GifPicker() {
    const [{ data, loading }] = useAxiosClient<StickersListTransform>({ url: `gifs/trending`, params: { provider: 'tenor', media_format: 'webm' } }, { useCache: true })

    if (loading) {
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
    );
}
