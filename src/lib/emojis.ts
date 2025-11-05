import type { ProfileTransform } from "@/api/transform/profile.transform"

export function listEmojis(data: ProfileTransform): any {
    return data.data.guilds.flatMap((item) => item.emojis);
}
