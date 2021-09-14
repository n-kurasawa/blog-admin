import type { NextPage } from "next";
import Head from "next/head";
import { SidebarWithHeader } from "../components/sidebar-with-header";
import { Box } from "@chakra-ui/react";
import { Editor } from "../components/editor";
import { sdk } from "../lib/graphql-client";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [slugs, setSlugs] = useState([] as string[]);
  useEffect(() => {
    async function getSlugs() {
      const slugsQuery = await sdk.slugs();
      const sls = slugsQuery.posts.map((post) => {
        return post.slug;
      });
      setSlugs(sls);
    }
    getSlugs().catch((error) => {
      console.error(error);
    });
  }, []);

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
