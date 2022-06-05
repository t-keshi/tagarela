import React from "react";
import Div100vh from "react-div-100vh";
import { Box } from "../ui/Box";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { Flex } from "../ui/Flex";
import { Typography } from "../ui/Typography";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Div100vh>
      <Box
        height="100%"
        width="100%"
        background="linear-gradient(220.55deg, #8FFF85 0%, #39A0FF 100%)"
        position="relative"
      >
        <Container maxW="md" p={0}>
          <Flex width="100%" justifyContent="center">
            <Card width="100%" p={4} m={4}>
              <Box width="100%" mb={4}>
                <Typography
                  variant="h1"
                  textAlign="center"
                  color="primary"
                  letterSpacing=".8rem"
                >
                  TAGARELA
                </Typography>
              </Box>
              <main>{children}</main>
            </Card>
          </Flex>
        </Container>
      </Box>
    </Div100vh>
  );
};
