import "@emotion/react";
import "@emotion/styled";
import { Theme as CuiTheme } from "./theme/ThemeProvider";

declare module "@emotion/react" {
  export interface Theme extends CuiTheme {}
}

declare module "@emotion/styled" {
  export interface Theme extends CuiTheme {}
}
