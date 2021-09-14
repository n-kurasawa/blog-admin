import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import NextLink from "next/link";

type Props = {
  slugs: string[];
};
export const SidebarWithHeader: React.FC<Props> = ({ slugs, children }) => {
  return (
    <Box minH="100vh" bg={"gray.100"}>
      <SidebarContent slugs={slugs} />
      <Nav />
      <Box ml={60} p="4">
        {children}
      </Box>
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
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Blog Admin
        </Text>
      </Flex>
      {slugs.map((slug) => (
        <NavItem key={slug} slug={slug} />
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

const Nav = () => {
  return (
    <Flex
      ml={60}
      px={4}
      height="20"
      alignItems="center"
      bg={"white"}
      borderBottomWidth="1px"
      borderBottomColor={"gray.200"}
      justifyContent={"flex-end"}
    >
      <HStack spacing={"6"}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Box display={"flex"}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={"white"} borderColor={"gray.200"}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
