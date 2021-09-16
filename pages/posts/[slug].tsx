import { Editor } from "../../components/editor";
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

  const postQuery = usePostQuery({ variables: { slug: queryValue } });
  let content = "";
  if (postQuery.data?.post?.content.body) {
    content = postQuery.data.post.content.body;
  }

  return <Editor content={content} />;
};

export default Post;
