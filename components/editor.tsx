import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { PostForm } from "./post-form";
import { PostType } from "../types/blog";

type Props = {
  initialPost: PostType;
  onSubmit: (post: PostType) => void;
};

export const Editor: React.FC<Props> = ({ onSubmit, initialPost }) => {
  return (
    <Box bg={"white"} rounded={"md"} boxShadow={"md"}>
      <Flex
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        <Stack
          flex={{ base: 1 }}
          direction={"row"}
          justify={"flex-end"}
          spacing={6}
        >
          <Button fontSize={"sm"} fontWeight={400} variant={"link"} href={"#"}>
            Preview
          </Button>
          <Button fontSize={"sm"} variant={"link"} fontWeight={400} href={"#"}>
            Form
          </Button>
        </Stack>
      </Flex>
      <Box p={6}>
        <PostForm initialPost={initialPost} onSubmit={onSubmit} />
      </Box>
    </Box>
  );
};
