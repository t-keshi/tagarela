import styled, { StyledComponent } from "@emotion/styled";
import clsx from "clsx";
import { forwardRef } from "react";
import type {
  BackgroundProps,
  BorderProps,
  ColorProps,
  LayoutProps,
  SpaceProps,
} from "styled-system";
import { background, border, color, layout, space } from "styled-system";
import { Theme } from "../../type";

type SystemProps = BackgroundProps &
  ColorProps &
  LayoutProps &
  SpaceProps &
  BorderProps;
type CardProps = SystemProps & {
  className?: string;
  children?: React.ReactNode;
};
type StyledCard = StyledComponent<
  Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    "color"
  >,
  SystemProps
>;

const StyledCard = styled("div")((props) => {
  const { theme } = props as {
    theme: Theme;
  };
  return {
    backgroundColor: theme.palette.background,
    opacity: 0.8,
    ...space(props),
    ...layout(props),
    ...color(props),
    ...background(props),
    ...border(props),
  };
}) as StyledCard;

const classes = {
  root: "CuiCard-root",
};

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, ...cuiStyleProps } = props;

  return (
    <StyledCard
      ref={ref}
      className={clsx(classes.root, className)}
      {...cuiStyleProps}
    />
  );
});
