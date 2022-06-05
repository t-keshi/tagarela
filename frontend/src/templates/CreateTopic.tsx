import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsChevronLeft } from "react-icons/bs";
import { NexusGenArgTypes } from "../../generated/nexus-typegen";
import { Box } from "../components/ui/Box";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Typography } from "../components/ui/Typography";

export const CreateTopicTemplate: React.FC<{
  createTopic: (arg: NexusGenArgTypes["Mutation"]["createTopic"]) => void;
}> = ({ createTopic }) => {
  const { handleSubmit, register, reset } = useForm<{ content: string }>({
    defaultValues: { content: "" },
    shouldUnregister: true,
  });
  const [isShowMessage, setIsShowMessage] = useState(false);
  const handleCreateTopic = handleSubmit(({ content }) => {
    console.log(content);
    createTopic({ content });
    setIsShowMessage(true);
    return reset();
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isShowMessage) {
        setIsShowMessage(false);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isShowMessage]);

  return (
    <Box width="100%">
      <form onSubmit={handleCreateTopic}>
        <Input
          placeholder="盛り上がりそうな話題を入力してください..."
          {...register("content", { required: true })}
          width="100%"
        />
        <Box mb={4} />
        <Button type="submit" width="100%">
          話題を投稿する
        </Button>
        <Box mb={2} />
        {isShowMessage && (
          <Typography textAlign="center">Thank you!</Typography>
        )}
      </form>
      <Box mb={4} />
      <Link href="/">
        <Button variant="text" color="info" startIcon={<BsChevronLeft />}>
          戻る
        </Button>
      </Link>
    </Box>
  );
};
