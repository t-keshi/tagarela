import styled, { StyledComponent } from "@emotion/styled";
import clsx from "clsx";
import { forwardRef } from "react";
import type {
  SpaceProps,
  TypographyProps as STypographyProps,
} from "styled-system";
import { space, typography } from "styled-system";
import { OwnerStateRecord, Theme, TypographyVariantKey } from "../../type";

type TypographyOwnerProps = Partial<{
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "textPrimary"
    | "textSecondary"
    | "textDisabled";
  variant: TypographyVariantKey;
  noWrap: boolean;
  gutterBottom: boolean;
  paragraph: boolean;
}>;
type SystemProps = SpaceProps & STypographyProps;
type TypographyProps = TypographyOwnerProps &
  SystemProps & { className?: string; children?: React.ReactNode };
type StyledTypography = StyledComponent<
  Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    "color"
  >,
  OwnerStateRecord<TypographyOwnerProps> & SystemProps
>;

export const themeColor = (
  value:
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "textDisabled"
    | "disabled"
    | "error"
    | "info"
    | "success"
    | "divider",
  theme: Theme
) => {
  const themeAccessMap = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    textPrimary: theme.palette.text.primary,
    textSecondary: theme.palette.text.secondary,
    textDisabled: theme.palette.text.disabled,
    disabled: theme.palette.action.disabled,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
    success: theme.palette.success.main,
    divider: theme.palette.divider,
  };

  return themeAccessMap[value];
};

const TypographyRoot = styled.p((props) => {
  const { ownerState, theme } = props as {
    ownerState: Required<TypographyOwnerProps>;
    theme: Theme;
  };

  return {
    color:
      ownerState.color === "inherit"
        ? "inherit"
        : themeColor(ownerState.color, theme),
    display: "block",
    margin: 0,
    ...(ownerState.variant && theme.typography[ownerState.variant]),
    ...(ownerState.noWrap && {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
    ...(ownerState.gutterBottom && {
      marginBottom: "0.35em",
    }),
    ...(ownerState.paragraph && {
      marginBottom: 16,
    }),
    ...space(props),
    ...typography(props),
  };
}) as StyledTypography;

const classes = {
  root: "CuiTypography-root",
};

export const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  (props, ref) => {
    const {
      className,
      color = "textPrimary",
      variant = "body1",
      noWrap = false,
      gutterBottom = false,
      paragraph = false,
      ...cuiStyleProps
    } = props;

    const ownerState: Required<TypographyOwnerProps> = {
      color,
      variant,
      noWrap,
      gutterBottom,
      paragraph,
    };

    return (
      <TypographyRoot
        ref={ref}
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        {...cuiStyleProps}
      />
    );
  }
);
