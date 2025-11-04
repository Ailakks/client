import { Expose, plainToInstance, Transform } from "class-transformer";
import type { ChannelSubscribePayload } from "../payload/channel-subscribe.payload";

class Data {
    @Expose()
    @Transform(({ obj: { guild, channel } }: { obj: ChannelSubscribePayload }) => ({ [guild]: { typing: true, channels: { [channel]: [[0, 99]] } } }))
    subscriptions: ChannelSubscribePayload;
}

export class ChannelSubscribeTransform {
    @Expose()
    @Transform(() => 37)
    op: number;

    @Expose()
    @Transform(({ obj }) => plainToInstance(Data, obj, { excludeExtraneousValues: true }))
    d: Data;
}