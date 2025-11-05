import type { MemberTransform } from "@/api/transform/member.transform";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserProfileCard } from "./member-profile-card";
import { RichMemberCard } from "./rich-member-card";

export function MemberCard({ member }: { member: MemberTransform }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src={`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=80&quality=lossless`} alt={member.user.username} />
                        <AvatarFallback>{member.user.display_name}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p>{member.nick ?? member.user.global_name ?? member.user.username}</p>
                        <p>{member.presence?.activities[0]?.body}</p>
                    </div>
                    <p>{member.user.guild?.tag}</p>
                    {member.user.bot && <p>APP</p>}
                </div>
            </PopoverTrigger>
            <PopoverContent side="left">
                <RichMemberCard member_id="1432477694259626248" guild_id="803314649251840030" />
            </PopoverContent >
        </Popover>
    );
}
