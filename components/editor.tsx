import { PostHeader, PostBody } from "@n-kurasawa/blog-component";
import { Box, TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { PostForm } from "./post-form";
import { PostType } from "../types/blog";

type Props = {
  initialPost: PostType;
  onSubmit: (post: PostType) => void;
};

export const Editor: React.FC<Props> = ({ onSubmit, initialPost }) => {
  return (
    <Tabs size={"lg"}>
      <TabList>
        <Tab>Form</Tab>
        <Tab>Preview</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box p={6}>
            <PostForm initialPost={initialPost} onSubmit={onSubmit} />
          </Box>
        </TabPanel>
        <TabPanel>
          <PostHeader
            title={initialPost.title}
            coverImage={initialPost.coverImage}
            date={initialPost.publishedAt}
          />
          <PostBody content={initialPost.content.body} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
