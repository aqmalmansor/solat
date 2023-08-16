import React, { LegacyRef, forwardRef } from "react";
import Skeleton from "react-loading-skeleton";

import {
  BUTTON,
  ROUNDED,
  SPACING,
  TEXT_ALIGN,
  TEXT_ALIGN_VARIANTS,
  XPADDING_VARIANT,
  YPADDING_VARIANT,
} from "entities/tailwind";

export interface ButtonComponentProps {
  fill?: boolean;
  onClick?: () => void;
  label?: string | React.ReactNode;
  customLoader?: React.ReactNode;
  isLoading?: boolean;
  variant?: BUTTON;
  align?: TEXT_ALIGN;
  salt?: React.ComponentProps<"div">["className"];
  noPadding?: boolean;
  yPadding?: SPACING;
  xPadding?: SPACING;
  rounded?: ROUNDED;
  height?: React.ComponentProps<"div">["className"];
  width?: React.ComponentProps<"div">["className"];
}

const ROUNDED_VARIANT: Record<ROUNDED, string> = {
  [ROUNDED.NONE]: "rounded-none",
  [ROUNDED.RESET]: "",
  [ROUNDED.SMALL]: "rounded-sm",
  [ROUNDED.MEDIUM]: "rounded-md",
  [ROUNDED.NORMAL]: "rounded",
  [ROUNDED.LARGE]: "rounded-lg",
  [ROUNDED.XL]: "rounded-xl",
  [ROUNDED.XXL]: "rounded-2xl",
  [ROUNDED.XXXL]: "rounded-3xl",
  [ROUNDED.FULL]: "rounded-full",
};

const BUTTON_VARIANT: Record<BUTTON, string> = {
  [BUTTON.primary]: "bg-primary text-white",
  [BUTTON.secondary]: "bg-secondary text-white",
  [BUTTON.reset]: "",
};

const Button = forwardRef(
  (props: ButtonComponentProps, ref: LegacyRef<HTMLButtonElement>) => {
    const {
      fill,
      isLoading,
      label,
      onClick,
      variant,
      align,
      salt,
      noPadding,
      yPadding,
      xPadding,
      rounded,
      height,
      width,
      customLoader,
      ...etc
    } = props;

    const renderButtonContent = () => {
      if (isLoading) {
        if (customLoader) {
          return customLoader;
        }

        return (
          <div className="flex items-center justify-center gap-[5px]">
            <Skeleton circle height={10} width={10} />
            <Skeleton circle height={10} width={10} />
            <Skeleton circle height={10} width={10} />
          </div>
        );
      }
      return label;
    };

    // Border Radius
    const borderRounded =
      rounded !== undefined
        ? ROUNDED_VARIANT[rounded]
        : ROUNDED_VARIANT[ROUNDED.XXXL];

    // Paddings
    const buttonYPadding =
      yPadding !== undefined
        ? YPADDING_VARIANT[yPadding]
        : YPADDING_VARIANT[SPACING.extraSmall];
    const buttonXPadding =
      xPadding !== undefined
        ? XPADDING_VARIANT[xPadding]
        : XPADDING_VARIANT[SPACING.large];
    const buttonPadding = noPadding
      ? ""
      : `${buttonXPadding} ${buttonYPadding}`;

    // Button Color
    const buttonColor =
      variant === undefined
        ? BUTTON_VARIANT[BUTTON.primary]
        : BUTTON_VARIANT[variant];

    const buttonHeight = height ?? "h-fit"; // Button Area -> Height

    const buttonWidth = width ?? "min-w-fit"; // Button Area -> Width
    const buttonFullWidth = fill ? "w-full" : buttonWidth;
    const buttonArea = `${buttonHeight} ${buttonFullWidth}`; // Button Area - Width x Height

    // Button Spacing
    const buttonSpacing = `${buttonArea} ${buttonPadding.trim()}`;

    // Button Text Alignment
    const buttonTextAlignment =
      align === undefined
        ? TEXT_ALIGN_VARIANTS[TEXT_ALIGN.center]
        : TEXT_ALIGN_VARIANTS[align];

    // Custom Tailwind Styles
    const addOn = salt !== undefined ? salt.trim() : "";

    // Final Classname
    const newClassname = [
      buttonSpacing.trim(),
      buttonColor.trim(),
      buttonTextAlignment,
      borderRounded.trim(),
      addOn.trim(),
    ].join(" ");

    return (
      <button
        type="button"
        ref={ref}
        className={variant === BUTTON.reset ? addOn.trim() : newClassname}
        onClick={onClick}
        disabled={isLoading}
        {...etc}
      >
        {renderButtonContent()}
      </button>
    );
  }
);

Button.defaultProps = {
  fill: false,
  isLoading: false,
  label: "Button Label",
  onClick: () => null,
  variant: BUTTON.primary,
  align: TEXT_ALIGN.center,
  salt: undefined,
  noPadding: false,
  yPadding: undefined,
  xPadding: undefined,
  rounded: undefined,
  height: undefined,
  width: undefined,
  customLoader: undefined,
};

export default Button;
