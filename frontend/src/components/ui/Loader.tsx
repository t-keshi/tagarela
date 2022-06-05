import styled from "@emotion/styled";
import clsx from "clsx";
import { forwardRef, useEffect, useState } from "react";
import type {
  BackgroundProps,
  BorderProps,
  ColorProps,
  LayoutProps,
  SpaceProps,
} from "styled-system";
import { background, border, color, layout, space } from "styled-system";

type SystemProps = BackgroundProps &
  ColorProps &
  LayoutProps &
  SpaceProps &
  BorderProps;
type LoaderProps = SystemProps & {
  className?: string;
  children?: React.ReactNode;
};

const StyledLoader = styled("div")(
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    background: "rgb(23, 22, 22)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    transition: "opacity 0.3s linear",
  },
  background,
  space,
  layout,
  color,
  border
);

const classes = {
  root: "CuiLoader-root",
};

export const Loader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const { className, ...cuiStyleProps } = props;
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (opacity > 0) {
        setOpacity((opacity) => opacity - 0.1);
      }
    }, 200);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledLoader
      ref={ref}
      className={clsx(classes.root, className)}
      opacity={opacity}
      {...cuiStyleProps}
    >
      <svg
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="lds-ripple"
        style={{ background: "0, 0" }}
      >
        <circle
          cx="50"
          cy="50"
          r="4.719"
          fill="none"
          stroke="#1d3f72"
          strokeWidth="2"
        >
          <animate
            attributeName="r"
            calcMode="spline"
            values="0;40"
            keyTimes="0;1"
            dur="3"
            keySplines="0 0.2 0.8 1"
            begin="-1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            calcMode="spline"
            values="1;0"
            keyTimes="0;1"
            dur="3"
            keySplines="0.2 0 0.8 1"
            begin="-1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="50"
          cy="50"
          r="27.591"
          fill="none"
          stroke="#5699d2"
          strokeWidth="2"
        >
          <animate
            attributeName="r"
            calcMode="spline"
            values="0;40"
            keyTimes="0;1"
            dur="3"
            keySplines="0 0.2 0.8 1"
            begin="0s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            calcMode="spline"
            values="1;0"
            keyTimes="0;1"
            dur="3"
            keySplines="0.2 0 0.8 1"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </StyledLoader>
  );
});
