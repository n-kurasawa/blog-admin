import type { NextPage } from "next";
import Head from "next/head";
import { SidebarWithHeader } from "../components/sidebar-with-header";
import { Box } from "@chakra-ui/react";
import { Editor } from "../components/editor";
import { useSlugsQuery } from "../lib/generated/graphql";

const Home: NextPage = () => {
  const { data } = useSlugsQuery();
  let slugs: string[] = [];
  if (data) {
    slugs = data.posts.map((post) => {
      return post.slug;
    });
  }

  return (
    <Box>
      <Head>
        <title>Blog Admin</title>
      </Head>
      <SidebarWithHeader slugs={slugs}>
        <Editor content={""} />
      </SidebarWithHeader>
    </Box>
  );
};

export default Home;
