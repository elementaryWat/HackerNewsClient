import gql from 'graphql-tag';

export const CREATE_LINK_MUTATION = gql`
   mutation post($url: String!, $description: String!) {
    post(
      url: $url,
      description: $description
    ) {
      id
      url
      description, 
      votes{
        user{
          name, email
        }
      }
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
      description, 
      votes{
        user{
          name, email
        }
      }
      
    }
  }
`;

export const VOTE_LINK_MUTATION = gql`
   mutation createVote($link_id: ID!) {
    createVote(
      link_id: $link_id,
    ) {
        id, link{
        id, url, description, votes{
          user{
            name, email
          }
        }
      }
    }
  }
`;

export const ALL_LINKS_QUERY = gql`
query feed {
  feed {
    id
    description
    url, 
    votes{
      user{
        name, email
      }
    }
  }
}
`;

