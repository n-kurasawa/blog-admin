import { useRouter } from "next/router";
import { NextPage } from "next";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../lib/generated/graphql";
import { PostForm } from "../../components/post-form";
import { Box } from "@chakra-ui/react";
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
    <Box bg={"white"} p={4}>
      <PostForm initialPost={data.post} onSubmit={handleSubmit} />
    </Box>
  );
};

export default Post;
