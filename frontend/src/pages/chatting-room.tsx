import { cacheExchange, dedupExchange, fetchExchange } from "@urql/core";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useMutation, useQuery } from "urql";
import {
  NexusGenArgTypes,
  NexusGenFieldTypes,
} from "../../generated/nexus-typegen";
import { Layout } from "../components/layout/Layout";
import { Loader } from "../components/ui/Loader";
import { Typography } from "../components/ui/Typography";
import { ChattingRoomTemplate } from "../templates/ChattingRoom";

const TopicsQuery = `
  query {
    topics {
      id
      content
      likes
    }
  }
`;

const IncrementLikes = `
  mutation ($id: Int!) {
    incrementLikes(id: $id) {
      id
    }
  }
`;

const ChattingRoomPage: NextPage = () => {
  const [{ data, fetching, error }] = useQuery<
    Pick<NexusGenFieldTypes["Query"], "topics">
  >({
    query: TopicsQuery,
  });
  const [_, incrementLikes] = useMutation<
    unknown,
    NexusGenArgTypes["Mutation"]["incrementLikes"]
  >(IncrementLikes);

  const renderContents = () => {
    if (fetching) return <Loader />;
    if (error || !data)
      return (
        <Typography color="error">sorry, something went wrong!!</Typography>
      );
    return (
      <ChattingRoomTemplate
        topics={data.topics}
        incrementLikes={incrementLikes}
      />
    );
  };

  return (
    <>
      <Head>
        <title>Tagarela</title>
      </Head>
      <Layout>{renderContents()}</Layout>
    </>
  );
};

export default withUrqlClient((ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_API_BASE_URL_GRAPHQL || "",
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
}))(ChattingRoomPage);
