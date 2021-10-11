import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import { Sidebar } from "../components/sidebar";
import { useAppQuery } from "../lib/generated/graphql";
import { gqlClient } from "../lib/graphql-client";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const slugsQuery = useAppQuery({ client: gqlClient });
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
