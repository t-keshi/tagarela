import {
  Global,
  ThemeProvider as EmotionThemeProvider,
  useTheme as useEmotionTheme,
} from "@emotion/react";
import { Theme } from "../../type";
import { breakpoints } from "./breakpoints";
import { darkModePalette, lightModePalette } from "./palette";
import { radius } from "./radius";
import { reset } from "./reset";
import { shadows } from "./shadows";
import { typography } from "./typography";
import { zIndex } from "./zIndex";

type Mode = "light" | "dark";

const configureTheme = (mode: Mode): Theme => ({
  palette: mode === "light" ? lightModePalette : darkModePalette,
  breakpoints,
  radius,
  shadows,
  zIndex,
  typography,
});

interface ThemeProviderProps {
  children: React.ReactNode;
  mode?: Mode;
  isEnabledResetCss?: boolean;
}

export const ThemeProvider = ({
  children,
  mode = "light",
  isEnabledResetCss = true,
}: ThemeProviderProps) => {
  const theme = configureTheme(mode);

  return (
    <EmotionThemeProvider theme={theme}>
      {isEnabledResetCss && <Global styles={reset} />}
      {children}
    </EmotionThemeProvider>
  );
};

export const useTheme = () => {
  const theme = useEmotionTheme() as Theme;

  return theme;
};
