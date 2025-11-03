import { Card, CardContent } from "@/components/ui/card";
import Markdown from 'react-markdown'
import type { MessageTransform } from "@/transform/message.transform";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageActions } from "@/data/message-actions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Fragment } from "react/jsx-runtime";

export function Message({ message }: { message: MessageTransform }) {
    return (
        <div className="space-y-2">
            <div className="flex space-x-2">
                <ButtonGroup>
                    {MessageActions.flatMap((list) => list.items).filter((item) => item.featured).map((item) => {
                        return (
                            <Button variant="outline">
                                <i className={item.icon} />
                            </Button>
                        )
                    })}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <i className="fa-solid fa-ellipsis" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {MessageActions.map((item, key) => {
                                return (
                                    <Fragment key={key}>
                                        <DropdownMenuGroup>
                                            {item.items.map((item, key) => {
                                                return (
                                                    <DropdownMenuItem key={key}>
                                                        <i className={item.icon} />
                                                        <p>{item.title}</p>
                                                    </DropdownMenuItem>
                                                )
                                            })}
                                        </DropdownMenuGroup>
                                        {key < MessageActions.length - 1 && <DropdownMenuSeparator />}
                                    </Fragment>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ButtonGroup>
                <Avatar>
                    {message.author.avatar && <AvatarImage src={`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=128`} alt={message.author.username} />}
                    <AvatarFallback>{message.author.username}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="h-6 flex text-nowrap space-x-2">
                        <p>{message.author.username}</p>
                        <p>{message.timestamp}</p>
                        {message.edited_timestamp && <p>(editado)</p>}
                    </div>
                    {
                        message.attachments.map((item, key: number) => {
                            return (
                                <img key={key} className="rounded-lg" src={item.proxy_url} />
                            )
                        })
                    }
                    {
                        message.embeds.map((item, key: number) => {
                            return (
                                <Card key={key}>
                                    <CardContent>
                                        <Markdown>{item.description}</Markdown>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                    <p className="h-6">{message.content}</p>
                </div>
            </div>
        </div>
    );
}
