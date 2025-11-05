import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GifPicker } from "./gif-picker";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useState } from "react";

export function ImagePicker() {
    const [search, setSearch] = useState("");

    return (
        <Tabs defaultValue="gif" className="overflow-hidden h-100 w-100">
            <CardHeader>
                <TabsList>
                    <TabsTrigger value="gif">GIF</TabsTrigger>
                    <TabsTrigger value="stickers">Stickers</TabsTrigger>
                    <TabsTrigger value="emojis">Emojis</TabsTrigger>
                </TabsList>
                <InputGroup>
                    <InputGroupInput placeholder="Search..." onChange={(e) => setSearch(e.target.value)} value={search} />
                    <InputGroupAddon>
                        <i className="fa-solid fa-search" />
                    </InputGroupAddon>
                </InputGroup>
            </CardHeader>
            <TabsContent value="gif" className="p-2 grid grid-cols-2 gap-2 overflow-auto">
                <GifPicker search={search} />
            </TabsContent>
        </Tabs>
    );
}
