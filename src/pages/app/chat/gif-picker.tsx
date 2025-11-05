import { StickersListTransform } from "@/api/transform/emoji/stickers.transform";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAxiosClient } from "@/lib/axios";

export function GifPicker() {
    const [{ data, loading }] = useAxiosClient<StickersListTransform>({ url: `gifs/trending`, params: { provider: 'tenor', media_format: 'webm' } }, { useCache: true })

    if (loading) {
        return <p>test</p>
    }

    return (
        <Card>
            <Tabs defaultValue="general" orientation="vertical">
                <CardHeader>
                    <TabsList className="flex-col w-full *:w-full space-y-2">
                        <TabsTrigger value="gif">GIF</TabsTrigger>
                        <TabsTrigger value="stickers">Stickers</TabsTrigger>
                        <TabsTrigger value="emojis">Rmojis</TabsTrigger>
                    </TabsList>
                </CardHeader>
                <TabsContent value="gif">
                    {data.categories.map((item, key) => {
                        return (
                            <AspectRatio key={key}>
                                <img src={item.src} alt={item.name} />
                            </AspectRatio>
                        )
                    })}
                </TabsContent>
            </Tabs>
        </Card>
    );
}
