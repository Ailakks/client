import type { MemberTransform } from "@/api/transform/member.transform";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserProfileCard } from "./member-profile-card";

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
                        <p>{member.user.display_name}</p>
                        <p>{member.presence?.activities[0]?.body}</p>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent side="right">
                <UserProfileCard user={member} />
            </PopoverContent >
        </Popover>
    );
}
