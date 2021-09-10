import { Box } from "@chakra-ui/react";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import markdownToHtml from "../lib/markdownToHtml";
import markdownStyles from "../styles/markdown-styles.module.css";

export const Editor: React.FC = () => {
  const [markdown, setMd] = useState("");
  const textCapture = useRef("");
  const htmlCapture = useRef("");
  useEffect(() => {
    async function mToH() {
      const md = await markdownToHtml(textCapture.current);
      setMd(md);
    }
    const func = setInterval(() => {
      mToH();
    }, 1000);
    return () => {
      clearInterval(func);
    };
  }, []);
  const handleInput: FormEventHandler = (e) => {
    textCapture.current = (e.currentTarget as HTMLElement).innerText;
    htmlCapture.current = (e.currentTarget as HTMLElement).innerHTML;
  };

  return (
    <>
      <Box
        bg={"white"}
        // minH={"100vh"}
        padding={8}
        mb={8}
        _focus={{ outline: "none" }}
        contentEditable={true}
        onInput={handleInput}
        dangerouslySetInnerHTML={{
          __html: htmlCapture.current,
        }}
      />
      <div
        className={markdownStyles["markdown"]}
        contentEditable={true}
        dangerouslySetInnerHTML={{
          __html: markdown,
        }}
      />
    </>
  );
};
