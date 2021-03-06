import Link from "next/link";
import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { Button } from "../components/ui/Button";
import { Stack } from "../components/ui/Stack";

export const HomeTemplate = () => {
  return (
    <Stack>
      <Link href="/chatting-room">
        <Button variant="outlined" size="lg" color="secondary" startIcon="đ§đťâđ¤">
          éčŤăéĺ§ăă
        </Button>
      </Link>
      <Link href="/create-topic">
        <Button variant="text" startIcon={<BsChevronRight />}>
          čŠąéĄăćç¨żăă
        </Button>
      </Link>
    </Stack>
  );
};
