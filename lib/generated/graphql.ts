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

export type EditPost = {
  content: Scalars['String'];
  coverImage: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  publishedAt: Scalars['String'];
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost: Post;
};


export type MutationCreatePostArgs = {
  input: NewPost;
};


export type MutationUpdatePostArgs = {
  input: EditPost;
};

export type NewPost = {
  content: Scalars['String'];
  coverImage: Scalars['String'];
  description: Scalars['String'];
  publishedAt: Scalars['String'];
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  content: Content;
  coverImage: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  publishedAt: Scalars['String'];
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

export type EditorFragment = { __typename?: 'Post', id: string, title: string, publishedAt: string, slug: string, coverImage: string, description: string, content: { __typename?: 'Content', body: string } };

export type PostFormFragment = { __typename?: 'Post', id: string, title: string, publishedAt: string, slug: string, coverImage: string, description: string, content: { __typename?: 'Content', body: string } };

export type SidebarFragment = { __typename?: 'Post', slug: string };

export type AppQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', slug: string }> };

export type CreatePostMutationVariables = Exact<{
  slug: Scalars['String'];
  title: Scalars['String'];
  coverImage: Scalars['String'];
  content: Scalars['String'];
  description: Scalars['String'];
  publishedAt: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['ID'];
  slug: Scalars['String'];
  title: Scalars['String'];
  coverImage: Scalars['String'];
  content: Scalars['String'];
  description: Scalars['String'];
  publishedAt: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: string } };

export type SlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type SlugQuery = { __typename?: 'Query', post?: Maybe<{ __typename?: 'Post', id: string, title: string, publishedAt: string, slug: string, coverImage: string, description: string, content: { __typename?: 'Content', body: string } }> };

export const PostFormFragmentDoc = gql`
    fragment PostForm on Post {
  id
  content {
    body
  }
  title
  publishedAt
  slug
  coverImage
  description
}
    `;
export const EditorFragmentDoc = gql`
    fragment Editor on Post {
  id
  content {
    body
  }
  title
  publishedAt
  slug
  coverImage
  description
  ...PostForm
}
    ${PostFormFragmentDoc}`;
export const SidebarFragmentDoc = gql`
    fragment Sidebar on Post {
  slug
}
    `;
export const AppDocument = gql`
    query App {
  posts {
    ...Sidebar
  }
}
    ${SidebarFragmentDoc}`;

/**
 * __useAppQuery__
 *
 * To run a query within a React component, call `useAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppQuery(baseOptions?: Apollo.QueryHookOptions<AppQuery, AppQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppQuery, AppQueryVariables>(AppDocument, options);
      }
export function useAppLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppQuery, AppQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppQuery, AppQueryVariables>(AppDocument, options);
        }
export type AppQueryHookResult = ReturnType<typeof useAppQuery>;
export type AppLazyQueryHookResult = ReturnType<typeof useAppLazyQuery>;
export type AppQueryResult = Apollo.QueryResult<AppQuery, AppQueryVariables>;
export const CreatePostDocument = gql`
    mutation createPost($slug: String!, $title: String!, $coverImage: String!, $content: String!, $description: String!, $publishedAt: String!) {
  createPost(
    input: {slug: $slug, title: $title, coverImage: $coverImage, content: $content, description: $description, publishedAt: $publishedAt}
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
 *      publishedAt: // value for 'publishedAt'
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
export const UpdatePostDocument = gql`
    mutation updatePost($id: ID!, $slug: String!, $title: String!, $coverImage: String!, $content: String!, $description: String!, $publishedAt: String!) {
  updatePost(
    input: {id: $id, slug: $slug, title: $title, coverImage: $coverImage, content: $content, description: $description, publishedAt: $publishedAt}
  ) {
    id
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      slug: // value for 'slug'
 *      title: // value for 'title'
 *      coverImage: // value for 'coverImage'
 *      content: // value for 'content'
 *      description: // value for 'description'
 *      publishedAt: // value for 'publishedAt'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const SlugDocument = gql`
    query Slug($slug: String!) {
  post(slug: $slug) {
    ...Editor
  }
}
    ${EditorFragmentDoc}`;

/**
 * __useSlugQuery__
 *
 * To run a query within a React component, call `useSlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useSlugQuery(baseOptions: Apollo.QueryHookOptions<SlugQuery, SlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SlugQuery, SlugQueryVariables>(SlugDocument, options);
      }
export function useSlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SlugQuery, SlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SlugQuery, SlugQueryVariables>(SlugDocument, options);
        }
export type SlugQueryHookResult = ReturnType<typeof useSlugQuery>;
export type SlugLazyQueryHookResult = ReturnType<typeof useSlugLazyQuery>;
export type SlugQueryResult = Apollo.QueryResult<SlugQuery, SlugQueryVariables>;