import { useParams } from "react-router-dom";
import type { GuildTransform } from "@/api/transform/guild.transform";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group";
import { Field, FieldError } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { AxiosClient } from "@/lib/axios";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ImagePicker } from "./chat/image-picker";

export function MessageInput({ guildData }: { guildData?: GuildTransform }) {
    const { channel } = useParams();

    interface MessageType {
        content: string
    }

    const form = useForm<MessageType>({
        defaultValues: {
            content: ''
        },
    });

    function onSubmit(data: MessageType) {
        AxiosClient.post(`https://discord.com/api/v9/channels/${channel}/messages`, data);
    };

    return (
        <form id="message" onSubmit={form.handleSubmit(onSubmit)}>
            <footer className="border-t p-2">
                <InputGroup>
                    <Controller
                        name="content"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <InputGroupTextarea {...field} placeholder="Send message to" enterKeyHint="send" onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        form.handleSubmit(onSubmit)()
                                    }
                                }} />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <InputGroupAddon align="inline-start">
                        <InputGroupButton variant="default" size="icon-xs">
                            <i className="fa-solid fa-plus" />
                        </InputGroupButton>
                    </InputGroupAddon>
                    <Popover>
                        <PopoverTrigger asChild>
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton variant="default" size="icon-xs">
                                    <i className="fa-solid fa-gif" />
                                </InputGroupButton>
                            </InputGroupAddon>
                        </PopoverTrigger>
                        <PopoverContent className="w-full">
                            <ImagePicker defaultValue="gifs" />
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton variant="default" size="icon-xs">
                                    <i className="fa-solid fa-note-sticky" />
                                </InputGroupButton>
                            </InputGroupAddon>
                        </PopoverTrigger>
                        <PopoverContent className="w-full">
                            <ImagePicker defaultValue="stickers" />
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton variant="default" size="icon-xs">
                                    <i className="fa-solid fa-smile" />
                                </InputGroupButton>
                            </InputGroupAddon>
                        </PopoverTrigger>
                        <PopoverContent className="w-full">
                            <ImagePicker defaultValue="emojis" />
                        </PopoverContent>
                    </Popover>
                </InputGroup>
            </footer>
        </form>
    );
}
