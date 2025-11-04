import { check } from "@/lib/roles";
import type { GuildTransform } from "@/api/transform/guild.transform";
import { Permissions } from "@/lib/permissions";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ChannelTransform } from "@/api/transform/channel.transform";
import type { ProfileTransform } from "@/api/transform/profile.transform";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChannelSettingsDialog } from "./channel-settings-dialog";

export function ChannelSettingsButton({ data, guildData, item }: { data: ProfileTransform, guildData: GuildTransform, item: ChannelTransform }) {
    return (
        check(data, guildData, item, Permissions.ManageChannels) && (
            <Dialog>
                <DialogTrigger asChild>
                    <span>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <i className="fa-solid fa-gear" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Manage</p>
                            </TooltipContent>
                        </Tooltip>
                    </span>
                </DialogTrigger>
                <DialogContent className="inset-0 rounded-none sm:max-w-none top-0 left-0 translate-x-0 translate-y-0">
                    <ChannelSettingsDialog item={item} />
                </DialogContent>
            </Dialog>
        )
    );
}