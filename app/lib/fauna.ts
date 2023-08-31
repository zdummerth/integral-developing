const endpoint = `https://graphql.fauna.com/graphql`;

interface FormSubmissionInput {
  name: string;
  email: string;
  message: string;
  phone: string;
}

const queryFauna = async ({ query, variables, secret }: any) => {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Schema-Preview": "partial-update-mutation",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  // console.log('response from graphql fetcher', res)
  if (res.status === 200) {
    const json = await res.json();
    // console.log("json from graphql fetcher", json);
    if (json.errors) {
      throw new Error(json.errors);
    } else {
      return json.data;
    }
  } else {
    throw new Error("There was an error in fetching the graphql endpoint");
  }
};

export const createFormSubmission = async (data: FormSubmissionInput) => {
  const query = `
    mutation CreateFormSubmission($data: FormSubmissionInput!) {
      createFormSubmission(data: $data) {
        _id
        name
        email
        message
        phone
      }
    }
  `;

  const variables = {
    data,
  };
  const secret = process.env.FAUNA_FORM_SUBMISSIONS_KEY;
  const res = await queryFauna({ query, variables, secret });
  return res;
};

export default queryFauna;
