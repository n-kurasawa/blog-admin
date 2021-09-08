import { Box } from "@chakra-ui/react";
import { FormEventHandler, useRef, useState } from "react";

export const Editor: React.FC = () => {
  const [text, setText] = useState("");
  const defalutValue = useRef(text);
  const handleInput: FormEventHandler = (e) => {
    setText((e.currentTarget as HTMLElement).innerHTML);
  };
  return (
    <>
      <Box
        bg={"white"}
        minH={"100vh"}
        padding={4}
        _focus={{ outline: "none" }}
        contentEditable={true}
        onInput={handleInput}
        dangerouslySetInnerHTML={{
          __html: defalutValue.current,
        }}
      />
    </>
  );
};
