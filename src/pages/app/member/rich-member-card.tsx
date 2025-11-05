import { PopoverContent } from "@/components/ui/popover";
import { useAxiosClient } from "@/lib/axios";
import type { RichMemberTransform } from "@/api/transform/rich-member.transform";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function RichMemberCard({ member_id, guild_id }: { member_id: string, guild_id: string }) {
    const [{ data }] = useAxiosClient<RichMemberTransform>({ url: `users/${member_id}/profile`, params: { type: 'popout', with_mutual_guilds: true, with_mutual_friends: true, with_mutual_friends_count: false, guild_id } })

    return (
        <PopoverContent side="left">
            <p>{data.member.nick ?? data.member.user.display_name}</p>
            <p>{data.member.user.display_name}</p>
            <p>{data.user.guild.badge}</p>
            <p>{data.mutual_guilds.length} {data.mutual_friends.length}</p>
            {data.badges.map((item, key) => {
                return (
                    <Link to={item.link}>
                        <Tooltip>
                            <TooltipTrigger asChild>

                                <img src={`${item.icon}`} />
                            </TooltipTrigger>
                            <TooltipContent side="left">
                                <p>{item.description}</p>
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                )
            })}
        </PopoverContent >
    );
}
