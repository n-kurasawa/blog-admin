import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { Sidebar } from "../components/sidebar";
import { useSlugsQuery } from "../lib/generated/graphql";
import Head from "next/head";
import { gqlClient } from "../lib/graphql-client";

function MyApp({ Component, pageProps }: AppProps) {
  const slugsQuery = useSlugsQuery({ client: gqlClient });
  let slugs: string[] = [];
  if (slugsQuery.data?.posts) {
    slugs = slugsQuery.data?.posts.map((post) => {
      return post.slug;
    });
  }

  return (
    <>
      <Head>
        <title>Blog Admin</title>
      </Head>
      <ChakraProvider>
        <ApolloProvider client={gqlClient}>
          <Sidebar slugs={slugs}>
            <Component {...pageProps} />
          </Sidebar>
        </ApolloProvider>
      </ChakraProvider>
    </>
  );
}
export default MyApp;
