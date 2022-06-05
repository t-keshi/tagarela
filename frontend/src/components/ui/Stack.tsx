import styled, { StyledComponent } from "@emotion/styled";
import clsx from "clsx";
import React, { Children, forwardRef, isValidElement } from "react";
import type { BorderProps, LayoutProps, SpaceProps } from "styled-system";
import { border, layout, space } from "styled-system";
import { OwnerStateRecord, Theme } from "../../type";

type StackOwnerProps = Partial<{
  spacing: number;
  horizontal: boolean;
}>;
type SystemProps = BorderProps & LayoutProps & SpaceProps;
type StackProps = StackOwnerProps &
  SystemProps & { className?: string; children?: React.ReactNode };
type StyledStack = StyledComponent<
  Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    "color"
  >,
  OwnerStateRecord<StackOwnerProps> &
    SystemProps & { className?: string; children?: React.ReactNode }
>;

export const StackRoot = styled.div((props) => {
  const { ownerState } = props as {
    ownerState: Required<StackOwnerProps>;
    theme: Theme;
  };

  return {
    display: "flex",
    ...(!ownerState.horizontal && {
      flexDirection: "column",
    }),
    ...(ownerState.horizontal && {
      "& > *:not(style) ~ *:not(style)": {
        marginLeft: ownerState.spacing * 8,
      },
    }),
    ...(!ownerState.horizontal && {
      "& > *:not(style) ~ *:not(style)": {
        marginTop: ownerState.spacing * 8,
      },
    }),
    ...border(props),
    ...space(props),
    ...layout(props),
  };
}) as StyledStack;

const classes = {
  root: "CuiStack-root",
};

const getValidChildren = (children: React.ReactNode) =>
  Children.toArray(children).filter((child) =>
    isValidElement(child)
  ) as React.ReactElement[];

export const Stack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const {
    className,
    children,
    spacing = 4,
    horizontal = false,
    ...cuiStyleProps
  } = props;

  const ownerState: Required<StackOwnerProps> = {
    spacing,
    horizontal,
  };

  const validChildren = getValidChildren(children);

  return (
    <StackRoot
      ref={ref}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...cuiStyleProps}
    >
      {validChildren}
    </StackRoot>
  );
});
