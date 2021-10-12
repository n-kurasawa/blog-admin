import { gql } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Editor } from "../components/editor";
import {
  EditorFragment,
  useCreatePostMutation,
} from "../lib/generated/graphql";

import type { NextPage } from "next";

export const createPost = gql`
  mutation createPost(
    $slug: String!
    $title: String!
    $coverImage: String!
    $content: String!
    $description: String!
    $publishedAt: String!
  ) {
    createPost(
      input: {
        slug: $slug
        title: $title
        coverImage: $coverImage
        content: $content
        description: $description
        publishedAt: $publishedAt
      }
    ) {
      id
    }
  }
`;

const Home: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const initialPost: EditorFragment = {
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
  const handleSubmit = async (post: EditorFragment) => {
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
