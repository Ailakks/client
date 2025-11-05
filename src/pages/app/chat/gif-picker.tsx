import type { StickersListTransform } from "@/api/transform/emoji/stickers.transform";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AxiosClient } from "@/lib/axios";
import { useEffect, useState } from "react";

export function GifPicker() {
    const [data, setData] = useState<StickersListTransform>(null);

    useEffect(() => {
        AxiosClient.get(`gifs/trending?provider=tenor&locale=es-ES&media_format=webm`, { params: { provider: 'tenor', media_format: 'webm' } }).then(({ data }) => setData(data));
    }, []);

    if (!data) {
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
