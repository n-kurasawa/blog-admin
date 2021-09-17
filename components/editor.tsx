import { Textarea } from "@chakra-ui/react";

type Props = {
  content: string;
};

export const Editor: React.FC<Props> = ({ content }) => {
  return <Textarea bg={"white"} minH="600px" defaultValue={content} />;
};
