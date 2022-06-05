import styled from "@emotion/styled";
import clsx from "clsx";
import { forwardRef } from "react";
import type {
  BackgroundProps,
  BorderProps,
  ColorProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
} from "styled-system";
import {
  background,
  border,
  color,
  layout,
  position,
  space,
} from "styled-system";

type SystemProps = BackgroundProps &
  ColorProps &
  LayoutProps &
  SpaceProps &
  BorderProps &
  PositionProps;
type BoxProps = SystemProps & {
  className?: string;
  children?: React.ReactNode;
};

const StyledBox = styled("div")(
  {
    boxSizing: "border-box",
  },
  background,
  space,
  layout,
  color,
  border,
  position
);

const classes = {
  root: "CuiBox-root",
};

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { className, ...cuiStyleProps } = props;

  return (
    <StyledBox
      ref={ref}
      className={clsx(classes.root, className)}
      {...cuiStyleProps}
    />
  );
});
