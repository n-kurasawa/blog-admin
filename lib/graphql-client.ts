import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/graphql";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL!, {
  headers: {},
});

export const sdk = getSdk(client);
