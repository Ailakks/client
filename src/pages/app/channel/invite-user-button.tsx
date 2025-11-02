import { check } from "@/lib/roles";
import type { GuildTransform } from "@/transform/guild.transform";
import { Permissions } from "@/lib/permissions";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ChannelTransform } from "@/transform/channel.transform";
import type { ProfileTransform } from "@/transform/profile.transform";

export function InviteUserButton({ data, guildData, item }: { data: ProfileTransform, guildData: GuildTransform, item: ChannelTransform }) {
    return (
        check(data, guildData, item, Permissions.CreateInstantInvite) && <Tooltip>
            <TooltipTrigger asChild>
                <i className="fa-solid fa-user-plus" />
            </TooltipTrigger>
            <TooltipContent>
                <p>Invite</p>
            </TooltipContent>
        </Tooltip>
    );
}