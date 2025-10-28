const permissions: Record<number, string> = {
    0: "CREATE_INSTANT_INVITE",
    1: "KICK_MEMBERS",
    2: "BAN_MEMBERS",
    3: "ADMINISTRATOR",
    4: "MANAGE_CHANNELS",
    5: "MANAGE_GUILD",
    6: "ADD_REACTIONS",
    7: "VIEW_AUDIT_LOG",
    8: "PRIORITY_SPEAKER",
    9: "STREAM",
    10: "VIEW_CHANNEL",
    11: "SEND_MESSAGES",
    12: "SEND_TTS_MESSAGES",
    13: "MANAGE_MESSAGES",
    14: "EMBED_LINKS",
    15: "ATTACH_FILES",
    16: "READ_MESSAGE_HISTORY",
    17: "MENTION_EVERYONE",
    18: "USE_EXTERNAL_EMOJIS",
    19: "VIEW_GUILD_INSIGHTS",
    20: "CONNECT",
    21: "SPEAK",
    22: "MUTE_MEMBERS",
    23: "DEAFEN_MEMBERS",
    24: "MOVE_MEMBERS",
    25: "USE_VAD",
    26: "CHANGE_NICKNAME",
    27: "MANAGE_NICKNAMES",
    28: "MANAGE_ROLES",
    29: "MANAGE_WEBHOOKS",
    30: "MANAGE_EMOJIS_AND_STICKERS",
    31: "USE_APPLICATION_COMMANDS",
    32: "REQUEST_TO_SPEAK",
    33: "MANAGE_THREADS",
    34: "USE_PUBLIC_THREADS",
    35: "USE_PRIVATE_THREADS",
    36: "USE_EXTERNAL_STICKERS",
    37: "SEND_MESSAGES_IN_THREADS",
    38: "USE_EMBEDDED_ACTIVITIES",
    39: "MODERATE_MEMBERS"
};

export function decodeMask(mask: string): (string | undefined)[] {
    const bits = BigInt(mask);
    const result: (string | undefined)[] = [];

    for (let i = 0; i <= 39; i++) {
        if ((bits & (1n << BigInt(i))) !== 0n) {
            result.push(permissions[i]);
        }
    }
    
    return result;
}