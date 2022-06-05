export type AsProps = {
  as?: React.ElementType;
};

export type EmotionProps = {
  theme: Theme;
  children?: React.ReactNode;
} & AsProps;

export type OwnerStateRecord<TOwnerState extends object> = {
  ownerState?: Required<TOwnerState>;
};

export type OwnerStateResolver<TOwnerState> = (props: {
  ownerState: TOwnerState;
  theme: Theme;
}) => {};

export type BreakpointsKey = "xs" | "sm" | "md" | "lg" | "xl";

export type Breakpoints = {
  [P in BreakpointsKey]: number;
};

export type TypographyVariantValue = {
  fontSize: string;
  lineHeight: number;
  fontWeight: number;
  letterSpacing: string;
};

export type TypographyVariantKey =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "overline";

export type TypographyVariant = {
  [P in TypographyVariantKey]: TypographyVariantValue;
};

export type Typography = {
  fontFamily: string;
} & TypographyVariant;

export type PaletteVariant = {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
};

export type Palette = {
  common: {
    black: string;
    white: string;
  };
  primary: PaletteVariant;
  secondary: PaletteVariant;
  error: PaletteVariant;
  info: PaletteVariant;
  success: PaletteVariant;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  divider: string;
  background: string;
  action: {
    active: string;
    hover: string;
    hoverOpacity: number;
    selected: string;
    selectedOpacity: number;
    disabled: string;
    disabledBackground: string;
    disabledOpacity: number;
    focus: string;
    focusOpacity: number;
    activatedOpacity: number;
  };
};

export type ZIndex = {
  mobileStepper: number;
  fab: number;
  speedDial: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
};

export type Theme = {
  breakpoints: Breakpoints;
  typography: Typography;
  zIndex: ZIndex;
  palette: Palette;
  radius: number;
  shadows: string[];
};
