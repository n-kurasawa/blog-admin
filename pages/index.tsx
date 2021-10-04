import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Editor } from "../components/editor";
import { useCreatePostMutation } from "../lib/generated/graphql";
import { PostType } from "../types/blog";

import type { NextPage } from "next";




const Home: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const initialPost: PostType = {
    id: "",
    title: "",
    publishedAt: "",
    slug: "",
    coverImage: "",
    description: "",
    content: { body: "" },
  };

  const [createPostMutation] = useCreatePostMutation({
    refetchQueries: ["slugs"],
  });
  const handleSubmit = async (post: PostType) => {
    const res = await createPostMutation({
      variables: {
        title: post.title,
        publishedAt: post.publishedAt,
        slug: post.slug,
        coverImage: post.coverImage,
        description: post.description,
        content: post.content.body,
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
    router.push(`/posts/${post.slug}`);
  };

  return <Editor initialPost={initialPost} onSubmit={handleSubmit} />;
};

export default Home;
