import type { AppProps } from "next/app";
import { Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "../components/theme";
import { Box } from "../components/ui/Box";

const App = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <ThemeProvider>
      {!isSSR ? (
        <Suspense
          fallback={
            <Box width="100vh" height="100vh" backgroundColor="red">
              Loading...
            </Box>
          }
        >
          <Component {...pageProps} />
        </Suspense>
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
};

export default App;
