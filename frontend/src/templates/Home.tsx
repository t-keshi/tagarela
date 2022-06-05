import Link from "next/link";
import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { Button } from "../components/ui/Button";
import { Stack } from "../components/ui/Stack";

export const HomeTemplate = () => {
  return (
    <Stack>
      <Link href="/chatting-room">
        <Button variant="outlined" size="lg" color="secondary" startIcon="🧑🏻‍🎤">
          雑談を開始する
        </Button>
      </Link>
      <Link href="/create-topic">
        <Button variant="text" startIcon={<BsChevronRight />}>
          話題を投稿する
        </Button>
      </Link>
    </Stack>
  );
};
