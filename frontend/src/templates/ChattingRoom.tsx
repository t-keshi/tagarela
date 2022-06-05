import Link from "next/link";
import { useRef, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import {
  NexusGenArgTypes,
  NexusGenObjects,
} from "../../generated/nexus-typegen";
import { Box } from "../components/ui/Box";
import { Button } from "../components/ui/Button";
import { Stack } from "../components/ui/Stack";
import { Typography } from "../components/ui/Typography";
import { useIsomorphicLayoutEffect } from "../helpers/hooks/useIsomorphicLayoutEffect";
import { useLottery } from "../helpers/hooks/useLottery";

export const ChattingRoomTemplate: React.FC<{
  topics: NexusGenObjects["Topic"][];
  incrementLikes: (arg: NexusGenArgTypes["Mutation"]["incrementLikes"]) => void;
}> = ({ topics, incrementLikes }) => {
  const lottery = useRef(
    topics.map(({ id, content, likes }) => ({
      id,
      content,
      weight: likes + 1,
    }))
  );
  const [currentHit, handleDrawLottery] = useLottery(lottery.current);
  const [like, setLike] = useState(false);
  const handleIncrementLikes = () => {
    if (currentHit) {
      incrementLikes({ id: currentHit.id });
      setLike(true);
    }
  };

  useIsomorphicLayoutEffect(() => {
    handleDrawLottery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width="100%">
      {currentHit ? (
        <Box width="100%">
          <Typography variant="h2" color="primary" textAlign="center" paragraph>
            {currentHit.content}
          </Typography>
          <Stack>
            <Button
              onClick={handleIncrementLikes}
              variant="text"
              color="info"
              width="100%"
              disabled={like}
            >
              ナイス話題！
            </Button>
            <Button
              onClick={handleDrawLottery}
              variant="outlined"
              size="lg"
              color="secondary"
              startIcon="🧑🏻‍🎤"
              width="100%"
            >
              次の話題
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box width="100%">
          <Typography
            variant="h2"
            color="textPrimary"
            textAlign="center"
            paragraph
          >
            Oops, sorry!
          </Typography>
          <Typography color="textSecondary" textAlign="center" gutterBottom>
            話題がつきました
          </Typography>
        </Box>
      )}
      <Box mb={4} />
      <Link href="/">
        <Button variant="text" color="info" startIcon={<BsChevronLeft />}>
          戻る
        </Button>
      </Link>
    </Box>
  );
};
