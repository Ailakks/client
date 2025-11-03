import { Card, CardContent } from "@/components/ui/card";
import Markdown from 'react-markdown'
import type { MessageTransform } from "@/transform/message.transform";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageActions } from "@/data/message-actions";

export function Message({ message }: { message: MessageTransform }) {
    return (
        <div className="space-y-2">
            <div className="flex space-x-2">
                <ButtonGroup>
                    {Object.values(MessageActions).map((item) => {
                        return (
                            <Button variant="outline">
                                <i className={item.icon} />
                                <p>{item.title}</p>
                            </Button>
                        )
                    })}
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
