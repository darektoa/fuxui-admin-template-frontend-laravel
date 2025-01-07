export type FormatFuncOptions = Intl.NumberFormatOptions & {
    locale?: Intl.LocalesArgument;
};

export type FormatFunc = (value?: number, options?: FormatFuncOptions) => string;
