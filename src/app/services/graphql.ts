import gql from 'graphql-tag';

export const CREATE_LINK_MUTATION = gql`
   mutation post($url: String!, $description: String!) {
    post(
      url: $url,
      description: $description
    ) {
      id
      url
      description
    }
  }
`;

export const UPDATE_LINK_MUTATION = gql`
   mutation updateLink($id: ID!,$url: String!, $description: String!) {
    updateLink(
      id: $id,
      url: $url,
      description: $description
    ) {
      id
      url
      description
    }
  }
`;

export const ALL_LINKS_QUERY = gql`
query feed {
  feed {
    id
    description
    url
  }
}
`;

