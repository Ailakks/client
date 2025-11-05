import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GifPicker } from "./gif-picker";

export function ImagePicker() {
    return (
        <Card className="overflow-hidden">
            <Tabs defaultValue="gif" className="flex h-100">
                <CardHeader>
                    <TabsList className="w-full">
                        <TabsTrigger value="gif">GIF</TabsTrigger>
                        <TabsTrigger value="stickers">Stickers</TabsTrigger>
                        <TabsTrigger value="emojis">Emojis</TabsTrigger>
                    </TabsList>
                </CardHeader>
                <TabsContent value="gif" className="p-2 grid grid-cols-2 gap-2 overflow-auto">
                    <GifPicker />
                </TabsContent>
            </Tabs>
        </Card>
    );
}
