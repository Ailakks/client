import { Expose, plainToInstance, Transform } from "class-transformer";

class Data {
    @Expose()
    @Transform(({ value: { guild, channel } }) => ({ [guild]: { channels: { [channel]: [{ 0: 0 }, { 1: 99 }] } } }))
    subscriptions: { guild: string, channel: string };
}

export class ChannelSubscribePayload {
    @Expose()
    op: number = 37;

    @Expose()
    @Transform(({ obj }) => plainToInstance<Data, Data>(Data, obj, { excludeExtraneousValues: true }))
    d: Data;
}