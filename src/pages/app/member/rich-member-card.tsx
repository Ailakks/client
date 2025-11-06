import { PopoverContent } from "@/components/ui/popover";
import { useAxiosClient, useProxyAxiosClient } from "@/lib/axios";
import { RichMemberTransform } from "@/api/transform/rich-member.transform";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Spinner } from "@/components/ui/spinner";
import { plainToInstance } from "class-transformer";
import { useEffect, useState } from "react";

export function RichMemberCard({ member_id, guild_id }: { member_id: string, guild_id: string }) {
    const [memberData, setMemberData] = useState<RichMemberTransform>(null);

    const [{ loading, data }] = useProxyAxiosClient({ url: `v9/users/${member_id}/profile`, params: { type: 'popout', with_mutual_guilds: true, with_mutual_friends: true, with_mutual_friends_count: false } });

    useEffect(() => {
        setMemberData(plainToInstance(RichMemberTransform, data, { excludeExtraneousValues: true }));
    }, [data]);

    if (!memberData) {
        return (
            <Spinner />
        )
    }

    return (
        <PopoverContent side="left">
            <p>{memberData.member.nick ?? memberData.member.user.display_name}</p>
            <p>{memberData.member.user.display_name}</p>
            <p>{memberData.user.guild.badge}</p>
            <p>{memberData.mutual_guilds.length} {memberData.mutual_friends.length}</p>
            {memberData.badges.map((item, key) => {
                return (
                    <Link key={key} to={item.link}>
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
