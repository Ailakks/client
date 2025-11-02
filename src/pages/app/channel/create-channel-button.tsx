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

export function CreateChannelButton({ data, guildData, item }: { data: ProfileTransform, guildData: GuildTransform, item: ChannelTransform }) {
    return (
        check(data, guildData, item, Permissions.ManageChannels) && (
            <Dialog>
                <form onSubmit={(e) => e.preventDefault()}>
                    <DialogTrigger>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button>a</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Create</p>
                            </TooltipContent>
                        </Tooltip>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create channel</DialogTitle>
                            <DialogDescription>Create on category:</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <Label>Name</Label>
                            <Input name="name" placeholder="new-channel" />
                        </div>
                        <DialogFooter>
                            <DialogClose>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog >)
    );
}