import React, { LegacyRef, forwardRef } from "react";

import {
  ALIGN_ITEMS,
  ALIGN_ITEMS_VARIANT,
  GAP_VARIANT,
  JUSTIFY_CONTENT,
  JUSTIFY_CONTENT_VARIANT,
  SPACING,
  XPADDING_VARIANT,
  YPADDING_VARIANT,
} from "entities/tailwind";

interface FlexComponentProps {
  id?: string;
  children: React.ReactNode;
  fill?: boolean;
  noPadding?: boolean;
  xPadding?: SPACING;
  yPadding?: SPACING;
  justify?: JUSTIFY_CONTENT;
  align?: ALIGN_ITEMS;
  direction?: "row" | "column" | "column-reverse" | "row-reverse";
  gap?: SPACING;
  salt?: React.ComponentProps<"div">["className"];
  style?: React.CSSProperties;
}

const Flex = forwardRef(
  (props: FlexComponentProps, ref: LegacyRef<HTMLDivElement>): JSX.Element => {
    const {
      id,
      children,
      fill,
      noPadding,
      direction,
      xPadding,
      yPadding,
      justify,
      align,
      gap,
      salt,
      style,
    } = props;

    const fillContainer = fill ? "flex w-full h-full" : "inline-flex";

    const containerXPadding =
      xPadding !== undefined
        ? XPADDING_VARIANT[xPadding]
        : XPADDING_VARIANT[SPACING.default];
    const containerYPadding =
      yPadding !== undefined
        ? YPADDING_VARIANT[yPadding]
        : YPADDING_VARIANT[SPACING.default];
    const containerDefaultPadding = `${containerXPadding} ${containerYPadding}`;
    const containerPadding = noPadding ? "" : containerDefaultPadding.trim();

    const justifyContent =
      justify !== undefined
        ? JUSTIFY_CONTENT_VARIANT[justify]
        : JUSTIFY_CONTENT_VARIANT[JUSTIFY_CONTENT.start];

    const alignItems =
      align !== undefined
        ? ALIGN_ITEMS_VARIANT[align]
        : ALIGN_ITEMS_VARIANT[ALIGN_ITEMS.center];

    const containerGap =
      gap !== undefined ? GAP_VARIANT[gap] : GAP_VARIANT[SPACING.default];

    const containerSalt = salt !== undefined ? salt : "";

    const flexDirection = (dir: FlexComponentProps["direction"]) => {
      switch (dir) {
        case "row":
          return "flex-row";
        case "column":
          return "flex-col";
        case "column-reverse":
          return "flex-col-reverse";
        case "row-reverse":
          return "flex-row-reverse";
        default:
          return "flex-row";
      }
    };
    const containerFlexDirection = flexDirection(direction);

    const newClassname = [
      fillContainer,
      justifyContent,
      alignItems,
      containerFlexDirection,
      containerGap,
      containerPadding.trim(),
      containerSalt.trim(),
    ].join(" ");

    return (
      <div id={id} className={newClassname.trim()} style={style} ref={ref}>
        {children}
      </div>
    );
  }
);

export default Flex;

Flex.defaultProps = {
  id: undefined,
  fill: true,
  noPadding: false,
  direction: "row",
  xPadding: undefined,
  yPadding: undefined,
  justify: undefined,
  align: undefined,
  gap: undefined,
  salt: undefined,
  style: undefined,
};
