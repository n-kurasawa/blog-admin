import { Editor } from "../../components/editor";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { usePostQuery } from "../../lib/generated/graphql";
import { Box, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

const Post: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  let queryValue = "";
  if (typeof slug === "string") {
    queryValue = slug;
  }

  const postQuery = usePostQuery({ variables: { slug: queryValue } });
  let content = "";
  if (postQuery.data?.post?.content.body) {
    content = postQuery.data.post.content.body;
  }

  return (
    <Box bg={"white"} p={4}>
      <Stack spacing={4}>
        <FormControl id="title">
          <FormLabel>Title</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="date">
          <FormLabel>Date</FormLabel>
          <Input type="date" />
        </FormControl>
        <FormControl id="slug">
          <FormLabel>Slug</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="coverImage">
          <FormLabel>Cover Image</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Content</FormLabel>
          <Editor content={content} />
        </FormControl>
      </Stack>
    </Box>
  );
};

export default Post;
