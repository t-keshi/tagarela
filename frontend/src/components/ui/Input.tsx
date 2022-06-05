import styled, { StyledComponent } from "@emotion/styled";
import clsx from "clsx";
import * as React from "react";
import { forwardRef } from "react";
import {
  border,
  BorderProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import { OwnerStateRecord, Theme } from "../../type";
import { createTransition } from "../system/transition";

type InputOwnerProps = Partial<{
  disableUnderline: boolean;
  fullWidth: boolean;
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info";
  size: "sm" | "md" | "lg";
}>;
type SystemProps = BorderProps & LayoutProps & SpaceProps;
type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type InputProps = InputOwnerProps &
  SystemProps & {
    className?: string;
    children?: React.ReactNode;
  } & HTMLInputProps;
type StyledInput = StyledComponent<
  Omit<HTMLInputProps, "color">,
  OwnerStateRecord<InputOwnerProps> & SystemProps
>;

export const StyledInput = styled("input")((props) => {
  const { ownerState, theme } = props as {
    ownerState: Required<InputOwnerProps>;
    theme: Theme;
  };

  return {
    outline: "none",
    font: "inherit",
    letterSpacing: "inherit",
    color: "currentColor",
    padding: "4px 0 5px",
    border: `1px solid ${theme.palette.divider}`,
    boxSizing: "content-box",
    background: "none",
    height: "1.4375em",
    margin: 0,
    WebkitTapHighlightColor: "transparent",
    display: "block",
    minWidth: 0,
    ...(ownerState.size === "sm" && {
      paddingTop: 1,
    }),
    ...(!ownerState.disableUnderline && {
      "&:after": {
        borderBottom: `2px solid ${
          ownerState.color === "inherit"
            ? "inherit"
            : theme.palette[
                ownerState.color as
                  | "primary"
                  | "secondary"
                  | "success"
                  | "error"
                  | "info"
              ].main
        }`,
        left: 0,
        bottom: 0,
        content: '""',
        position: "absolute",
        right: 0,
        transform: "scaleX(0)",
        transition: createTransition(["transform"], {
          duration: "shorter",
          easing: "easeOut",
        }),
        pointerEvents: "none",
      },
      "&.focused:after": {
        transform: "scaleX(1) translateX(0)",
      },
      "&.error:after": {
        borderBottomColor: theme.palette.error.main,
        transform: "scaleX(1)",
      },
      "&:before": {
        borderBottom: `1px solid ${theme.palette.divider}`,
        left: 0,
        bottom: 0,
        content: '"\\00a0"',
        position: "absolute",
        right: 0,
        transition: createTransition(["border-bottom-color"], {
          duration: "shorter",
        }),
        pointerEvents: "none",
      },
      "&:hover:not(.disabled):before": {
        borderBottom: `2px solid ${theme.palette.text.primary}`,
      },
      "&.disabled:before": {
        borderBottomStyle: "dotted",
      },
    }),
    ...space(props),
    ...border(props),
    ...layout(props),
  };
}) as StyledInput;

const classes = {
  root: "CuiInput-root",
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    disableUnderline = false,
    fullWidth = false,
    color = "primary",
    size = "md",
    ...cuiStyleProps
  } = props;

  const ownerState: Required<InputOwnerProps> = {
    disableUnderline,
    fullWidth,
    color,
    size,
  };

  return (
    <StyledInput
      ref={ref}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...cuiStyleProps}
    />
  );
});
