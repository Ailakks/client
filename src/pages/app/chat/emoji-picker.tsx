import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { ProfileContext } from "@/context/profile"
import { useContext } from "react";

function SearchEmoji({ search }: { search: string }) {
    const { data } = useContext(ProfileContext);

    return data.data.guilds.flatMap((item) => item.emojis).filter((item) => item.name.includes(search)).map((item, key) => {
        return (
            <Button key={key} className="w-10 aspect-square p-0 overflow-hidden">
                <img src={`https://cdn.discordapp.com/emojis/${item.id}.webp?size=48`} />
            </Button>
        )
    })
}

function EmojiList() {
    const { data } = useContext(ProfileContext);

    return (
        <Accordion type="multiple" className="w-full">
            {data.data.guilds.filter((item) => item.emojis.length > 0).map((item, key) => {
                return (
                    <AccordionItem key={key} value={item.name}>
                        <AccordionTrigger><p>{item.name}</p></AccordionTrigger>
                        <AccordionContent className="flex flex-wrap gap-4">
                            {item.emojis.map((item, key) => {
                                return (
                                    <Button key={key} className="w-10 aspect-square">
                                        <img src={`https://cdn.discordapp.com/emojis/${item.id}.webp?size=48`} />
                                    </Button>
                                )
                            })}
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}


export function EmojiPicker({ search }: { search: string }) {
    return (
        <div className="flex flex-wrap gap-2 overflow-auto overflow-x-hidden">
            {search ? <SearchEmoji search={search} /> : <EmojiList />}
        </div>
    )
}