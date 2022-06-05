import styled from "@emotion/styled";
import clsx from "clsx";
import { forwardRef } from "react";
import type {
  ColorProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
} from "styled-system";
import { color, compose, flexbox, layout, space } from "styled-system";

type SystemProps = ColorProps & LayoutProps & SpaceProps & FlexboxProps;
type FlexProps = SystemProps & {
  className?: string;
  children?: React.ReactNode;
};

const styleFn = compose(space, layout, color, flexbox);

const StyledFlex = styled("div")(
  {
    display: "flex",
  },
  styleFn
);

const classes = {
  root: "CuiFlex-root",
};

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const { className, ...cuiStyleProps } = props;

  return (
    <StyledFlex
      ref={ref}
      className={clsx(classes.root, className)}
      {...cuiStyleProps}
    />
  );
});
