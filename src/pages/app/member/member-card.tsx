import type { MemberTransform } from "@/api/transform/member.transform";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function MemberCard({ member }: { member: MemberTransform }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src={`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=80&quality=lossless`} alt={member.user.username} />
                        <AvatarFallback>{member.user.username}</AvatarFallback>
                    </Avatar>
                    <p>{member.user.username}</p>
                </div>
            </PopoverTrigger>
            <PopoverContent side="right">
                <p>{member.user.username}</p>
            </PopoverContent >
        </Popover>
    );
}
