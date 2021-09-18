import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Content = {
  __typename?: 'Content';
  body: Scalars['String'];
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
};


export type MutationCreatePostArgs = {
  input: NewPost;
};

export type NewPost = {
  content: Scalars['String'];
  coverImage: Scalars['String'];
  description: Scalars['String'];
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  content: Content;
  coverImage: Scalars['String'];
  date: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts: Array<Post>;
};


export type QueryPostArgs = {
  slug: Scalars['String'];
};

export type PostQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: Maybe<{ __typename?: 'Post', title: string, date: string, slug: string, coverImage: string, description: string, content: { __typename?: 'Content', body: string } }> };

export type SlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type SlugsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', slug: string }> };

export type CreatePostMutationVariables = Exact<{
  slug: Scalars['String'];
  title: Scalars['String'];
  coverImage: Scalars['String'];
  content: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string } };


export const PostDocument = gql`
    query post($slug: String!) {
  post(slug: $slug) {
    content {
      body
    }
    title
    date
    slug
    coverImage
    description
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const SlugsDocument = gql`
    query slugs {
  posts {
    slug
  }
}
    `;

/**
 * __useSlugsQuery__
 *
 * To run a query within a React component, call `useSlugsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlugsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlugsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSlugsQuery(baseOptions?: Apollo.QueryHookOptions<SlugsQuery, SlugsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SlugsQuery, SlugsQueryVariables>(SlugsDocument, options);
      }
export function useSlugsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SlugsQuery, SlugsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SlugsQuery, SlugsQueryVariables>(SlugsDocument, options);
        }
export type SlugsQueryHookResult = ReturnType<typeof useSlugsQuery>;
export type SlugsLazyQueryHookResult = ReturnType<typeof useSlugsLazyQuery>;
export type SlugsQueryResult = Apollo.QueryResult<SlugsQuery, SlugsQueryVariables>;
export const CreatePostDocument = gql`
    mutation createPost($slug: String!, $title: String!, $coverImage: String!, $content: String!, $description: String!) {
  createPost(
    input: {slug: $slug, title: $title, coverImage: $coverImage, content: $content, description: $description}
  ) {
    id
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *      title: // value for 'title'
 *      coverImage: // value for 'coverImage'
 *      content: // value for 'content'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;