export const SERVER_URI = "https://cms.trial-task.k8s.ext.fcse.io/graphql";

export const getUserLoginQuery = (identifier: string, password: string) => {
  return `
    mutation login {
      login(
        input: { identifier: "${identifier}", password: "${password}" }
      ) {
        jwt
      }
    }
  `;
};

export const getUserFetchDataQuery = () => {
  return `
    query user {
      user(id: 2) {
        id
        email
        firstName
        lastName
      }
    }
  `;
};
