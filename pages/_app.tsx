import { ApolloProvider, gql } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import { Sidebar } from "../components/sidebar";
import { useAppQuery } from "../lib/generated/graphql";
import { gqlClient } from "../lib/graphql-client";

import type { AppProps } from "next/app";

gql`
  query App {
    ...Sidebar
  }
`;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const slugsQuery = useAppQuery({ client: gqlClient });

  return (
    <>
      <Head>
        <title>Blog Admin</title>
      </Head>
      <ChakraProvider>
        <ApolloProvider client={gqlClient}>
          {slugsQuery.data ? (
            <Sidebar slugs={slugsQuery.data}>
              <Component {...pageProps} />
            </Sidebar>
          ) : null}
        </ApolloProvider>
      </ChakraProvider>
    </>
  );
}
export default MyApp;
