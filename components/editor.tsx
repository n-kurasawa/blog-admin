import { Box, TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { PostHeader, PostBody } from "@n-kurasawa/blog-component";
import { FC, useEffect, useState } from "react";

import { PostType } from "../types/blog";
import { PostForm } from "./post-form";

type Props = {
  initialPost: PostType;
  onSubmit: (post: PostType) => void;
};

export const Editor: FC<Props> = ({ onSubmit, initialPost }) => {
  const [post, setPost] = useState(initialPost);
  useEffect(() => {
    setPost(initialPost);
  }, [initialPost]);

  return (
    <Tabs size={"lg"}>
      <TabList>
        <Tab>Form</Tab>
        <Tab>Preview</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box p={6}>
            <PostForm post={post} onSubmit={onSubmit} setPost={setPost} />
          </Box>
        </TabPanel>
        <TabPanel>
          <PostHeader
            title={initialPost.title}
            coverImage={initialPost.coverImage}
            date={initialPost.publishedAt}
          />
          <PostBody content={post.content.body} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
