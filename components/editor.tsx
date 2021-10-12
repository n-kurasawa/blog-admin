import { gql } from "@apollo/client";
import { Box, TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { PostHeader, PostBody } from "@n-kurasawa/blog-component";
import { FC, useEffect, useState } from "react";

import { EditorFragment } from "../lib/generated/graphql";
import { PostForm, PostFormFragmentDoc } from "./post-form";

type Props = {
  initialPost: EditorFragment;
  onSubmit: (post: EditorFragment) => void;
};

export const EditorFragmentDoc = gql`
  ${PostFormFragmentDoc}
  fragment Editor on Post {
    id
    content {
      body
    }
    title
    publishedAt
    slug
    coverImage
    description
    ...PostForm
  }
`;

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
