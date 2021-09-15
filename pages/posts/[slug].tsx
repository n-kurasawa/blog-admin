import Head from "next/head";
import { SidebarWithHeader } from "../../components/sidebar-with-header";
import { Editor } from "../../components/editor";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { usePostQuery } from "../../lib/generated/graphql";

const Post: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  let queryValue = "";
  if (typeof slug === "string") {
    queryValue = slug;
  }
  const { data } = usePostQuery({ variables: { slug: queryValue } });
  let content = "";
  if (data?.post?.content.body) {
    content = data.post.content.body;
  }

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
