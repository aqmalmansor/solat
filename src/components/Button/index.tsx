/* eslint-disable no-console */
import React from "react";
import { motion } from "framer-motion";
import {
  BUTTON,
  ROUNDED,
  SPACING,
  TEXT_ALIGN,
  TEXT_ALIGN_VARIANTS,
  XPADDING_VARIANT,
  YPADDING_VARIANT,
} from "entities/tailwind";

interface ButtonComponentProps {
  fill?: boolean;
  onClick?: () => void;
  label?: string | React.ReactNode;
  isLoading?: boolean;
  type?: BUTTON | string;
  align?: TEXT_ALIGN;
  salt?: React.ComponentProps<"div">["className"];
  noPadding?: boolean;
  yPadding?: SPACING;
  xPadding?: SPACING;
  rounded?: ROUNDED;
}

const ROUNDED_VARIANT: Record<ROUNDED, string> = {
  [ROUNDED.NONE]: "rounded-none",
  [ROUNDED.RESET]: "",
  [ROUNDED.SMALL]: "rounded-sm",
  [ROUNDED.MEDIUM]: "rounded-md",
  [ROUNDED.NORMAL]: "rounded",
  [ROUNDED.LARGE]: "rounded-lg",
  [ROUNDED.XL]: "rounded-xl",
  [ROUNDED.XXL]: "rounded-xxl",
  [ROUNDED.XXXL]: "rounded-xxxl",
  [ROUNDED.FULL]: "rounded-full",
};

const BUTTON_VARIANT: Record<BUTTON, string> = {
  [BUTTON.primary]: "bg-primary text-secondary",
  [BUTTON.secondary]: "bg-secondary text-primary",
  [BUTTON.clear]: "",
};

const Button = ({
  fill,
  onClick,
  label,
  isLoading,
  type = BUTTON.primary,
  align = TEXT_ALIGN.center,
  salt,
  noPadding,
  yPadding,
  xPadding,
  rounded,
  ...props
}: ButtonComponentProps): JSX.Element => {
  const renderButtonContent = () => {
    if (isLoading) {
      if (typeof type !== "string") {
        const getLoaderColor = (buttonType: BUTTON | string): string => {
          switch (buttonType) {
            case BUTTON.primary:
              return "dark:text-gray-100";
            case BUTTON.clear:
              return "dark:text-gray-300";
            case BUTTON.secondary:
              return "dark:text-gray-300";
            default:
              return "dark:text-gray-100";
          }
        };

        const outlineColor = getLoaderColor(type);

        return (
          <div role="status" className="flex items-center justify-center">
            <svg
              aria-hidden="true"
              className={`max-h-[1.6rem] animate-spin text-gray-200 ${outlineColor} fill-rose-300`}
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        );
      }

      return (
        <div>
          <div role="status" className="flex items-center justify-center">
            <svg
              aria-hidden="true"
              className="max-h-[1.6rem] animate-spin fill-rose-300 text-gray-200 dark:text-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    return label;
  };

  const borderRounded =
    rounded !== undefined
      ? ROUNDED_VARIANT[rounded]
      : ROUNDED_VARIANT[ROUNDED.FULL];
  const buttonYPadding =
    yPadding !== undefined
      ? YPADDING_VARIANT[yPadding]
      : YPADDING_VARIANT[SPACING.default];
  const buttonXPadding =
    xPadding !== undefined
      ? XPADDING_VARIANT[xPadding]
      : XPADDING_VARIANT[SPACING.default];
  const buttonPadding = noPadding ? "" : `${buttonXPadding} ${buttonYPadding}`;
  const buttonWidth = fill ? "w-full" : "min-w-[150px]";
  const buttonColor = typeof type === "string" ? type : BUTTON_VARIANT[type];
  const buttonSpacing =
    typeof type === "string" ? "" : `${buttonWidth} ${buttonPadding.trim()}`;

  const addOn = salt !== undefined ? salt.trim() : "";
  const newClassName =
    `min-h-[1.6rem] rounded-md ${buttonSpacing.trim()} ${align} ${buttonColor.trim()} 
    ${TEXT_ALIGN_VARIANTS[align]} ${addOn} ${borderRounded.trim()}`.trim();

  return (
    <motion.button
      type="button"
      className={newClassName}
      onClick={onClick}
      disabled={isLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ transition: { duration: 1 }, scale: 1.2 }}
      {...props}
    >
      {renderButtonContent()}
    </motion.button>
  );
};

Button.defaultProps = {
  fill: false,
  isLoading: false,
  label: "Button Label",
  onClick: () => null,
  type: BUTTON.primary,
  align: TEXT_ALIGN.center,
  salt: undefined,
  noPadding: false,
  yPadding: undefined,
  xPadding: undefined,
  rounded: undefined,
};

export default Button;
