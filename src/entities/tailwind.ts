export enum ROUNDED {
  NONE,
  RESET,
  SMALL,
  NORMAL,
  MEDIUM,
  LARGE,
  XL,
  XXL,
  XXXL,
  FULL,
}

export enum FONT_WEIGHT {
  THIN,
  EXTRALIGHT,
  LIGHT,
  NORMAL,
  MEDIUM,
  SEMIBOLD,
  BOLD,
  EXTRABOLD,
  GIGABOLD,
}

export enum FONT_SIZE {
  cardFooter,
  cardHeader,
  smallest,
  smaller,
  small,
  DEFAULT,
  large,
  larger,
  largest,
}

export enum COLOR {
  primary,
  primaryLight,
  secondary,
  tertiary,
  black,
  white,
  cardDesc,
}

export enum JUSTIFY_CONTENT {
  normal,
  start,
  end,
  center,
  between,
  around,
  evenly,
  stretch,
}

export const JUSTIFY_CONTENT_VARIANT: Record<JUSTIFY_CONTENT, string> = {
  [JUSTIFY_CONTENT.normal]: "justify-normal",
  [JUSTIFY_CONTENT.start]: "justify-start",
  [JUSTIFY_CONTENT.end]: "justify-end",
  [JUSTIFY_CONTENT.center]: "justify-center",
  [JUSTIFY_CONTENT.between]: "justify-between",
  [JUSTIFY_CONTENT.around]: "justify-around",
  [JUSTIFY_CONTENT.evenly]: "justify-evenly",
  [JUSTIFY_CONTENT.stretch]: "justify-stretch",
};

export enum ALIGN_ITEMS {
  start,
  end,
  center,
  baseline,
  stretch,
}

export const ALIGN_ITEMS_VARIANT: Record<ALIGN_ITEMS, string> = {
  [ALIGN_ITEMS.start]: "items-start",
  [ALIGN_ITEMS.end]: "items-end",
  [ALIGN_ITEMS.center]: "items-center",
  [ALIGN_ITEMS.baseline]: "items-baseline",
  [ALIGN_ITEMS.stretch]: "items-stretch",
};

export enum TEXT_ALIGN {
  left,
  center,
  right,
  justify,
  start,
  end,
}

export const TEXT_ALIGN_VARIANTS: Record<TEXT_ALIGN, string> = {
  [TEXT_ALIGN.center]: "text-center",
  [TEXT_ALIGN.left]: "text-left",
  [TEXT_ALIGN.right]: "text-right",
  [TEXT_ALIGN.justify]: "text-justify",
  [TEXT_ALIGN.start]: "text-start",
  [TEXT_ALIGN.end]: "text-end",
};

export enum BUTTON {
  primary,
  secondary,
  clear,
}

export enum SPACING {
  none,
  extraSmall,
  small,
  default,
  large,
  extraLarge,
}

export const XPADDING_VARIANT: Record<SPACING, string> = {
  [SPACING.none]: "px-0",
  [SPACING.extraSmall]: "px-2",
  [SPACING.small]: "px-4",
  [SPACING.default]: "px-6",
  [SPACING.large]: "px-8",
  [SPACING.extraLarge]: "px-10",
};

export const YPADDING_VARIANT: Record<SPACING, string> = {
  [SPACING.none]: "py-0",
  [SPACING.extraSmall]: "py-2",
  [SPACING.small]: "py-4",
  [SPACING.default]: "py-6",
  [SPACING.large]: "py-8",
  [SPACING.extraLarge]: "py-10",
};

export const GAP_VARIANT: Record<SPACING, string> = {
  [SPACING.none]: "gap-0",
  [SPACING.extraSmall]: "gap-2",
  [SPACING.small]: "gap-4",
  [SPACING.default]: "gap-6",
  [SPACING.large]: "gap-8",
  [SPACING.extraLarge]: "gap-10",
};
