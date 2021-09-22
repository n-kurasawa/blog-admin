import { useRouter } from "next/router";
import { NextPage } from "next";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../lib/generated/graphql";
import { PostForm } from "../../components/post-form";
import { Box, Button, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import type { PostType } from "../../types/blog";

const Post: NextPage = () => {
  const router = useRouter();
  let queryValue = "";
  if (typeof router.query.slug === "string") {
    queryValue = router.query.slug;
  }

  const { data, loading, error } = usePostQuery({
    variables: { slug: queryValue },
  });
  const [updatePostMutation] = useUpdatePostMutation({
    refetchQueries: ["slugs"],
  });

  if (loading || error || !data?.post) {
    return null;
  }

  const handleSubmit = async (post: PostType) => {
    const res = await updatePostMutation({
      variables: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        coverImage: post.coverImage,
        content: post.content.body,
        description: post.description,
        publishedAt: post.publishedAt,
      },
    });
    if (res.errors) {
      console.error(res.errors);
    }
  };

  return (
    <Box bg={"white"} rounded={"md"} boxShadow={"md"}>
      <Flex
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        <Stack
          flex={{ base: 1 }}
          direction={"row"}
          justify={"flex-end"}
          spacing={6}
        >
          <Button fontSize={"sm"} fontWeight={400} variant={"link"} href={"#"}>
            Preview
          </Button>
          <Button fontSize={"sm"} variant={"link"} fontWeight={400} href={"#"}>
            Form
          </Button>
        </Stack>
      </Flex>
      <Box p={6}>
        <PostForm initialPost={data.post} onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
};

export default Post;
