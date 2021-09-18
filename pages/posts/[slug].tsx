import { useRouter } from "next/router";
import { NextPage } from "next";
import {
  useCreatePostMutation,
  usePostQuery,
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
    title: "",
    date: "",
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
    post.title = tmp.title;
    post.date = tmp.date;
    post.slug = tmp.slug;
    post.coverImage = tmp.coverImage;
    post.description = tmp.description;
    post.content = tmp.content.body;
  }
  const [createPostMutation] = useCreatePostMutation();

  if (loading || error) {
    return null;
  }

  const handleSubmit = async (post: Post) => {
    const res = await createPostMutation({
      variables: {
        slug: post.slug,
        title: post.title,
        coverImage: post.coverImage,
        content: post.content,
        description: post.description,
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
  title: string;
  slug: string;
  date: string;
  content: string;
  coverImage: string;
  description: string;
};

type Props = {
  defaultPost: Post;
  onSubmit: (post: Post) => void;
};
const PostForm: React.FC<Props> = ({ defaultPost, onSubmit }) => {
  const [post, setPost] = useState(defaultPost);
  const { title, date, slug, content, description, coverImage } = post;
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPost((prev) => {
      return { ...prev, title: e.target.value };
    });
  };
  const handleDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPost((prev) => {
      return { ...prev, date: e.target.value };
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
    console.log("submit");
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
        <FormControl id="date">
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={date.split("T")[0]}
            onChange={handleDateChange}
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
