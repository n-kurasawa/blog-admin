import Head from "next/head";
import { SidebarWithHeader } from "../../components/sidebar-with-header";
import { Editor } from "../../components/editor";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { usePostQuery, useSlugsQuery } from "../../lib/generated/graphql";

const Post: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  let queryValue = "";
  if (typeof slug === "string") {
    queryValue = slug;
  }
  const slugsQuery = useSlugsQuery();
  let slugs: string[] = [];
  if (slugsQuery.data?.posts) {
    slugs = slugsQuery.data?.posts.map((post) => {
      return post.slug;
    });
  }

  const postQuery = usePostQuery({ variables: { slug: queryValue } });
  let content = "";
  if (postQuery.data?.post?.content.body) {
    content = postQuery.data.post.content.body;
  }

  return (
    <Box>
      <Head>
        <title>Blog Admin</title>
      </Head>
      <SidebarWithHeader slugs={slugs}>
        <Editor content={content} />
      </SidebarWithHeader>
    </Box>
  );
};

export default Post;
