import styled, { StyledComponent } from "@emotion/styled";
import clsx from "clsx";
import * as React from "react";
import { forwardRef } from "react";
import type { BorderProps, LayoutProps, SpaceProps } from "styled-system";
import { border, layout, space } from "styled-system";
import { OwnerStateRecord, Theme } from "../../type";
import { createTransition } from "../system/transition";

type ButtonOwnerProps = Partial<{
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info";
  endIcon: React.ReactNode;
  size: "sm" | "md" | "lg";
  startIcon: React.ReactNode;
  variant: "contained" | "outlined" | "text";
  disabled: boolean;
  loading: boolean;
}>;
type SystemProps = BorderProps & LayoutProps & SpaceProps;
type HTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type ButtonProps = ButtonOwnerProps &
  SystemProps & {
    className?: string;
    children?: React.ReactNode;
  } & HTMLButtonProps;

type StyledButton = StyledComponent<
  Omit<HTMLButtonProps, "color">,
  OwnerStateRecord<ButtonOwnerProps> & SystemProps
>;

export const StyledButton = styled("button")((props) => {
  const { ownerState, theme } = props as {
    ownerState: Required<ButtonOwnerProps>;
    theme: Theme;
  };

  return {
    ...theme.typography.button,
    padding: "6px 16px",
    display: "inline-flex",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
    alignItems: "center",
    outline: 0,
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    borderRadius: theme.radius,
    transition: createTransition(
      ["opacity", "background-color", "color", "box-shadow", "border-color"],
      {
        duration: "shortest",
        easing: "ease",
      }
    ),
    "&:hover": {
      textDecoration: "none",
      opacity: 1 - theme.palette.action.hoverOpacity,
      ...(ownerState.variant === "text" &&
        ownerState.color !== "inherit" && {
          opacity: 1 - theme.palette.action.hoverOpacity,
        }),
      ...(ownerState.variant === "outlined" &&
        ownerState.color !== "inherit" && {
          border: `1px solid ${theme.palette[ownerState.color].main}`,
          backgroundColor: theme.palette[ownerState.color].light,
        }),
      ...(ownerState.variant === "contained" && {
        backgroundColor: theme.palette.info.main,
      }),
      ...(ownerState.variant === "contained" &&
        ownerState.color !== "inherit" && {
          backgroundColor: theme.palette[ownerState.color].dark,
        }),
    },
    ...(ownerState.disabled && {
      color: theme.palette.action.disabled,
      ...(ownerState.variant === "outlined" && {
        border: `1px solid ${theme.palette.action.disabledBackground}`,
      }),
      ...(ownerState.variant === "outlined" &&
        ownerState.color === "secondary" && {
          border: `1px solid ${theme.palette.action.disabled}`,
        }),
      ...(ownerState.variant === "contained" && {
        color: theme.palette.action.disabled,
        backgroundColor: theme.palette.action.disabledBackground,
      }),
    }),
    ...(ownerState.variant === "text" && {
      padding: "6px 8px",
    }),
    ...(ownerState.variant === "text" &&
      ownerState.color !== "inherit" && {
        color: theme.palette[ownerState.color].main,
      }),
    ...(ownerState.variant === "outlined" && {
      padding: "5px 15px",
      border: "1px solid currentColor",
    }),
    ...(ownerState.variant === "outlined" &&
      ownerState.color !== "inherit" && {
        color: theme.palette[ownerState.color].main,
        border: `1px solid ${theme.palette[ownerState.color].main}`,
      }),
    ...(ownerState.variant === "contained" && {
      color:
        ownerState.color === "inherit"
          ? "inherit"
          : theme.palette[
              ownerState.color as
                | "primary"
                | "secondary"
                | "success"
                | "error"
                | "info"
            ].contrastText,
      backgroundColor: theme.palette.info.main,
    }),
    ...(ownerState.variant === "contained" &&
      ownerState.color !== "inherit" && {
        color: theme.palette[ownerState.color].contrastText,
        backgroundColor: theme.palette[ownerState.color].main,
      }),
    ...(ownerState.color === "inherit" && {
      color: "inherit",
      borderColor: "currentColor",
    }),
    ...(ownerState.size === "sm" &&
      ownerState.variant === "text" && {
        padding: "4px 5px",
        fontSize: "0.938rem",
      }),
    ...(ownerState.size === "lg" &&
      ownerState.variant === "text" && {
        padding: "8px 11px",
        fontSize: "1.125rem",
      }),
    ...(ownerState.size === "sm" &&
      ownerState.variant === "outlined" && {
        padding: "3px 9px",
        fontSize: "0.938rem",
      }),
    ...(ownerState.size === "lg" &&
      ownerState.variant === "outlined" && {
        padding: "7px 21px",
        fontSize: "1.125rem",
      }),
    ...(ownerState.size === "sm" &&
      ownerState.variant === "contained" && {
        padding: "4px 10px",
        fontSize: "0.938rem",
      }),
    ...(ownerState.size === "lg" &&
      ownerState.variant === "contained" && {
        padding: "8px 22px",
        fontSize: "1.125rem",
      }),
    ...space(props),
    ...border(props),
    ...layout(props),
  };
}) as StyledButton;

const commonIconStyles = (size: "sm" | "md" | "lg") => ({
  ...(size === "sm" && {
    "& > *:nth-of-type(1)": {
      fontSize: 18,
    },
  }),
  ...(size === "md" && {
    "& > *:nth-of-type(1)": {
      fontSize: 20,
    },
  }),
  ...(size === "lg" && {
    "& > *:nth-of-type(1)": {
      fontSize: 22,
    },
  }),
});

const ButtonStartIcon = styled.span((props) => {
  const { ownerState } = props as {
    ownerState: Required<ButtonOwnerProps>;
    theme: Theme;
  };

  return {
    display: "inherit",
    marginRight: 8,
    marginLeft: -4,
    ...(ownerState.size === "sm" && {
      marginLeft: -2,
    }),
    ...commonIconStyles(ownerState.size),
  };
}) as StyledButton;

const ButtonEndIcon = styled.span((props) => {
  const { ownerState } = props as {
    ownerState: Required<ButtonOwnerProps>;
    theme: Theme;
  };

  return {
    display: "inherit",
    marginRight: -4,
    marginLeft: 8,
    ...(ownerState.size === "sm" && {
      marginRight: -2,
    }),
    ...commonIconStyles(ownerState.size),
  };
}) as StyledButton;

const classes = {
  root: "CuiButton-root",
  startIcon: "CuiButton-startIcon",
  endIcon: "CuiButton-endIcon",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      color = "primary",
      endIcon = null,
      size = "md",
      startIcon = null,
      variant = "contained",
      disabled = false,
      loading = false,
      ...cuiStyleProps
    } = props;

    const ownerState: Required<ButtonOwnerProps> = {
      color,
      endIcon,
      size,
      startIcon,
      variant,
      disabled,
      loading,
    };

    const renderStartIcon = startIcon && (
      <ButtonStartIcon className={classes.startIcon} ownerState={ownerState}>
        {startIcon}
      </ButtonStartIcon>
    );

    const renderEndIcon = endIcon && (
      <ButtonEndIcon className={classes.endIcon} ownerState={ownerState}>
        {endIcon}
      </ButtonEndIcon>
    );

    return (
      <StyledButton
        ref={ref}
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        {...cuiStyleProps}
      >
        {renderStartIcon}
        {props.children}
        {renderEndIcon}
      </StyledButton>
    );
  }
);
