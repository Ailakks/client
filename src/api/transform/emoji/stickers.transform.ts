import { Expose } from "class-transformer";

class Category {
    @Expose()

    name: string;

    @Expose()
    src: string;
}

export class StickersTrendingTransform {
    @Expose()
    categories: Category[];
}

export class StickerTransform {
    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    src: string;

    @Expose()
    width: number;

    @Expose()
    height: number;
}