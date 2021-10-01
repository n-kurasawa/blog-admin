import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
} from "react";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { PostType } from "../types/blog";

type Props = {
  post: PostType;
  setPost: Dispatch<SetStateAction<PostType>>;
  onSubmit: (post: PostType) => void;
};
export const PostForm: React.FC<Props> = ({ post, onSubmit, setPost }) => {
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
      return { ...prev, content: { ...prev.content, body: e.target.value } };
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
            value={content.body}
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
