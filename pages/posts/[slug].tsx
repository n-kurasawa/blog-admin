import { useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Editor } from "../../components/editor";
import {
  useSlugQuery,
  useUpdatePostMutation,
} from "../../lib/generated/graphql";

import type { PostType } from "../../types/blog";

const Post: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  let queryValue = "";
  if (typeof router.query.slug === "string") {
    queryValue = router.query.slug;
  }

  const { data, loading, error } = useSlugQuery({
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
      toast({
        title: `エラーが発生しました: ${res.errors}`,
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: `保存されました`,
        position: "top-right",
        status: "success",
        isClosable: true,
      });
    }
  };

  return <Editor initialPost={data.post} onSubmit={handleSubmit} />;
};

export default Post;
