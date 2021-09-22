import { Box, TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { PostForm } from "./post-form";
import { PostType } from "../types/blog";

type Props = {
  initialPost: PostType;
  onSubmit: (post: PostType) => void;
};

export const Editor: React.FC<Props> = ({ onSubmit, initialPost }) => {
  return (
    <Box bg={"white"} rounded={"md"} boxShadow={"md"}>
      <Tabs>
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
          <TabPanel>preview</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
