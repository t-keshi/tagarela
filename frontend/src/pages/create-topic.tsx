import { cacheExchange, dedupExchange, fetchExchange } from "@urql/core";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useMutation } from "urql";
import { Layout } from "../components/layout/Layout";
import { CreateTopicTemplate } from "../templates/CreateTopic";

const CreateTopic = `
  mutation ($content: String!) {
    createTopic (content: $content) {
      id
      content
      likes
    }
  }
`;

const CreateTopicPage: NextPage = () => {
  const [_, createTopic] = useMutation(CreateTopic);

  return (
    <>
      <Head>
        <title>Tagarela</title>
      </Head>
      <Layout>
        <CreateTopicTemplate createTopic={createTopic} />
      </Layout>
    </>
  );
};

export default withUrqlClient((ssrExchange, ctx) => ({
  url: process.env.NEXT_PUBLIC_API_BASE_URL_GRAPHQL || "",
  exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
}))(CreateTopicPage);
