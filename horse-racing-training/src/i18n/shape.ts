/** Same keys as the English dictionary, any string values. Used to type the zh-HK files. */
export type Shape<T> = { readonly [K in keyof T]: T[K] extends string ? string : Shape<T[K]> };
