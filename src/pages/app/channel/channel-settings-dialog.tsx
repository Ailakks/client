import type { ChannelTransform } from "@/api/transform/channel.transform";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectSeparator } from "@/components/ui/select";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { TabsList } from "@radix-ui/react-tabs";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export function ChannelSettingsDialog({ item }: { item: ChannelTransform }) {
    const formSchema = z.object({
        name: z
            .string(),
        topic: z
            .string()
    });

    interface Type {
        rate_limit_per_user: number,
        nsfw: boolean,
        default_auto_archive_duration: number
    }

    const form = useForm<Partial<Type> & z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            topic: "",
            rate_limit_per_user: 0,
            nsfw: false,
            default_auto_archive_duration: 0
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {

    };

    return (
        <DialogContent className="inset-0 rounded-none sm:max-w-none top-0 left-0 translate-x-0 translate-y-0">
            <DialogHeader>
                <DialogTitle>Vista general</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="general">
                <div className="flex">
                    <SidebarProvider className="w-fit">
                        <Sidebar>
                            <SidebarContent className="p-5">
                                <p>#{item.name}</p>
                                <TabsList className="flex flex-col space-y-2">
                                    <TabsTrigger value="general" asChild>
                                        <Button variant="outline">General</Button>
                                    </TabsTrigger>
                                    <TabsTrigger value="permissions" asChild>
                                        <Button variant="outline">Roles</Button>
                                    </TabsTrigger>
                                </TabsList>
                            </SidebarContent>
                        </Sidebar>
                    </SidebarProvider>
                    <TabsContent value="general">
                        <form id="channel" onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <Controller
                                    name="name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Nombre del canal</FieldLabel>
                                            <Input
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                            <FieldGroup>
                                <Controller
                                    name="topic"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Tema del canal</FieldLabel>
                                            <Textarea
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                            <FieldGroup>
                                <Controller
                                    name="topic"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Modo pausado</FieldLabel>
                                            <Select
                                                name={field.name}
                                                value={field.value}
                                                onValueChange={field.onChange}>
                                                <SelectTrigger
                                                    aria-invalid={fieldState.invalid}>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent position="item-aligned">
                                                    <SelectItem value="0">Auto</SelectItem>
                                                    <SelectSeparator />
                                                    {[5, 10, 15, 30].map((item, key) => (
                                                        <SelectItem key={key} value={`${item}`}>
                                                            <p>{item}</p>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FieldDescription>Los miembros solo podrán enviar un mensaje o crear un hilo por cada intervalo, a menos que tengan los permisos Gestionar canal o Gestionar mensajes.</FieldDescription>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                            <FieldGroup>
                                <Controller
                                    name="nsfw"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Canal con restricción por edad</FieldLabel>
                                            <FieldDescription>Los usuarios tendrán que confirmar que son mayores de edad para ver el contenido de este canal. Los canales con restricción por edad están exentos del filtro de contenido explícito.</FieldDescription>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        </form>
                    </TabsContent>
                    <TabsContent value="permissions">
                        <p>roles</p>
                    </TabsContent>
                </div>
            </Tabs>
        </DialogContent>
    );
}
