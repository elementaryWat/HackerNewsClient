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

export const ALL_LINKS_QUERY = gql`
query feed {
  feed {
    id
    description
    url
  }
}
`;

