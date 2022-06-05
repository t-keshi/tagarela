import styled, { StyledComponent } from "@emotion/styled";
import clsx from "clsx";
import { forwardRef } from "react";
import type { SpaceProps } from "styled-system";
import { space } from "styled-system";
import { BreakpointsKey, OwnerStateRecord, Theme } from "../../type";
import { mq } from "../system/mediaQuery";

type ContainerOwnerProps = Partial<{
  disableGutters: boolean;
  maxW: BreakpointsKey;
}>;
type SystemProps = SpaceProps;
type ContainerProps = ContainerOwnerProps &
  SystemProps & { className?: string; children?: React.ReactNode };
type StyledContainer = StyledComponent<
  Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    "color"
  >,
  OwnerStateRecord<ContainerOwnerProps> & SystemProps
>;

export const ContainerRoot = styled.div((props) => {
  const { ownerState, theme } = props as {
    ownerState: Required<ContainerOwnerProps>;
    theme: Theme;
  };

  return {
    width: "100%",
    marginLeft: "auto",
    boxSizing: "border-box",
    marginRight: "auto",
    display: "block",
    ...(!ownerState.disableGutters && {
      paddingLeft: "16px",
      paddingRight: "16px",
      [mq(theme.breakpoints.sm)]: {
        paddingLeft: "24px",
        paddingRight: "24px",
      },
    }),
    ...(ownerState.maxW === "xs" && {
      [mq(theme.breakpoints.xs)]: {
        maxWidth: Math.max(theme.breakpoints.xs, 444),
      },
    }),
    ...(ownerState.maxW &&
      ownerState.maxW !== "xs" && {
        [mq(theme.breakpoints[ownerState.maxW])]: {
          maxWidth: `${theme.breakpoints[ownerState.maxW]}px`,
        },
      }),
    ...space(props),
  };
}) as StyledContainer;

const classes = {
  root: "CuiContainer-root",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const {
      className,
      disableGutters = false,
      maxW = "lg",
      ...cuiStyleProps
    } = props;

    const ownerState = {
      disableGutters,
      maxW,
    };

    return (
      <ContainerRoot
        ref={ref}
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        {...cuiStyleProps}
      />
    );
  }
);
