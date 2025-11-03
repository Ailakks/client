export interface WebSocketEventType {
    d: any;
    op, s: number;
    t: "READY" | "GUILD_MEMBER_LIST_UPDATE"
}