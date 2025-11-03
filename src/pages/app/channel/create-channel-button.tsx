import { check } from "@/lib/roles";
import type { GuildTransform } from "@/transform/guild.transform";
import { Permissions } from "@/lib/permissions";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ChannelTransform } from "@/transform/channel.transform";
import type { ProfileTransform } from "@/transform/profile.transform";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosClient } from "@/lib/client";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChannelTypes } from "@/data/channel-types";

export function CreateChannelButton({ data, guildData, item }: { data: ProfileTransform, guildData: GuildTransform, item: ChannelTransform }) {
    const [open, setOpen] = useState(false);

    const formSchema = z.object({
        name: z
            .string()
            .min(1)
            .max(100),
        type: z
            .number()
    });

    interface Type {
        type: number,
        parent_id: string
    }

    const form = useForm<Partial<Type> & z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            name: ""
        },
    });

    function onSubmit({ type, name, parent_id }: Partial<Type> & z.infer<typeof formSchema>) {
        AxiosClient.post(`guilds/${guildData.id}/channels`, { type, name, parent_id: item.id }).then(() => {
            form.reset();
            setOpen(false);
        });
    };

    return (
        check(data, guildData, item, Permissions.ManageChannels) && (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <Tooltip>
                        <TooltipTrigger>
                            <i className="fa-solid fa-plus" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Create</p>
                        </TooltipContent>
                    </Tooltip>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create channel</DialogTitle>
                        <DialogDescription>Create on category {item.name}</DialogDescription>
                    </DialogHeader>
                    <form id="create" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="type"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <RadioGroup value={`${field.value}`} onValueChange={(e) => field.onChange(Number(e))}>
                                        {Object.entries(ChannelTypes).map(([id, item]) => {
                                            return (
                                                <FieldLabel key={id} htmlFor={`${id}`}>
                                                    <Field>
                                                        <div className="flex items-center space-x-5">
                                                            <i className={item.icon} />
                                                            <FieldContent>
                                                                <FieldTitle>{item.title}</FieldTitle>
                                                                <FieldDescription>{item.body}</FieldDescription>
                                                            </FieldContent>
                                                            <RadioGroupItem id={`${id}`} value={`${id}`} />
                                                        </div>
                                                    </Field>
                                                </FieldLabel>
                                            )
                                        })}
                                    </RadioGroup>
                                )}
                            />
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Name</FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="new-channel"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Field orientation="horizontal">
                            <Button type="submit" form="create" className="cursor-pointer">Create</Button>
                        </Field>
                    </DialogFooter>
                </DialogContent>
            </Dialog >)
    );
}