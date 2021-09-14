import Head from "next/head";
import { SidebarWithHeader } from "../../components/sidebar-with-header";
import { Editor } from "../../components/editor";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { sdk } from "../../lib/graphql-client";
import { NextPage } from "next";

const Post: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [content, setContent] = useState("");
  useEffect(() => {
    async function getContent() {
      const postQuery = await sdk.post({ slug: slug as string });
      setContent(
        postQuery.post?.content.body ? postQuery.post?.content.body : ""
      );
    }
    getContent().catch((error) => {
      console.error(error);
    });
  });
  return (
    <Box>
      <Head>
        <title>Blog Admin</title>
      </Head>
      <SidebarWithHeader slugs={[]}>
        <Editor content={content} />
      </SidebarWithHeader>
    </Box>
  );
};

export default Post;
