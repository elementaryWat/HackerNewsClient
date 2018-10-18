import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
   mutation login($email: String!, $password: String!) {
    login(
      email: $email,
      password: $password
    ) {
      user{
        id
        name
        email
      },
      token
    }
  }
`;

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
        id
        user{
          id, name, email
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
        id
        user{
          id, name, email
        }
      }
      
    }
  }
`;

export const VOTE_LINK_MUTATION = gql`
   mutation createVote($link_id: String!) {
    createVote(
      link_id: $link_id,
    ) {
        id, link{
        id, url, description, votes{
          id
          user{
            id, name, email
          }
        }
      }
    }
  }
`;

export const DOWNVOTE_LINK_MUTATION = gql`
   mutation deleteVote($vote_id: ID!) {
    deleteVote(
      vote_id: $vote_id,
    ) {
        id
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
      id
      user{
        id, name, email
      }
    }
  }
}
`;

