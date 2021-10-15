import { gql } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { filter } from "graphql-anywhere";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Editor } from "../../components/editor";
import {
  EditorFragment,
  EditorFragmentDoc,
  useSlugQuery,
  useUpdatePostMutation,
} from "../../lib/generated/graphql";

gql`
  mutation updatePost(
    $id: ID!
    $slug: String!
    $title: String!
    $coverImage: String!
    $content: String!
    $description: String!
    $publishedAt: String!
  ) {
    updatePost(
      input: {
        id: $id
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

  query Slug($slug: String!) {
    post(slug: $slug) {
      ...Editor
    }
  }
`;

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
    refetchQueries: ["App", "Slug"],
  });

  if (loading || error || !data?.post) {
    return null;
  }

  const handleSubmit = async (post: EditorFragment) => {
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
  return (
    <Editor
      initialPost={filter(EditorFragmentDoc, data.post)}
      onSubmit={handleSubmit}
    />
  );
};
export default Post;
