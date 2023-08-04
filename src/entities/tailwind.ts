export enum TEXT_ALIGN {
    left,
    center,
    right,
    justify,
    start,
    end,
}

export const TEXT_ALIGN_VARIANTS: Record<TEXT_ALIGN, string> = {
    [TEXT_ALIGN.center]: 'text-center',
    [TEXT_ALIGN.left]: 'text-left',
    [TEXT_ALIGN.right]: 'text-right',
    [TEXT_ALIGN.justify]: 'text-justify',
    [TEXT_ALIGN.start]: 'text-start',
    [TEXT_ALIGN.end]: 'text-end',
};

export enum BUTTON {
    primary,
    secondary,
    clear,
}