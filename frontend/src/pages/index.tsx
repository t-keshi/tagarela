import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/layout/Layout";
import { HomeTemplate } from "../templates/Home";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tagarela | HOME</title>
      </Head>
      <Layout>
        <HomeTemplate />
      </Layout>
    </>
  );
};

export default Home;
