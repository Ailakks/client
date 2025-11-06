import { PopoverContent } from "@/components/ui/popover";
import { useAxiosClient, useProxyAxiosClient } from "@/lib/axios";
import { RichMemberTransform } from "@/api/transform/rich-member.transform";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Spinner } from "@/components/ui/spinner";
import { plainToInstance } from "class-transformer";
import { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ProfileTransform } from "@/api/transform/profile.transform";
import { ProfileContext } from "@/context/profile";
import { Button } from "@/components/ui/button";

export function RichMemberCard({ member_id, guild_id }: { member_id: string, guild_id: string }) {
    const { data: profileData } = useContext(ProfileContext);

    const [memberData, setMemberData] = useState<RichMemberTransform>(null);

    const [{ loading, data }] = useProxyAxiosClient({ url: `v9/users/${member_id}/profile`, params: { type: 'popout', with_mutual_guilds: true, with_mutual_friends: true, with_mutual_friends_count: false, guild_id } });

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
            <Avatar className="size-20">
                <AvatarImage  src={`https://cdn.discordapp.com/avatars/${memberData.user.id}/${memberData.member.avatar ?? memberData.member.user.avatar}.webp?size=80`} alt={memberData.user.username} />
                <AvatarFallback>{memberData.user.username}</AvatarFallback>
            </Avatar>
            <p>{memberData.member.nick ?? memberData.member.user.global_name}</p>
            <p>{memberData.member.user.username}</p>
            <p>{memberData.user.guild?.badge}</p>
            <p>{memberData.mutual_guilds.length} servidores en común</p>
            <p>{memberData.mutual_friends.length} amigos en común</p>
            <div className="flex gap-2">
                {memberData.badges.map((item, key) => {
                    return (
                        <Link key={key} to={item.link}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <img className="h-5" src={`https://cdn.discordapp.com/badge-icons/${item.icon}.png`} />
                                </TooltipTrigger>
                                <TooltipContent side="left">
                                    <p>{item.description}</p>
                                </TooltipContent>
                            </Tooltip>
                        </Link>
                    )
                })}
            </div>
            <div className="flex flex-wrap gap-2">
                {memberData.member.roles.map((item, key) => {
                    const guild = profileData.data.guilds.find((item) => item.id == guild_id);
                    const role = guild.roles.find((target) => target.id == item);

                    return (
                        <Button key={key}>{role.name}</Button>
                    )
                })}
            </div>
        </PopoverContent >
    );
}
