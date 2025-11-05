import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GifPicker } from "./gif-picker";

export function ImagePicker() {
    return (
        <Card>
            <Tabs defaultValue="gif" orientation="vertical">
                <CardHeader>
                    <TabsList className="flex-col w-full *:w-full space-y-2">
                        <TabsTrigger value="gif">GIF</TabsTrigger>
                        <TabsTrigger value="stickers">Stickers</TabsTrigger>
                        <TabsTrigger value="emojis">Emojis</TabsTrigger>
                    </TabsList>
                </CardHeader>
                <TabsContent value="gif">
                    <GifPicker />
                </TabsContent>
            </Tabs>
        </Card>
    );
}
