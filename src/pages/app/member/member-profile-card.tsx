import type { AuthorTransform } from "@/api/transform/author.transform";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function UserProfileCard({ user: user }: { user: AuthorTransform }) {
    return (
        <div className="flex items-center space-x-2">
            <Avatar>
                <AvatarImage src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=80&quality=lossless`} alt={user.username} />
                <AvatarFallback>{user.username}</AvatarFallback>
            </Avatar>
            <p>{user.username}</p>
        </div>
    );
}
