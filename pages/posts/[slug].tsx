import { useRouter } from "next/router";
import { NextPage } from "next";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../lib/generated/graphql";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

const Post: NextPage = () => {
  const router = useRouter();
  let queryValue = "";
  if (typeof router.query.slug === "string") {
    queryValue = router.query.slug;
  }

  const defaultValue = {
    id: "",
    title: "",
    publishedAt: "",
    slug: "",
    coverImage: "",
    description: "",
    content: "",
  };
  const { data, loading, error } = usePostQuery({
    variables: { slug: queryValue },
  });
  let post = defaultValue;
  if (data?.post) {
    const tmp = data?.post;
    post.id = tmp.id;
    post.title = tmp.title;
    post.publishedAt = tmp.publishedAt;
    post.slug = tmp.slug;
    post.coverImage = tmp.coverImage;
    post.description = tmp.description;
    post.content = tmp.content.body;
  }
  const [updatePostMutation] = useUpdatePostMutation();

  if (loading || error) {
    return null;
  }

  const handleSubmit = async (post: Post) => {
    const res = await updatePostMutation({
      variables: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        coverImage: post.coverImage,
        content: post.content,
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
      <PostForm defaultPost={post} onSubmit={handleSubmit} />
    </Box>
  );
};

export default Post;

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  description: string;
  publishedAt: string;
};

type Props = {
  defaultPost: Post;
  onSubmit: (post: Post) => void;
};
const PostForm: React.FC<Props> = ({ defaultPost, onSubmit }) => {
  const [post, setPost] = useState(defaultPost);
  const { title, publishedAt, slug, content, description, coverImage } = post;
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPost((prev) => {
      return { ...prev, title: e.target.value };
    });
  };
  const handlePublishedAtChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPost((prev) => {
      return { ...prev, publishedAt: e.target.value };
    });
  };
  const handleSlugChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPost((prev) => {
      return { ...prev, slug: e.target.value };
    });
  };
  const handleCoverImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPost((prev) => {
      return { ...prev, coverImage: e.target.value };
    });
  };
  const handleDescriptionChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPost((prev) => {
      return { ...prev, description: e.target.value };
    });
  };
  const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setPost((prev) => {
      return { ...prev, content: e.target.value };
    });
  };
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(post);
  };
  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl id="title">
          <FormLabel>Title</FormLabel>
          <Input type="text" value={title} onChange={handleTitleChange} />
        </FormControl>
        <FormControl id="publishedAt">
          <FormLabel>Published At</FormLabel>
          <Input
            type="date"
            value={publishedAt}
            onChange={handlePublishedAtChange}
          />
        </FormControl>
        <FormControl id="slug">
          <FormLabel>Slug</FormLabel>
          <Input type="text" value={slug} onChange={handleSlugChange} />
        </FormControl>
        <FormControl id="coverImage">
          <FormLabel>Cover Image</FormLabel>
          <Input
            type="text"
            value={coverImage}
            onChange={handleCoverImageChange}
          />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </FormControl>
        <FormControl id="content">
          <FormLabel>Content</FormLabel>
          <Textarea
            minH="800px"
            value={content}
            onChange={handleContentChange}
          />
        </FormControl>
        <Button
          type={"submit"}
          size="md"
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Save
        </Button>
      </VStack>
    </form>
  );
};
