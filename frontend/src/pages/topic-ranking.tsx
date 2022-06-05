import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useQuery } from "urql";
import { Layout } from "../components/layout/Layout";

const TopicsQuery = `
  query {
    topics {
      id
      content
      likes
    }
  }
`;

const TopicRanking: NextPage = () => {
  const [data] = useQuery({ query: TopicsQuery });

  return (
    <>
      <Head>
        <title>Tagarela | 人気の話題</title>
      </Head>
      <Layout>
        <div />
      </Layout>
    </>
  );
};

export default withUrqlClient((_ssrExchange, ctx) => ({
  url: process.env.NEXT_PUBLIC_API_BASE_URL_GRAPHQL || "",
}))(TopicRanking);
