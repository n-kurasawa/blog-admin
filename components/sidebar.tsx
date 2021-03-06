import { gql } from "@apollo/client";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import { SidebarFragment } from "../lib/generated/graphql";

gql`
  fragment Sidebar on Query {
    posts {
      slug
    }
  }
`;

type Props = {
  slugs: SidebarFragment;
};
export const Sidebar: React.FC<Props> = ({ slugs, children }) => {
  return (
    <Box minH="100vh">
      <SidebarContent slugs={slugs} />
      <Box ml={60}>{children}</Box>
    </Box>
  );
};

const SidebarContent: React.FC<Props> = ({ slugs }) => {
  return (
    <Box
      bg={"white"}
      borderRight="1px"
      borderRightColor={"gray.200"}
      w={60}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href="#" style={{ textDecoration: "none" }}>
          <NextLink href={"/"}>
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
              Blog Admin
            </Text>
          </NextLink>
        </Link>
      </Flex>
      {slugs.posts.map((post) => (
        <NavItem key={post.slug} slug={post.slug} />
      ))}
    </Box>
  );
};

const NavItem: React.FC<{ slug: string }> = ({ slug }) => {
  return (
    <Link href="#" style={{ textDecoration: "none" }}>
      <NextLink href={`/posts/${slug}`}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
        >
          {slug}
        </Flex>
      </NextLink>
    </Link>
  );
};
