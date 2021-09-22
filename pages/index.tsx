import type { NextPage } from "next";
import { PostType } from "../types/blog";
import { useCreatePostMutation } from "../lib/generated/graphql";
import { useRouter } from "next/router";
import { Editor } from "../components/editor";

const Home: NextPage = () => {
  const router = useRouter();
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
      console.error(res.errors);
    }
    router.push(`/posts/${post.slug}`);
  };

  return <Editor initialPost={initialPost} onSubmit={handleSubmit} />;
};

export default Home;
