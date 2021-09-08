import type { NextPage } from "next";
import Head from "next/head";
import { SidebarWithHeader } from "../components/sidebar-with-header";
import { Box } from "@chakra-ui/react";
import { Editor } from "../components/editor";

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Blog Admin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/admin/favicon.ico" />
      </Head>
      <SidebarWithHeader>
        <Editor />
      </SidebarWithHeader>
    </Box>
  );
};

export default Home;
