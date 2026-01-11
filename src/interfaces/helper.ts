export type IValueOf<T> = T[keyof T];

export interface IModelTimestamps {
    createdAt: Date;
    updatedAt: Date;
}
